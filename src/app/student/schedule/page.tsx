'use client';

import { useState, useEffect } from 'react';
import { Calendar, BookOpen, Clock, MapPin, Plus } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { toast } from 'sonner';

export default function StudentSchedulePage() {
  const [schedule, setSchedule] = useState<any[]>([]);
  const [availableSections, setAvailableSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSchedule = async () => {
    setLoading(true);
    const [schedRes, secRes] = await Promise.all([
      apiFetch('/registrations/my-schedule'),
      apiFetch('/sections'),
    ]);

    if (schedRes.success && Array.isArray(schedRes.data)) {
      setSchedule(schedRes.data);
    }
    if (secRes.success && Array.isArray(secRes.data)) {
      setAvailableSections(secRes.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  const handleRegisterSection = async (sectionId: number) => {
    const res = await apiFetch('/registrations', {
      method: 'POST',
      body: JSON.stringify({ sectionId }),
    });

    if (res.success) {
      toast.success('Course registration successful!');
      fetchSchedule();
    } else {
      toast.error(res.message || 'Registration failed.');
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white">Enrolled Schedule & Routine</h1>
        <p className="text-slate-400 text-sm mt-1">Manage course registrations and view weekly class routines.</p>
      </div>

      {loading ? (
        <div className="py-12 text-center text-slate-400 text-sm animate-pulse">Loading schedule...</div>
      ) : (
        <div className="space-y-8">
          {/* Currently Enrolled Cards */}
          <div>
            <h2 className="text-lg font-bold text-white mb-4">My Current Registrations</h2>
            {schedule.length === 0 ? (
              <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl text-center text-slate-400 text-sm">
                No active course registrations found. Select an open section below to enroll.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {schedule.map((reg) => (
                  <div key={reg.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-blue-500/10 text-blue-400 font-bold px-3 py-1 rounded-lg text-xs">
                        {reg.section?.course?.code || 'CSE101'}
                      </span>
                      <span className="bg-emerald-500/10 text-emerald-400 font-semibold text-xs px-2.5 py-1 rounded-md">
                        {reg.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{reg.section?.course?.title || 'Structured Programming'}</h3>
                    <div className="space-y-1.5 text-xs text-slate-400 mt-4">
                      <p className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-blue-400" /> Routine: {reg.section?.classRoutine || 'Mon/Wed 09:30-11:00 AM'}</p>
                      <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-blue-400" /> Room: {reg.section?.room || 'Academic Room 402'}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Available Sections for Enrollment */}
          <div>
            <h2 className="text-lg font-bold text-white mb-4">Open Course Sections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableSections.map((sec) => (
                <div key={sec.id} className="bg-slate-900 border border-slate-800 p-5 sm:p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-blue-400">{sec.course?.code} - Sec {sec.sectionNumber}</span>
                    <h4 className="text-base font-bold text-white mt-1">{sec.course?.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{sec.classRoutine} | {sec.room}</p>
                  </div>
                  <button
                    onClick={() => handleRegisterSection(sec.id)}
                    className="self-start sm:self-auto bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 flex-shrink-0 shadow-md shadow-blue-600/20"
                  >
                    <Plus className="w-3.5 h-3.5" /> Enroll
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
