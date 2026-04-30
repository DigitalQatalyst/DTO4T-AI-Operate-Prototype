import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Building2, Tag, Calendar } from 'lucide-react';
import MetricCard from '@/components/workspace/MetricCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DemandMetrics {
  totalOpportunities: number;
  totalRequests: number;
  opportunityGrowth: number;
  requestGrowth: number;
}

interface BusinessUnitDemand {
  unit: string;
  opportunities: number;
  requests: number;
  totalValue: number;
  trend: 'up' | 'down' | 'stable';
}

interface CategoryDemand {
  category: string;
  count: number;
  percentage: number;
  color: string;
}

export default function AIDemandOverview() {
  const [loading, setLoading] = useState(true);
  const [timePeriod, setTimePeriod] = useState('30d');
  const [metrics, setMetrics] = useState<DemandMetrics | null>(null);
  const [businessUnitData, setBusinessUnitData] = useState<BusinessUnitDemand[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryDemand[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));

        // Mock data based on time period
        const periodMultiplier = timePeriod === '7d' ? 0.25 : timePeriod === '30d' ? 1 : timePeriod === '90d' ? 3 : 12;

        setMetrics({
          totalOpportunities: Math.floor(156 * periodMultiplier),
          totalRequests: Math.floor(89 * periodMultiplier),
          opportunityGrowth: 18,
          requestGrowth: 24,
        });

        setBusinessUnitData([
          { unit: 'Operations', opportunities: 42, requests: 28, totalValue: 3200000, trend: 'up' },
          { unit: 'Marketing', opportunities: 38, requests: 22, totalValue: 1800000, trend: 'up' },
          { unit: 'Finance', opportunities: 24, requests: 15, totalValue: 2100000, trend: 'stable' },
          { unit: 'Sales', opportunities: 31, requests: 18, totalValue: 1500000, trend: 'up' },
          { unit: 'IT', opportunities: 12, requests: 4, totalValue: 800000, trend: 'down' },
          { unit: 'HR', opportunities: 9, requests: 2, totalValue: 400000, trend: 'stable' },
        ]);

        setCategoryData([
          { category: 'Process Automation', count: 58, percentage: 32, color: 'bg-blue-500' },
          { category: 'Data Analytics', count: 45, percentage: 25, color: 'bg-green-500' },
          { category: 'Machine Learning', count: 38, percentage: 21, color: 'bg-purple-500' },
          { category: 'NLP', count: 22, percentage: 12, color: 'bg-yellow-500' },
          { category: 'Computer Vision', count: 12, percentage: 7, color: 'bg-red-500' },
          { category: 'Other', count: 6, percentage: 3, color: 'bg-gray-500' },
        ]);
      } catch (error) {
        console.error('Error fetching AI demand data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timePeriod]);

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Demand Overview</h1>
          <p className="text-gray-600 mt-1">Aggregate statistics on opportunities and requests</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Aggregate Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Opportunities"
          value={metrics?.totalOpportunities || 0}
          subtitle="Captured ideas"
          icon={TrendingUp}
          trend="up"
          trendValue={`+${metrics?.opportunityGrowth || 0}%`}
          variant="default"
        />

        <MetricCard
          title="Total Requests"
          value={metrics?.totalRequests || 0}
          subtitle="Formal submissions"
          icon={BarChart3}
          trend="up"
          trendValue={`+${metrics?.requestGrowth || 0}%`}
          variant="default"
        />

        <MetricCard
          title="Conversion Rate"
          value="57%"
          subtitle="Opportunities → Requests"
          icon={TrendingUp}
          trend="up"
          trendValue="+3%"
          variant="success"
        />

        <MetricCard
          title="Avg. Time to Request"
          value="12 days"
          subtitle="From opportunity capture"
          icon={Calendar}
          trend="down"
          trendValue="-2 days"
          variant="success"
        />
      </div>

      {/* Business Unit Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Demand by Business Unit
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {businessUnitData.map((unit) => (
              <div key={unit.unit} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{unit.unit}</h3>
                    {unit.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-600" />}
                    {unit.trend === 'down' && <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />}
                    {unit.trend === 'stable' && <div className="w-4 h-0.5 bg-gray-600"></div>}
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    ${(unit.totalValue / 1000000).toFixed(1)}M value
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Opportunities</p>
                    <p className="text-2xl font-bold text-gray-900">{unit.opportunities}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Requests</p>
                    <p className="text-2xl font-bold text-gray-900">{unit.requests}</p>
                  </div>
                </div>

                {/* Visual bar */}
                <div className="mt-3 flex gap-1 h-2">
                  <div
                    className="bg-blue-500 rounded"
                    style={{
                      width: `${(unit.opportunities / (unit.opportunities + unit.requests)) * 100}%`,
                    }}
                  ></div>
                  <div
                    className="bg-green-500 rounded"
                    style={{
                      width: `${(unit.requests / (unit.opportunities + unit.requests)) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-gray-600">Opportunities</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-gray-600">Requests</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="w-5 h-5" />
            Demand by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryData.map((category) => (
              <div key={category.category}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{category.category}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">{category.count} items</span>
                    <span className="text-sm font-semibold text-gray-900">{category.percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`${category.color} h-3 rounded-full transition-all`}
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Time Period Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Period Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Time series comparison chart</p>
              <p className="text-sm text-gray-500">Demand trends over selected time periods</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
