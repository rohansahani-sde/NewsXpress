import PageTransition from "../components/ui/PageTransition.jsx";

export default function AboutPage() {
  return (
    <PageTransition>
      <section className="container-page py-12">
        <div className="surface rounded-lg p-6 sm:p-10">
          <p className="eyebrow">About</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-slate-950 dark:text-white">A calmer way to scan trusted headlines.</h1>
          <div className="mt-8 grid gap-6 text-sm leading-7 text-slate-600 dark:text-slate-400 md:grid-cols-2">
            <p>
              NewsExpress curates top stories from The New York Times API and presents them in a focused dashboard built for fast reading, clear hierarchy, and responsive browsing.
            </p>
            <p>
              This project is an educational product build by Rohan Sahani. It is not affiliated with The New York Times, and all live article data belongs to its original publisher.
            </p>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
