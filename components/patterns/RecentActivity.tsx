import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  type: 'property' | 'lead' | 'project' | 'viewing';
}

const mockActivities: ActivityItem[] = [
  { id: '1', user: 'Admin User', action: 'created', target: 'New property in Downtown Dubai', time: '5 min ago', type: 'property' },
  { id: '2', user: 'Sales Agent', action: 'updated', target: 'Lead status to Qualified', time: '15 min ago', type: 'lead' },
  { id: '3', user: 'Marketing Team', action: 'launched', target: 'Q1 Marketing Campaign', time: '1 hour ago', type: 'project' },
  { id: '4', user: 'Admin User', action: 'scheduled', target: 'Viewing for Palm Jumeirah Villa', time: '2 hours ago', type: 'viewing' },
  { id: '5', user: 'Sales Agent', action: 'added', target: 'New lead from website', time: '3 hours ago', type: 'lead' },
];

const typeColors: Record<string, string> = {
  property: 'bg-blue-100 text-blue-800',
  lead: 'bg-green-100 text-green-800',
  project: 'bg-purple-100 text-purple-800',
  viewing: 'bg-yellow-100 text-yellow-800',
};

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={`px-2 py-1 rounded text-xs font-medium ${typeColors[activity.type]}`}>
                {activity.type.toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.user}</span>{' '}
                  <span className="text-gray-600">{activity.action}</span>{' '}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
