import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { APP_NAME, CATEGORIES } from "../../lib/constants.js";
import { useTheme } from "../../hooks/useTheme.js";

const navClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-bold transition ${
    isActive
      ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
  }`;

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const submitSearch = (event) => {
    event.preventDefault();
    const value = query.trim();
    if (!value) return;
    navigate(`/search?q=${encodeURIComponent(value)}`);
    setOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 border-b border-slate-200/70 bg-white/78 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/72 transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="container-page flex min-h-20 items-center gap-4">
        <Link to="/" className="flex items-center gap-3" aria-label={`${APP_NAME} home`}>
          <span className="grid size-10 place-items-center rounded-lg bg-slate-950 text-sm font-black text-white dark:bg-white dark:text-slate-950">
            NX
          </span>
          <span className="text-lg font-black tracking-tight text-slate-950 dark:text-white">{APP_NAME}</span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 lg:flex" aria-label="Primary">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>
          {CATEGORIES.slice(0, 5).map((item) => (
            <NavLink key={item.value} to={`/news/${item.value}`} className={navClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <form onSubmit={submitSearch} className="ml-auto hidden min-w-72 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-white/5 md:flex">
          <Search aria-hidden="true" size={18} className="text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search briefings..."
            className="w-full bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400 dark:text-white"
            aria-label="Search news"
          />
        </form>

        <button
          type="button"
          onClick={toggleTheme}
          className="grid size-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? <Sun aria-hidden="true" size={18} /> : <Moon aria-hidden="true" size={18} />}
        </button>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="grid size-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10 lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>
      </div>

      {open ? (
        <div className="container-page pb-4 lg:hidden">
          <form onSubmit={submitSearch} className="mb-3 flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-white/5">
            <Search aria-hidden="true" size={18} className="text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search briefings..."
              className="w-full bg-transparent text-sm outline-none dark:text-white"
              aria-label="Search news"
            />
          </form>
          <nav className="grid gap-1 rounded-lg border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900" aria-label="Mobile primary">
            <NavLink to="/" onClick={() => setOpen(false)} className={navClass}>
              Home
            </NavLink>
            {CATEGORIES.map((item) => (
              <NavLink key={item.value} to={`/news/${item.value}`} onClick={() => setOpen(false)} className={navClass}>
                {item.label}
              </NavLink>
            ))}
            <NavLink to="/about" onClick={() => setOpen(false)} className={navClass}>
              About
            </NavLink>
            <NavLink to="/contact" onClick={() => setOpen(false)} className={navClass}>
              Contact
            </NavLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
