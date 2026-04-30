import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, MessageSquare, Clock } from 'lucide-react';
import DataTable, { Column } from '@/components/workspace/DataTable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface FlaggedItem {
  id: string;
  itemId: string;
  itemType: 'request' | 'opportunity';
  title: string;
  submittedBy: string;
  flaggedAt: string;
  flagReason: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Under Review' | 'Approved' | 'Rejected' | 'Clarification Requested';
  reviewedBy?: string;
  reviewedAt?: string;
  actionHistory: ActionHistoryEntry[];
}

interface ActionHistoryEntry {
  timestamp: string;
  action: string;
  actor: string;
  note?: string;
}

const severityColors = {
  Critical: 'bg-red-100 text-red-800',
  High: 'bg-orange-100 text-orange-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Low: 'bg-blue-100 text-blue-800',
};

const statusColors = {
  'Pending': 'bg-yellow-100 text-yellow-800',
  'Under Review': 'bg-blue-100 text-blue-800',
  'Approved': 'bg-green-100 text-green-800',
  'Rejected': 'bg-red-100 text-red-800',
  'Clarification Requested': 'bg-purple-100 text-purple-800',
};

export default function OversightActions() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<FlaggedItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<FlaggedItem | null>(null);
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject' | 'clarify' | null>(null);
  const [justification, setJustification] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API call with mock data
        await new Promise((resolve) => setTimeout(resolve, 300));
        
        const mockData: FlaggedItem[] = [
          {
            id: 'flag-001',
            itemId: 'req-049',
            itemType: 'request',
            title: 'Customer Data Analytics Platform',
            submittedBy: 'Sarah Johnson',
            flaggedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            flagReason: 'PII Data Access Control violation - Privacy impact assessment required',
            severity: 'Critical',
            status: 'Pending',
            actionHistory: [
              {
                timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                action: 'Flagged for review',
                actor: 'System',
                note: 'Automatic policy violation detection',
              },
            ],
          },
          {
            id: 'flag-002',
            itemId: 'req-050',
            itemType: 'request',
            title: 'Executive Compensation Analysis',
            submittedBy: 'Michael Chen',
            flaggedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            flagReason: 'High-Cost Request Approval - Requires executive sign-off',
            severity: 'High',
            status: 'Under Review',
            reviewedBy: 'Robert Taylor',
            actionHistory: [
              {
                timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                action: 'Flagged for review',
                actor: 'System',
              },
              {
                timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
                action: 'Review started',
                actor: 'Robert Taylor',
              },
            ],
          },
          {
            id: 'flag-003',
            itemId: 'req-051',
            itemType: 'request',
            title: 'Third-Party API Integration',
            submittedBy: 'Emily Rodriguez',
            flaggedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            flagReason: 'External API Integration Review - Security assessment needed',
            severity: 'High',
            status: 'Clarification Requested',
            reviewedBy: 'Robert Taylor',
            reviewedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            actionHistory: [
              {
                timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                action: 'Flagged for review',
                actor: 'System',
              },
              {
                timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                action: 'Clarification requested',
                actor: 'Robert Taylor',
                note: 'Please provide security assessment documentation and API vendor compliance certifications',
              },
            ],
          },
          {
            id: 'flag-004',
            itemId: 'req-052',
            itemType: 'request',
            title: 'Loan Approval Prediction Model',
            submittedBy: 'David Kim',
            flaggedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            flagReason: 'Model Bias Assessment required - Customer-impacting ML model',
            severity: 'High',
            status: 'Pending',
            actionHistory: [
              {
                timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
                action: 'Flagged for review',
                actor: 'System',
                note: 'Multiple policy violations detected',
              },
            ],
          },
        ];
        
        setItems(mockData);
      } catch (error) {
        console.error('Error fetching oversight actions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns: Column<FlaggedItem>[] = [
    {
      key: 'title',
      label: 'Item',
      sortable: true,
      render: (value, row) => (
        <div>
          <p className="font-medium">{value}</p>
          <p className="text-sm text-gray-500">{row.itemId} • {row.itemType}</p>
        </div>
      ),
    },
    {
      key: 'submittedBy',
      label: 'Submitted By',
      sortable: true,
    },
    {
      key: 'flagReason',
      label: 'Flag Reason',
      render: (value) => <p className="text-sm max-w-md truncate">{value}</p>,
    },
    {
      key: 'severity',
      label: 'Severity',
      sortable: true,
      render: (severity: string) => (
        <Badge className={severityColors[severity as keyof typeof severityColors]} variant="secondary">
          {severity}
        </Badge>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (status: string) => (
        <Badge className={statusColors[status as keyof typeof statusColors]} variant="secondary">
          {status}
        </Badge>
      ),
    },
    {
      key: 'flaggedAt',
      label: 'Flagged',
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedItem(row);
              setActionType('approve');
              setIsActionDialogOpen(true);
            }}
            disabled={row.status !== 'Pending' && row.status !== 'Under Review'}
          >
            <CheckCircle className="w-4 h-4 text-green-600" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedItem(row);
              setActionType('reject');
              setIsActionDialogOpen(true);
            }}
            disabled={row.status !== 'Pending' && row.status !== 'Under Review'}
          >
            <XCircle className="w-4 h-4 text-red-600" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedItem(row);
              setActionType('clarify');
              setIsActionDialogOpen(true);
            }}
            disabled={row.status !== 'Pending' && row.status !== 'Under Review'}
          >
            <MessageSquare className="w-4 h-4 text-blue-600" />
          </Button>
        </div>
      ),
    },
  ];

  const handleSubmitAction = () => {
    if (selectedItem && actionType) {
      console.log(`${actionType} item:`, selectedItem.id, 'with justification:', justification);
      setIsActionDialogOpen(false);
      setJustification('');
      setActionType(null);
    }
  };

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

  const pendingCount = items.filter(i => i.status === 'Pending').length;
  const criticalCount = items.filter(i => i.severity === 'Critical').length;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Oversight Actions</h1>
        <p className="text-gray-600 mt-1">Review and take action on governance-flagged items</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Total Flagged</p>
            <p className="text-2xl font-bold mt-1">{items.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Pending Action</p>
            <p className="text-2xl font-bold mt-1 text-yellow-600">{pendingCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Critical Items</p>
            <p className="text-2xl font-bold mt-1 text-red-600">{criticalCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Under Review</p>
            <p className="text-2xl font-bold mt-1 text-blue-600">
              {items.filter(i => i.status === 'Under Review').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Items Table */}
      <div className="bg-white border rounded-lg p-6">
        <DataTable
          data={items}
          columns={columns}
          searchable
          searchPlaceholder="Search flagged items..."
          emptyMessage="No flagged items"
          onRowClick={(item) => {
            setSelectedItem(item);
            setActionType(null);
            setIsActionDialogOpen(true);
          }}
        />
      </div>

      {/* Action Dialog */}
      <Dialog open={isActionDialogOpen} onOpenChange={setIsActionDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {actionType === 'approve' && 'Approve Item'}
              {actionType === 'reject' && 'Reject Item'}
              {actionType === 'clarify' && 'Request Clarification'}
              {!actionType && 'Item Details'}
            </DialogTitle>
            <DialogDescription>
              {actionType ? 'Provide justification for your decision' : 'Review item details and action history'}
            </DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-6 py-4">
              {/* Item Information */}
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Item Title</Label>
                  <p className="text-lg font-semibold mt-1">{selectedItem.title}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Item ID</Label>
                    <p className="mt-1">{selectedItem.itemId}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Type</Label>
                    <p className="mt-1 capitalize">{selectedItem.itemType}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Submitted By</Label>
                    <p className="mt-1">{selectedItem.submittedBy}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Severity</Label>
                    <Badge className={severityColors[selectedItem.severity]} variant="secondary">
                      {selectedItem.severity}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Flag Reason</Label>
                  <p className="mt-1 text-sm">{selectedItem.flagReason}</p>
                </div>
              </div>

              {/* Action History */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-600">Action History</Label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {selectedItem.actionHistory.map((entry, idx) => (
                    <div key={idx} className="flex gap-3 text-sm">
                      <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{entry.action}</span>
                          <span className="text-gray-500">by {entry.actor}</span>
                        </div>
                        <p className="text-gray-500 text-xs">{new Date(entry.timestamp).toLocaleString()}</p>
                        {entry.note && <p className="text-gray-600 mt-1">{entry.note}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Justification Input (only when action type is selected) */}
              {actionType && (
                <div className="space-y-2">
                  <Label htmlFor="justification">
                    {actionType === 'approve' && 'Approval Justification'}
                    {actionType === 'reject' && 'Rejection Justification'}
                    {actionType === 'clarify' && 'Clarification Request'}
                  </Label>
                  <Textarea
                    id="justification"
                    placeholder={
                      actionType === 'approve'
                        ? 'Explain why this item should be approved...'
                        : actionType === 'reject'
                        ? 'Explain why this item should be rejected...'
                        : 'Describe what clarification is needed...'
                    }
                    value={justification}
                    onChange={(e) => setJustification(e.target.value)}
                    rows={4}
                  />
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            {actionType ? (
              <>
                <Button variant="outline" onClick={() => {
                  setIsActionDialogOpen(false);
                  setActionType(null);
                  setJustification('');
                }}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitAction} disabled={!justification.trim()}>
                  {actionType === 'approve' && <CheckCircle className="w-4 h-4 mr-2" />}
                  {actionType === 'reject' && <XCircle className="w-4 h-4 mr-2" />}
                  {actionType === 'clarify' && <MessageSquare className="w-4 h-4 mr-2" />}
                  Submit
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setIsActionDialogOpen(false)}>
                  Close
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setActionType('clarify')}
                  disabled={selectedItem?.status !== 'Pending' && selectedItem?.status !== 'Under Review'}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Request Clarification
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setActionType('reject')}
                  disabled={selectedItem?.status !== 'Pending' && selectedItem?.status !== 'Under Review'}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button
                  onClick={() => setActionType('approve')}
                  disabled={selectedItem?.status !== 'Pending' && selectedItem?.status !== 'Under Review'}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
