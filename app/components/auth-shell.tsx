'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
};

export default function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.24),_transparent_28%),linear-gradient(135deg,_#f8fbff_0%,_#eef4ff_100%)] px-4 py-6 text-slate-900 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/80 shadow-[0_30px_80px_-24px_rgba(15,23,42,0.35)] backdrop-blur lg:flex-row">
        <div className="relative flex flex-col justify-between overflow-hidden bg-slate-950 px-6 py-8 text-white sm:px-8 lg:w-[44%] lg:px-10 lg:py-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.25),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.18),_transparent_20%)]" />
          <div className="relative space-y-8">
            <div>
              <Link href="/" className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100 backdrop-blur">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/20 text-cyan-300">P</span>
                Prathomik360
              </Link>
              <h1 className="mt-8 text-3xl font-semibold tracking-tight sm:text-4xl">
                Secure school operations from day one.
              </h1>
              <p className="mt-4 max-w-lg text-base leading-7 text-slate-300 sm:text-lg">
                A modern authentication foundation for schools, staff, and administrators across Bangladesh.
              </p>
            </div>

            <div className="grid gap-3 rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/20 text-cyan-300">✓</span>
                <div>
                  <p className="font-semibold">Fast onboarding</p>
                  <p className="mt-1 text-sm text-slate-300">Launch your school account in minutes with guided registration.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/20 text-cyan-300">✓</span>
                <div>
                  <p className="font-semibold">Built for reliability</p>
                  <p className="mt-1 text-sm text-slate-300">Supabase-backed authentication with strong validation and recovery flows.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-8 text-sm text-slate-400">
            <p>Secure by design • Modern UI • Production-ready foundation</p>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center bg-slate-50/80 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="w-full max-w-md rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.3)] sm:p-8">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Prathomik360</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{subtitle}</p>
            </div>
            {children}
            <div className="mt-6 border-t border-slate-200 pt-5 text-sm text-slate-600">{footer}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
