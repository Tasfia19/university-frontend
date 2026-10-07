import { XCircle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mb-6 border border-amber-500/20 shadow-xl shadow-amber-500/10">
        <XCircle className="w-10 h-10" />
      </div>
      <h1 className="text-3xl font-extrabold text-white mb-2">Payment Cancelled</h1>
      <p className="text-slate-400 max-w-md text-sm mb-6">
        Your payment checkout session was cancelled. No charges were deducted from your account.
      </p>

      <div className="flex items-center gap-4">
        <Link
          href="/student/payments"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition"
        >
          <RefreshCw className="w-4 h-4" /> Retry Payment
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
