'use client';

import { useState, useEffect } from 'react';
import { GraduationCap, BookOpen, CreditCard, Calendar, Award } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import Link from 'next/link';

export default function StudentOverviewPage() {
  const [profile, setProfile] = useState<any>(null);
  const [transcript, setTranscript] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([apiFetch('/auth/me'), apiFetch('/grades/transcript')]).then(([meRes, transRes]) => {
      if (meRes.success) setProfile(meRes.data);
      if (transRes.success) setTranscript(transRes.data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="mb-8 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/20 p-6 rounded-2xl">
        <h1 className="text-3xl font-extrabold text-white">Welcome, {profile?.name || 'Student'} 👋</h1>
        <p className="text-slate-300 text-sm mt-1">Student Portal | B.Sc. in Computer Science & Engineering</p>
      </div>

      {loading ? (
        <div className="py-12 text-center text-slate-400 text-sm animate-pulse">Loading portal summary...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-xs font-semibold">Cumulative CGPA</span>
              <Award className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-3xl font-extrabold text-white mt-2">
              {transcript?.summary?.cgpa ? transcript.summary.cgpa.toFixed(2) : '4.00'}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-xs font-semibold">Credits Earned</span>
              <BookOpen className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-3xl font-extrabold text-white mt-2">
              {transcript?.summary?.totalCreditsEarned || 3} Credits
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-xs font-semibold">Active Semester</span>
              <Calendar className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-xl font-bold text-white mt-2">Fall 2026</p>
          </div>
        </div>
      )}

      {/* Quick Action Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/student/schedule" className="bg-slate-900 hover:bg-slate-800/80 border border-slate-800 p-6 rounded-2xl transition group">
          <h3 className="font-bold text-white text-base mb-2 group-hover:text-blue-400 transition">View Class Routine</h3>
          <p className="text-slate-400 text-xs">Check weekly class routines and enrolled section details.</p>
        </Link>

        <Link href="/student/transcript" className="bg-slate-900 hover:bg-slate-800/80 border border-slate-800 p-6 rounded-2xl transition group">
          <h3 className="font-bold text-white text-base mb-2 group-hover:text-amber-400 transition">Academic Transcript</h3>
          <p className="text-slate-400 text-xs">View individual course letter grades, grade points, and semester GPA.</p>
        </Link>

        <Link href="/student/payments" className="bg-slate-900 hover:bg-slate-800/80 border border-slate-800 p-6 rounded-2xl transition group">
          <h3 className="font-bold text-white text-base mb-2 group-hover:text-emerald-400 transition">Pay Tuition Fees</h3>
          <p className="text-slate-400 text-xs">Initiate Stripe online checkout for semester tuition and view receipt status.</p>
        </Link>
      </div>
    </div>
  );
}
