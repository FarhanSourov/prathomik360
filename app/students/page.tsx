'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { supabase } from '../../lib/supabase';

type Student = {
  id: string;
  full_name: string;
  student_roll: string;
  gender: string;
  date_of_birth: string;
  guardian_name: string;
  guardian_phone: string;
  classes:{
    name: string;
  }| null;
};

function StudentsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadStudents = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      console.log('User:', user);
      console.log('User Error:', userError);

      if (userError || !user) {
        router.replace('/login');
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('school_id')
        .eq('id', user.id)
        .single();

      if (profileError || !profile?.school_id) {
        setError('Unable to load your school profile right now.');
        setIsLoading(false);
        return;
      }

      const { data, error: studentsError } = await supabase
        .from('students')
        .select(`
        id
        , full_name
        , student_roll
        , gender
        , date_of_birth
        , guardian_name
        , guardian_phone
        , classes(name)`)
        .eq('school_id', profile.school_id)
        .order('full_name', { ascending: true })
        .eq('school_id', profile.school_id);
         console.log(data);

      if (studentsError) {
        console.error(studentsError);
        setError('Unable to load students right now.');
        setIsLoading(false);
        return;
      }

      setStudents(data ?? []);
      setIsLoading(false);
    };

    loadStudents();
  }, [router]);
  const handleDelete = async (id: string) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this student?"
  );

  if (!confirmDelete) return;

  const { error } = await supabase
    .from("students")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    alert("Failed to delete student!");
  } else {
    alert("Student deleted successfully!");

    setStudents((prev) =>
      prev.filter((student) => student.id !== id)
    );
  }
};

  const successMessage = searchParams.get('success') === '1' ? 'Student added successfully.' : '';

  const filteredStudents = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();
    if (!normalizedTerm) {
      return students;
    }

    return students.filter((student) => {
      const nameMatch = student.full_name.toLowerCase().includes(normalizedTerm);
      const rollMatch = student.student_roll.toLowerCase().includes(normalizedTerm);
      return nameMatch || rollMatch;
    });
  }, [searchTerm, students]);

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl rounded-4xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur sm:p-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Prathomik360</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">Students</h1>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Manage student records for your school.
            </p>
          </div>
          <Link
            href="/students/add"
            className="inline-flex items-center justify-center rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Add Student
          </Link>
        </div>

        <div className="mt-6">
          <label htmlFor="studentSearch" className="sr-only">
            Search students
          </label>
          <input
            id="studentSearch"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by name or roll"
            className="w-full rounded-2xl border border-slate-200 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400 focus:bg-slate-900 focus:ring-4 focus:ring-cyan-100/10 sm:max-w-md"
          />
        </div>

        {successMessage ? (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {successMessage}
          </div>
        ) : null}

        {error ? (
          <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60">
          {isLoading ? (
            <div className="p-6 text-sm text-slate-300">Loading students…</div>
          ) : filteredStudents.length === 0 ? (
            <div className="p-6 text-sm text-slate-300">No students found for your school yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm text-slate-200">
  <thead className="bg-white/5 text-slate-300">
  <tr>
    <th className="px-4 py-3 font-medium">Name</th>
    <th className="px-4 py-3 font-medium">Roll</th>
    <th className="px-4 py-3 font-medium">Gender</th>
    <th className="px-4 py-3 font-medium">Date of Birth</th>
    <th className="px-4 py-3 font-medium">Guardian</th>
    <th className="px-4 py-3 font-medium">Guardian Phone</th>
    <th className="px-4 py-3 font-medium">Class</th>
    <th className="px-4 py-3 font-medium">Actions</th>
  </tr>
</thead>

<tbody>
  {filteredStudents.map((student) => (
    <tr key={student.id} className="border-t border-white/10">
      <td className="px-4 py-3 font-semibold text-white">
        {student.full_name}
      </td>
      <td className="px-4 py-3">{student.student_roll}</td>
      <td className="px-4 py-3">{student.gender}</td>
      <td className="px-4 py-3">{student.date_of_birth}</td>
      <td className="px-4 py-3">{student.guardian_name}</td>
      <td className="px-4 py-3">{student.guardian_phone}</td>
      <td className="px-4 py-3">
        {student.classes?.name ?? "Unknown"}
      </td>

      <td className="px-4 py-3">
        <div className="flex gap-2">
          <Link
            href={`/students/edit/${student.id}`}
            className="rounded-lg bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
          >
            Edit
          </Link>

          <button
            onClick={() => handleDelete(student.id)}
            className="rounded-lg bg-red-500 px-3 py-1 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function StudentsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 px-6 py-16 text-white">Loading students…</div>}>
      <StudentsPageContent />
    </Suspense>
  );
}
