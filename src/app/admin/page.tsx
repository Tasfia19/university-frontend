'use client';

import { useState, useEffect } from 'react';
import { Users, BookOpen, CreditCard, Building, TrendingUp } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/admin/dashboard-stats').then((res) => {
      if (res.success && res.data) {
        setStats(res.data);
      } else {
        // Fallback demo stats
        setStats({
          users: { totalStudents: 2, totalInstructors: 2 },
          academics: { totalDepartments: 2, totalCourses: 3, totalActiveSections: 2 },
          financials: { totalCollectedRevenue: 30000, totalPaidTransactions: 2 },
        });
      }
      setLoading(false);
    });
  }, []);

  const chartData = [
    { name: 'Students', count: stats?.users?.totalStudents || 2 },
    { name: 'Instructors', count: stats?.users?.totalInstructors || 2 },
    { name: 'Courses', count: stats?.academics?.totalCourses || 3 },
    { name: 'Sections', count: stats?.academics?.totalActiveSections || 2 },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white">System Analytics & Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Real-time overview of university users, academic courses, and financials.</p>
      </div>

      {loading ? (
        <div className="py-12 text-center text-slate-400 text-sm animate-pulse">Loading analytics...</div>
      ) : (
        <>
          {/* Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-xs font-semibold">Total Students</span>
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <p className="text-2xl font-bold text-white mt-2">{stats?.users?.totalStudents || 0}</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-xs font-semibold">Total Courses</span>
                <BookOpen className="w-5 h-5 text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-white mt-2">{stats?.academics?.totalCourses || 0}</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-xs font-semibold">Active Sections</span>
                <Building className="w-5 h-5 text-cyan-400" />
              </div>
              <p className="text-2xl font-bold text-white mt-2">{stats?.academics?.totalActiveSections || 0}</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-xs font-semibold">Collected Revenue</span>
                <CreditCard className="w-5 h-5 text-emerald-400" />
              </div>
              <p className="text-2xl font-bold text-white mt-2">৳ {(stats?.financials?.totalCollectedRevenue || 0).toLocaleString()}</p>
            </div>
          </div>

          {/* Recharts Analytics Section */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" /> Academic Resource Allocation Chart
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                  <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
