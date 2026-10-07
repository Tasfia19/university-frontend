'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, BookOpen, Layers, Filter } from 'lucide-react';
import { apiFetch } from '@/lib/api';

interface Course {
  id: number;
  code: string;
  title: string;
  credits: number;
  description?: string;
  department?: { name: string; code: string };
  prerequisite?: { code: string; title: string };
}

export default function CoursesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async (queryStr: string) => {
    setLoading(true);
    const res = await apiFetch(`/courses?q=${encodeURIComponent(queryStr)}`);
    if (res.success && Array.isArray(res.data)) {
      setCourses(res.data);
    } else {
      // Fallback demo courses if backend server is unreachable
      setCourses([
        { id: 1, code: 'CSE101', title: 'Structured Programming Language', credits: 3.0, description: 'Introduction to C programming, loops, arrays, and functions.' },
        { id: 2, code: 'CSE102', title: 'Data Structures and Algorithms', credits: 3.0, description: 'Linked lists, trees, graphs, sorting, and dynamic programming.', prerequisite: { code: 'CSE101', title: 'Structured Programming' } },
        { id: 3, code: 'EEE101', title: 'Electrical Circuits I', credits: 3.0, description: 'Fundamental circuit analysis, KVL, KCL, and AC circuits.' },
      ]);
    }
    setLoading(false);
  };

  useEffect(() => {
    const q = searchParams.get('q') || '';
    fetchCourses(q);
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set('q', search);
    router.push(`/courses?${params.toString()}`);
  };

  return (
    <div className="bg-slate-950 text-slate-100 py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-white mb-2">Academic Course Catalog</h1>
          <p className="text-slate-400 text-sm">Explore courses offered across Computer Science & Engineering departments.</p>
        </div>

        {/* URL Search Bar */}
        <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto mb-10 flex gap-2">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by course code or title (e.g., CSE101)..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition"
          >
            Search
          </button>
        </form>

        {/* Course Cards Grid */}
        {loading ? (
          <div className="text-center py-12 text-slate-400 text-sm animate-pulse">Loading course catalog...</div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/40 border border-slate-800 rounded-2xl">
            <BookOpen className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <p className="text-slate-400 font-medium">No courses found matching &quot;{search}&quot;</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map((c) => (
              <div key={c.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold px-3 py-1 rounded-lg text-xs">
                      {c.code}
                    </span>
                    <span className="text-slate-400 text-xs font-semibold">{c.credits} Credits</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{c.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">{c.description || 'No course description available.'}</p>
                </div>

                {c.prerequisite ? (
                  <div className="pt-3 border-t border-slate-800/80 text-xs text-amber-400 flex items-center gap-1.5 font-medium">
                    <Layers className="w-3.5 h-3.5" /> Prerequisite: {c.prerequisite.code}
                  </div>
                ) : (
                  <div className="pt-3 border-t border-slate-800/80 text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
                    <Layers className="w-3.5 h-3.5" /> Open for all students
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
