import { useState, useEffect } from 'react';
import { FileText, Users, Clock, DollarSign, ChevronRight } from 'lucide-react';
import { User, ServiceRequest, Task } from '../../types/workspace';
import { workspaceDataService } from '../../services/workspaceData';
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

interface IncomingNeedsProps {
  user: User;
}

interface TaskBreakdown {
  title: string;
  description: string;
  estimatedHours: number;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
}

export default function IncomingNeeds({ user }: IncomingNeedsProps) {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [breakdownDialogOpen, setBreakdownDialogOpen] = useState(false);
  const [taskBreakdowns, setTaskBreakdowns] = useState<TaskBreakdown[]>([]);
  const [newTask, setNewTask] = useState<TaskBreakdown>({
    title: '',
    description: '',
    estimatedHours: 0,
    priority: 'Medium',
  });

  useEffect(() => {
    loadIncomingRequests();
  }, [user.id]);

  const loadIncomingRequests = async () => {
    setLoading(true);
    try {
      const data = await workspaceDataService.getServiceRequests(user.id);
      // Filter for new/unassigned requests
      const incoming = data.filter(r => 
        r.status === 'Approved' && !r.assignedTo
      );
      setRequests(incoming);
    } catch (error) {
      console.error('Failed to load incoming requests:', error);
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

  const handleOpenBreakdown = (request: ServiceRequest) => {
    setSelectedRequest(request);
    setTaskBreakdowns([]);
    setBreakdownDialogOpen(true);
  };

  const handleAddTask = () => {
    if (newTask.title && newTask.estimatedHours > 0) {
      setTaskBreakdowns([...taskBreakdowns, newTask]);
      setNewTask({
        title: '',
        description: '',
        estimatedHours: 0,
        priority: 'Medium',
      });
    }
  };

  const handleRemoveTask = (index: number) => {
    setTaskBreakdowns(taskBreakdowns.filter((_, i) => i !== index));
  };

  const handleSubmitBreakdown = () => {
    // In a real app, this would submit to the backend
    console.log('Submitting task breakdown:', {
      requestId: selectedRequest?.id,
      tasks: taskBreakdowns,
    });
    setBreakdownDialogOpen(false);
    setSelectedRequest(null);
    setTaskBreakdowns([]);
    // Remove from incoming list
    setRequests(requests.filter(r => r.id !== selectedRequest?.id));
  };

  const getTotalEstimatedHours = () => {
    return taskBreakdowns.reduce((sum, task) => sum + task.estimatedHours, 0);
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

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Incoming Needs</h1>
        <p className="text-gray-600 mt-2">
          New requests routed to your team awaiting task breakdown
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-sm text-gray-600">New Requests</div>
          <div className="text-2xl font-bold mt-1">{requests.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-sm text-gray-600">Critical Priority</div>
          <div className="text-2xl font-bold mt-1 text-red-600">
            {requests.filter(r => r.priority === 'Critical').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-sm text-gray-600">High Priority</div>
          <div className="text-2xl font-bold mt-1 text-orange-600">
            {requests.filter(r => r.priority === 'High').length}
          </div>
        </div>
      </div>

      {requests.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No incoming requests
            </h3>
            <p className="text-gray-500">
              All requests have been processed and assigned
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {requests.map((request) => (
            <Card key={request.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={getPriorityColor(request.priority) as any}>
                        {request.priority}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        Request ID: {request.requestId}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{request.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {request.serviceType}
                    </CardDescription>
                  </div>
                  <Button onClick={() => handleOpenBreakdown(request)}>
                    Break Down Tasks
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <div>
                      <div className="text-gray-500">Submitted By</div>
                      <div className="font-medium">{request.submittedBy}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <div>
                      <div className="text-gray-500">Submitted</div>
                      <div className="font-medium">
                        {new Date(request.submittedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <div>
                      <div className="text-gray-500">Target Completion</div>
                      <div className="font-medium">
                        {request.estimatedCompletion 
                          ? new Date(request.estimatedCompletion).toLocaleDateString()
                          : 'TBD'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${
                      request.slaStatus === 'On Track' ? 'bg-green-500' :
                      request.slaStatus === 'At Risk' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`} />
                    <div>
                      <div className="text-gray-500">SLA Status</div>
                      <div className="font-medium">{request.slaStatus}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Task Breakdown Dialog */}
      <Dialog open={breakdownDialogOpen} onOpenChange={setBreakdownDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Break Down Request into Tasks</DialogTitle>
            <DialogDescription>
              {selectedRequest?.title}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Request Context */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <h4 className="font-medium">Request Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Service Type:</span>
                  <span className="ml-2 font-medium">{selectedRequest?.serviceType}</span>
                </div>
                <div>
                  <span className="text-gray-500">Priority:</span>
                  <Badge className="ml-2" variant={getPriorityColor(selectedRequest?.priority || '') as any}>
                    {selectedRequest?.priority}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Existing Tasks */}
            {taskBreakdowns.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Task Breakdown ({taskBreakdowns.length} tasks)</h4>
                <div className="space-y-2">
                  {taskBreakdowns.map((task, index) => (
                    <div key={index} className="flex items-start gap-2 p-3 bg-white border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{task.title}</div>
                        <div className="text-sm text-gray-500">{task.description}</div>
                        <div className="flex gap-4 mt-2 text-sm">
                          <span className="text-gray-600">
                            <Clock className="inline h-3 w-3 mr-1" />
                            {task.estimatedHours}h
                          </span>
                          <Badge variant={getPriorityColor(task.priority) as any} className="text-xs">
                            {task.priority}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveTask(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-sm font-medium">
                    Total Estimated Effort: {getTotalEstimatedHours()} hours
                  </div>
                </div>
              </div>
            )}

            {/* Add New Task Form */}
            <div className="space-y-4 border-t pt-4">
              <h4 className="font-medium">Add Task</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="task-title">Task Title</Label>
                  <Input
                    id="task-title"
                    placeholder="e.g., Set up data pipeline"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="task-description">Description</Label>
                  <Textarea
                    id="task-description"
                    placeholder="Describe the task..."
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="task-hours">Estimated Hours</Label>
                    <Input
                      id="task-hours"
                      type="number"
                      min="0"
                      step="0.5"
                      placeholder="e.g., 8"
                      value={newTask.estimatedHours || ''}
                      onChange={(e) => setNewTask({ ...newTask, estimatedHours: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="task-priority">Priority</Label>
                    <select
                      id="task-priority"
                      className="w-full px-3 py-2 border rounded-md"
                      value={newTask.priority}
                      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                </div>
                <Button onClick={handleAddTask} variant="outline" className="w-full">
                  Add Task to Breakdown
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setBreakdownDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitBreakdown}
              disabled={taskBreakdowns.length === 0}
            >
              Submit Breakdown ({taskBreakdowns.length} tasks)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
