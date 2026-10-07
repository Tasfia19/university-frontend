import { GraduationCap, Building, Award, ShieldCheck, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-slate-950 text-slate-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-white mb-4">About Our University System</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm">
            Empowering higher education through modern digital infrastructure, transparent grading, and efficient academic management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">Academic Mission</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Our University Management System provides a unified digital campus platform where students can register for classes, view routines, pay tuition fees, and track their GPA progress in real-time.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Faculty members benefit from automated grading, attendance logging, and section scheduling, while administrators maintain strict control over curriculum offerings and security audit logs.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center shrink-0">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Department & Program Structure</h3>
                <p className="text-slate-400 text-xs mt-1">Organized under Computer Science & Engineering (CSE) and Electrical Engineering (EEE) departments.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Standardized Credit Evaluation</h3>
                <p className="text-slate-400 text-xs mt-1">Four-point grading scale calculation with automated semester and cumulative CGPA updates.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-purple-500/10 text-purple-400 rounded-xl flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Security & Audit Tracking</h3>
                <p className="text-slate-400 text-xs mt-1">Every academic grade entry, role change, and course registration is logged into the audit system.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
