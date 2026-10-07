'use client';

import { useState } from 'react';
import { Award, Calculator, CheckCircle2 } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { toast } from 'sonner';

export default function InstructorGradingPage() {
  const [studentId, setStudentId] = useState('4');
  const [sectionId, setSectionId] = useState('1');
  const [marks, setMarks] = useState('88');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmitGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await apiFetch('/grades', {
      method: 'POST',
      body: JSON.stringify({
        studentId: parseInt(studentId),
        sectionId: parseInt(sectionId),
        marks: parseFloat(marks),
      }),
    });

    if (res.success && res.data) {
      setResult(res.data);
      toast.success(`Grade ${res.data.grade?.letterGrade} submitted! Student GPA updated to ${res.data.semesterGPA}`);
    } else {
      toast.error(res.message || 'Failed to submit grade.');
    }
    setSubmitting(false);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white">Grade Submission Wizard</h1>
        <p className="text-slate-400 text-sm mt-1">Submit student numerical marks. The system automatically calculates letter grades and GPA.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Box */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
          <form onSubmit={handleSubmitGrade} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Select Section</label>
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
              <label className="block text-xs font-semibold text-slate-300 mb-1">Numerical Marks (0 - 100)</label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="100"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 font-bold"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20"
            >
              <Award className="w-4 h-4" /> {submitting ? 'Calculating...' : 'Submit Final Grade'}
            </button>
          </form>
        </div>

        {/* Calculation Output Box */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-amber-400" /> Automated Grade Output
            </h3>
            {result ? (
              <div className="space-y-4">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <span className="text-xs text-slate-400">Calculated Letter Grade</span>
                  <span className="text-2xl font-extrabold text-emerald-400">{result.grade?.letterGrade}</span>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <span className="text-xs text-slate-400">Grade Point</span>
                  <span className="text-xl font-bold text-white">{result.grade?.gradePoint?.toFixed(2)}</span>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <span className="text-xs text-slate-400">Semester GPA</span>
                  <span className="text-xl font-bold text-blue-400">{result.semesterGPA?.toFixed(2)}</span>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <span className="text-xs text-slate-400">Cumulative CGPA</span>
                  <span className="text-xl font-bold text-purple-400">{result.cgpa?.toFixed(2)}</span>
                </div>
              </div>
            ) : (
              <p className="text-slate-400 text-xs leading-relaxed py-8">
                Submit student marks on the left form to see the automatic letter grade, grade point calculation, and CGPA recalculation engine output.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
