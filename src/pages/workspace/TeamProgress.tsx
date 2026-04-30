import { useState, useEffect } from 'react';
import { TrendingUp, AlertCircle, CheckCircle, Clock, Users, ChevronRight } from 'lucide-react';
import { User, AIRequest, TeamMember } from '../../types/workspace';
import { workspaceDataService } from '../../services/workspaceData';
import WorkflowTimeline from '../../components/workspace/WorkflowTimeline';

interface TeamProgressProps {
  user: User;
}

interface Initiative {
  id: string;
  title: string;
  type: 'opportunity' | 'request';
  assignedTo: string;
  progress: number;
  milestones: Milestone[];
  hasBlockers: boolean;
  blockerDescription?: string;
  startDate: string;
  targetDate: string;
  status: 'On Track' | 'At Risk' | 'Blocked' | 'Completed';
}

interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
}

export default function TeamProgress({ user }: TeamProgressProps) {
  const [loading, setLoading] = useState(true);
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selectedInitiative, setSelectedInitiative] = useState<Initiative | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [initiativesData, membersData] = await Promise.all([
          workspaceDataService.getTeamInitiatives(user.id),
          workspaceDataService.getTeamMembers(user.id)
        ]);
        setInitiatives(initiativesData);
        setTeamMembers(membersData);
      } catch (error) {
        console.error('Error fetching team progress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.id]);

  const handleViewDetails = (initiative: Initiative) => {
    setSelectedInitiative(initiative);
    setShowDetailModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Track': return 'bg-green-100 text-green-800 border-green-200';
      case 'At Risk': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Blocked': return 'bg-red-100 text-red-800 border-red-200';
      case 'Completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'On Track': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'At Risk': return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'Blocked': return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'Completed': return <CheckCircle className="w-5 h-5 text-blue-600" />;
      default: return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getWorkloadColor = (workload: string) => {
    switch (workload) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const activeInitiatives = initiatives.filter(i => i.status !== 'Completed');
  const blockedInitiatives = initiatives.filter(i => i.status === 'Blocked');
  const atRiskInitiatives = initiatives.filter(i => i.status === 'At Risk');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Team Progress</h1>
        <p className="text-gray-600 mt-1">Track active initiatives and team member workload</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Initiatives</p>
              <p className="text-2xl font-bold text-gray-900">{activeInitiatives.length}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Blocked</p>
              <p className="text-2xl font-bold text-red-600">{blockedInitiatives.length}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">At Risk</p>
              <p className="text-2xl font-bold text-yellow-600">{atRiskInitiatives.length}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Progress</p>
              <p className="text-2xl font-bold text-green-600">
                {Math.round(initiatives.reduce((sum, i) => sum + i.progress, 0) / initiatives.length)}%
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Active Initiatives */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Initiatives</h2>
        <div className="space-y-4">
          {activeInitiatives.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No active initiatives at this time</p>
            </div>
          ) : (
            activeInitiatives.map(initiative => (
              <div
                key={initiative.id}
                className={`border-l-4 ${getStatusColor(initiative.status)} rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer`}
                onClick={() => handleViewDetails(initiative)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(initiative.status)}
                      <h3 className="font-semibold text-gray-900">{initiative.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(initiative.status)}`}>
                        {initiative.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-600">Assigned To</p>
                        <p className="font-medium text-gray-900">{initiative.assignedTo}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Progress</p>
                        <p className="font-medium text-gray-900">{initiative.progress}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Start Date</p>
                        <p className="font-medium text-gray-900">
                          {new Date(initiative.startDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Target Date</p>
                        <p className="font-medium text-gray-900">
                          {new Date(initiative.targetDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            initiative.status === 'Blocked' ? 'bg-red-500' :
                            initiative.status === 'At Risk' ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${initiative.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Milestones */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {initiative.milestones.map(milestone => (
                        <span
                          key={milestone.id}
                          className={`text-xs px-2 py-1 rounded ${
                            milestone.completed
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {milestone.completed ? '✓' : '○'} {milestone.title}
                        </span>
                      ))}
                    </div>

                    {/* Blocker Alert */}
                    {initiative.hasBlockers && (
                      <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-red-800">Blocker</p>
                            <p className="text-sm text-red-700">{initiative.blockerDescription}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 ml-4" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Team Member Workload Distribution */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Team Workload Distribution</h2>
        <div className="space-y-4">
          {teamMembers.map(member => {
            const memberInitiatives = initiatives.filter(i => i.assignedTo === member.name && i.status !== 'Completed');
            return (
              <div key={member.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-600">
                        {memberInitiatives.length} active initiatives
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${getWorkloadColor(member.workload)}`}></span>
                    <span className="text-sm font-medium text-gray-700">{member.workload} Workload</span>
                  </div>
                </div>
                
                {memberInitiatives.length > 0 && (
                  <div className="space-y-2">
                    {memberInitiatives.map(initiative => (
                      <div key={initiative.id} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">{initiative.title}</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(initiative.status)}`}>
                          {initiative.progress}%
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedInitiative && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedInitiative.title}</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedInitiative.status)}`}>
                    {selectedInitiative.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Progress</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedInitiative.progress}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Assigned To</p>
                  <p className="font-medium text-gray-900">{selectedInitiative.assignedTo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="font-medium text-gray-900 capitalize">{selectedInitiative.type}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Milestones</h3>
                <div className="space-y-2">
                  {selectedInitiative.milestones.map(milestone => (
                    <div key={milestone.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {milestone.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Clock className="w-5 h-5 text-gray-400" />
                        )}
                        <span className={milestone.completed ? 'text-gray-900' : 'text-gray-600'}>
                          {milestone.title}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {new Date(milestone.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedInitiative.hasBlockers && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-800 mb-1">Active Blocker</p>
                      <p className="text-sm text-red-700">{selectedInitiative.blockerDescription}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 justify-end mt-6">
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedInitiative(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
