import { useEffect, useState } from 'react';
import { TrendingUp, Clock, CheckCircle, Target, BarChart3, Calendar } from 'lucide-react';
import { workspaceDataService } from '@/services/workspaceData';
import type { ServiceMetrics, User } from '@/types/workspace';
import MetricCard from '@/components/workspace/MetricCard';
import { Button } from '@/components/ui/button';
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
import { cn } from '@/lib/utils';

interface ServicePerformanceProps {
  user: User;
}

interface PerformanceData {
  metrics: ServiceMetrics;
  slaCompliance: Array<{ month: string; compliance: number }>;
  deliveryVelocity: Array<{ month: string; completed: number; average: number }>;
  qualityIndicators: Array<{ metric: string; current: number; target: number; trend: 'up' | 'down' | 'stable' }>;
}

export default function ServicePerformance({ user }: ServicePerformanceProps) {
  const [data, setData] = useState<PerformanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timePeriod, setTimePeriod] = useState('6months');
  const [comparisonPeriod, setComparisonPeriod] = useState('previous');

  useEffect(() => {
    loadPerformanceData();
  }, [user.id, timePeriod]);

  const loadPerformanceData = async () => {
    try {
      setLoading(true);
      const metrics = await workspaceDataService.getServiceMetrics(user.id);

      // Generate mock performance data
      const performanceData: PerformanceData = {
        metrics,
        slaCompliance: generateSLAData(),
        deliveryVelocity: generateVelocityData(),
        qualityIndicators: [
          { metric: 'Customer Satisfaction', current: 92, target: 90, trend: 'up' },
          { metric: 'First-Time Resolution', current: 85, target: 80, trend: 'up' },
          { metric: 'Defect Rate', current: 3, target: 5, trend: 'down' },
          { metric: 'Code Quality Score', current: 88, target: 85, trend: 'stable' },
        ],
      };

      setData(performanceData);
    } catch (error) {
      console.error('Failed to load performance data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSLAData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month) => ({
      month,
      compliance: Math.floor(Math.random() * 10) + 90,
    }));
  };

  const generateVelocityData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month) => ({
      month,
      completed: Math.floor(Math.random() * 20) + 30,
      average: 35,
    }));
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
      default:
        return <div className="w-4 h-4 border-t-2 border-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading service performance...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-8">
        <div className="text-center text-gray-600">Failed to load performance data</div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Service Performance</h1>
              <p className="text-gray-600">Track SLA compliance, delivery velocity, and quality metrics</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timePeriod} onValueChange={setTimePeriod}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Select value={comparisonPeriod} onValueChange={setComparisonPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="previous">vs Previous Period</SelectItem>
                <SelectItem value="year">vs Same Period Last Year</SelectItem>
                <SelectItem value="target">vs Target</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="SLA Compliance"
          value={`${data.metrics.slaCompliance}%`}
          icon={Target}
          trend={data.metrics.slaCompliance >= 90 ? 'up' : 'down'}
        />
        <MetricCard
          title="Avg Delivery Time"
          value={`${data.metrics.averageDeliveryTime} days`}
          icon={Clock}
          trend="down"
        />
        <MetricCard
          title="Completed Requests"
          value={data.metrics.completed}
          icon={CheckCircle}
          trend="up"
        />
        <MetricCard
          title="Customer Satisfaction"
          value={`${data.metrics.customerSatisfaction}%`}
          icon={TrendingUp}
          trend="up"
        />
      </div>

      {/* SLA Compliance Chart */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>SLA Compliance Trend</CardTitle>
              <CardDescription>Monthly SLA compliance percentage</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Export Data
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Simple bar chart visualization */}
            <div className="flex items-end justify-between h-48 gap-2">
              {data.slaCompliance.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-gray-100 rounded-t relative" style={{ height: '100%' }}>
                    <div
                      className={cn(
                        'absolute bottom-0 w-full rounded-t transition-all',
                        item.compliance >= 95 ? 'bg-green-500' :
                        item.compliance >= 90 ? 'bg-yellow-500' :
                        'bg-red-500'
                      )}
                      style={{ height: `${item.compliance}%` }}
                    >
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold">
                        {item.compliance}%
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-600">{item.month}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded" />
                <span className="text-gray-600">≥95% (Excellent)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded" />
                <span className="text-gray-600">90-94% (Good)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded" />
                <span className="text-gray-600">&lt;90% (Needs Improvement)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Velocity Chart */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Delivery Velocity</CardTitle>
              <CardDescription>Completed requests per month vs average</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Calendar className="w-4 h-4" />
              View Calendar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Simple bar chart visualization */}
            <div className="flex items-end justify-between h-48 gap-2">
              {data.deliveryVelocity.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full relative" style={{ height: '100%' }}>
                    {/* Average line */}
                    <div
                      className="absolute w-full border-t-2 border-dashed border-gray-400"
                      style={{ bottom: `${(item.average / 50) * 100}%` }}
                    />
                    {/* Actual bar */}
                    <div className="absolute bottom-0 w-full flex justify-center">
                      <div
                        className={cn(
                          'w-3/4 rounded-t transition-all',
                          item.completed >= item.average ? 'bg-blue-500' : 'bg-orange-500'
                        )}
                        style={{ height: `${(item.completed / 50) * 192}px` }}
                      >
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold">
                          {item.completed}
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-600">{item.month}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded" />
                <span className="text-gray-600">Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 border-t-2 border-dashed border-gray-400" />
                <span className="text-gray-600">Average (35)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quality Indicators */}
      <Card>
        <CardHeader>
          <CardTitle>Quality Indicators</CardTitle>
          <CardDescription>Key quality metrics and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.qualityIndicators.map((indicator, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold text-gray-900">{indicator.metric}</h4>
                    {getTrendIcon(indicator.trend)}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-gray-600">Current</p>
                      <p className="text-lg font-bold text-gray-900">{indicator.current}%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600">Target</p>
                      <p className="text-lg font-bold text-gray-600">{indicator.target}%</p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={cn(
                        'h-2 rounded-full transition-all',
                        indicator.current >= indicator.target ? 'bg-green-500' : 'bg-orange-500'
                      )}
                      style={{ width: `${Math.min(indicator.current, 100)}%` }}
                    />
                  </div>
                  {/* Target marker */}
                  <div
                    className="absolute top-0 w-0.5 h-2 bg-gray-600"
                    style={{ left: `${indicator.target}%` }}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-gray-600">
                  <span>
                    {indicator.current >= indicator.target
                      ? `${indicator.current - indicator.target}% above target`
                      : `${indicator.target - indicator.current}% below target`}
                  </span>
                  <span className={cn(
                    'font-medium',
                    indicator.trend === 'up' ? 'text-green-600' :
                    indicator.trend === 'down' ? 'text-red-600' :
                    'text-gray-600'
                  )}>
                    {indicator.trend === 'up' ? '↑ Improving' :
                     indicator.trend === 'down' ? '↓ Declining' :
                     '→ Stable'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
