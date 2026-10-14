'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Building,
  ShieldAlert,
  CalendarCheck,
  GraduationCap,
  CreditCard,
  CheckSquare,
  Award,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { toast } from 'sonner';

export default function Sidebar({ role }: { role: 'ADMIN' | 'INSTRUCTOR' | 'STUDENT' }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await apiFetch('/auth/logout', { method: 'POST' });
    logout();
    toast.success('Logged out successfully');
    router.push('/login');
  };

  const adminLinks = [
    { href: '/admin', label: 'Overview & Charts', icon: LayoutDashboard },
    { href: '/admin/courses', label: 'Courses Management', icon: BookOpen },
    { href: '/admin/departments', label: 'Departments & Programs', icon: Building },
    { href: '/admin/payments', label: 'Student Payments', icon: CreditCard },
    { href: '/admin/audit-logs', label: 'System Audit Logs', icon: ShieldAlert },
  ];

  const instructorLinks = [
    { href: '/instructor', label: 'Portal Overview', icon: LayoutDashboard },
    { href: '/instructor/sections', label: 'Section Attendance', icon: CheckSquare },
    { href: '/instructor/grading', label: 'Marks & Grading', icon: Award },
  ];

  const studentLinks = [
    { href: '/student', label: 'Overview', icon: LayoutDashboard },
    { href: '/student/schedule', label: 'Enrolled Schedule', icon: CalendarCheck },
    { href: '/student/transcript', label: 'Academic Transcript', icon: GraduationCap },
    { href: '/student/payments', label: 'Tuition Payments', icon: CreditCard },
  ];

  const links = role === 'ADMIN' ? adminLinks : role === 'INSTRUCTOR' ? instructorLinks : studentLinks;

  return (
    <aside className="w-64 bg-[#0F172A] border-r border-indigo-900/20 text-slate-300 min-h-screen p-5 flex flex-col justify-between shadow-2xl">
      <div>
        <div className="p-4 mb-6 bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-500/20 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center font-extrabold text-base shadow-md shadow-indigo-500/25">
            {user?.name?.[0] || 'U'}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-white text-sm font-bold truncate">{user?.name || 'User'}</h4>
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Sparkles className="w-2.5 h-2.5" /> {role}
            </span>
          </div>
        </div>

        <nav className="space-y-1.5">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'hover:bg-slate-800/80 hover:text-white text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-slate-800/80">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
