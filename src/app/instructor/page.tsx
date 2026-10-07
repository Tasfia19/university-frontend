'use client';

import { useState, useEffect } from 'react';
import { UserCheck, BookOpen, CheckSquare, Award } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import Link from 'next/link';

export default function InstructorOverviewPage() {
  const [profile, setProfile] = useState<any>(null);
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([apiFetch('/auth/me'), apiFetch('/sections')]).then(([meRes, secRes]) => {
      if (meRes.success) setProfile(meRes.data);
      if (secRes.success && Array.isArray(secRes.data)) setSections(secRes.data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="mb-8 bg-gradient-to-r from-emerald-900/40 to-teal-900/40 border border-emerald-500/20 p-6 rounded-2xl">
        <h1 className="text-3xl font-extrabold text-white">Faculty Portal | {profile?.name || 'Dr. Alan Smith'} 👋</h1>
        <p className="text-slate-300 text-sm mt-1">Department of Computer Science & Engineering</p>
      </div>

      {loading ? (
        <div className="py-12 text-center text-slate-400 text-sm animate-pulse">Loading assigned sections...</div>
      ) : (
        <div className="space-y-8">
          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <span className="text-slate-400 text-xs font-semibold">Taught Sections</span>
              <p className="text-3xl font-extrabold text-white mt-2">{sections.length}</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <span className="text-slate-400 text-xs font-semibold">Total Enrolled Students</span>
              <p className="text-3xl font-extrabold text-emerald-400 mt-2">30</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <span className="text-slate-400 text-xs font-semibold">Semester</span>
              <p className="text-xl font-bold text-white mt-2">Fall 2026</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/instructor/sections" className="bg-slate-900 hover:bg-slate-800/80 border border-slate-800 p-6 rounded-2xl transition group">
              <h3 className="font-bold text-white text-base mb-2 group-hover:text-emerald-400 transition flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-emerald-400" /> Attendance Logging
              </h3>
              <p className="text-slate-400 text-xs">Record daily student class attendance (Present, Absent, Late, Excused).</p>
            </Link>

            <Link href="/instructor/grading" className="bg-slate-900 hover:bg-slate-800/80 border border-slate-800 p-6 rounded-2xl transition group">
              <h3 className="font-bold text-white text-base mb-2 group-hover:text-purple-400 transition flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-400" /> Grade Submission Wizard
              </h3>
              <p className="text-slate-400 text-xs">Enter final marks to automatically calculate letter grades & student GPA.</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
