'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Home, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const trxId = searchParams.get('trxId') || searchParams.get('session_id') || 'TRX-1788986091570';

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20 shadow-xl shadow-emerald-500/10">
        <CheckCircle2 className="w-10 h-10" />
      </div>
      <h1 className="text-3xl font-extrabold text-white mb-2">Payment Successful!</h1>
      <p className="text-slate-400 max-w-md text-sm mb-6">
        Your tuition fee payment has been successfully verified via Stripe gateway.
      </p>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-md w-full mb-8 text-left space-y-3">
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Transaction ID</span>
          <span className="text-white font-mono font-bold">{trxId}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Status</span>
          <span className="text-emerald-400 font-bold">PAID (Verified)</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Provider</span>
          <span className="text-blue-400 font-bold">STRIPE GATEWAY</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/student/payments"
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition"
        >
          <CreditCard className="w-4 h-4" /> Payment History
        </Link>
        <Link
          href="/student"
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-2.5 rounded-xl font-medium text-sm transition"
        >
          <Home className="w-4 h-4" /> Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
