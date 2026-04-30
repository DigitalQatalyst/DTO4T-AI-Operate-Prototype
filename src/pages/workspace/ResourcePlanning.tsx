import { useState, useEffect } from 'react';
import { Users, TrendingUp, AlertTriangle, BookOpen, Calendar, Target } from 'lucide-react';
import { User } from '../../types/workspace';
import { workspaceDataService } from '../../services/workspaceData';
import MetricCard from '../../components/workspace/MetricCard';

interface ResourcePlanningProps {
  user: User;
}

interface TeamCapacity {
  totalCapacity: number;
  allocatedCapacity: number;
  availableCapacity: number;
  utilizationRate: number;
}

interface SkillGap {
  id: string;
  skill: string;
  currentLevel: 'None' | 'Basic' | 'Intermediate' | 'Advanced';
  requiredLevel: 'Basic' | 'Intermediate' | 'Advanced' | 'Expert';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  affectedProjects: number;
}

interface TrainingNeed {
  id: string;
  title: string;
  category: string;
  targetAudience: string[];
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  estimatedDuration: string;
  provider?: string;
  status: 'Planned' | 'Scheduled' | 'In Progress' | 'Completed';
}

interface ResourceAllocation {
  memberId: string;
  memberName: string;
  currentProjects: number;
  allocatedHours: number;
  availableHours: number;
  utilizationRate: number;
  skills: string[];
}

export default function ResourcePlanning({ user }: ResourcePlanningProps) {
  const [loading, setLoading] = useState(true);
  const [capacity, setCapacity] = useState<TeamCapacity | null>(null);
  const [skillGaps, setSkillGaps] = useState<SkillGap[]>([]);
  const [trainingNeeds, setTrainingNeeds] = useState<TrainingNeed[]>([]);
  const [allocations, setAllocations] = useState<ResourceAllocation[]>([]);

  useEffect(() => {
    loadResourceData();
  }, [user.id]);

  const loadResourceData = async () => {
    setLoading(true);
    try {
      const data = await workspaceDataService.getResourcePlanningData(user.id);
      setCapacity(data.capacity);
      setSkillGaps(data.skillGaps);
      setTrainingNeeds(data.trainingNeeds);
      setAllocations(data.allocations);
    } catch (error) {
      console.error('Failed to load resource planning data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'High': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getUtilizationColor = (rate: number) => {
    if (rate >= 90) return 'text-red-600';
    if (rate >= 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Resource Planning</h1>
          <p className="text-gray-600 mt-1">Loading resource data...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!capacity) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Resource Planning</h1>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <p className="text-gray-600">No resource planning data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Resource Planning</h1>
        <p className="text-gray-600 mt-1">Manage team capacity, skills, and training needs</p>
      </div>

      {/* Capacity Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Capacity"
          value={`${capacity.totalCapacity}h`}
          icon={Users}
          subtitle="Weekly team capacity"
        />
        <MetricCard
          title="Allocated"
          value={`${capacity.allocatedCapacity}h`}
          icon={Calendar}
          subtitle="Currently committed hours"
        />
        <MetricCard
          title="Available"
          value={`${capacity.availableCapacity}h`}
          icon={Target}
          subtitle="Remaining capacity"
        />
        <MetricCard
          title="Utilization Rate"
          value={`${capacity.utilizationRate}%`}
          icon={TrendingUp}
          trend={capacity.utilizationRate >= 90 ? 'up' : capacity.utilizationRate >= 75 ? 'stable' : 'down'}
          trendValue={capacity.utilizationRate >= 90 ? 'High' : capacity.utilizationRate >= 75 ? 'Optimal' : 'Low'}
          variant={capacity.utilizationRate >= 90 ? 'warning' : 'default'}
        />
      </div>

      {/* Skill Gaps */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Skill Gap Analysis</h2>
          <span className="text-sm text-gray-600">{skillGaps.length} gaps identified</span>
        </div>
        <div className="space-y-3">
          {skillGaps.map((gap) => (
            <div key={gap.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  <div>
                    <h3 className="font-medium text-gray-900">{gap.skill}</h3>
                    <p className="text-sm text-gray-600">
                      Current: {gap.currentLevel} → Required: {gap.requiredLevel}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Affects {gap.affectedProjects} projects</p>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getPriorityColor(gap.priority)}`}>
                  {gap.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Training Needs */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Training Needs</h2>
          <span className="text-sm text-gray-600">{trainingNeeds.length} training programs</span>
        </div>
        <div className="space-y-3">
          {trainingNeeds.map((training) => (
            <div key={training.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  <div>
                    <h3 className="font-medium text-gray-900">{training.title}</h3>
                    <p className="text-sm text-gray-600">
                      {training.category} • {training.estimatedDuration} • {training.targetAudience.length} participants
                    </p>
                    {training.provider && (
                      <p className="text-xs text-gray-500 mt-1">Provider: {training.provider}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getPriorityColor(training.priority)}`}>
                  {training.priority}
                </span>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  training.status === 'Completed' ? 'bg-green-100 text-green-700' :
                  training.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                  training.status === 'Scheduled' ? 'bg-purple-100 text-purple-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {training.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resource Allocation */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Resource Allocation</h2>
          <span className="text-sm text-gray-600">{allocations.length} team members</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Team Member</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Projects</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Allocated</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Available</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Utilization</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Skills</th>
              </tr>
            </thead>
            <tbody>
              {allocations.map((allocation) => (
                <tr key={allocation.memberId} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <p className="font-medium text-gray-900">{allocation.memberName}</p>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{allocation.currentProjects}</td>
                  <td className="py-3 px-4 text-gray-600">{allocation.allocatedHours}h</td>
                  <td className="py-3 px-4 text-gray-600">{allocation.availableHours}h</td>
                  <td className="py-3 px-4">
                    <span className={`font-medium ${getUtilizationColor(allocation.utilizationRate)}`}>
                      {allocation.utilizationRate}%
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {allocation.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">
                          {skill}
                        </span>
                      ))}
                      {allocation.skills.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                          +{allocation.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
