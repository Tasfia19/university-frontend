'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, BookOpen, Layers } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { toast } from 'sonner';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state for creating course
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [credits, setCredits] = useState('3.0');
  const [departmentId, setDepartmentId] = useState('1');

  const fetchCourses = async () => {
    setLoading(true);
    const res = await apiFetch('/courses');
    if (res.success && Array.isArray(res.data)) {
      setCourses(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await apiFetch('/courses', {
      method: 'POST',
      body: JSON.stringify({
        code,
        title,
        credits: parseFloat(credits),
        departmentId: parseInt(departmentId),
      }),
    });

    if (res.success) {
      toast.success('Course created successfully!');
      setShowModal(false);
      setCode('');
      setTitle('');
      fetchCourses();
    } else {
      toast.error(res.message || 'Failed to create course');
    }
  };

  const handleDeleteCourse = async (id: number) => {
    if (!confirm('Are you sure you want to soft delete this course?')) return;
    const res = await apiFetch(`/courses/${id}`, { method: 'DELETE' });
    if (res.success) {
      toast.success('Course soft-deleted successfully');
      fetchCourses();
    } else {
      toast.error(res.message || 'Delete failed');
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Course Management</h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">Create, update, and manage academic courses and prerequisite mappings.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="self-start sm:self-auto bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2.5 rounded-xl text-sm transition flex items-center gap-2 shadow-lg shadow-blue-600/25"
        >
          <Plus className="w-4 h-4" /> Add New Course
        </button>
      </div>

      {/* Courses Table */}
      {loading ? (
        <div className="py-12 text-center text-slate-400 text-sm animate-pulse">Loading course data...</div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-[550px] text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/60 border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="p-4">Code</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Credits</th>
                  <th className="p-4">Prerequisite</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-sm">
                {courses.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-4 font-bold text-blue-400 whitespace-nowrap">{c.code}</td>
                    <td className="p-4 text-white font-medium">{c.title}</td>
                    <td className="p-4 text-slate-300 whitespace-nowrap">{c.credits}</td>
                    <td className="p-4 text-slate-400 text-xs whitespace-nowrap">
                      {c.prerequisite ? (
                        <span className="text-amber-400 font-medium">{c.prerequisite.code}</span>
                      ) : (
                        <span className="text-slate-500">None</span>
                      )}
                    </td>
                    <td className="p-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleDeleteCourse(c.id)}
                        className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded-lg transition"
                        title="Soft Delete Course"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-4">Create New Course</h2>
            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Course Code</label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="e.g. CSE201"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Object Oriented Programming"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Credits</label>
                <input
                  type="number"
                  step="0.5"
                  required
                  value={credits}
                  onChange={(e) => setCredits(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-xl text-sm transition"
                >
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
