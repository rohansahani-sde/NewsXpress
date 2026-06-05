import axios from "axios";
import { CACHE_TTL_MS, FALLBACK_IMAGE } from "../lib/constants.js";

const client = axios.create({
  baseURL: "https://api.nytimes.com/svc/",
  headers: { accept: "application/json" },
  timeout: 12000,
});

const memoryCache = new Map();
const inFlightRequests = new Map();

function getApiKey() {
  return import.meta.env.VITE_NYT_API_KEY;
}

function getCached(cacheKey) {
  const cached = memoryCache.get(cacheKey);
  if (!cached) return null;
  if (Date.now() - cached.createdAt > CACHE_TTL_MS) {
    memoryCache.delete(cacheKey);
    return null;
  }
  return cached.data;
}

function setCached(cacheKey, data) {
  memoryCache.set(cacheKey, { createdAt: Date.now(), data });
}

function withNytHost(url) {
  if (!url) return FALLBACK_IMAGE;
  if (url.startsWith("http") || url.startsWith("/")) return url;
  return `https://www.nytimes.com/${url}`;
}

function bestImage(multimedia) {
  if (Array.isArray(multimedia)) {
    return multimedia.find((item) => item?.url)?.url || FALLBACK_IMAGE;
  }
  return withNytHost(multimedia?.default?.url || multimedia?.thumbnail?.url);
}

export function normalizeArticle(raw, sourceType = "topstories") {
  const headline = raw.headline?.main || raw.title || "Untitled story";
  const description = raw.abstract || raw.snippet || raw.lead_paragraph || "No summary is available for this story yet.";
  const date = raw.published_date || raw.pub_date || raw.updated_date;
  const section = raw.section || raw.section_name || raw.news_desk || "News";
  const words = description.trim().split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(words / 210));

  return {
    id: raw.uri || raw._id || raw.url || headline,
    title: headline,
    description,
    url: raw.url || raw.web_url,
    image: bestImage(raw.multimedia),
    imageCaption: raw.multimedia?.[0]?.caption || raw.multimedia?.caption || "",
    source: raw.source || "The New York Times",
    byline: typeof raw.byline === "string" ? raw.byline : raw.byline?.original || raw.byline || "",
    date,
    updatedAt: raw.updated_date,
    section,
    subsection: raw.subsection || raw.subsection_name || "",
    tags: [
      ...(raw.des_facet || []),
      ...(raw.geo_facet || []),
      ...(raw.per_facet || []),
      ...(raw.keywords || []).map((item) => item.value),
    ].filter(Boolean).slice(0, 9),
    raw,
    sourceType,
    readTime,
  };
}

async function request(cacheKey, url, params, signal) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("Missing VITE_NYT_API_KEY. Add it to your environment to load live stories.");
  }

  const cached = getCached(cacheKey);
  if (cached) return cached;

  if (inFlightRequests.has(cacheKey)) {
    return inFlightRequests.get(cacheKey);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 14000);

  const requestPromise = client
    .get(url, { params: { ...params, "api-key": apiKey }, signal: controller.signal })
    .finally(() => {
      clearTimeout(timeoutId);
      inFlightRequests.delete(cacheKey);
    });

  inFlightRequests.set(cacheKey, requestPromise);

  const response = await requestPromise;
  setCached(cacheKey, response.data);
  return response.data;
}

export async function getTopStories(section = "home", signal) {
  const data = await request(`top:${section}`, `topstories/v2/${section}.json`, {}, signal);
  return (data.results || []).map((article) => normalizeArticle(article, "topstories"));
}

export async function searchArticles(query, page = 0, signal) {
  if (!query?.trim()) return [];

  const data = await request(
    `search:${query}:${page}`,
    "search/v2/articlesearch.json",
    { q: query.trim(), page },
    signal
  );
  return (data.response?.docs || []).map((article) => normalizeArticle(article, "search"));
}
