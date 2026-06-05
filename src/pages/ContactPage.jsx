import { useState } from "react";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import PageTransition from "../components/ui/PageTransition.jsx";

const FORMSPREE_URL = "https://formspree.io/f/mvzngnql";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData(event.currentTarget);
    const body = Object.fromEntries(data.entries());

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (res.ok || json?.ok === true) {
        setSubmitted(true);
        event.currentTarget.reset();
      } else {
        setError(json?.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Unable to send message. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <section className="container-page py-12">
        <div className="grid gap-6 lg:grid-cols-[0.42fr_0.58fr]">
          <div className="glass-panel rounded-lg p-6 sm:p-8">
            <p className="eyebrow">Contact</p>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 dark:text-white">Share feedback or collaboration notes.</h1>
            <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Your message goes directly to our inbox via the NYTimes-powered dashboard. We respond within 1–2 business days.
            </p>
            {submitted ? (
              <div className="mt-6 flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-bold text-emerald-700 dark:text-emerald-300">
                <CheckCircle aria-hidden="true" size={18} /> Message sent successfully.
              </div>
            ) : null}
          </div>

          <form onSubmit={handleSubmit} className="surface rounded-lg p-6 sm:p-8">
            <div className="grid gap-5">
              <div>
                <label htmlFor="name" className="text-sm font-black text-slate-900 dark:text-white">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="Enter your name"
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-black text-slate-900 dark:text-white">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="subject" className="text-sm font-black text-slate-900 dark:text-white">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  required
                  placeholder="Subject of your message"
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-black text-slate-900 dark:text-white">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="6"
                  placeholder="Write your message"
                  className="mt-2 w-full resize-y rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>
              {error ? (
                <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-700 dark:text-red-300">
                  <AlertCircle aria-hidden="true" size={16} /> {error}
                </div>
              ) : null}
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-200"
              >
                {loading ? <Loader2 aria-hidden="true" className="animate-spin" size={16} /> : null}
                {loading ? "Sending..." : "Send message"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </PageTransition>
  );
}
