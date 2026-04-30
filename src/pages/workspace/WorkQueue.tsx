import { useState, useEffect } from 'react';
import { Clock, AlertCircle, CheckCircle2, Pause, Play } from 'lucide-react';
import { User, Task } from '../../types/workspace';
import { workspaceDataService } from '../../services/workspaceData';
import DataTable from '../../components/workspace/DataTable';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

interface WorkQueueProps {
  user: User;
}

export default function WorkQueue({ user }: WorkQueueProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [timeLogDialogOpen, setTimeLogDialogOpen] = useState(false);
  const [loggedHours, setLoggedHours] = useState('');
  const [statusUpdateDialogOpen, setStatusUpdateDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<Task['status']>('Not Started');

  useEffect(() => {
    loadTasks();
  }, [user.id]);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await workspaceDataService.getWorkQueue(user.id);
      setTasks(data);
    } catch (error) {
      console.error('Failed to load work queue:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'destructive';
      case 'High':
        return 'default';
      case 'Medium':
        return 'secondary';
      case 'Low':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Blocked':
        return 'bg-red-100 text-red-800';
      case 'Not Started':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusUpdate = () => {
    if (selectedTask) {
      setTasks(tasks.map(t => 
        t.id === selectedTask.id ? { ...t, status: newStatus } : t
      ));
      setStatusUpdateDialogOpen(false);
      setSelectedTask(null);
    }
  };

  const handleTimeLog = () => {
    if (selectedTask && loggedHours) {
      const hours = parseFloat(loggedHours);
      setTasks(tasks.map(t => 
        t.id === selectedTask.id 
          ? { ...t, actualHours: (t.actualHours || 0) + hours } 
          : t
      ));
      setTimeLogDialogOpen(false);
      setSelectedTask(null);
      setLoggedHours('');
    }
  };

  const columns = [
    {
      key: 'title',
      label: 'Task',
      sortable: true,
      render: (task: Task) => (
        <div>
          <div className="font-medium">{task.title}</div>
          <div className="text-sm text-gray-500">Request: {task.requestId}</div>
        </div>
      ),
    },
    {
      key: 'priority',
      label: 'Priority',
      sortable: true,
      render: (task: Task) => (
        <Badge variant={getPriorityColor(task.priority) as any}>
          {task.priority}
        </Badge>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (task: Task) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
          {task.status}
        </span>
      ),
    },
    {
      key: 'dueDate',
      label: 'Due Date',
      sortable: true,
      render: (task: Task) => {
        const dueDate = new Date(task.dueDate);
        const isOverdue = dueDate < new Date() && task.status !== 'Completed';
        return (
          <div className={isOverdue ? 'text-red-600 font-medium' : ''}>
            {dueDate.toLocaleDateString()}
            {isOverdue && <AlertCircle className="inline ml-1 h-4 w-4" />}
          </div>
        );
      },
    },
    {
      key: 'estimatedHours',
      label: 'Hours',
      sortable: true,
      render: (task: Task) => (
        <div className="text-sm">
          <div>{task.actualHours || 0} / {task.estimatedHours}h</div>
          <div className="text-gray-500">
            {Math.round(((task.actualHours || 0) / task.estimatedHours) * 100)}%
          </div>
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (task: Task) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setSelectedTask(task);
              setNewStatus(task.status);
              setStatusUpdateDialogOpen(true);
            }}
          >
            Update Status
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setSelectedTask(task);
              setTimeLogDialogOpen(true);
            }}
          >
            <Clock className="h-4 w-4 mr-1" />
            Log Time
          </Button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Work Queue</h1>
        <p className="text-gray-600 mt-2">
          Manage your assigned tasks and track progress
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-sm text-gray-600">Total Tasks</div>
          <div className="text-2xl font-bold mt-1">{tasks.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-sm text-gray-600">In Progress</div>
          <div className="text-2xl font-bold mt-1 text-blue-600">
            {tasks.filter(t => t.status === 'In Progress').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-sm text-gray-600">Blocked</div>
          <div className="text-2xl font-bold mt-1 text-red-600">
            {tasks.filter(t => t.status === 'Blocked').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-sm text-gray-600">Completed</div>
          <div className="text-2xl font-bold mt-1 text-green-600">
            {tasks.filter(t => t.status === 'Completed').length}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        <DataTable
          data={tasks}
          columns={columns}
          searchable
          searchPlaceholder="Search tasks..."
        />
      </div>

      {/* Status Update Dialog */}
      <Dialog open={statusUpdateDialogOpen} onOpenChange={setStatusUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Task Status</DialogTitle>
            <DialogDescription>
              Change the status of: {selectedTask?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="status">New Status</Label>
              <Select value={newStatus} onValueChange={(value) => setNewStatus(value as Task['status'])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Blocked">Blocked</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStatusUpdateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleStatusUpdate}>Update Status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Time Logging Dialog */}
      <Dialog open={timeLogDialogOpen} onOpenChange={setTimeLogDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log Time</DialogTitle>
            <DialogDescription>
              Log hours worked on: {selectedTask?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="hours">Hours Worked</Label>
              <Input
                id="hours"
                type="number"
                step="0.5"
                min="0"
                placeholder="e.g., 2.5"
                value={loggedHours}
                onChange={(e) => setLoggedHours(e.target.value)}
              />
              {selectedTask && (
                <p className="text-sm text-gray-500">
                  Current: {selectedTask.actualHours || 0}h / {selectedTask.estimatedHours}h
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTimeLogDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleTimeLog}>Log Time</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
