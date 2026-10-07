import Link from 'next/link';
import {
  GraduationCap,
  BookOpen,
  Award,
  Users,
  ShieldCheck,
  ArrowRight,
  CheckCircle,
  CreditCard,
  Building,
  Sparkles,
  Zap,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="bg-[#0B0F19] text-slate-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-28 border-b border-indigo-900/20 bg-gradient-to-b from-[#111827] via-[#0B0F19] to-[#0B0F19] overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-pink-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-4 py-1.5 rounded-full text-xs font-bold mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Next-Gen Academic Portal 2026
          </div>

          <h1 className="text-4xl sm:text-7xl font-extrabold text-white tracking-tight mb-8 max-w-5xl mx-auto leading-[1.15]">
            Empowering Higher Education with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">
              Smart Academic Infrastructure
            </span>
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Transaction-safe course registration, real-time section routines, automated GPA engine calculation, and Stripe tuition fee processing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:opacity-90 text-white font-bold px-8 py-4 rounded-2xl transition shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2"
            >
              Explore Demo Portals <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/courses"
              className="bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold px-8 py-4 rounded-2xl transition flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-24 border-b border-indigo-900/20 bg-[#0B0F19]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white mb-4">Built for Excellence Across Campus</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">
              Role-specific workflows custom crafted for Students, Faculty Instructors, and Academic Administrators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#111827]/80 border border-indigo-900/30 p-8 rounded-3xl backdrop-blur-sm shadow-xl hover:border-indigo-500/40 transition">
              <div className="w-14 h-14 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/20">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Prerequisite Engine</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Transaction-safe course registration engine that checks prerequisite completion and section seat capacity in real-time.
              </p>
            </div>

            <div className="bg-[#111827]/80 border border-indigo-900/30 p-8 rounded-3xl backdrop-blur-sm shadow-xl hover:border-purple-500/40 transition">
              <div className="w-14 h-14 bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Automated GPA Calculation</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Grade submissions by instructors automatically recalculate semester GPA, cumulative CGPA, and generate certified transcripts.
              </p>
            </div>

            <div className="bg-[#111827]/80 border border-indigo-900/30 p-8 rounded-3xl backdrop-blur-sm shadow-xl hover:border-emerald-500/40 transition">
              <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20">
                <CreditCard className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Stripe Fee Checkout</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Integrated online tuition payment portal with secure session checkout and real-time webhook status updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-950/40 via-[#111827] to-indigo-950/40 border-b border-indigo-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6 bg-[#0B0F19]/60 border border-indigo-900/30 rounded-2xl">
            <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">30+</p>
            <p className="text-slate-400 text-xs font-semibold mt-2">REST API Endpoints</p>
          </div>
          <div className="p-6 bg-[#0B0F19]/60 border border-indigo-900/30 rounded-2xl">
            <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">3</p>
            <p className="text-slate-400 text-xs font-semibold mt-2">Fixed Primary Roles</p>
          </div>
          <div className="p-6 bg-[#0B0F19]/60 border border-indigo-900/30 rounded-2xl">
            <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">100%</p>
            <p className="text-slate-400 text-xs font-semibold mt-2">Type-Safe TypeScript</p>
          </div>
          <div className="p-6 bg-[#0B0F19]/60 border border-indigo-900/30 rounded-2xl">
            <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">23</p>
            <p className="text-slate-400 text-xs font-semibold mt-2">App Router Pages</p>
          </div>
        </div>
      </section>
    </div>
  );
}
