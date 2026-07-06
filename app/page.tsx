export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.2),_transparent_24%)]" />
        <header className="relative z-10 border-b border-white/10 bg-slate-950/90 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
            <div className="flex items-center gap-3 text-base font-semibold tracking-tight text-white">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-400/20">P</span>
              <div>
                <p className="leading-tight">Prathomik360</p>
                <p className="text-xs text-slate-400">Powered by 3DoT Corporation</p>
              </div>
            </div>
            <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
              <a href="#features" className="transition hover:text-white">Features</a>
              <a href="#statistics" className="transition hover:text-white">Statistics</a>
              <a href="#cta" className="transition hover:text-white">Get Started</a>
            </nav>
            <a
              href="#cta"
              className="inline-flex rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Request demo
            </a>
          </div>
        </header>

        <main className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-16 sm:pb-24 lg:px-8">
          <section className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
            <div className="max-w-2xl space-y-8">
              <p className="inline-flex rounded-full bg-cyan-500/10 px-4 py-1 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
                Enterprise school management
              </p>
              <div className="space-y-6">
                <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl xl:text-6xl">
                  Simplify school administration for every campus in Bangladesh.
                </h1>
                <p className="text-lg leading-8 text-slate-300 sm:text-xl">
                  Prathomik360 brings attendance, fees, communications, and analytics into a single modern platform built for multi-school operations.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="#cta"
                  className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400"
                >
                  Start your free consultation
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Explore features
                </a>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Trusted by schools</p>
                  <p className="mt-3 text-3xl font-semibold text-white">120+</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Automated workflows</p>
                  <p className="mt-3 text-3xl font-semibold text-white">90%</p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 px-6 py-8 shadow-2xl shadow-slate-950/40 sm:px-8 sm:py-10">
              <div className="absolute -top-10 -right-10 h-36 w-36 rounded-full bg-cyan-500/20 blur-3xl" />
              <div className="absolute -bottom-10 left-0 h-24 w-24 rounded-full bg-slate-800/60 blur-3xl" />
              <div className="relative space-y-6">
                <div className="rounded-3xl bg-slate-950/60 p-6 ring-1 ring-white/10">
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Live dashboard</p>
                  <p className="mt-4 text-3xl font-semibold text-white">Campus overview in one place</p>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Manage attendance, fees, messaging, and reports from a unified workspace designed for administrators.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-950/60 p-5 ring-1 ring-white/10">
                    <p className="text-sm text-slate-400">Attendance</p>
                    <p className="mt-3 text-xl font-semibold text-white">Realtime sync</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/60 p-5 ring-1 ring-white/10">
                    <p className="text-sm text-slate-400">Fees</p>
                    <p className="mt-3 text-xl font-semibold text-white">Automated billing</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="features" className="mt-24 space-y-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">What makes Prathomik360 different</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Built for large campuses and multi-branch school networks.
              </h2>
              <p className="mt-4 text-slate-300 sm:text-lg">
                Streamline operations with features that support local institutions, central administration, and multilingual communication.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <article className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/10">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-300/10">
                  <span className="text-xl">📊</span>
                </div>
                <h3 className="text-xl font-semibold text-white">Centralized analytics</h3>
                <p className="mt-4 text-slate-400">
                  Turn operational data into actionable insights with custom dashboards for each school and branch.
                </p>
              </article>
              <article className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/10">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-300/10">
                  <span className="text-xl">🧾</span>
                </div>
                <h3 className="text-xl font-semibold text-white">Smart fee management</h3>
                <p className="mt-4 text-slate-400">
                  Automate billing, track collections, and simplify reporting across all student accounts and branches.
                </p>
              </article>
              <article className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/10">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-300/10">
                  <span className="text-xl">💬</span>
                </div>
                <h3 className="text-xl font-semibold text-white">Parent engagement</h3>
                <p className="mt-4 text-slate-400">
                  Deliver automated updates, exam notifications, and timetables in Bengali and English to parents and staff.
                </p>
              </article>
            </div>
          </section>

          <section id="statistics" className="mt-24 rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-2xl shadow-slate-950/20">
            <div className="grid gap-8 lg:grid-cols-4">
              <div className="rounded-3xl bg-slate-950/80 p-8 text-center">
                <p className="text-3xl font-semibold text-white">430+</p>
                <p className="mt-3 text-sm uppercase tracking-[0.24em] text-slate-400">Schools onboarded</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-8 text-center">
                <p className="text-3xl font-semibold text-white">12K+</p>
                <p className="mt-3 text-sm uppercase tracking-[0.24em] text-slate-400">Active users</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-8 text-center">
                <p className="text-3xl font-semibold text-white">95%</p>
                <p className="mt-3 text-sm uppercase tracking-[0.24em] text-slate-400">Process automation</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-8 text-center">
                <p className="text-3xl font-semibold text-white">24/7</p>
                <p className="mt-3 text-sm uppercase tracking-[0.24em] text-slate-400">Support coverage</p>
              </div>
            </div>
          </section>

          <section id="cta" className="mt-24 rounded-[2rem] border border-white/10 bg-gradient-to-r from-cyan-600/15 via-slate-900/80 to-slate-950/90 px-10 py-16 text-center shadow-2xl shadow-slate-950/25">
            <div className="mx-auto max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Ready to transform your schools?</p>
              <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Launch a smarter, safer, and more unified school management ecosystem.
              </h2>
              <p className="mt-4 text-slate-300 sm:text-lg">
                Talk to our experts and get a tailored implementation plan for your education network in Bangladesh.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  Book a demo
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Contact sales
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>

      <footer className="border-t border-white/10 bg-slate-950/95 px-6 py-10 text-slate-400 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-white">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300">P</span>
              <div>
                <p className="text-lg font-semibold">Prathomik360</p>
                <p className="text-sm text-slate-400">Powered by 3DoT Corporation</p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-400">
              Enterprise-grade education software designed to help multi-campus organizations manage admissions, attendance, fees, and community engagement from a single platform.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:gap-12">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">Product</p>
              <nav className="mt-4 space-y-3 text-sm text-slate-400">
                <a href="#features" className="block transition hover:text-white">Features</a>
                <a href="#statistics" className="block transition hover:text-white">Statistics</a>
                <a href="#cta" className="block transition hover:text-white">Get Started</a>
              </nav>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">Company</p>
              <div className="mt-4 space-y-3 text-sm text-slate-400">
                <a href="#" className="block transition hover:text-white">About 3DoT</a>
                <a href="#" className="block transition hover:text-white">Careers</a>
                <a href="#" className="block transition hover:text-white">Contact</a>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">Legal</p>
              <div className="mt-4 space-y-3 text-sm text-slate-400">
                <a href="#" className="block transition hover:text-white">Privacy</a>
                <a href="#" className="block transition hover:text-white">Terms</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
