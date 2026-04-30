import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Inbox, GitBranch, Layers, TrendingUp, Package, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { User } from '../../types/workspace';
import { workspaceDataService } from '../../services/workspaceData';
import MetricCard from '../../components/workspace/MetricCard';

interface ServiceDashboardProps {
  user: User;
}

export default function ServiceDashboard({ user }: ServiceDashboardProps) {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<any>(null);
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [metricsData, requestsData] = await Promise.all([
          workspaceDataService.getServiceMetrics(user.id),
          workspaceDataService.getServiceRequests(user.id)
        ]);
        setMetrics(metricsData);
        setRequests(requestsData.slice(0, 5)); // Top 5 for dashboard
      } catch (error) {
        console.error('Failed to load service dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
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

  const statusCounts = {
    critical: requests.filter(r => r.priority === 'Critical').length,
    atRisk: requests.filter(r => r.slaStatus === 'At Risk').length,
    onTrack: requests.filter(r => r.slaStatus === 'On Track').length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Service Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor service requests and fulfillment pipeline</p>
        </div>
        <Briefcase className="w-8 h-8 text-blue-600" />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Requests"
          value={metrics?.totalRequests || 0}
          icon={Inbox}
          trend={metrics?.requestTrend}
          color="blue"
        />
        <MetricCard
          title="In Progress"
          value={metrics?.inProgress || 0}
          icon={Clock}
          color="yellow"
        />
        <MetricCard
          title="Completed"
          value={metrics?.completed || 0}
          icon={CheckCircle}
          color="green"
        />
        <MetricCard
          title="SLA Compliance"
          value={`${metrics?.slaCompliance || 0}%`}
          icon={TrendingUp}
          trend={metrics?.slaCompliance >= 90 ? 'up' : 'down'}
          color={metrics?.slaCompliance >= 90 ? 'green' : 'red'}
        />
      </div>

      {/* Fulfillment Pipeline Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Fulfillment Pipeline</h2>
          <Link to="/workspace/workflow-status" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View Details →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{metrics?.pipeline?.submitted || 0}</div>
            <div className="text-sm text-gray-600 mt-1">Submitted</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{metrics?.pipeline?.inReview || 0}</div>
            <div className="text-sm text-gray-600 mt-1">In Review</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{metrics?.pipeline?.inProgress || 0}</div>
            <div className="text-sm text-gray-600 mt-1">In Progress</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{metrics?.pipeline?.completed || 0}</div>
            <div className="text-sm text-gray-600 mt-1">Completed</div>
          </div>
        </div>
      </div>

      {/* Service Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">Avg Delivery Time</h3>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900">{metrics?.averageDeliveryTime || 0} days</div>
          <div className="text-sm text-gray-600 mt-1">Target: 14 days</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">Customer Satisfaction</h3>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900">{metrics?.customerSatisfaction || 0}%</div>
          <div className="text-sm text-gray-600 mt-1">Based on feedback</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">Critical Items</h3>
            <AlertCircle className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-red-600">{statusCounts.critical}</div>
          <div className="text-sm text-gray-600 mt-1">Require immediate attention</div>
        </div>
      </div>

      {/* Recent Service Requests */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Recent Service Requests</h2>
            <Link to="/workspace/service-requests" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All →
            </Link>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {requests.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No service requests found
            </div>
          ) : (
            requests.map((request) => (
              <div key={request.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900">{request.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        request.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                        request.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                        request.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {request.priority}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        request.slaStatus === 'On Track' ? 'bg-green-100 text-green-700' :
                        request.slaStatus === 'At Risk' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {request.slaStatus}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {request.serviceType} • Submitted by {request.submittedBy}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {request.submittedAt} • {request.assignedTo ? `Assigned to ${request.assignedTo}` : 'Unassigned'}
                    </p>
                  </div>
                  <Link
                    to={`/workspace/service-requests?id=${request.id}`}
                    className="ml-4 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/workspace/service-requests"
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <Inbox className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900">Service Requests</h3>
          <p className="text-sm text-gray-600 mt-1">Manage all incoming requests</p>
        </Link>
        <Link
          to="/workspace/fulfillment"
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <Layers className="w-8 h-8 text-purple-600 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900">Fulfillment</h3>
          <p className="text-sm text-gray-600 mt-1">Coordinate task assignments</p>
        </Link>
        <Link
          to="/workspace/service-catalog"
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <Package className="w-8 h-8 text-green-600 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900">Service Catalog</h3>
          <p className="text-sm text-gray-600 mt-1">Browse available services</p>
        </Link>
      </div>
    </div>
  );
}
