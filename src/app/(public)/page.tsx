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
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 border-b border-slate-900 bg-gradient-to-b from-slate-900/80 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-1.5 rounded-full text-xs font-semibold mb-6">
            <GraduationCap className="w-4 h-4" /> Next-Gen Academic Portal 2026
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">University Management</span> & Academic Engine
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
            Streamlined course registrations, automated GPA calculation, real-time section routines, attendance tracking, and Stripe tuition processing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3.5 rounded-xl transition shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              Explore Portals <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/courses"
              className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold px-8 py-3.5 rounded-xl transition flex items-center justify-center gap-2"
            >
              View Course Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Empowering Campus Excellence</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">
              Role-specific workflows built for Students, Instructors, and Academic Administrators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
              <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Prerequisite Validation</h3>
              <p className="text-slate-400 text-sm">
                Transaction-safe course registration engine that validates prerequisites and capacity in real-time.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
              <div className="w-12 h-12 bg-cyan-500/10 text-cyan-400 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Automated GPA Engine</h3>
              <p className="text-slate-400 text-sm">
                Grade submissions instantly update semester GPA, cumulative CGPA, and generate transcripts.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Stripe Payment Gateway</h3>
              <p className="text-slate-400 text-sm">
                Integrated online tuition fee checkout with real-time payment status webhooks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-16 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl font-extrabold text-blue-400">30+</p>
            <p className="text-slate-400 text-xs mt-1">REST API Endpoints</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-cyan-400">3</p>
            <p className="text-slate-400 text-xs mt-1">Fixed Primary Roles</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-emerald-400">100%</p>
            <p className="text-slate-400 text-xs mt-1">Type-Safe TypeScript</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-indigo-400">22+</p>
            <p className="text-slate-400 text-xs mt-1">Frontend App Routes</p>
          </div>
        </div>
      </section>
    </div>
  );
}
