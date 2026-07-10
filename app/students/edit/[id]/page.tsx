'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '../../../../lib/supabase';

export default function EditStudentPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('students').select('*').eq('id', id).single();
      if (error) {
        console.error('Error fetching student:', error);
      } else {
        setStudent(data);
      }
      setLoading(false);
    };

    fetchStudent();
  }, [id]);
  const handleUpdate = async () => {
  const { error } = await supabase
    .from('students')
    .update({
      full_name: student.full_name,
      student_roll: student.student_roll,
    })
    .eq('id', id);

  if (error) {
    console.error(error);
    alert('Update failed!');
  } else {
    alert('Student updated successfully!');
    router.push('/students');
  }
};

  if (loading) {
    return <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Edit Student Page</h1>

      <p className="mt-4">Student ID: {id}</p>
      <div className="mt-6 w-full max-w-md space-y-4">
  <input
    type="text"
    placeholder="Full Name"
    value={student?.full_name || ""}
    onChange={(e) =>
      setStudent({ ...student, full_name: e.target.value })
    }
    className="w-full rounded-lg border border-slate-600 bg-slate-800 p-3"
  />

  <input
    type="text"
    placeholder="Roll"
    value={student?.student_roll || ""}
    onChange={(e) =>
      setStudent({ ...student, student_roll: e.target.value })
    }
    className="w-full rounded-lg border border-slate-600 bg-slate-800 p-3"
  />

  <button
  onClick={handleUpdate}
  className="w-full rounded-lg bg-cyan-500 py-3 font-semibold hover:bg-cyan-600"
>
    Update Student
  </button>
</div>
    </div>
  );
}