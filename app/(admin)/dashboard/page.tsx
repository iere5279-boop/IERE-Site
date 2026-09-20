import { DashboardStats } from '@/components/patterns/DashboardStats';
import { RecentLeads } from '@/components/patterns/RecentLeads';
import { RecentActivity } from '@/components/patterns/RecentActivity';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your real estate business</p>
      </div>

      <DashboardStats />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentLeads />
        <RecentActivity />
      </div>
    </div>
  );
}
