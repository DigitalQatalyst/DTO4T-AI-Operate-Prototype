import { useEffect, useState } from 'react';
import { Layers, Users, Link2, MessageSquare, Bell, Plus, ArrowRight } from 'lucide-react';
import { workspaceDataService } from '@/services/workspaceData';
import type { ServiceRequest, Task, User } from '@/types/workspace';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface FulfillmentCoordinationProps {
  user: User;
}

interface TaskWithDependencies extends Task {
  dependentTasks: string[];
  comments: Array<{ id: string; author: string; text: string; timestamp: string }>;
}

export default function FulfillmentCoordination({ user }: FulfillmentCoordinationProps) {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [tasks, setTasks] = useState<TaskWithDependencies[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskWithDependencies | null>(null);
  const [assignee, setAssignee] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    loadData();
  }, [user.id]);

  const loadData = async () => {
    try {
      setLoading(true);
      const serviceRequests = await workspaceDataService.getServiceRequests(user.id);
      const activeRequests = serviceRequests.filter(
        (req) => req.status === 'In Fulfilment' || req.status === 'Approved'
      );
      setRequests(activeRequests);

      if (activeRequests.length > 0) {
        setSelectedRequest(activeRequests[0]);
        await loadTasksForRequest(activeRequests[0].requestId);
      }
    } catch (error) {
      console.error('Failed to load fulfillment data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTasksForRequest = async (requestId: string) => {
    try {
      const workQueue = await workspaceDataService.getWorkQueue(user.id);
      const requestTasks = workQueue.filter((task) => task.requestId === requestId);

      // Enhance tasks with dependencies and comments
      const enhancedTasks: TaskWithDependencies[] = requestTasks.map((task) => ({
        ...task,
        dependentTasks: task.dependencies || [],
        comments: [
          {
            id: '1',
            author: 'Sarah Chen',
            text: 'Started initial analysis',
            timestamp: '2 hours ago',
          },
        ],
      }));

      setTasks(enhancedTasks);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  const handleRequestChange = async (requestId: string) => {
    const request = requests.find((r) => r.requestId === requestId);
    if (request) {
      setSelectedRequest(request);
      await loadTasksForRequest(request.requestId);
    }
  };

  const handleAssignTask = (task: TaskWithDependencies) => {
    setSelectedTask(task);
    setAssignee(task.assignedTo);
    setAssignDialogOpen(true);
  };

  const handleSaveAssignment = () => {
    if (selectedTask && assignee) {
      setTasks(
        tasks.map((task) =>
          task.id === selectedTask.id ? { ...task, assignedTo: assignee } : task
        )
      );
      setAssignDialogOpen(false);
      setSelectedTask(null);
      setAssignee('');
    }
  };

  const handleAddComment = (task: TaskWithDependencies) => {
    setSelectedTask(task);
    setComment('');
    setCommentDialogOpen(true);
  };

  const handleSaveComment = () => {
    if (selectedTask && comment.trim()) {
      setTasks(
        tasks.map((task) =>
          task.id === selectedTask.id
            ? {
                ...task,
                comments: [
                  ...task.comments,
                  {
                    id: Date.now().toString(),
                    author: user.name,
                    text: comment,
                    timestamp: 'Just now',
                  },
                ],
              }
            : task
        )
      );
      setCommentDialogOpen(false);
      setSelectedTask(null);
      setComment('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Blocked':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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
      default:
        return 'outline';
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading fulfillment coordination...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Layers className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Fulfillment Coordination</h1>
            <p className="text-gray-600">Assign tasks and coordinate with specialist teams</p>
          </div>
        </div>
      </div>

      {/* Request Selector */}
      <div className="mb-6">
        <Label className="text-sm font-medium text-gray-700 mb-2">Active Request</Label>
        <Select
          value={selectedRequest?.requestId}
          onValueChange={handleRequestChange}
        >
          <SelectTrigger className="w-full md:w-[400px]">
            <SelectValue placeholder="Select a request" />
          </SelectTrigger>
          <SelectContent>
            {requests.map((request) => (
              <SelectItem key={request.id} value={request.requestId}>
                {request.requestId} - {request.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedRequest ? (
        <div className="space-y-6">
          {/* Request Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{selectedRequest.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {selectedRequest.serviceType} • Submitted by {selectedRequest.submittedBy}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getPriorityColor(selectedRequest.priority) as any}>
                    {selectedRequest.priority}
                  </Badge>
                  <Badge variant="outline" className={getStatusColor(selectedRequest.status)}>
                    {selectedRequest.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Users className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-600">Total Tasks</p>
                    <p className="text-lg font-semibold text-gray-900">{tasks.length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <ArrowRight className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-600">In Progress</p>
                    <p className="text-lg font-semibold text-blue-900">
                      {tasks.filter((t) => t.status === 'In Progress').length}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <Users className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-xs text-gray-600">Completed</p>
                    <p className="text-lg font-semibold text-green-900">
                      {tasks.filter((t) => t.status === 'Completed').length}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <Bell className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-xs text-gray-600">Blocked</p>
                    <p className="text-lg font-semibold text-red-900">
                      {tasks.filter((t) => t.status === 'Blocked').length}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Task Assignment Interface */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Task Assignments</CardTitle>
                  <CardDescription>Assign and coordinate tasks with specialist teams</CardDescription>
                </div>
                <Button size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Task
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Layers className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p>No tasks created for this request yet</p>
                  </div>
                ) : (
                  tasks.map((task) => (
                    <Card key={task.id} className="border-l-4" style={{
                      borderLeftColor:
                        task.status === 'Completed' ? '#10b981' :
                        task.status === 'In Progress' ? '#3b82f6' :
                        task.status === 'Blocked' ? '#ef4444' :
                        '#9ca3af'
                    }}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-gray-900">{task.title}</h4>
                              <Badge variant="outline" className={getStatusColor(task.status)}>
                                {task.status}
                              </Badge>
                              <Badge variant={getPriorityColor(task.priority) as any} className="text-xs">
                                {task.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>Due: {task.dueDate}</span>
                              <span>Est: {task.estimatedHours}h</span>
                              {task.actualHours && <span>Actual: {task.actualHours}h</span>}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-700">
                              {task.assignedTo || <span className="italic text-gray-400">Unassigned</span>}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {task.dependentTasks.length > 0 && (
                              <Badge variant="outline" className="gap-1 text-xs">
                                <Link2 className="w-3 h-3" />
                                {task.dependentTasks.length} dependencies
                              </Badge>
                            )}
                            {task.comments.length > 0 && (
                              <Badge variant="outline" className="gap-1 text-xs">
                                <MessageSquare className="w-3 h-3" />
                                {task.comments.length}
                              </Badge>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleAssignTask(task)}
                              className="gap-1"
                            >
                              <Users className="w-3 h-3" />
                              {task.assignedTo ? 'Reassign' : 'Assign'}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleAddComment(task)}
                              className="gap-1"
                            >
                              <MessageSquare className="w-3 h-3" />
                              Comment
                            </Button>
                          </div>
                        </div>

                        {/* Comments Section */}
                        {task.comments.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <h5 className="text-xs font-medium text-gray-700 mb-2">Recent Comments</h5>
                            <div className="space-y-2">
                              {task.comments.slice(-2).map((comment) => (
                                <div key={comment.id} className="bg-gray-50 rounded p-2">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-medium text-gray-900">{comment.author}</span>
                                    <span className="text-xs text-gray-500">{comment.timestamp}</span>
                                  </div>
                                  <p className="text-xs text-gray-700">{comment.text}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Dependency Visualization */}
                        {task.dependentTasks.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <h5 className="text-xs font-medium text-gray-700 mb-2 flex items-center gap-1">
                              <Link2 className="w-3 h-3" />
                              Dependencies
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {task.dependentTasks.map((depId) => {
                                const depTask = tasks.find((t) => t.id === depId);
                                return depTask ? (
                                  <Badge key={depId} variant="outline" className="text-xs">
                                    {depTask.title}
                                  </Badge>
                                ) : null;
                              })}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Specialist Team Coordination */}
          <Card>
            <CardHeader>
              <CardTitle>Specialist Team Coordination</CardTitle>
              <CardDescription>Active teams and their workload</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Analytics Team A', 'ML Engineering Team', 'Data Engineering Team'].map((team) => {
                  const teamTasks = tasks.filter((t) => t.assignedTo === team);
                  const completedTasks = teamTasks.filter((t) => t.status === 'Completed').length;
                  
                  return (
                    <Card key={team}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">{team}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Assigned Tasks</span>
                            <span className="font-semibold">{teamTasks.length}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Completed</span>
                            <span className="font-semibold text-green-600">{completedTasks}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">In Progress</span>
                            <span className="font-semibold text-blue-600">
                              {teamTasks.filter((t) => t.status === 'In Progress').length}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{
                                width: `${teamTasks.length > 0 ? (completedTasks / teamTasks.length) * 100 : 0}%`,
                              }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <Layers className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No active requests for fulfillment</p>
          </CardContent>
        </Card>
      )}

      {/* Assignment Dialog */}
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Task</DialogTitle>
            <DialogDescription>Assign this task to a specialist team or individual</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-sm font-medium mb-2">Task</Label>
              <p className="text-sm text-gray-600">{selectedTask?.title}</p>
            </div>
            <div>
              <Label htmlFor="assignee" className="text-sm font-medium mb-2">
                Assign To
              </Label>
              <Select value={assignee} onValueChange={setAssignee}>
                <SelectTrigger id="assignee">
                  <SelectValue placeholder="Select team or individual" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Analytics Team A">Analytics Team A</SelectItem>
                  <SelectItem value="Analytics Team B">Analytics Team B</SelectItem>
                  <SelectItem value="ML Engineering Team">ML Engineering Team</SelectItem>
                  <SelectItem value="Data Engineering Team">Data Engineering Team</SelectItem>
                  <SelectItem value="NLP Specialists">NLP Specialists</SelectItem>
                  <SelectItem value="Computer Vision Team">Computer Vision Team</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveAssignment} disabled={!assignee}>
              Assign Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Comment Dialog */}
      <Dialog open={commentDialogOpen} onOpenChange={setCommentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Comment</DialogTitle>
            <DialogDescription>Add a comment or update for this task</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-sm font-medium mb-2">Task</Label>
              <p className="text-sm text-gray-600">{selectedTask?.title}</p>
            </div>
            <div>
              <Label htmlFor="comment" className="text-sm font-medium mb-2">
                Comment
              </Label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Enter your comment..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCommentDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveComment} disabled={!comment.trim()}>
              Add Comment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
