import { useState, useEffect } from 'react';
import { Shield, CheckCircle, AlertTriangle, Clock, TrendingUp } from 'lucide-react';
import MetricCard from '@/components/workspace/MetricCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface GovernanceMetrics {
  overallCompliance: number;
  policyAdherence: number;
  activeViolations: number;
  resolvedViolations: number;
  avgReviewTime: number;
}

interface PolicyCompliance {
  policyName: string;
  category: string;
  adherenceRate: number;
  violations: number;
  trend: 'up' | 'down' | 'stable';
}

interface Bottleneck {
  stage: string;
  avgWaitTime: number;
  itemsWaiting: number;
  severity: 'Low' | 'Medium' | 'High';
}

export default function GovernanceStatus() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<GovernanceMetrics | null>(null);
  const [policyCompliance, setPolicyCompliance] = useState<PolicyCompliance[]>([]);
  const [bottlenecks, setBottlenecks] = useState<Bottleneck[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));

        setMetrics({
          overallCompliance: 94.2,
          policyAdherence: 96.5,
          activeViolations: 8,
          resolvedViolations: 142,
          avgReviewTime: 2.3,
        });

        setPolicyCompliance([
          {
            policyName: 'High-Cost Request Approval',
            category: 'Financial Governance',
            adherenceRate: 98,
            violations: 2,
            trend: 'stable',
          },
          {
            policyName: 'PII Data Access Control',
            category: 'Data Privacy',
            adherenceRate: 100,
            violations: 0,
            trend: 'up',
          },
          {
            policyName: 'External API Integration Review',
            category: 'Security',
            adherenceRate: 92,
            violations: 4,
            trend: 'down',
          },
          {
            policyName: 'Model Bias Assessment',
            category: 'AI Ethics',
            adherenceRate: 95,
            violations: 2,
            trend: 'up',
          },
          {
            policyName: 'Data Retention Compliance',
            category: 'Data Governance',
            adherenceRate: 89,
            violations: 5,
            trend: 'down',
          },
        ]);

        setBottlenecks([
          {
            stage: 'Executive Approval',
            avgWaitTime: 4.2,
            itemsWaiting: 12,
            severity: 'High',
          },
          {
            stage: 'Security Review',
            avgWaitTime: 3.1,
            itemsWaiting: 8,
            severity: 'Medium',
          },
          {
            stage: 'Privacy Assessment',
            avgWaitTime: 2.8,
            itemsWaiting: 5,
            severity: 'Medium',
          },
          {
            stage: 'Legal Review',
            avgWaitTime: 1.5,
            itemsWaiting: 3,
            severity: 'Low',
          },
        ]);
      } catch (error) {
        console.error('Error fetching governance status data:', error);
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
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const healthScore = metrics?.overallCompliance || 0;
  const healthVariant = healthScore >= 95 ? 'success' : healthScore >= 85 ? 'warning' : 'danger';

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Governance Status</h1>
        <p className="text-gray-600 mt-1">Compliance metrics, policy adherence, and bottleneck analysis</p>
      </div>

      {/* Governance Health Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <MetricCard
          title="Overall Compliance"
          value={`${metrics?.overallCompliance || 0}%`}
          subtitle="Governance health score"
          icon={Shield}
          trend="up"
          trendValue="+2.3%"
          variant={healthVariant}
        />

        <MetricCard
          title="Policy Adherence"
          value={`${metrics?.policyAdherence || 0}%`}
          subtitle="Across all policies"
          icon={CheckCircle}
          trend="stable"
          variant="success"
        />

        <MetricCard
          title="Active Violations"
          value={metrics?.activeViolations || 0}
          subtitle="Requiring attention"
          icon={AlertTriangle}
          variant={metrics && metrics.activeViolations > 10 ? 'danger' : 'warning'}
        />

        <MetricCard
          title="Resolved Violations"
          value={metrics?.resolvedViolations || 0}
          subtitle="Last 90 days"
          icon={CheckCircle}
          trend="up"
          trendValue="+18"
          variant="success"
        />

        <MetricCard
          title="Avg. Review Time"
          value={`${metrics?.avgReviewTime || 0} days`}
          subtitle="Governance review cycle"
          icon={Clock}
          trend="down"
          trendValue="-0.5 days"
          variant="success"
        />
      </div>

      {/* Governance Health Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Governance Health Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">{healthScore}%</span>
              <Badge
                className={
                  healthScore >= 95
                    ? 'bg-green-100 text-green-800'
                    : healthScore >= 85
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }
              >
                {healthScore >= 95 ? 'Excellent' : healthScore >= 85 ? 'Good' : 'Needs Attention'}
              </Badge>
            </div>
            <Progress value={healthScore} className="h-3" />
            <p className="text-sm text-gray-600">
              Composite score based on policy adherence, violation rates, and review efficiency
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Policy Adherence Rates */}
      <Card>
        <CardHeader>
          <CardTitle>Policy Adherence Rates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {policyCompliance.map((policy) => (
              <div key={policy.policyName} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{policy.policyName}</h3>
                      {policy.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-600" />}
                      {policy.trend === 'down' && <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />}
                      {policy.trend === 'stable' && <div className="w-4 h-0.5 bg-gray-600"></div>}
                    </div>
                    <p className="text-sm text-gray-600">{policy.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{policy.adherenceRate}%</p>
                    <p className="text-sm text-gray-600">{policy.violations} violations</p>
                  </div>
                </div>
                <Progress value={policy.adherenceRate} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottleneck Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Governance Bottlenecks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bottlenecks.map((bottleneck) => (
              <div key={bottleneck.stage} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        bottleneck.severity === 'High'
                          ? 'bg-red-500'
                          : bottleneck.severity === 'Medium'
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                    ></div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{bottleneck.stage}</h3>
                      <p className="text-sm text-gray-600">{bottleneck.itemsWaiting} items waiting</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{bottleneck.avgWaitTime}</p>
                    <p className="text-sm text-gray-600">days avg. wait</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      bottleneck.severity === 'High'
                        ? 'bg-red-100 text-red-800'
                        : bottleneck.severity === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }
                  >
                    {bottleneck.severity} Priority
                  </Badge>
                  {bottleneck.severity === 'High' && (
                    <span className="text-sm text-red-600">Immediate attention required</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900">Recommendation</p>
                <p className="text-sm text-blue-800 mt-1">
                  Executive Approval stage is experiencing significant delays. Consider adding additional
                  approvers or implementing automated pre-screening to reduce wait times.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Compliance trend chart</p>
              <p className="text-sm text-gray-500">Historical compliance rates and violation trends</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
