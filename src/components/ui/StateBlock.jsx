import { AlertCircle, Search } from "lucide-react";

export default function StateBlock({ type = "empty", title, message, action }) {
  const Icon = type === "error" ? AlertCircle : Search;

  return (
    <div className="surface mx-auto flex max-w-2xl flex-col items-center rounded-lg px-6 py-14 text-center">
      <div className="mb-4 rounded-lg border border-slate-200 bg-slate-100 p-3 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
        <Icon aria-hidden="true" size={24} />
      </div>
      <h2 className="text-2xl font-bold text-slate-950 dark:text-white">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">{message}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
