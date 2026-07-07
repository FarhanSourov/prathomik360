'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';
import AuthShell from '../components/auth-shell';
import { supabase } from '../../lib/supabase';

export default function RegisterSchoolPage() {
  const router = useRouter();
  const [schoolName, setSchoolName] = useState('');
  const [schoolEmail, setSchoolEmail] = useState('');
  const [adminFullName, setAdminFullName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    // Validate all fields are filled
    if (
      !schoolName.trim() ||
      !schoolEmail.trim() ||
      !adminFullName.trim() ||
      !adminEmail.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError('Please fill in all fields.');
      return;
    }

    // Validate school name length
    if (schoolName.trim().length < 2) {
      setError('School name must be at least 2 characters long.');
      return;
    }

    // Validate admin full name length
    if (adminFullName.trim().length < 2) {
      setError('Admin full name must be at least 2 characters long.');
      return;
    }

    // Validate password length
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(schoolEmail.trim())) {
      setError('Please enter a valid school email address.');
      return;
    }

    if (!emailPattern.test(adminEmail.trim())) {
      setError('Please enter a valid admin email address.');
      return;
    }

    setIsLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: adminEmail.trim(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (!data.user) {
        setError('We could not create your account. Please try again.');
        return;
      }

      if (data.user.identities?.length === 0) {
        setError(
          'An account with this email already exists. Please try signing in instead.',
        );
        return;
      }

      const { data: schoolData, error: schoolError } = await supabase
        .from('schools')
        .insert({
          name: schoolName.trim(),
          email: schoolEmail.trim(),
          status: 'active',
        })
        .select('id')
        .single();

      if (schoolError || !schoolData) {
        setError(`We could not create your school record. ${schoolError?.message ?? 'Please try again.'}`);
        return;
      }

      const { error: profileError } = await supabase.from('profiles').insert({
        id: data.user.id,
        school_id: schoolData.id,
        full_name: adminFullName.trim(),
        email: adminEmail.trim(),
        role: 'school_admin',
      });

      if (profileError) {
        await supabase.from('schools').delete().eq('id', schoolData.id);
        setError(`We could not create your admin profile. ${profileError.message}`);
        return;
      }

      setSuccess('Account created successfully! Redirecting to login...');
      setSchoolName('');
      setSchoolEmail('');
      setAdminFullName('');
      setAdminEmail('');
      setPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      title="Register your school"
      subtitle="Create your administrator account and start your onboarding journey."
      footer={
        <>
          <span className="mr-1">Already registered?</span>
          <Link href="/login" className="font-semibold text-cyan-700 transition hover:text-cyan-800">
            Sign in instead
          </Link>
        </>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="schoolName" className="mb-2 block text-sm font-medium text-slate-700">
            School name
          </label>
          <input
            id="schoolName"
            type="text"
            autoComplete="organization"
            value={schoolName}
            onChange={(event) => setSchoolName(event.target.value)}
            placeholder="Example School"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
          />
        </div>

        <div>
          <label htmlFor="schoolEmail" className="mb-2 block text-sm font-medium text-slate-700">
            School email
          </label>
          <input
            id="schoolEmail"
            type="email"
            autoComplete="email"
            value={schoolEmail}
            onChange={(event) => setSchoolEmail(event.target.value)}
            placeholder="contact@school.edu"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
          />
        </div>

        <div>
          <label htmlFor="adminFullName" className="mb-2 block text-sm font-medium text-slate-700">
            Admin full name
          </label>
          <input
            id="adminFullName"
            type="text"
            autoComplete="name"
            value={adminFullName}
            onChange={(event) => setAdminFullName(event.target.value)}
            placeholder="John Doe"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
          />
        </div>

        <div>
          <label htmlFor="adminEmail" className="mb-2 block text-sm font-medium text-slate-700">
            Admin email
          </label>
          <input
            id="adminEmail"
            type="email"
            autoComplete="email"
            value={adminEmail}
            onChange={(event) => setAdminEmail(event.target.value)}
            placeholder="admin@school.edu"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Create a strong password"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-slate-700">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Confirm your password"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
          />
        </div>

        {error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        {success ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {success}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center rounded-2xl bg-cyan-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-cyan-600"></span>
              Creating account…
            </span>
          ) : (
            'Create school account'
          )}
        </button>
      </form>
    </AuthShell>
  );
}
