'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { SearchInput } from '@/components/ui/SearchInput';
import { Button } from '@/components/ui/Button';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Dropdown, DropdownItem, DropdownDivider } from '@/components/ui/Dropdown';

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  type: 'Apartment' | 'Villa' | 'Penthouse' | 'Office' | 'Retail';
  status: 'available' | 'sold' | 'reserved' | 'off-market';
  bedrooms?: number;
  area: number;
}

const mockProperties: Property[] = [
  { id: '1', title: 'Luxury Apartment', location: 'Dubai Marina', price: 2500000, type: 'Apartment', status: 'available', bedrooms: 2, area: 1200 },
  { id: '2', title: 'Beachfront Villa', location: 'Palm Jumeirah', price: 15000000, type: 'Villa', status: 'available', bedrooms: 5, area: 5500 },
  { id: '3', title: 'Downtown Penthouse', location: 'Downtown Dubai', price: 8500000, type: 'Penthouse', status: 'reserved', bedrooms: 3, area: 3200 },
  { id: '4', title: 'Business Bay Office', location: 'Business Bay', price: 3200000, type: 'Office', status: 'available', area: 1800 },
  { id: '5', title: 'JBR Retail Space', location: 'JBR', price: 4500000, type: 'Retail', status: 'sold', area: 2200 },
];

const statusColors: Record<string, 'success' | 'info' | 'warning' | 'secondary'> = {
  available: 'success',
  sold: 'secondary',
  reserved: 'warning',
  'off-market': 'secondary',
};

export default function AdminProperties() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const filteredProperties = mockProperties.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { key: 'title', header: 'Property', render: (row: Property) => (
      <div>
        <p className="font-medium">{row.title}</p>
        <p className="text-sm text-gray-500">{row.location}</p>
      </div>
    )},
    { key: 'type', header: 'Type' },
    { 
      key: 'price', 
      header: 'Price',
      render: (row: Property) => `AED ${row.price.toLocaleString()}`
    },
    { key: 'bedrooms', header: 'Bedrooms', render: (row: Property) => row.bedrooms || '-' },
    { 
      key: 'area', 
      header: 'Area (sqft)',
      render: (row: Property) => row.area.toLocaleString()
    },
    {
      key: 'status',
      header: 'Status',
      render: (row: Property) => (
        <Badge variant={statusColors[row.status] || 'gray'}>
          {row.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
          <p className="text-gray-600 mt-1">Manage your property listings</p>
        </div>
        <Button>
          <Plus className="w-5 h-5 mr-2" />
          Add Property
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Properties</CardTitle>
            <div className="w-64">
              <SearchInput
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search properties..."
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table
            columns={columns}
            data={filteredProperties}
            onRowClick={(row) => {
              setSelectedProperty(row);
              setIsViewModalOpen(true);
            }}
          />
        </CardContent>
      </Card>

      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={selectedProperty?.title}
        size="lg"
      >
        {selectedProperty && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{selectedProperty.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="font-medium">AED {selectedProperty.price.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-medium">{selectedProperty.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <Badge variant={statusColors[selectedProperty.status] || 'gray'}>
                  {selectedProperty.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-500">Bedrooms</p>
                <p className="font-medium">{selectedProperty.bedrooms || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Area</p>
                <p className="font-medium">{selectedProperty.area.toLocaleString()} sqft</p>
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t">
              <Button variant="secondary">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
