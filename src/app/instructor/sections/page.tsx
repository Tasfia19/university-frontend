'use client';

import { useState } from 'react';
import { CheckSquare, Calendar, UserCheck } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { toast } from 'sonner';

export default function InstructorAttendancePage() {
  const [sectionId, setSectionId] = useState('1');
  const [studentId, setStudentId] = useState('4');
  const [status, setStatus] = useState('PRESENT');
  const [remarks, setRemarks] = useState('Attended lecture');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitAttendance = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await apiFetch('/attendance', {
      method: 'POST',
      body: JSON.stringify({
        sectionId: parseInt(sectionId),
        studentId: parseInt(studentId),
        date: new Date().toISOString(),
        status,
        remarks,
      }),
    });

    if (res.success) {
      toast.success('Attendance recorded successfully!');
    } else {
      toast.error(res.message || 'Failed to record attendance');
    }
    setSubmitting(false);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white">Section Attendance Logging</h1>
        <p className="text-slate-400 text-sm mt-1">Record daily student attendance status for your assigned course sections.</p>
      </div>

      <div className="max-w-xl bg-slate-900 border border-slate-800 p-8 rounded-2xl">
        <form onSubmit={handleSubmitAttendance} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Course Section</label>
            <select
              value={sectionId}
              onChange={(e) => setSectionId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            >
              <option value="1">CSE101 - Section 01 (Structured Programming)</option>
              <option value="2">CSE102 - Section 01 (Data Structures)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Student ID / Roll</label>
            <input
              type="number"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Attendance Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 font-semibold text-emerald-400"
            >
              <option value="PRESENT">PRESENT</option>
              <option value="ABSENT">ABSENT</option>
              <option value="LATE">LATE</option>
              <option value="EXCUSED">EXCUSED</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Remarks</label>
            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="e.g. On time"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl text-sm transition flex items-center justify-center gap-2"
          >
            <CheckSquare className="w-4 h-4" /> {submitting ? 'Saving...' : 'Submit Attendance'}
          </button>
        </form>
      </div>
    </div>
  );
}
