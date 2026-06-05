import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AppShell from "./components/layout/AppShell.jsx";
import ErrorBoundary from "./components/ui/ErrorBoundary.jsx";
import RouteFallback from "./components/ui/RouteFallback.jsx";

const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const CategoryPage = lazy(() => import("./pages/CategoryPage.jsx"));
const SearchPage = lazy(() => import("./pages/SearchPage.jsx"));
const NewsDetailPage = lazy(() => import("./pages/NewsDetailPage.jsx"));
const AboutPage = lazy(() => import("./pages/AboutPage.jsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.jsx"));

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <ErrorBoundary>
      <AppShell>
        <Suspense fallback={<RouteFallback />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/news/:category" element={<CategoryPage />} />
              <Route path="/news/details/:title" element={<NewsDetailPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/Search" element={<Navigate to={`/search${location.search}`} replace />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </AppShell>
    </ErrorBoundary>
  );
}
