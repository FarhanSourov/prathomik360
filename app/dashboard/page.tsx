'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    const getUserEmail = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setEmail(user?.email ?? null);
    };

    getUserEmail();
  }, []);

  const handleLogout = async () => {
    setIsSigningOut(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      setIsSigningOut(false);
      return;
    }

    router.replace('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl rounded-4xl border border-white/10 bg-white/10 p-10 shadow-2xl backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Prathomik360</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-3 text-base leading-7 text-slate-300">
          Welcome{email ? `, ${email}` : ''}. Your dashboard is ready for school operations and reporting.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="inline-flex rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
            Return home
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isSigningOut}
            className="inline-flex rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSigningOut ? 'Signing out…' : 'Logout'}
          </button>
        </div>
      </div>
    </div>
  );
}
