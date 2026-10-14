'use client';

import { useState, useEffect, useCallback } from 'react';
import { CreditCard, CheckCircle2, Clock, XCircle, Search, Filter, AlertCircle, RefreshCw } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { toast } from 'sonner';

interface Student {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

interface Payment {
  id: number;
  studentId: number;
  student?: Student;
  amount: number;
  currency: string;
  transactionId: string;
  provider: string;
  type: string;
  status: 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED';
  paidAt?: string | null;
  createdAt: string;
}

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    let endpoint = '/payments?page=1&limit=50';
    if (statusFilter !== 'ALL') {
      endpoint += `&status=${statusFilter}`;
    }
    if (searchQuery.trim()) {
      endpoint += `&q=${encodeURIComponent(searchQuery.trim())}`;
    }

    const res = await apiFetch<Payment[]>(endpoint);
    if (res.success && Array.isArray(res.data)) {
      setPayments(res.data);
    } else {
      toast.error(res.message || 'Failed to load payments');
    }
    setLoading(false);
  }, [statusFilter, searchQuery]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const handleUpdateStatus = async (paymentId: number, newStatus: 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED') => {
    setUpdatingId(paymentId);
    const res = await apiFetch<Payment>(`/payments/${paymentId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.success && res.data) {
      toast.success(`Payment marked as ${newStatus} successfully!`);
      setPayments((prev) =>
        prev.map((p) => (p.id === paymentId ? { ...p, status: newStatus, paidAt: res.data?.paidAt } : p))
      );
    } else {
      toast.error(res.message || 'Failed to update payment status');
    }
    setUpdatingId(null);
  };

  const totalRevenue = payments
    .filter((p) => p.status === 'PAID')
    .reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter((p) => p.status === 'PENDING').length;
  const totalPaid = payments.filter((p) => p.status === 'PAID').length;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Student Payments & Fee Verification</h1>
          <p className="text-slate-400 text-sm mt-1">
            Review student tuition transactions and update payment status from PENDING to PAID.
          </p>
        </div>
        <button
          onClick={fetchPayments}
          disabled={loading}
          className="self-start sm:self-auto flex items-center gap-2 bg-[#1E293B] hover:bg-[#334155] text-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold transition border border-slate-700/60"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#111827]/80 border border-indigo-900/30 p-5 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Collected Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-emerald-400 mt-2">৳ {totalRevenue.toLocaleString()}</p>
          <span className="text-[11px] text-slate-400 mt-1 block">From verified paid transactions</span>
        </div>

        <div className="bg-[#111827]/80 border border-indigo-900/30 p-5 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Paid Transactions</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-white mt-2">{totalPaid}</p>
          <span className="text-[11px] text-indigo-300 mt-1 block">Successfully completed</span>
        </div>

        <div className="bg-[#111827]/80 border border-indigo-900/30 p-5 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Pending Approval</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-amber-400 mt-2">{totalPending}</p>
          <span className="text-[11px] text-amber-300/80 mt-1 block">Awaiting payment verification</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#111827]/80 border border-indigo-900/30 p-4 rounded-2xl mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search Trx ID, student name, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0B0F19] border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <span className="text-xs text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {['ALL', 'PENDING', 'PAID', 'FAILED', 'CANCELLED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                statusFilter === st
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-[#1E293B] text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions Table */}
      {loading ? (
        <div className="py-16 text-center text-slate-400 text-sm animate-pulse bg-[#111827]/50 rounded-2xl border border-indigo-900/20">
          Loading student payment transactions...
        </div>
      ) : payments.length === 0 ? (
        <div className="text-center py-16 bg-[#111827]/50 border border-indigo-900/20 rounded-2xl">
          <CreditCard className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-white">No payment transactions found</h3>
          <p className="text-xs text-slate-400 mt-1">Try selecting a different status filter or clear your search.</p>
        </div>
      ) : (
        <div className="bg-[#111827] border border-indigo-900/30 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/60 border-b border-indigo-900/30 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="p-4">Student</th>
                  <th className="p-4">Transaction Details</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Type & Date</th>
                  <th className="p-4">Current Status</th>
                  <th className="p-4 text-right">Admin Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-xs">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/30 transition">
                    {/* Student */}
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">{p.student?.name || `Student #${p.studentId}`}</div>
                      <div className="text-slate-400 text-[11px]">{p.student?.email || 'N/A'}</div>
                      {p.student?.phone && <div className="text-slate-500 text-[10px]">{p.student.phone}</div>}
                    </td>

                    {/* Transaction */}
                    <td className="p-4">
                      <div className="font-mono text-indigo-300 font-semibold text-xs">{p.transactionId}</div>
                      <div className="text-slate-400 text-[11px] flex items-center gap-1 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                        {p.provider}
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="p-4">
                      <div className="font-extrabold text-white text-sm">৳ {p.amount.toLocaleString()}</div>
                      <div className="text-[10px] text-slate-500 uppercase">{p.currency}</div>
                    </td>

                    {/* Type & Date */}
                    <td className="p-4">
                      <div className="text-slate-300 font-medium">{p.type.replace('_', ' ')}</div>
                      <div className="text-slate-400 text-[10px] mt-0.5">
                        {new Date(p.createdAt).toLocaleDateString()} {new Date(p.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>

                    {/* Current Status Badge */}
                    <td className="p-4">
                      {p.status === 'PAID' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-sm">
                          <CheckCircle2 className="w-3.5 h-3.5" /> PAID
                        </span>
                      )}
                      {p.status === 'PENDING' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-sm">
                          <Clock className="w-3.5 h-3.5 animate-pulse" /> PENDING
                        </span>
                      )}
                      {p.status === 'FAILED' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
                          <XCircle className="w-3.5 h-3.5" /> FAILED
                        </span>
                      )}
                      {p.status === 'CANCELLED' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-700/40 text-slate-400 border border-slate-700">
                          <AlertCircle className="w-3.5 h-3.5" /> CANCELLED
                        </span>
                      )}
                    </td>

                    {/* Change Status Action */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {p.status === 'PENDING' ? (
                          <button
                            onClick={() => handleUpdateStatus(p.id, 'PAID')}
                            disabled={updatingId === p.id}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3.5 py-1.5 rounded-lg text-xs transition shadow-md shadow-emerald-600/20 flex items-center gap-1.5 disabled:opacity-50"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {updatingId === p.id ? 'Updating...' : 'Mark as PAID'}
                          </button>
                        ) : null}

                        {/* Status Select dropdown to allow switching to any status */}
                        <select
                          value={p.status}
                          disabled={updatingId === p.id}
                          onChange={(e) => handleUpdateStatus(p.id, e.target.value as any)}
                          className="bg-[#0B0F19] border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500 transition"
                        >
                          <option value="PAID">Set PAID</option>
                          <option value="PENDING">Set PENDING</option>
                          <option value="FAILED">Set FAILED</option>
                          <option value="CANCELLED">Set CANCELLED</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
