'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { LogIn, Shield, UserCheck, GraduationCap, ArrowRight } from 'lucide-react';
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
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
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
      toast.error(res.message || 'Login failed. Please check your credentials.');
    }
    setLoadingRole(null);
  };

  const onSubmit = (data: LoginFormData) => {
    performLogin(data.email, data.password);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 font-bold text-2xl text-blue-400 mb-2">
          <GraduationCap className="w-9 h-9 text-blue-500" />
          <span>UniSystem</span>
        </Link>
        <h2 className="text-2xl font-bold text-white">Welcome Back 👋</h2>
        <p className="text-xs text-slate-400 mt-1">Sign in to your role portal or use 1-Click Demo Login</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 shadow-xl rounded-2xl sm:px-10">
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
              <input
                {...register('email')}
                type="email"
                placeholder="admin@university.edu"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
              {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
              <input
                {...register('password')}
                type="password"
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
              {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !!loadingRole}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl text-sm transition flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" /> {isSubmitting ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-3 text-slate-400 font-semibold">🚀 Quick 1-Click Demo Login</span>
            </div>
          </div>

          {/* 1-Click Demo Login Buttons for 3 Roles */}
          <div className="space-y-3">
            {/* Admin Demo Button */}
            <button
              type="button"
              onClick={() => performLogin('admin@university.edu', 'admin123', 'ADMIN')}
              disabled={!!loadingRole}
              className="w-full bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-white p-3 rounded-xl flex items-center justify-between text-xs font-medium transition group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-slate-200">👨‍💼 Admin Demo</p>
                  <p className="text-[10px] text-slate-400">admin@university.edu</p>
                </div>
              </div>
              <span className="text-blue-400 group-hover:translate-x-1 transition flex items-center gap-1 font-semibold">
                {loadingRole === 'ADMIN' ? 'Logging in...' : 'Login'} <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* Instructor Demo Button */}
            <button
              type="button"
              onClick={() => performLogin('dr.smith@university.edu', 'instructor123', 'INSTRUCTOR')}
              disabled={!!loadingRole}
              className="w-full bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-white p-3 rounded-xl flex items-center justify-between text-xs font-medium transition group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-slate-200">👨‍🏫 Instructor Demo</p>
                  <p className="text-[10px] text-slate-400">dr.smith@university.edu</p>
                </div>
              </div>
              <span className="text-emerald-400 group-hover:translate-x-1 transition flex items-center gap-1 font-semibold">
                {loadingRole === 'INSTRUCTOR' ? 'Logging in...' : 'Login'} <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* Student Demo Button */}
            <button
              type="button"
              onClick={() => performLogin('student1@university.edu', 'student123', 'STUDENT')}
              disabled={!!loadingRole}
              className="w-full bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-white p-3 rounded-xl flex items-center justify-between text-xs font-medium transition group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-slate-200">🎓 Student Demo</p>
                  <p className="text-[10px] text-slate-400">student1@university.edu</p>
                </div>
              </div>
              <span className="text-purple-400 group-hover:translate-x-1 transition flex items-center gap-1 font-semibold">
                {loadingRole === 'STUDENT' ? 'Logging in...' : 'Login'} <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-blue-400 font-semibold hover:underline">
              Register Student
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
