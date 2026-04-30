import { useState, useEffect } from 'react';
import { Shield, Plus, Edit, Power, AlertCircle } from 'lucide-react';
import DataTable, { Column } from '@/components/workspace/DataTable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { workspaceDataService } from '@/services/workspaceData';
import type { PolicyRule } from '@/types/workspace';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

const severityColors = {
  Critical: 'bg-red-100 text-red-800',
  High: 'bg-orange-100 text-orange-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Low: 'bg-blue-100 text-blue-800',
};

export default function GovernanceControls() {
  const [loading, setLoading] = useState(true);
  const [policies, setPolicies] = useState<PolicyRule[]>([]);
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyRule | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await workspaceDataService.getPolicyRules();
        setPolicies(data);
      } catch (error) {
        console.error('Error fetching policy rules:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns: Column<PolicyRule>[] = [
    {
      key: 'name',
      label: 'Policy Name',
      sortable: true,
      render: (value, row) => (
        <div>
          <p className="font-medium">{value}</p>
          <p className="text-sm text-gray-500">{row.category}</p>
        </div>
      ),
    },
    {
      key: 'description',
      label: 'Description',
      render: (value) => <p className="text-sm text-gray-600 max-w-md truncate">{value}</p>,
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
      key: 'enabled',
      label: 'Status',
      sortable: true,
      render: (enabled: boolean) => (
        <Badge className={enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} variant="secondary">
          {enabled ? 'Enabled' : 'Disabled'}
        </Badge>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPolicy(row);
              setIsEditDialogOpen(true);
            }}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleTogglePolicy(row);
            }}
          >
            <Power className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  const handleTogglePolicy = (policy: PolicyRule) => {
    const action = policy.enabled ? 'disable' : 'enable';
    if (confirm(`Are you sure you want to ${action} "${policy.name}"?`)) {
      console.log(`${action} policy:`, policy.id);
      // Update local state
      setPolicies(policies.map(p => p.id === policy.id ? { ...p, enabled: !p.enabled } : p));
    }
  };

  const handleAddPolicy = () => {
    setIsAddDialogOpen(true);
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

  const enabledPolicies = policies.filter(p => p.enabled).length;
  const criticalPolicies = policies.filter(p => p.severity === 'Critical').length;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Governance Controls</h1>
          <p className="text-gray-600 mt-1">Manage policy definitions, approval workflows, and compliance rules</p>
        </div>
        <Button onClick={handleAddPolicy} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Policy
        </Button>
      </div>

      {/* Policy Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Total Policies</p>
            <p className="text-2xl font-bold mt-1">{policies.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Enabled Policies</p>
            <p className="text-2xl font-bold mt-1 text-green-600">{enabledPolicies}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Critical Policies</p>
            <p className="text-2xl font-bold mt-1 text-red-600">{criticalPolicies}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Compliance Rate</p>
            <p className="text-2xl font-bold mt-1 text-blue-600">94.2%</p>
          </CardContent>
        </Card>
      </div>

      {/* Policy Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Policy Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['Financial Governance', 'Data Privacy', 'Security', 'AI Ethics'].map((category) => {
              const count = policies.filter(p => p.category === category).length;
              return (
                <div key={category} className="border rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-600">{category}</p>
                  <p className="text-2xl font-bold mt-1">{count}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {policies.filter(p => p.category === category && p.enabled).length} enabled
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Policy Table */}
      <div className="bg-white border rounded-lg p-6">
        <DataTable
          data={policies}
          columns={columns}
          searchable
          searchPlaceholder="Search policies by name or category..."
          emptyMessage="No policies found"
        />
      </div>

      {/* Edit Policy Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Policy</DialogTitle>
            <DialogDescription>Update policy definition and configuration</DialogDescription>
          </DialogHeader>
          {selectedPolicy && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Policy Name</Label>
                <Input id="edit-name" defaultValue={selectedPolicy.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea id="edit-description" defaultValue={selectedPolicy.description} rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Select defaultValue={selectedPolicy.category}>
                    <SelectTrigger id="edit-category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Financial Governance">Financial Governance</SelectItem>
                      <SelectItem value="Data Privacy">Data Privacy</SelectItem>
                      <SelectItem value="Security">Security</SelectItem>
                      <SelectItem value="AI Ethics">AI Ethics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-severity">Severity</Label>
                  <Select defaultValue={selectedPolicy.severity}>
                    <SelectTrigger id="edit-severity">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Critical">Critical</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="edit-enabled" defaultChecked={selectedPolicy.enabled} />
                <Label htmlFor="edit-enabled">Policy Enabled</Label>
              </div>
              <div className="space-y-2">
                <Label>Actions</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedPolicy.actions.map((action, index) => (
                    <Badge key={index} variant="secondary">
                      {action.replace(/_/g, ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsEditDialogOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Policy Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Policy</DialogTitle>
            <DialogDescription>Create a new governance policy rule</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="add-name">Policy Name</Label>
              <Input id="add-name" placeholder="Enter policy name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-description">Description</Label>
              <Textarea id="add-description" placeholder="Describe the policy rule" rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="add-category">Category</Label>
                <Select>
                  <SelectTrigger id="add-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Financial Governance">Financial Governance</SelectItem>
                    <SelectItem value="Data Privacy">Data Privacy</SelectItem>
                    <SelectItem value="Security">Security</SelectItem>
                    <SelectItem value="AI Ethics">AI Ethics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-severity">Severity</Label>
                <Select>
                  <SelectTrigger id="add-severity">
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="add-enabled" defaultChecked />
              <Label htmlFor="add-enabled">Enable policy immediately</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddDialogOpen(false)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Policy
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
