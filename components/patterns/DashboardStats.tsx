import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Building2, Users, TrendingUp, DollarSign } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
}

function StatCard({ title, value, change, trend = 'neutral', icon }: StatCardProps) {
  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600',
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className="p-2 bg-emerald-50 rounded-lg">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className={`text-xs mt-1 ${trendColors[trend]}`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''} {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Properties"
        value="248"
        change="+12% from last month"
        trend="up"
        icon={<Building2 className="w-5 h-5 text-emerald-600" />}
      />
      <StatCard
        title="Active Leads"
        value="89"
        change="+5% from last month"
        trend="up"
        icon={<Users className="w-5 h-5 text-emerald-600" />}
      />
      <StatCard
        title="Conversion Rate"
        value="3.2%"
        change="-0.4% from last month"
        trend="down"
        icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
      />
      <StatCard
        title="Revenue (MTD)"
        value="AED 2.4M"
        change="+18% from last month"
        trend="up"
        icon={<DollarSign className="w-5 h-5 text-emerald-600" />}
      />
    </div>
  );
}
