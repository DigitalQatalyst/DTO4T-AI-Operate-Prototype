import { useState, useEffect } from 'react';
import { Download, Filter, Calendar } from 'lucide-react';
import DataTable, { Column } from '@/components/workspace/DataTable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { workspaceDataService } from '@/services/workspaceData';
import type { AuditLogEntry } from '@/types/workspace';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const actionColors: Record<string, string> = {
  APPROVED_REQUEST: 'bg-green-100 text-green-800',
  REJECTED_REQUEST: 'bg-red-100 text-red-800',
  SUBMITTED_REQUEST: 'bg-blue-100 text-blue-800',
  UPDATED_POLICY: 'bg-yellow-100 text-yellow-800',
  CREATED_USER: 'bg-purple-100 text-purple-800',
  ASSIGNED_TASK: 'bg-orange-100 text-orange-800',
  DELETED_USER: 'bg-red-100 text-red-800',
  MODIFIED_SETTINGS: 'bg-gray-100 text-gray-800',
};

export default function AuditLogs() {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<AuditLogEntry[]>([]);
  const [selectedLog, setSelectedLog] = useState<AuditLogEntry | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  
  // Filter states
  const [filterUser, setFilterUser] = useState('');
  const [filterAction, setFilterAction] = useState('');
  const [filterResource, setFilterResource] = useState('');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await workspaceDataService.getAuditLogs();
        setLogs(data);
        setFilteredLogs(data);
      } catch (error) {
        console.error('Error fetching audit logs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const applyFilters = () => {
    let filtered = [...logs];

    if (filterUser) {
      filtered = filtered.filter(log => 
        log.userName.toLowerCase().includes(filterUser.toLowerCase()) ||
        log.userId.toLowerCase().includes(filterUser.toLowerCase())
      );
    }

    if (filterAction) {
      filtered = filtered.filter(log => log.action === filterAction);
    }

    if (filterResource) {
      filtered = filtered.filter(log => log.resource.toLowerCase().includes(filterResource.toLowerCase()));
    }

    if (filterDateFrom) {
      const fromDate = new Date(filterDateFrom);
      filtered = filtered.filter(log => new Date(log.timestamp) >= fromDate);
    }

    if (filterDateTo) {
      const toDate = new Date(filterDateTo);
      toDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter(log => new Date(log.timestamp) <= toDate);
    }

    setFilteredLogs(filtered);
    setIsFilterDialogOpen(false);
  };

  const clearFilters = () => {
    setFilterUser('');
    setFilterAction('');
    setFilterResource('');
    setFilterDateFrom('');
    setFilterDateTo('');
    setFilteredLogs(logs);
    setIsFilterDialogOpen(false);
  };

  const exportToCSV = () => {
    const headers = ['Timestamp', 'User', 'Action', 'Resource', 'Resource ID', 'IP Address'];
    const rows = filteredLogs.map(log => [
      new Date(log.timestamp).toLocaleString(),
      log.userName,
      log.action,
      log.resource,
      log.resourceId,
      log.ipAddress,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const columns: Column<AuditLogEntry>[] = [
    {
      key: 'timestamp',
      label: 'Timestamp',
      sortable: true,
      render: (value) => (
        <div>
          <p className="font-medium">{new Date(value).toLocaleDateString()}</p>
          <p className="text-sm text-gray-500">{new Date(value).toLocaleTimeString()}</p>
        </div>
      ),
    },
    {
      key: 'userName',
      label: 'User',
      sortable: true,
      render: (value, row) => (
        <div>
          <p className="font-medium">{value}</p>
          <p className="text-sm text-gray-500">{row.userId}</p>
        </div>
      ),
    },
    {
      key: 'action',
      label: 'Action',
      sortable: true,
      render: (action: string) => (
        <Badge 
          className={actionColors[action] || 'bg-gray-100 text-gray-800'} 
          variant="secondary"
        >
          {action.replace(/_/g, ' ')}
        </Badge>
      ),
    },
    {
      key: 'resource',
      label: 'Resource',
      sortable: true,
      render: (value, row) => (
        <div>
          <p className="font-medium">{value}</p>
          <p className="text-sm text-gray-500">{row.resourceId}</p>
        </div>
      ),
    },
    {
      key: 'ipAddress',
      label: 'IP Address',
      render: (value) => <span className="text-sm font-mono">{value}</span>,
    },
  ];

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const uniqueActions = Array.from(new Set(logs.map(log => log.action)));
  const hasActiveFilters = filterUser || filterAction || filterResource || filterDateFrom || filterDateTo;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
          <p className="text-gray-600 mt-1">Searchable history of all system actions and changes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsFilterDialogOpen(true)} className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-1 bg-blue-100 text-blue-800">
                Active
              </Badge>
            )}
          </Button>
          <Button onClick={exportToCSV} className="gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Total Entries</p>
            <p className="text-2xl font-bold mt-1">{logs.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Filtered Results</p>
            <p className="text-2xl font-bold mt-1">{filteredLogs.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Unique Users</p>
            <p className="text-2xl font-bold mt-1">{new Set(logs.map(l => l.userId)).size}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Action Types</p>
            <p className="text-2xl font-bold mt-1">{uniqueActions.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white border rounded-lg p-6">
        <DataTable
          data={filteredLogs}
          columns={columns}
          searchable
          searchPlaceholder="Search logs by user, action, or resource..."
          emptyMessage="No audit logs found"
          onRowClick={(log) => {
            setSelectedLog(log);
            setIsDetailDialogOpen(true);
          }}
        />
      </div>

      {/* Filter Dialog */}
      <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Filter Audit Logs</DialogTitle>
            <DialogDescription>Apply filters to narrow down audit log entries</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="filter-user">User</Label>
              <Input
                id="filter-user"
                placeholder="Search by user name or ID"
                value={filterUser}
                onChange={(e) => setFilterUser(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="filter-action">Action</Label>
              <Select value={filterAction} onValueChange={setFilterAction}>
                <SelectTrigger id="filter-action">
                  <SelectValue placeholder="Select action type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Actions</SelectItem>
                  {uniqueActions.map(action => (
                    <SelectItem key={action} value={action}>
                      {action.replace(/_/g, ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="filter-resource">Resource</Label>
              <Input
                id="filter-resource"
                placeholder="Search by resource type"
                value={filterResource}
                onChange={(e) => setFilterResource(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="filter-date-from">Date From</Label>
                <Input
                  id="filter-date-from"
                  type="date"
                  value={filterDateFrom}
                  onChange={(e) => setFilterDateFrom(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="filter-date-to">Date To</Label>
                <Input
                  id="filter-date-to"
                  type="date"
                  value={filterDateTo}
                  onChange={(e) => setFilterDateTo(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsFilterDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={applyFilters}>Apply Filters</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Audit Log Details</DialogTitle>
            <DialogDescription>Complete information about this audit entry</DialogDescription>
          </DialogHeader>
          {selectedLog && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Timestamp</Label>
                  <p className="mt-1">{new Date(selectedLog.timestamp).toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">User</Label>
                  <p className="mt-1">{selectedLog.userName}</p>
                  <p className="text-sm text-gray-500">{selectedLog.userId}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Action</Label>
                  <Badge 
                    className={`mt-1 ${actionColors[selectedLog.action] || 'bg-gray-100 text-gray-800'}`}
                    variant="secondary"
                  >
                    {selectedLog.action.replace(/_/g, ' ')}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">IP Address</Label>
                  <p className="mt-1 font-mono text-sm">{selectedLog.ipAddress}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Resource Type</Label>
                  <p className="mt-1">{selectedLog.resource}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Resource ID</Label>
                  <p className="mt-1 font-mono text-sm">{selectedLog.resourceId}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Details</Label>
                <div className="mt-2 bg-gray-50 rounded-lg p-4">
                  <pre className="text-sm overflow-x-auto">
                    {JSON.stringify(selectedLog.details, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end">
            <Button onClick={() => setIsDetailDialogOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
