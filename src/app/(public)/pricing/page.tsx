import { CreditCard, CheckCircle, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="bg-slate-950 text-slate-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-white mb-4">Tuition Fees & Scholarships</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm">
            Transparent academic credit pricing, fee structures, and financial assistance options.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <span className="bg-blue-500/10 text-blue-400 font-semibold px-3 py-1 rounded-full text-xs">Bachelor Degree</span>
              <h2 className="text-2xl font-bold text-white mt-4 mb-2">B.Sc. in CSE</h2>
              <p className="text-3xl font-extrabold text-white mb-6">৳ 4,500 <span className="text-xs font-normal text-slate-400">/ credit</span></p>
              <ul className="space-y-3 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> 136 Total Credits</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Access to High-Performance Computer Labs</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Online Course Registration Portal</li>
              </ul>
            </div>
            <Link href="/login" className="block text-center bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-xl text-sm transition">
              Apply for Admission
            </Link>
          </div>

          <div className="bg-slate-900 border-2 border-blue-500 p-8 rounded-2xl flex flex-col justify-between relative shadow-xl shadow-blue-500/10">
            <span className="absolute -top-3 right-6 bg-blue-500 text-white text-xs font-bold px-3 py-0.5 rounded-full">POPULAR</span>
            <div>
              <span className="bg-blue-500/10 text-blue-400 font-semibold px-3 py-1 rounded-full text-xs">Master Degree</span>
              <h2 className="text-2xl font-bold text-white mt-4 mb-2">M.Sc. in CSE</h2>
              <p className="text-3xl font-extrabold text-white mb-6">৳ 5,500 <span className="text-xs font-normal text-slate-400">/ credit</span></p>
              <ul className="space-y-3 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> 36 Advanced Research Credits</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Thesis & Journal Publication Support</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Flexible Evening & Weekend Routines</li>
              </ul>
            </div>
            <Link href="/login" className="block text-center bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-xl text-sm transition">
              Apply for Admission
            </Link>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <span className="bg-blue-500/10 text-blue-400 font-semibold px-3 py-1 rounded-full text-xs">Electrical Engineering</span>
              <h2 className="text-2xl font-bold text-white mt-4 mb-2">B.Sc. in EEE</h2>
              <p className="text-3xl font-extrabold text-white mb-6">৳ 4,200 <span className="text-xs font-normal text-slate-400">/ credit</span></p>
              <ul className="space-y-3 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> 140 Total Credits</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Circuit & Microelectronics Hardware Labs</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Stripe Online Tuition Fee Payment</li>
              </ul>
            </div>
            <Link href="/login" className="block text-center bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-xl text-sm transition">
              Apply for Admission
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
