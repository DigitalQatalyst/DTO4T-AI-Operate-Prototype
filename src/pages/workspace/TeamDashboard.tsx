import { useState, useEffect } from 'react';
import { Users, TrendingUp, AlertCircle, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { User, TeamMetrics, TeamMember } from '../../types/workspace';
import { workspaceDataService } from '../../services/workspaceData';
import MetricCard from '../../components/workspace/MetricCard';

interface TeamDashboardProps {
  user: User;
}

export default function TeamDashboard({ user }: TeamDashboardProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<TeamMetrics | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [metricsData, membersData] = await Promise.all([
          workspaceDataService.getTeamMetrics(user.id),
          workspaceDataService.getTeamMembers(user.id)
        ]);
        setMetrics(metricsData);
        setTeamMembers(membersData);
      } catch (error) {
        console.error('Error fetching team dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.id]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getWorkloadColor = (workload: string) => {
    switch (workload) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Team Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your team's AI activities and performance</p>
      </div>

      {/* Metrics Grid */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Active Opportunities"
            value={metrics.totalOpportunities}
            icon={TrendingUp}
            trend="up"
            trendValue="12%"
            color="blue"
          />
          <MetricCard
            title="Active Requests"
            value={metrics.totalRequests}
            icon={CheckCircle}
            trend="up"
            trendValue="8%"
            color="green"
          />
          <MetricCard
            title="Completion Rate"
            value={`${metrics.completionRate}%`}
            icon={CheckCircle}
            trend={metrics.completionRate >= 80 ? 'up' : 'down'}
            trendValue={`${metrics.completionRate >= 80 ? '+' : '-'}5%`}
            color="purple"
          />
          <MetricCard
            title="Value Delivered"
            value={`$${(metrics.valueDelivered / 1000).toFixed(0)}K`}
            icon={TrendingUp}
            trend="up"
            trendValue="15%"
            color="green"
          />
        </div>
      )}

      {/* Active Initiatives Summary */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Active Initiatives</h2>
          <button
            onClick={() => navigate('/workspace/team-progress')}
            className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-medium"
          >
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">In Progress</p>
                <p className="text-sm text-gray-600">8 initiatives</p>
              </div>
            </div>
            <span className="text-2xl font-bold text-blue-600">8</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="font-medium text-gray-900">Blocked</p>
                <p className="text-sm text-gray-600">2 initiatives need attention</p>
              </div>
            </div>
            <span className="text-2xl font-bold text-yellow-600">2</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Completed This Month</p>
                <p className="text-sm text-gray-600">5 initiatives delivered</p>
              </div>
            </div>
            <span className="text-2xl font-bold text-green-600">5</span>
          </div>
        </div>
      </div>

      {/* Team Capacity Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Team Capacity</h2>
          <button
            onClick={() => navigate('/workspace/resource-planning')}
            className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-medium"
          >
            Plan Resources <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {teamMembers.map(member => (
            <div key={member.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-600">
                    {member.activeOpportunities} opportunities, {member.activeRequests} requests
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getWorkloadColor(member.workload)}`}>
                {member.workload}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => navigate('/workspace/approvals')}
            className="p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-left"
          >
            <CheckCircle className="w-6 h-6 text-blue-600 mb-2" />
            <p className="font-medium text-gray-900">Review Approvals</p>
            <p className="text-sm text-gray-600 mt-1">3 pending</p>
          </button>
          <button
            onClick={() => navigate('/workspace/team-opportunities')}
            className="p-4 border-2 border-green-200 rounded-lg hover:bg-green-50 transition-colors text-left"
          >
            <TrendingUp className="w-6 h-6 text-green-600 mb-2" />
            <p className="font-medium text-gray-900">Assess Opportunities</p>
            <p className="text-sm text-gray-600 mt-1">5 new</p>
          </button>
          <button
            onClick={() => navigate('/workspace/escalations')}
            className="p-4 border-2 border-red-200 rounded-lg hover:bg-red-50 transition-colors text-left"
          >
            <AlertCircle className="w-6 h-6 text-red-600 mb-2" />
            <p className="font-medium text-gray-900">Handle Escalations</p>
            <p className="text-sm text-gray-600 mt-1">2 urgent</p>
          </button>
          <button
            onClick={() => navigate('/workspace/team-performance')}
            className="p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition-colors text-left"
          >
            <TrendingUp className="w-6 h-6 text-purple-600 mb-2" />
            <p className="font-medium text-gray-900">View Performance</p>
            <p className="text-sm text-gray-600 mt-1">This month</p>
          </button>
        </div>
      </div>
    </div>
  );
}
