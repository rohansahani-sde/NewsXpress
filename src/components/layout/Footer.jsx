import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { APP_NAME, CATEGORIES } from "../../lib/constants.js";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/72 dark:border-slate-800 dark:bg-slate-950/74">
      <div className="container-page grid gap-8 py-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-slate-950 text-sm font-black text-white dark:bg-white dark:text-slate-950">NX</span>
            <span className="font-black text-slate-950 dark:text-white">{APP_NAME}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-400">
            A fast, curated news dashboard powered by The New York Times API.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-black text-slate-950 dark:text-white">Categories</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            {CATEGORIES.slice(0, 4).map((item) => (
              <li key={item.value}>
                <Link className="transition hover:text-blue-600 dark:hover:text-blue-300" to={`/news/${item.value}`}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-black text-slate-950 dark:text-white">Company</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>
              <Link className="transition hover:text-blue-600 dark:hover:text-blue-300" to="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-blue-600 dark:hover:text-blue-300" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-black text-slate-950 dark:text-white">Contact</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <p className="flex items-center gap-2">
              <MapPin aria-hidden="true" size={16} /> Vadodara, India
            </p>
            <a className="flex items-center gap-2 transition hover:text-blue-600 dark:hover:text-blue-300" href="mailto:sahanirohan313@gmail.com">
              <Mail aria-hidden="true" size={16} /> sahanirohan313@gmail.com
            </a>
            <div className="flex gap-3 pt-2">
              <a aria-label="LinkedIn" className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-white/10" href="https://www.linkedin.com/in/rohan-sahani-09-/" target="_blank" rel="noreferrer">
                <Linkedin aria-hidden="true" size={18} />
              </a>
              <a aria-label="GitHub" className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-white/10" href="https://github.com/rohansahani-sde/" target="_blank" rel="noreferrer">
                <Github aria-hidden="true" size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs font-bold text-slate-500 dark:border-slate-800 dark:text-slate-500">
        Copyright {new Date().getFullYear()} {APP_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
