import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  DollarSign,
  Target,
  Shield,
  Briefcase,
  Activity,
  BarChart3,
  ArrowRight,
} from 'lucide-react';
import MetricCard from '@/components/workspace/MetricCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { workspaceDataService } from '@/services/workspaceData';
import type { StrategicMetric } from '@/types/workspace';

interface ExecutiveMetrics {
  totalInitiatives: number;
  totalInvestment: number;
  realizedValue: number;
  portfolioROI: number;
  governanceCompliance: number;
  activeBusinessUnits: number;
}

export default function ExecutiveDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<ExecutiveMetrics | null>(null);
  const [strategicMetrics, setStrategicMetrics] = useState<StrategicMetric[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [strategicData] = await Promise.all([
          workspaceDataService.getStrategicMetrics(),
        ]);

        setStrategicMetrics(strategicData);

        // Calculate executive summary metrics
        setMetrics({
          totalInitiatives: 47,
          totalInvestment: 2850000,
          realizedValue: 3800000,
          portfolioROI: 245,
          governanceCompliance: 94,
          activeBusinessUnits: 8,
        });
      } catch (error) {
        console.error('Error fetching executive dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
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
          <h1 className="text-3xl font-bold text-gray-900">Executive Dashboard</h1>
          <p className="text-gray-600 mt-1">Strategic overview of AI portfolio and business value</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/workspace/strategic-insights')}>
            View Insights
          </Button>
          <Button onClick={() => navigate('/workspace/portfolio')}>
            <Briefcase className="w-4 h-4 mr-2" />
            Portfolio Details
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Active AI Initiatives"
          value={metrics?.totalInitiatives || 0}
          subtitle={`Across ${metrics?.activeBusinessUnits || 0} business units`}
          icon={Briefcase}
          trend="up"
          trendValue="+8"
          variant="default"
        />

        <MetricCard
          title="Total Investment"
          value={`$${((metrics?.totalInvestment || 0) / 1000000).toFixed(1)}M`}
          subtitle="YTD portfolio investment"
          icon={DollarSign}
          trend="up"
          trendValue="+15%"
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
          title="Portfolio ROI"
          value={`${metrics?.portfolioROI || 0}%`}
          subtitle="Return on investment"
          icon={Target}
          trend="up"
          trendValue="+45%"
          variant="success"
        />

        <MetricCard
          title="Governance Compliance"
          value={`${metrics?.governanceCompliance || 0}%`}
          subtitle="Policy adherence rate"
          icon={Shield}
          trend="stable"
          variant="success"
        />

        <MetricCard
          title="AI Adoption Rate"
          value="68%"
          subtitle="Target: 75% by Q2"
          icon={Activity}
          trend="up"
          trendValue="+5%"
          variant="default"
        />
      </div>

      {/* Strategic Metrics */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Strategic Performance Metrics</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/workspace/value-tracking')}
              className="gap-2"
            >
              View Details
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {strategicMetrics.map((metric) => (
              <div key={metric.name} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                  {metric.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-600" />}
                  {metric.trend === 'down' && <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />}
                  {metric.trend === 'stable' && <Activity className="w-4 h-4 text-gray-600" />}
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-gray-900">
                    {metric.name.includes('$') ? `$${metric.value}M` : metric.value}
                  </p>
                  <p className="text-sm text-gray-500">/ {metric.target}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">{metric.period}</p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      metric.value >= metric.target ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate('/workspace/ai-demand')}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">AI Demand</p>
                <p className="text-sm text-gray-600">View demand trends</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate('/workspace/portfolio')}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Briefcase className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Portfolio</p>
                <p className="text-sm text-gray-600">Active initiatives</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate('/workspace/governance-status')}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Governance</p>
                <p className="text-sm text-gray-600">Compliance status</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate('/workspace/value-tracking')}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Value Tracking</p>
                <p className="text-sm text-gray-600">ROI & benefits</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trend Charts Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Trend charts visualization</p>
              <p className="text-sm text-gray-500">Investment, value delivery, and adoption trends over time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
