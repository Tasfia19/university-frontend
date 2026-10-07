'use client';

import { useState, useEffect } from 'react';
import { Building, Plus, Layers } from 'lucide-react';
import { apiFetch } from '@/lib/api';

export default function AdminDepartmentsPage() {
  const [departments, setDepartments] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([apiFetch('/departments'), apiFetch('/programs')]).then(([deptRes, progRes]) => {
      if (deptRes.success && Array.isArray(deptRes.data)) setDepartments(deptRes.data);
      if (progRes.success && Array.isArray(progRes.data)) setPrograms(progRes.data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white">Departments & Academic Programs</h1>
        <p className="text-slate-400 text-sm mt-1">Overview of active academic faculties and degree programs.</p>
      </div>

      {loading ? (
        <div className="py-12 text-center text-slate-400 text-sm animate-pulse">Loading department data...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Departments List */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Building className="w-5 h-5 text-blue-400" /> Academic Departments
            </h3>
            <div className="space-y-4">
              {departments.map((d) => (
                <div key={d.id} className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{d.name}</span>
                    <span className="bg-blue-500/10 text-blue-400 font-semibold text-xs px-2.5 py-1 rounded-lg">{d.code}</span>
                  </div>
                  <p className="text-slate-400 text-xs mt-2">{d.description || 'Department of higher education'}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Programs List */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-400" /> Degree Programs
            </h3>
            <div className="space-y-4">
              {programs.map((p) => (
                <div key={p.id} className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{p.name}</span>
                    <span className="bg-purple-500/10 text-purple-400 font-semibold text-xs px-2.5 py-1 rounded-lg">{p.degreeLevel}</span>
                  </div>
                  <p className="text-slate-400 text-xs mt-2">Total Required Credits: <strong className="text-white">{p.totalCredits} Credits</strong></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
