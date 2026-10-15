import DashboardLayout from '@/components/DashboardLayout';

export default function InstructorLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="INSTRUCTOR">{children}</DashboardLayout>;
}
