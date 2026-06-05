import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="grid min-h-screen place-items-center bg-slate-950 px-6 text-center text-white">
          <div>
            <p className="eyebrow border-white/15 bg-white/10 text-slate-300">Application error</p>
            <h1 className="mt-5 text-3xl font-bold">NewsExpress needs a refresh.</h1>
            <p className="mt-3 text-slate-400">Something unexpected happened while rendering this page.</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 rounded-lg bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-200"
            >
              Reload page
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
