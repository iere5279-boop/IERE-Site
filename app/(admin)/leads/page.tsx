'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { SearchInput } from '@/components/ui/SearchInput';
import { Button } from '@/components/ui/Button';
import { Plus, Mail, Phone, Calendar } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  source: string;
  createdAt: string;
}

const mockLeads: Lead[] = [
  { id: '1', name: 'Ahmed Al Mansoori', email: 'ahmed@example.com', phone: '+971 50 123 4567', interest: 'Dubai Marina Apartment', status: 'new', source: 'Website', createdAt: '2025-01-15' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+971 55 987 6543', interest: 'Palm Jumeirah Villa', status: 'contacted', source: 'Property Finder', createdAt: '2025-01-14' },
  { id: '3', name: 'Mohammed Hassan', email: 'mohammed@example.com', phone: '+971 52 456 7890', interest: 'Downtown Dubai Penthouse', status: 'qualified', source: 'Referral', createdAt: '2025-01-13' },
  { id: '4', name: 'Emily Chen', email: 'emily@example.com', phone: '+971 56 321 0987', interest: 'Business Bay Office', status: 'converted', source: 'LinkedIn', createdAt: '2025-01-12' },
  { id: '5', name: 'David Smith', email: 'david@example.com', phone: '+971 50 654 3210', interest: 'JBR Beachfront', status: 'lost', source: 'Website', createdAt: '2025-01-11' },
  { id: '6', name: 'Fatima Al Zaabi', email: 'fatima@example.com', phone: '+971 54 789 0123', interest: 'Arabian Ranches Villa', status: 'new', source: 'Instagram', createdAt: '2025-01-15' },
];

const statusColors: Record<string, 'success' | 'info' | 'warning' | 'secondary' | 'default'> = {
  new: 'info',
  contacted: 'warning',
  qualified: 'secondary',
  converted: 'success',
  lost: 'secondary',
};

export default function AdminLeads() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLeads = mockLeads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.interest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { key: 'name', header: 'Name', render: (row: Lead) => (
      <div>
        <p className="font-medium">{row.name}</p>
        <p className="text-sm text-gray-500">{row.email}</p>
      </div>
    )},
    { 
      key: 'phone', 
      header: 'Phone',
      render: (row: Lead) => (
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-400" />
          {row.phone}
        </div>
      )
    },
    { key: 'interest', header: 'Interest' },
    { 
      key: 'status',
      header: 'Status',
      render: (row: Lead) => (
        <Badge variant={statusColors[row.status] || 'gray'}>
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </Badge>
      ),
    },
    { key: 'source', header: 'Source' },
    { key: 'createdAt', header: 'Created' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-600 mt-1">Manage and track potential clients</p>
        </div>
        <Button>
          <Plus className="w-5 h-5 mr-2" />
          Add Lead
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {mockLeads.filter(l => l.status === 'new').length}
              </p>
              <p className="text-sm text-gray-600">New Leads</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {mockLeads.filter(l => l.status === 'contacted').length}
              </p>
              <p className="text-sm text-gray-600">Contacted</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {mockLeads.filter(l => l.status === 'qualified').length}
              </p>
              <p className="text-sm text-gray-600">Qualified</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {mockLeads.filter(l => l.status === 'converted').length}
              </p>
              <p className="text-sm text-gray-600">Converted</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Leads</CardTitle>
            <div className="w-64">
              <SearchInput
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search leads..."
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table columns={columns} data={filteredLeads} />
        </CardContent>
      </Card>
    </div>
  );
}
