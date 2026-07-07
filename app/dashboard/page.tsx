'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [schoolName, setSchoolName] = useState<string | null>(null);
  const [schoolStatus, setSchoolStatus] = useState<string | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.replace('/login');
        return;
      }

      setUserEmail(user.email ?? null);

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('full_name, email, role, school_id')
        .eq('id', user.id)
        .single();

      if (profileError || !profile) {
        setIsLoading(false);
        return;
      }

      setFullName(profile.full_name ?? null);
      setRole(profile.role ?? null);

      if (profile.school_id) {
        const { data: school, error: schoolError } = await supabase
          .from('schools')
          .select('name, status')
          .eq('id', profile.school_id)
          .single();

        if (!schoolError && school) {
          setSchoolName(school.name ?? null);
          setSchoolStatus(school.status ?? null);
        }
      }

      setIsLoading(false);
    };

    loadDashboardData();
  }, [router]);

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
          {isLoading ? 'Loading your school profile…' : `Welcome${userEmail ? `, ${userEmail}` : ''}.`}
        </p>

        {!isLoading ? (
          <div className="mt-8 grid gap-3 rounded-3xl border border-white/10 bg-slate-900/50 p-5 text-sm text-slate-200">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
              <span className="text-slate-400">School Name</span>
              <span className="font-semibold text-white">{schoolName ?? '—'}</span>
            </div>
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
              <span className="text-slate-400">Admin Full Name</span>
              <span className="font-semibold text-white">{fullName ?? '—'}</span>
            </div>
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
              <span className="text-slate-400">Admin Email</span>
              <span className="font-semibold text-white">{userEmail ?? '—'}</span>
            </div>
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
              <span className="text-slate-400">Role</span>
              <span className="font-semibold text-white">{role ?? '—'}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-400">School Status</span>
              <span className="font-semibold text-white">{schoolStatus ?? '—'}</span>
            </div>
          </div>
        ) : null}

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
