import { useState, useEffect } from 'react';
import { Clock, CheckCircle2, AlertCircle, GitBranch, Play, Pause } from 'lucide-react';
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
import { Textarea } from '../../components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

interface ExecutionTasksProps {
  user: User;
}

export default function ExecutionTasks({ user }: ExecutionTasksProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [timeLogDialogOpen, setTimeLogDialogOpen] = useState(false);
  const [completeDialogOpen, setCompleteDialogOpen] = useState(false);
  const [loggedHours, setLoggedHours] = useState('');
  const [completionNotes, setCompletionNotes] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    loadTasks();
  }, [user.id]);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await workspaceDataService.getWorkQueue(user.id);
      setTasks(data);
    } catch (error) {
      console.error('Failed to load execution tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredTasks = () => {
    if (filterStatus === 'all') return tasks;
    return tasks.filter(t => t.status === filterStatus);
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

  const handleViewDetails = (task: Task) => {
    setSelectedTask(task);
    setDetailDialogOpen(true);
  };

  const handleStartTask = (task: Task) => {
    setTasks(tasks.map(t => 
      t.id === task.id ? { ...t, status: 'In Progress' } : t
    ));
  };

  const handleCompleteTask = () => {
    if (selectedTask) {
      setTasks(tasks.map(t => 
        t.id === selectedTask.id ? { ...t, status: 'Completed' } : t
      ));
      setCompleteDialogOpen(false);
      setDetailDialogOpen(false);
      setCompletionNotes('');
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
      setLoggedHours('');
    }
  };

  const getDependentTasks = (taskId: string): Task[] => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || !task.dependencies.length) return [];
    return tasks.filter(t => task.dependencies.includes(t.id));
  };

  const getBlockedByTasks = (taskId: string): Task[] => {
    return tasks.filter(t => t.dependencies.includes(taskId));
  };

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

  const filteredTasks = getFilteredTasks();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Execution Tasks</h1>
        <p className="text-gray-600 mt-2">
          Detailed task tracking with dependencies and time logging
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-sm text-gray-600">Total Tasks</div>
          <div className="text-2xl font-bold mt-1">{tasks.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-sm text-gray-600">Not Started</div>
          <div className="text-2xl font-bold mt-1 text-gray-600">
            {tasks.filter(t => t.status === 'Not Started').length}
          </div>
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

      {/* Filter */}
      <div className="flex items-center gap-4">
        <Label>Filter by Status:</Label>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tasks</SelectItem>
            <SelectItem value="Not Started">Not Started</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Blocked">Blocked</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={getPriorityColor(task.priority) as any}>
                      {task.priority}
                    </Badge>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                    {task.dependencies.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        <GitBranch className="h-3 w-3 mr-1" />
                        {task.dependencies.length} dependencies
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{task.title}</CardTitle>
                  <CardDescription className="mt-1">
                    Request: {task.requestId}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {task.status === 'Not Started' && (
                    <Button
                      size="sm"
                      onClick={() => handleStartTask(task)}
                    >
                      <Play className="h-4 w-4 mr-1" />
                      Start
                    </Button>
                  )}
                  {task.status === 'In Progress' && (
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
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleViewDetails(task)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-gray-500">Due Date</div>
                  <div className="font-medium">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">Estimated Hours</div>
                  <div className="font-medium">{task.estimatedHours}h</div>
                </div>
                <div>
                  <div className="text-gray-500">Actual Hours</div>
                  <div className="font-medium">{task.actualHours || 0}h</div>
                </div>
                <div>
                  <div className="text-gray-500">Progress</div>
                  <div className="font-medium">
                    {Math.round(((task.actualHours || 0) / task.estimatedHours) * 100)}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Task Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={getPriorityColor(selectedTask?.priority || '') as any}>
                {selectedTask?.priority}
              </Badge>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTask?.status || '')}`}>
                {selectedTask?.status}
              </span>
            </div>
            <DialogTitle>{selectedTask?.title}</DialogTitle>
            <DialogDescription>
              Request ID: {selectedTask?.requestId}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Description */}
            <div>
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-gray-700">{selectedTask?.description}</p>
            </div>

            {/* Time Tracking */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Time Tracking</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-gray-500">Estimated</div>
                  <div className="text-lg font-bold">{selectedTask?.estimatedHours}h</div>
                </div>
                <div>
                  <div className="text-gray-500">Actual</div>
                  <div className="text-lg font-bold">{selectedTask?.actualHours || 0}h</div>
                </div>
                <div>
                  <div className="text-gray-500">Remaining</div>
                  <div className="text-lg font-bold">
                    {Math.max(0, (selectedTask?.estimatedHours || 0) - (selectedTask?.actualHours || 0))}h
                  </div>
                </div>
              </div>
            </div>

            {/* Dependencies */}
            {selectedTask && getDependentTasks(selectedTask.id).length > 0 && (
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <GitBranch className="h-4 w-4" />
                  Dependencies
                </h4>
                <div className="space-y-2">
                  {getDependentTasks(selectedTask.id).map(dep => (
                    <div key={dep.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(dep.status)}`}>
                        {dep.status}
                      </span>
                      <span className="text-sm">{dep.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Blocking Tasks */}
            {selectedTask && getBlockedByTasks(selectedTask.id).length > 0 && (
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Blocking Tasks
                </h4>
                <div className="space-y-2">
                  {getBlockedByTasks(selectedTask.id).map(blocked => (
                    <div key={blocked.id} className="flex items-center gap-2 p-2 bg-yellow-50 rounded">
                      <span className="text-sm">{blocked.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            {selectedTask?.status === 'In Progress' && (
              <Button onClick={() => {
                setCompleteDialogOpen(true);
                setDetailDialogOpen(false);
              }}>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Mark Complete
              </Button>
            )}
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

      {/* Complete Task Dialog */}
      <Dialog open={completeDialogOpen} onOpenChange={setCompleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Task</DialogTitle>
            <DialogDescription>
              Mark task as complete: {selectedTask?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="notes">Completion Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any notes about the completion..."
                value={completionNotes}
                onChange={(e) => setCompletionNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCompleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCompleteTask}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Mark Complete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
