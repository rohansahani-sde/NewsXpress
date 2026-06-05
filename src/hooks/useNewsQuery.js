import { useEffect, useMemo, useRef, useState } from "react";
import { getTopStories, searchArticles } from "../services/nytService.js";

const initialState = { data: [], error: "", loading: true };

export function useTopStories(section = "home") {
  const [state, setState] = useState(initialState);
  const abortRef = useRef(null);

  useEffect(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setState((current) => ({ ...current, loading: true, error: "" }));

    getTopStories(section, controller.signal)
      .then((data) => setState({ data, loading: false, error: "" }))
      .catch((error) => {
        if (error.name === "CanceledError" || error.name === "AbortError") return;
        setState({ data: [], loading: false, error: error.message || "Unable to load news." });
      });

    return () => controller.abort();
  }, [section]);

  return state;
}

export function useSearchNews(query) {
  const [page, setPage] = useState(0);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef(null);
  const queryRef = useRef(query);

  useEffect(() => {
    if (query !== queryRef.current) {
      queryRef.current = query;
      setArticles([]);
      setPage(0);
      setError("");
    }
    if (!query) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");

    const controller = new AbortController();
    abortRef.current = controller;

    searchArticles(query, 0, controller.signal)
      .then((data) => {
        setArticles(data);
        setPage(0);
      })
      .catch((err) => {
        if (err.name === "CanceledError" || err.name === "AbortError") return;
        setError(err.message || "Unable to search articles.");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [query]);

  useEffect(() => {
    if (page === 0 || !query) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setLoadingMore(true);

    searchArticles(query, page, controller.signal)
      .then((data) => {
        setArticles((current) => {
          const next = [...current, ...data];
          return Array.from(new Map(next.map((item) => [item.id, item])).values());
        });
      })
      .catch((err) => {
        if (err.name === "CanceledError" || err.name === "AbortError") return;
        setError(err.message || "Unable to load more articles.");
      })
      .finally(() => setLoadingMore(false));

    return () => controller.abort();
  }, [page, query]);

  return useMemo(
    () => ({
      articles,
      error,
      loading,
      loadingMore,
      loadMore: () => setPage((current) => current + 1),
    }),
    [articles, error, loading, loadingMore]
  );
}
