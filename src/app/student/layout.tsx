import Sidebar from '@/components/Sidebar';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar role="STUDENT" />
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
