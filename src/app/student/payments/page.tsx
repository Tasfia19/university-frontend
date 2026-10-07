'use client';

import { useState, useEffect } from 'react';
import { CreditCard, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { toast } from 'sonner';

export default function StudentPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [amount, setAmount] = useState('15000');
  const [loading, setLoading] = useState(true);
  const [initiating, setInitiating] = useState(false);

  const fetchPayments = async () => {
    setLoading(true);
    const res = await apiFetch('/payments/my-payments');
    if (res.success && Array.isArray(res.data)) {
      setPayments(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleInitiatePayment = async () => {
    setInitiating(true);
    const res = await apiFetch('/payments/initiate', {
      method: 'POST',
      body: JSON.stringify({
        amount: parseFloat(amount),
        provider: 'STRIPE',
        type: 'TUITION_FEE',
      }),
    });

    if (res.success && res.data) {
      toast.success('Payment session generated! Redirecting to Stripe checkout...');
      // Simulated or actual Stripe checkout redirect
      if (res.data.checkoutUrl) {
        window.location.href = res.data.checkoutUrl;
      } else {
        // Fallback to success page for test
        window.location.href = `/payment/success?trxId=${res.data.payment.transactionId}`;
      }
    } else {
      toast.error(res.message || 'Payment initiation failed.');
    }
    setInitiating(false);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white">Tuition Fee Portal</h1>
        <p className="text-slate-400 text-sm mt-1">Pay tuition fees via Stripe test gateway and view payment receipt history.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Initiation Box */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl h-fit">
          <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mb-4">
            <CreditCard className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Pay Tuition Fee</h2>
          <p className="text-slate-400 text-xs mb-6">Select fee amount and initiate secure Stripe test mode checkout.</p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Fee Amount (BDT)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 font-bold"
              />
            </div>

            <button
              onClick={handleInitiatePayment}
              disabled={initiating}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
            >
              {initiating ? 'Generating Checkout...' : 'Proceed to Stripe Payment'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Payment History List */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-4">Payment History</h3>
          {loading ? (
            <div className="py-8 text-center text-slate-400 text-sm animate-pulse">Loading payments...</div>
          ) : payments.length === 0 ? (
            <p className="text-slate-400 text-sm py-4">No previous payment transactions recorded.</p>
          ) : (
            <div className="space-y-3">
              {payments.map((p) => (
                <div key={p.id} className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 font-mono">Trx: {p.transactionId}</span>
                    <h4 className="text-base font-bold text-white">৳ {p.amount.toLocaleString()}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{p.type} | {new Date(p.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      p.status === 'PAID'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
