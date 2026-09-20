'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  createdAt: string;
}

const mockLeads: Lead[] = [
  { id: '1', name: 'Ahmed Al Mansoori', email: 'ahmed@example.com', phone: '+971 50 123 4567', interest: 'Dubai Marina Apartment', status: 'new', createdAt: '2025-01-15' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+971 55 987 6543', interest: 'Palm Jumeirah Villa', status: 'contacted', createdAt: '2025-01-14' },
  { id: '3', name: 'Mohammed Hassan', email: 'mohammed@example.com', phone: '+971 52 456 7890', interest: 'Downtown Dubai Penthouse', status: 'qualified', createdAt: '2025-01-13' },
  { id: '4', name: 'Emily Chen', email: 'emily@example.com', phone: '+971 56 321 0987', interest: 'Business Bay Office', status: 'converted', createdAt: '2025-01-12' },
  { id: '5', name: 'David Smith', email: 'david@example.com', phone: '+971 50 654 3210', interest: 'JBR Beachfront', status: 'lost', createdAt: '2025-01-11' },
];

const statusColors: Record<string, 'success' | 'info' | 'warning' | 'secondary' | 'default'> = {
  new: 'info',
  contacted: 'warning',
  qualified: 'secondary',
  converted: 'success',
  lost: 'secondary',
};

export function RecentLeads() {
  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'interest', header: 'Interest' },
    {
      key: 'status',
      header: 'Status',
      render: (row: Lead) => (
        <Badge variant={statusColors[row.status] || 'gray'}>
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </Badge>
      ),
    } as any,
    { key: 'createdAt', header: 'Created' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Leads</CardTitle>
      </CardHeader>
      <CardContent>
        <Table columns={columns} data={mockLeads} />
      </CardContent>
    </Card>
  );
}
