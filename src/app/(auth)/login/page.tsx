'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { LogIn, Shield, UserCheck, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { apiFetch } from '@/lib/api';
import { useAuthStore } from '@/lib/store';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useAuthStore();
  const [loadingRole, setLoadingRole] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const performLogin = async (email: string, pass: string, roleName?: string) => {
    if (roleName) setLoadingRole(roleName);
    const res = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password: pass }),
    });

    if (res.success && res.data) {
      setUser(res.data.user, res.data.token);
      toast.success(`Welcome back, ${res.data.user.name}!`);

      const redirect = searchParams.get('redirect');
      if (redirect) {
        router.push(redirect);
        return;
      }

      if (res.data.user.role === 'ADMIN') {
        router.push('/admin');
      } else if (res.data.user.role === 'INSTRUCTOR') {
        router.push('/instructor');
      } else {
        router.push('/student');
      }
    } else {
      toast.error(res.message || 'Login failed. Please check credentials.');
    }
    setLoadingRole(null);
  };

  const onSubmit = (data: LoginFormData) => {
    performLogin(data.email, data.password);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2.5 font-extrabold text-2xl text-white mb-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-indigo-400">
            UniSystem
          </span>
        </Link>
        <h2 className="text-2xl font-bold text-white">Welcome Back 👋</h2>
        <p className="text-xs text-slate-400 mt-1">Sign in to your portal or use 1-Click Demo Login</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#111827] border border-indigo-900/30 py-8 px-6 shadow-2xl rounded-3xl sm:px-10 backdrop-blur-sm">
          {/* Credentials Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <input
                {...register('email')}
                type="email"
                placeholder="admin@university.edu"
                className="w-full bg-[#0B0F19] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
              />
              {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <input
                {...register('password')}
                type="password"
                placeholder="••••••••"
                className="w-full bg-[#0B0F19] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
              />
              {errors.password && <p className="text-xs text-rose-400 mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !!loadingRole}
              className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-3 rounded-xl text-sm transition shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" /> {isSubmitting ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
              <span className="bg-[#111827] px-3 text-indigo-400 font-extrabold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Quick 1-Click Demo Login
              </span>
            </div>
          </div>

          {/* 1-Click Demo Login Role Cards */}
          <div className="space-y-3">
            {/* Admin Demo */}
            <button
              type="button"
              onClick={() => performLogin('admin@university.edu', 'admin123', 'ADMIN')}
              disabled={!!loadingRole}
              className="w-full bg-[#0B0F19]/80 hover:bg-indigo-950/40 border border-indigo-500/30 text-white p-3.5 rounded-2xl flex items-center justify-between text-xs font-medium transition group shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-white">👨‍💼 Admin Demo</p>
                  <p className="text-[10px] text-slate-400">admin@university.edu</p>
                </div>
              </div>
              <span className="text-indigo-400 group-hover:translate-x-1 transition flex items-center gap-1 font-bold">
                {loadingRole === 'ADMIN' ? 'Logging in...' : 'Login'} <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* Instructor Demo */}
            <button
              type="button"
              onClick={() => performLogin('dr.smith@university.edu', 'instructor123', 'INSTRUCTOR')}
              disabled={!!loadingRole}
              className="w-full bg-[#0B0F19]/80 hover:bg-emerald-950/40 border border-emerald-500/30 text-white p-3.5 rounded-2xl flex items-center justify-between text-xs font-medium transition group shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-white">👨‍🏫 Instructor Demo</p>
                  <p className="text-[10px] text-slate-400">dr.smith@university.edu</p>
                </div>
              </div>
              <span className="text-emerald-400 group-hover:translate-x-1 transition flex items-center gap-1 font-bold">
                {loadingRole === 'INSTRUCTOR' ? 'Logging in...' : 'Login'} <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* Student Demo */}
            <button
              type="button"
              onClick={() => performLogin('student1@university.edu', 'student123', 'STUDENT')}
              disabled={!!loadingRole}
              className="w-full bg-[#0B0F19]/80 hover:bg-purple-950/40 border border-purple-500/30 text-white p-3.5 rounded-2xl flex items-center justify-between text-xs font-medium transition group shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400 flex items-center justify-center font-bold">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-white">🎓 Student Demo</p>
                  <p className="text-[10px] text-slate-400">student1@university.edu</p>
                </div>
              </div>
              <span className="text-purple-400 group-hover:translate-x-1 transition flex items-center gap-1 font-bold">
                {loadingRole === 'STUDENT' ? 'Logging in...' : 'Login'} <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-indigo-400 font-bold hover:underline">
              Register Student
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
