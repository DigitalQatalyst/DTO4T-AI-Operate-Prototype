import { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Eye } from 'lucide-react';
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

interface PolicyViolation {
  policyId: string;
  policyName: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  description: string;
}

interface RequestUnderReview {
  id: string;
  requestId: string;
  title: string;
  submittedBy: string;
  submittedAt: string;
  serviceType: string;
  violations: PolicyViolation[];
  status: 'Pending Review' | 'Under Investigation' | 'Approved' | 'Rejected';
}

const severityColors = {
  Critical: 'bg-red-100 text-red-800',
  High: 'bg-orange-100 text-orange-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Low: 'bg-blue-100 text-blue-800',
};

const statusColors = {
  'Pending Review': 'bg-yellow-100 text-yellow-800',
  'Under Investigation': 'bg-blue-100 text-blue-800',
  'Approved': 'bg-green-100 text-green-800',
  'Rejected': 'bg-red-100 text-red-800',
};

export default function PolicyChecks() {
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<RequestUnderReview[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<RequestUnderReview | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API call with mock data
        await new Promise((resolve) => setTimeout(resolve, 300));
        
        const mockData: RequestUnderReview[] = [
          {
            id: 'rev-001',
            requestId: 'req-049',
            title: 'Customer Data Analytics Platform',
            submittedBy: 'Sarah Johnson',
            submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            serviceType: 'Data Analytics',
            status: 'Pending Review',
            violations: [
              {
                policyId: 'policy-002',
                policyName: 'PII Data Access Control',
                severity: 'Critical',
                description: 'Project accesses PII but privacy impact assessment not completed',
              },
            ],
          },
          {
            id: 'rev-002',
            requestId: 'req-050',
            title: 'Executive Compensation Analysis',
            submittedBy: 'Michael Chen',
            submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            serviceType: 'Machine Learning',
            status: 'Pending Review',
            violations: [
              {
                policyId: 'policy-001',
                policyName: 'High-Cost Request Approval',
                severity: 'High',
                description: 'Estimated cost of $75,000 requires executive approval',
              },
            ],
          },
          {
            id: 'rev-003',
            requestId: 'req-051',
            title: 'Third-Party API Integration',
            submittedBy: 'Emily Rodriguez',
            submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            serviceType: 'Integration',
            status: 'Under Investigation',
            violations: [
              {
                policyId: 'policy-003',
                policyName: 'External API Integration Review',
                severity: 'High',
                description: 'External API integration requires security review',
              },
            ],
          },
          {
            id: 'rev-004',
            requestId: 'req-052',
            title: 'Loan Approval Prediction Model',
            submittedBy: 'David Kim',
            submittedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            serviceType: 'Machine Learning',
            status: 'Pending Review',
            violations: [
              {
                policyId: 'policy-004',
                policyName: 'Model Bias Assessment',
                severity: 'High',
                description: 'ML model affecting customer decisions requires bias assessment',
              },
              {
                policyId: 'policy-002',
                policyName: 'PII Data Access Control',
                severity: 'Critical',
                description: 'Model uses customer PII for training',
              },
            ],
          },
        ];
        
        setRequests(mockData);
      } catch (error) {
        console.error('Error fetching policy checks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns: Column<RequestUnderReview>[] = [
    {
      key: 'title',
      label: 'Request',
      sortable: true,
      render: (value, row) => (
        <div>
          <p className="font-medium">{value}</p>
          <p className="text-sm text-gray-500">{row.requestId}</p>
        </div>
      ),
    },
    {
      key: 'submittedBy',
      label: 'Submitted By',
      sortable: true,
    },
    {
      key: 'serviceType',
      label: 'Service Type',
      sortable: true,
    },
    {
      key: 'violations',
      label: 'Violations',
      render: (violations: PolicyViolation[]) => (
        <div className="flex flex-col gap-1">
          {violations.map((v, idx) => (
            <Badge key={idx} className={severityColors[v.severity]} variant="secondary">
              {v.severity}: {v.policyName}
            </Badge>
          ))}
        </div>
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
      key: 'submittedAt',
      label: 'Submitted',
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedRequest(row);
            setIsDetailDialogOpen(true);
          }}
        >
          <Eye className="w-4 h-4" />
        </Button>
      ),
    },
  ];

  const handleApprove = () => {
    if (selectedRequest) {
      console.log('Approving request:', selectedRequest.id);
      setIsDetailDialogOpen(false);
    }
  };

  const handleReject = () => {
    if (selectedRequest) {
      console.log('Rejecting request:', selectedRequest.id);
      setIsDetailDialogOpen(false);
    }
  };

  const handleRequestClarification = () => {
    if (selectedRequest) {
      console.log('Requesting clarification for:', selectedRequest.id);
      setIsDetailDialogOpen(false);
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

  const pendingCount = requests.filter(r => r.status === 'Pending Review').length;
  const criticalCount = requests.filter(r => r.violations.some(v => v.severity === 'Critical')).length;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Policy Checks</h1>
        <p className="text-gray-600 mt-1">Review requests pending governance approval and policy violations</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Total Under Review</p>
            <p className="text-2xl font-bold mt-1">{requests.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Pending Review</p>
            <p className="text-2xl font-bold mt-1 text-yellow-600">{pendingCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Critical Violations</p>
            <p className="text-2xl font-bold mt-1 text-red-600">{criticalCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Under Investigation</p>
            <p className="text-2xl font-bold mt-1 text-blue-600">
              {requests.filter(r => r.status === 'Under Investigation').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Requests Table */}
      <div className="bg-white border rounded-lg p-6">
        <DataTable
          data={requests}
          columns={columns}
          searchable
          searchPlaceholder="Search requests by title or submitter..."
          emptyMessage="No requests pending review"
        />
      </div>

      {/* Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Policy Check Details</DialogTitle>
            <DialogDescription>Review request details and policy violations</DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-6 py-4">
              {/* Request Information */}
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Request Title</Label>
                  <p className="text-lg font-semibold mt-1">{selectedRequest.title}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Request ID</Label>
                    <p className="mt-1">{selectedRequest.requestId}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Service Type</Label>
                    <p className="mt-1">{selectedRequest.serviceType}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Submitted By</Label>
                    <p className="mt-1">{selectedRequest.submittedBy}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Submitted Date</Label>
                    <p className="mt-1">{new Date(selectedRequest.submittedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Policy Violations */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-600">Policy Violations</Label>
                <div className="space-y-3">
                  {selectedRequest.violations.map((violation, idx) => (
                    <div key={idx} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-medium">{violation.policyName}</p>
                        <Badge className={severityColors[violation.severity]} variant="secondary">
                          {violation.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{violation.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review Notes */}
              <div className="space-y-2">
                <Label htmlFor="review-notes">Review Notes</Label>
                <Textarea
                  id="review-notes"
                  placeholder="Add notes about your review decision..."
                  rows={4}
                />
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="outline" onClick={handleRequestClarification}>
              <AlertTriangle className="w-4 h-4 mr-2" />
              Request Clarification
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              <XCircle className="w-4 h-4 mr-2" />
              Reject
            </Button>
            <Button onClick={handleApprove}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
