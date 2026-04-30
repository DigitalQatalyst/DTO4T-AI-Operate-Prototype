import { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, CheckCircle, Users, Calendar, BarChart3, Filter } from 'lucide-react';
import { User } from '../../types/workspace';
import { workspaceDataService } from '../../services/workspaceData';
import MetricCard from '../../components/workspace/MetricCard';

interface TeamPerformanceProps {
  user: User;
}

type TimePeriod = '7d' | '30d' | '90d' | '1y';

interface PerformanceMetrics {
  valueDelivered: number;
  completionRate: number;
  aiAdoptionRate: number;
  averageTimeToComplete: number;
  totalInitiatives: number;
  successfulDeployments: number;
}

export default function TeamPerformance({ user }: TeamPerformanceProps) {
  const [loading, setLoading] = useState(true);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('30d');
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);

  useEffect(() => {
    loadPerformanceData();
  }, [timePeriod, user.id]);

  const loadPerformanceData = async () => {
    setLoading(true);
    try {
      const data = await workspaceDataService.getTeamPerformanceMetrics(user.id, timePeriod);
      setMetrics(data);
    } catch (error) {
      console.error('Failed to load team performance data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getPeriodLabel = (period: TimePeriod) => {
    switch (period) {
      case '7d': return 'Last 7 Days';
      case '30d': return 'Last 30 Days';
      case '90d': return 'Last 90 Days';
      case '1y': return 'Last Year';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Team Performance</h1>
          <p className="text-gray-600 mt-1">Loading performance metrics...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Team Performance</h1>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <p className="text-gray-600">No performance data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header with Time Period Filter */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Performance</h1>
          <p className="text-gray-600 mt-1">Track value delivered and AI adoption metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value as TimePeriod)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Value Delivered"
          value={formatCurrency(metrics.valueDelivered)}
          icon={DollarSign}
          trend="up"
          trendValue="+12%"
          subtitle={`Total business value in ${getPeriodLabel(timePeriod).toLowerCase()}`}
        />
        <MetricCard
          title="Completion Rate"
          value={formatPercentage(metrics.completionRate)}
          icon={CheckCircle}
          trend={metrics.completionRate >= 80 ? 'up' : 'down'}
          trendValue={`${metrics.completionRate >= 80 ? '+' : ''}${(metrics.completionRate - 75).toFixed(1)}%`}
          subtitle="Initiatives completed on time"
        />
        <MetricCard
          title="AI Adoption Rate"
          value={formatPercentage(metrics.aiAdoptionRate)}
          icon={TrendingUp}
          trend="up"
          trendValue="+8%"
          subtitle="Team members actively using AI"
        />
        <MetricCard
          title="Avg. Time to Complete"
          value={`${metrics.averageTimeToComplete} days`}
          icon={Calendar}
          trend="down"
          trendValue="-3 days"
          subtitle="Average initiative duration"
        />
        <MetricCard
          title="Total Initiatives"
          value={metrics.totalInitiatives.toString()}
          icon={BarChart3}
          subtitle={`Active and completed in ${getPeriodLabel(timePeriod).toLowerCase()}`}
        />
        <MetricCard
          title="Successful Deployments"
          value={metrics.successfulDeployments.toString()}
          icon={Users}
          trend="up"
          trendValue="+5"
          subtitle="AI solutions deployed to production"
        />
      </div>

      {/* Completion Rate Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Completion Rate Trend</h2>
        <div className="space-y-4">
          {[
            { month: 'Jan', rate: 72, completed: 18, total: 25 },
            { month: 'Feb', rate: 78, completed: 21, total: 27 },
            { month: 'Mar', rate: 85, completed: 23, total: 27 },
            { month: 'Apr', rate: 82, completed: 19, total: 23 },
            { month: 'May', rate: 88, completed: 22, total: 25 },
            { month: 'Jun', rate: metrics.completionRate, completed: Math.round(metrics.totalInitiatives * metrics.completionRate / 100), total: metrics.totalInitiatives },
          ].map((data) => (
            <div key={data.month} className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700 w-12">{data.month}</span>
              <div className="flex-1">
                <div className="w-full bg-gray-200 rounded-full h-8 relative">
                  <div
                    className={`h-8 rounded-full flex items-center justify-end pr-3 text-white text-sm font-medium ${
                      data.rate >= 85 ? 'bg-green-500' : data.rate >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${data.rate}%` }}
                  >
                    {data.rate.toFixed(0)}%
                  </div>
                </div>
              </div>
              <span className="text-sm text-gray-600 w-24 text-right">
                {data.completed}/{data.total} completed
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Adoption Statistics */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Adoption Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Adoption by Category</h3>
            <div className="space-y-3">
              {[
                { category: 'Automation', percentage: 92, count: 23 },
                { category: 'Analytics', percentage: 78, count: 19 },
                { category: 'Customer Service', percentage: 65, count: 16 },
                { category: 'Content Generation', percentage: 54, count: 13 },
              ].map((item) => (
                <div key={item.category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{item.category}</span>
                    <span className="text-gray-600">{item.percentage}% ({item.count} users)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">User Engagement Levels</h3>
            <div className="space-y-3">
              {[
                { level: 'Power Users', percentage: 28, count: 7, color: 'bg-green-500' },
                { level: 'Regular Users', percentage: 48, count: 12, color: 'bg-blue-500' },
                { level: 'Occasional Users', percentage: 16, count: 4, color: 'bg-yellow-500' },
                { level: 'New Users', percentage: 8, count: 2, color: 'bg-gray-400' },
              ].map((item) => (
                <div key={item.level}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{item.level}</span>
                    <span className="text-gray-600">{item.percentage}% ({item.count} users)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
