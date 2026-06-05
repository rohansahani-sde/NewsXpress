import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      window.requestAnimationFrame(() => {
        setVisible(window.scrollY > 420);
        ticking = false;
      });
      ticking = true;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-5 right-5 z-40 grid size-11 place-items-center rounded-lg bg-slate-950 text-white shadow-xl transition hover:-translate-y-1 dark:bg-white dark:text-slate-950"
      aria-label="Scroll to top"
    >
      <ArrowUp aria-hidden="true" size={18} />
    </button>
  );
}
