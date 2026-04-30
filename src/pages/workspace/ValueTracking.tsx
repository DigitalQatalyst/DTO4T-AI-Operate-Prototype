import { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Target, CheckCircle, BarChart3, Calendar } from 'lucide-react';
import MetricCard from '@/components/workspace/MetricCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ValueMetrics {
  totalInvestment: number;
  realizedValue: number;
  expectedValue: number;
  portfolioROI: number;
  benefitRealizationRate: number;
}

interface InitiativeValue {
  id: string;
  title: string;
  businessUnit: string;
  investment: number;
  expectedValue: number;
  realizedValue: number;
  roi: number;
  status: 'On Track' | 'At Risk' | 'Delayed' | 'Completed';
  realizationRate: number;
}

interface ValueCategory {
  category: string;
  totalValue: number;
  percentage: number;
  initiatives: number;
}

export default function ValueTracking() {
  const [loading, setLoading] = useState(true);
  const [timePeriod, setTimePeriod] = useState('ytd');
  const [metrics, setMetrics] = useState<ValueMetrics | null>(null);
  const [initiatives, setInitiatives] = useState<InitiativeValue[]>([]);
  const [valueCategories, setValueCategories] = useState<ValueCategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));

        setMetrics({
          totalInvestment: 2850000,
          realizedValue: 3800000,
          expectedValue: 5200000,
          portfolioROI: 133,
          benefitRealizationRate: 73,
        });

        setInitiatives([
          {
            id: 'init-001',
            title: 'Customer Churn Prediction',
            businessUnit: 'Sales',
            investment: 55000,
            expectedValue: 800000,
            realizedValue: 620000,
            roi: 1127,
            status: 'Completed',
            realizationRate: 78,
          },
          {
            id: 'init-002',
            title: 'Predictive Maintenance Initiative',
            businessUnit: 'Operations',
            investment: 125000,
            expectedValue: 2000000,
            realizedValue: 450000,
            roi: 360,
            status: 'On Track',
            realizationRate: 23,
          },
          {
            id: 'init-003',
            title: 'Automated Invoice Processing',
            businessUnit: 'Finance',
            investment: 32000,
            expectedValue: 180000,
            realizedValue: 0,
            roi: 0,
            status: 'At Risk',
            realizationRate: 0,
          },
          {
            id: 'init-004',
            title: 'Customer Sentiment Analysis',
            businessUnit: 'Marketing',
            investment: 45000,
            expectedValue: 250000,
            realizedValue: 85000,
            roi: 189,
            status: 'On Track',
            realizationRate: 34,
          },
          {
            id: 'init-005',
            title: 'Supply Chain Optimization',
            businessUnit: 'Operations',
            investment: 180000,
            expectedValue: 1500000,
            realizedValue: 320000,
            roi: 178,
            status: 'Delayed',
            realizationRate: 21,
          },
        ]);

        setValueCategories([
          { category: 'Cost Reduction', totalValue: 1850000, percentage: 49, initiatives: 12 },
          { category: 'Revenue Growth', totalValue: 1200000, percentage: 32, initiatives: 8 },
          { category: 'Efficiency Gains', totalValue: 520000, percentage: 14, initiatives: 15 },
          { category: 'Risk Mitigation', totalValue: 230000, percentage: 6, initiatives: 5 },
        ]);
      } catch (error) {
        console.error('Error fetching value tracking data:', error);
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    'Completed': 'bg-green-100 text-green-800',
    'On Track': 'bg-blue-100 text-blue-800',
    'At Risk': 'bg-yellow-100 text-yellow-800',
    'Delayed': 'bg-red-100 text-red-800',
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Value Tracking</h1>
          <p className="text-gray-600 mt-1">Realized business value, ROI, and benefit realization</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="qtd">This Quarter</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Value Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <MetricCard
          title="Total Investment"
          value={`$${((metrics?.totalInvestment || 0) / 1000000).toFixed(1)}M`}
          subtitle="Portfolio investment"
          icon={DollarSign}
          variant="default"
        />

        <MetricCard
          title="Realized Value"
          value={`$${((metrics?.realizedValue || 0) / 1000000).toFixed(1)}M`}
          subtitle="Business value delivered"
          icon={TrendingUp}
          trend="up"
          trendValue="+22%"
          variant="success"
        />

        <MetricCard
          title="Expected Value"
          value={`$${((metrics?.expectedValue || 0) / 1000000).toFixed(1)}M`}
          subtitle="Target value"
          icon={Target}
          variant="default"
        />

        <MetricCard
          title="Portfolio ROI"
          value={`${metrics?.portfolioROI || 0}%`}
          subtitle="Return on investment"
          icon={TrendingUp}
          trend="up"
          trendValue="+18%"
          variant="success"
        />

        <MetricCard
          title="Benefit Realization"
          value={`${metrics?.benefitRealizationRate || 0}%`}
          subtitle="Of expected value"
          icon={CheckCircle}
          trend="up"
          trendValue="+5%"
          variant="success"
        />
      </div>

      {/* Value Realization Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Value Realization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Realized vs. Expected Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${((metrics?.realizedValue || 0) / 1000000).toFixed(1)}M / $
                  {((metrics?.expectedValue || 0) / 1000000).toFixed(1)}M
                </p>
              </div>
              <Badge className="bg-blue-100 text-blue-800">
                {metrics?.benefitRealizationRate || 0}% Realized
              </Badge>
            </div>
            <Progress value={metrics?.benefitRealizationRate || 0} className="h-3" />
            <p className="text-sm text-gray-600">
              ${(((metrics?.expectedValue || 0) - (metrics?.realizedValue || 0)) / 1000000).toFixed(1)}M
              remaining to achieve full expected value
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Initiative Value Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Initiative Value Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {initiatives.map((initiative) => (
              <div key={initiative.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{initiative.title}</h3>
                      <Badge className={statusColors[initiative.status]}>{initiative.status}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{initiative.businessUnit}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">ROI</p>
                    <p className="text-xl font-bold text-green-600">{initiative.roi}%</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-600">Investment</p>
                    <p className="font-semibold text-gray-900">
                      ${(initiative.investment / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Expected Value</p>
                    <p className="font-semibold text-gray-900">
                      ${(initiative.expectedValue / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Realized Value</p>
                    <p className="font-semibold text-green-600">
                      ${(initiative.realizedValue / 1000).toFixed(0)}K
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">Benefit Realization</span>
                    <span className="text-xs font-semibold text-gray-900">
                      {initiative.realizationRate}%
                    </span>
                  </div>
                  <Progress value={initiative.realizationRate} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Value by Category */}
      <Card>
        <CardHeader>
          <CardTitle>Value by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {valueCategories.map((category) => (
              <div key={category.category}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-medium text-gray-900">{category.category}</span>
                    <span className="text-sm text-gray-600 ml-2">({category.initiatives} initiatives)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">
                      ${(category.totalValue / 1000000).toFixed(1)}M
                    </span>
                    <span className="text-sm font-semibold text-gray-900">{category.percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all"
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ROI Calculations */}
      <Card>
        <CardHeader>
          <CardTitle>ROI Calculation Methodology</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="font-medium text-gray-900 mb-2">ROI Formula</p>
              <p className="text-sm text-gray-700 font-mono">
                ROI = ((Realized Value - Investment) / Investment) × 100
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Investment Includes:</p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Development costs</li>
                  <li>Infrastructure expenses</li>
                  <li>Training and onboarding</li>
                  <li>Ongoing maintenance</li>
                </ul>
              </div>

              <div className="p-4 border rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Realized Value Includes:</p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Cost savings achieved</li>
                  <li>Revenue increases</li>
                  <li>Efficiency improvements</li>
                  <li>Risk reduction benefits</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Value Trend Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Value Trend Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Value realization trend chart</p>
              <p className="text-sm text-gray-500">Historical value delivery and ROI trends over time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
