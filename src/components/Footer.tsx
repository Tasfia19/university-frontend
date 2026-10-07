import Link from 'next/link';
import { GraduationCap, Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 font-bold text-xl text-blue-400 mb-4">
            <GraduationCap className="w-7 h-7 text-blue-500" />
            <span>UniSystem</span>
          </div>
          <p className="text-sm text-slate-400">
            Next-generation academic management system for course registration, attendance, grading, and tuition payments.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold text-sm mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link href="/courses" className="hover:text-white transition">Course Catalog</Link></li>
            <li><Link href="/pricing" className="hover:text-white transition">Tuition & Fees</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold text-sm mb-4">Portals</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/login" className="hover:text-white transition">Admin Portal</Link></li>
            <li><Link href="/login" className="hover:text-white transition">Faculty Portal</Link></li>
            <li><Link href="/login" className="hover:text-white transition">Student Portal</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold text-sm mb-4">Contact Info</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-400" /> Dhaka, Bangladesh</li>
            <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-blue-400" /> +880 1700 000000</li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-blue-400" /> support@university.edu</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-slate-900 text-center text-xs text-slate-500">
        © 2026 University Management System. All rights reserved. Built with Next.js App Router & Tailwind CSS.
      </div>
    </footer>
  );
}
