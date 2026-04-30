import { useState, useEffect } from 'react';
import { UserPlus, Edit, UserX, Shield } from 'lucide-react';
import DataTable, { Column } from '@/components/workspace/DataTable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { workspaceDataService } from '@/services/workspaceData';
import type { UserAccount, UserRole } from '@/types/workspace';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const roleColors: Record<UserRole, string> = {
  employee: 'bg-blue-100 text-blue-800',
  manager: 'bg-purple-100 text-purple-800',
  owner: 'bg-green-100 text-green-800',
  specialist: 'bg-orange-100 text-orange-800',
  admin: 'bg-red-100 text-red-800',
  executive: 'bg-gray-100 text-gray-800',
};

const statusColors = {
  Active: 'bg-green-100 text-green-800',
  Inactive: 'bg-gray-100 text-gray-800',
  Suspended: 'bg-red-100 text-red-800',
};

export default function UserAccess() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await workspaceDataService.getUserAccounts();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching user accounts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns: Column<UserAccount>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (value, row) => (
        <div>
          <p className="font-medium">{value}</p>
          <p className="text-sm text-gray-500">{row.email}</p>
        </div>
      ),
    },
    {
      key: 'roles',
      label: 'Roles',
      render: (roles: UserRole[]) => (
        <div className="flex flex-wrap gap-1">
          {roles.map((role) => (
            <Badge key={role} className={roleColors[role]} variant="secondary">
              {role}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      key: 'department',
      label: 'Department',
      sortable: true,
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
      key: 'lastLogin',
      label: 'Last Login',
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString(),
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
              setSelectedUser(row);
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
              handleDeactivateUser(row);
            }}
          >
            <UserX className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  const handleDeactivateUser = (user: UserAccount) => {
    if (confirm(`Are you sure you want to deactivate ${user.name}?`)) {
      // Implement deactivation logic
      console.log('Deactivating user:', user.id);
    }
  };

  const handleAddUser = () => {
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

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Access Management</h1>
          <p className="text-gray-600 mt-1">Manage user accounts, roles, and permissions</p>
        </div>
        <Button onClick={handleAddUser} className="gap-2">
          <UserPlus className="w-4 h-4" />
          Add User
        </Button>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-gray-600">Total Users</p>
          <p className="text-2xl font-bold mt-1">{users.length}</p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-gray-600">Active Users</p>
          <p className="text-2xl font-bold mt-1 text-green-600">
            {users.filter((u) => u.status === 'Active').length}
          </p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-gray-600">Inactive Users</p>
          <p className="text-2xl font-bold mt-1 text-gray-600">
            {users.filter((u) => u.status === 'Inactive').length}
          </p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-gray-600">Suspended Users</p>
          <p className="text-2xl font-bold mt-1 text-red-600">
            {users.filter((u) => u.status === 'Suspended').length}
          </p>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white border rounded-lg p-6">
        <DataTable
          data={users}
          columns={columns}
          searchable
          searchPlaceholder="Search users by name, email, or department..."
          emptyMessage="No users found"
        />
      </div>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information and role assignments</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input id="edit-name" defaultValue={selectedUser.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input id="edit-email" type="email" defaultValue={selectedUser.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-department">Department</Label>
                <Input id="edit-department" defaultValue={selectedUser.department} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select defaultValue={selectedUser.status}>
                  <SelectTrigger id="edit-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Roles</Label>
                <div className="flex flex-wrap gap-2">
                  {(['employee', 'manager', 'owner', 'specialist', 'admin', 'executive'] as UserRole[]).map(
                    (role) => (
                      <Badge
                        key={role}
                        className={`cursor-pointer ${
                          selectedUser.roles.includes(role) ? roleColors[role] : 'bg-gray-200 text-gray-600'
                        }`}
                        variant="secondary"
                      >
                        {role}
                      </Badge>
                    )
                  )}
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

      {/* Add User Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Create a new user account with role assignments</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="add-name">Name</Label>
              <Input id="add-name" placeholder="Enter full name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-email">Email</Label>
              <Input id="add-email" type="email" placeholder="user@company.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-department">Department</Label>
              <Input id="add-department" placeholder="Enter department" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-role">Primary Role</Label>
              <Select>
                <SelectTrigger id="add-role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="owner">Service Owner</SelectItem>
                  <SelectItem value="specialist">Specialist</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="executive">Executive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddDialogOpen(false)}>
              <UserPlus className="w-4 h-4 mr-2" />
              Create User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
