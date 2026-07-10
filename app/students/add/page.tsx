'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type FormEvent, useEffect, useState } from 'react';
import AuthShell from '../../components/auth-shell';
import { supabase } from '../../../lib/supabase';

type ClassOption = {
  id: string;
  name: string;
};

export default function AddStudentPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [studentRoll, setStudentRoll] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [classId, setClassId] = useState('');
  const [classes, setClasses] = useState<ClassOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

 useEffect(() => {
  const loadClasses = async () => {
    const { data, error: classesError } = await supabase
      .from('classes')
      .select('*');

    console.log("Classes Data:", data);
    console.log("Classes Error:", classesError);

    if (data) {
      setClasses(data as ClassOption[]);
    }
  };

  loadClasses();
}, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (
      !fullName.trim() ||
      !studentRoll.trim() ||
      !gender.trim() ||
      !dateOfBirth.trim() ||
      !guardianName.trim() ||
      !guardianPhone.trim() ||
      !classId.trim()
    ) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setError('You need to be signed in to add a student.');
        setIsLoading(false);
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('school_id')
        .eq('id', user.id)
        .single();

      if (profileError || !profile?.school_id) {
        setError('Unable to determine your school right now.');
        setIsLoading(false);
        return;
      }

      const { error: insertError } = await supabase.from('students').insert({
        full_name: fullName.trim(),
        student_roll: studentRoll.trim(),
        gender: gender.trim(),
        date_of_birth: dateOfBirth,
        guardian_name: guardianName.trim(),
        guardian_phone: guardianPhone.trim(),
        class_id: classId.trim(),
        school_id: profile.school_id,
      });

      if (insertError) {
        setError(insertError.message);
        setIsLoading(false);
        return;
      }

      router.replace('/students?success=1');
    } catch {
      setError('An unexpected error occurred while saving the student.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      title="Add student"
      subtitle="Create a new student record for your school."
      footer={
        <>
          <span className="mr-1">Back to</span>
          <Link href="/students" className="font-semibold text-cyan-700 transition hover:text-cyan-800">
            Students list
          </Link>
        </>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-slate-700">
            Full name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Aisha Rahman"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
          />
        </div>

        <div>
          <label htmlFor="studentRoll" className="mb-2 block text-sm font-medium text-slate-700">
            Student roll
          </label>
          <input
            id="studentRoll"
            type="text"
            value={studentRoll}
            onChange={(event) => setStudentRoll(event.target.value)}
            placeholder="202401"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
          />
        </div>

        <div>
          <label htmlFor="gender" className="mb-2 block text-sm font-medium text-slate-700">
            Gender
          </label>
          <input
            id="gender"
            type="text"
            value={gender}
            onChange={(event) => setGender(event.target.value)}
            placeholder="Female"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
          />
        </div>

        <div>
          <label htmlFor="dateOfBirth" className="mb-2 block text-sm font-medium text-slate-700">
            Date of birth
          </label>
          <input
            id="dateOfBirth"
            type="date"
            value={dateOfBirth}
            onChange={(event) => setDateOfBirth(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
          />
        </div>

        <div>
          <label htmlFor="guardianName" className="mb-2 block text-sm font-medium text-slate-700">
            Guardian name
          </label>
          <input
            id="guardianName"
            type="text"
            value={guardianName}
            onChange={(event) => setGuardianName(event.target.value)}
            placeholder="Rahman Ahmed"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
          />
        </div>

        <div>
          <label htmlFor="guardianPhone" className="mb-2 block text-sm font-medium text-slate-700">
            Guardian phone
          </label>
          <input
            id="guardianPhone"
            type="text"
            value={guardianPhone}
            onChange={(event) => setGuardianPhone(event.target.value)}
            placeholder="01700000000"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
          />
        </div>

        <div>
          <label htmlFor="classId" className="mb-2 block text-sm font-medium text-slate-700">
            Class
          </label>
          <select
            id="classId"
            value={classId}
            onChange={(event) => setClassId(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
          >
            <option value="">Select a class</option>
            {classes.map((classOption) => (
              <option key={classOption.id} value={classOption.id}>
                {classOption.name}
              </option>
            ))}
          </select>
        </div>

        {error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center rounded-2xl bg-cyan-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? 'Saving student…' : 'Save student'}
        </button>
      </form>
    </AuthShell>
  );
}
