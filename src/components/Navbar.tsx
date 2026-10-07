'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { GraduationCap, User, LogOut, LayoutDashboard, Menu, X, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/lib/store';
import { apiFetch } from '@/lib/api';
import { toast } from 'sonner';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, setUser, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    apiFetch('/auth/me').then((res) => {
      if (res.success && res.data) {
        setUser(res.data);
      }
    });
  }, [setUser]);

  const handleLogout = async () => {
    await apiFetch('/auth/logout', { method: 'POST' });
    logout();
    toast.success('Logged out successfully');
    router.push('/login');
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'ADMIN') return '/admin';
    if (user.role === 'INSTRUCTOR') return '/instructor';
    return '/student';
  };

  return (
    <nav className="bg-[#0f172a]/90 backdrop-blur-md border-b border-indigo-900/30 text-white sticky top-0 z-50 shadow-lg shadow-indigo-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 font-extrabold text-xl tracking-tight group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-indigo-400">
              UniSystem
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <Link href="/" className={pathname === '/' ? 'text-indigo-400 font-semibold' : 'hover:text-white transition'}>
              Home
            </Link>
            <Link href="/about" className={pathname === '/about' ? 'text-indigo-400 font-semibold' : 'hover:text-white transition'}>
              About
            </Link>
            <Link href="/courses" className={pathname === '/courses' ? 'text-indigo-400 font-semibold' : 'hover:text-white transition'}>
              Courses
            </Link>
            <Link href="/pricing" className={pathname === '/pricing' ? 'text-indigo-400 font-semibold' : 'hover:text-white transition'}>
              Tuition & Fees
            </Link>
            <Link href="/contact" className={pathname === '/contact' ? 'text-indigo-400 font-semibold' : 'hover:text-white transition'}>
              Contact
            </Link>
          </div>

          {/* User Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href={getDashboardLink()}
                  className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition shadow-md shadow-indigo-500/20"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard ({user.role})
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-rose-400 px-3 py-2 text-sm transition font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-slate-300 hover:text-white px-3 py-2 text-sm font-medium transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-md shadow-indigo-500/25"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-white p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0f172a] border-b border-indigo-900/30 px-4 pt-2 pb-4 space-y-2">
          <Link href="/" className="block py-2 text-slate-300 hover:text-white">Home</Link>
          <Link href="/about" className="block py-2 text-slate-300 hover:text-white">About</Link>
          <Link href="/courses" className="block py-2 text-slate-300 hover:text-white">Courses</Link>
          <Link href="/pricing" className="block py-2 text-slate-300 hover:text-white">Tuition & Fees</Link>
          <Link href="/contact" className="block py-2 text-slate-300 hover:text-white">Contact</Link>

          {user ? (
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <Link
                href={getDashboardLink()}
                className="block bg-indigo-600 text-white text-center py-2.5 rounded-xl font-medium"
              >
                Dashboard ({user.role})
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-center text-rose-400 py-2 hover:bg-slate-800 rounded-xl"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="pt-2 border-t border-slate-800 flex gap-2">
              <Link href="/login" className="flex-1 text-center py-2 bg-slate-800 text-white rounded-xl">Login</Link>
              <Link href="/register" className="flex-1 text-center py-2 bg-indigo-600 text-white rounded-xl font-semibold">Register</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
