import { useState, useEffect } from 'react';
import {
  Lightbulb,
  TrendingUp,
  AlertCircle,
  Target,
  Filter,
  ChevronRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TrendAnalysis {
  id: string;
  title: string;
  category: 'Demand' | 'Technology' | 'Business' | 'Risk';
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  confidence: number;
  dataPoints: number;
  trend: 'up' | 'down' | 'stable';
}

interface CapabilityGap {
  id: string;
  capability: string;
  currentState: string;
  desiredState: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  affectedInitiatives: number;
  estimatedEffort: string;
  businessImpact: string;
}

interface StrategicRecommendation {
  id: string;
  title: string;
  category: 'Investment' | 'Process' | 'Technology' | 'Governance';
  description: string;
  rationale: string;
  expectedBenefit: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  timeframe: string;
}

export default function StrategicInsights() {
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [trends, setTrends] = useState<TrendAnalysis[]>([]);
  const [capabilityGaps, setCapabilityGaps] = useState<CapabilityGap[]>([]);
  const [recommendations, setRecommendations] = useState<StrategicRecommendation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));

        setTrends([
          {
            id: 'trend-001',
            title: 'Increasing Demand for Process Automation',
            category: 'Demand',
            description:
              'Process automation requests have increased 45% quarter-over-quarter, primarily from Operations and Finance departments.',
            impact: 'High',
            confidence: 92,
            dataPoints: 156,
            trend: 'up',
          },
          {
            id: 'trend-002',
            title: 'Shift Toward Cloud-Native AI Solutions',
            category: 'Technology',
            description:
              ' 78% of new initiatives are requesting cloud-native architectures, indicating a strategic shift from on-premise deployments.',
            impact: 'High',
            confidence: 88,
            dataPoints: 89,
            trend: 'up',
          },
          {
            id: 'trend-003',
            title: 'Growing Focus on Ethical AI and Bias Mitigation',
            category: 'Risk',
            description:
              'Governance reviews increasingly flagging bias concerns. 34% of ML projects now require bias assessments, up from 12% last year.',
            impact: 'Medium',
            confidence: 85,
            dataPoints: 67,
            trend: 'up',
          },
          {
            id: 'trend-004',
            title: 'Declining Interest in Custom Model Development',
            category: 'Technology',
            description:
              'Teams increasingly prefer pre-trained models and APIs over custom development, reducing time-to-value by 40%.',
            impact: 'Medium',
            confidence: 79,
            dataPoints: 124,
            trend: 'down',
          },
          {
            id: 'trend-005',
            title: 'Cross-Functional AI Collaboration Increasing',
            category: 'Business',
            description:
              'Multi-department initiatives have grown 60%, indicating better organizational alignment on AI strategy.',
            impact: 'High',
            confidence: 91,
            dataPoints: 203,
            trend: 'up',
          },
        ]);

        setCapabilityGaps([
          {
            id: 'gap-001',
            capability: 'Machine Learning Engineering',
            currentState: 'Basic proficiency, limited to simple models',
            desiredState: 'Advanced ML engineering with production deployment expertise',
            priority: 'Critical',
            affectedInitiatives: 12,
            estimatedEffort: '6-9 months',
            businessImpact: 'Blocking $2.5M in potential value delivery',
          },
          {
            id: 'gap-002',
            capability: 'Real-Time Data Processing',
            currentState: 'Batch processing only, 24-hour latency',
            desiredState: 'Streaming data pipelines with sub-second latency',
            priority: 'High',
            affectedInitiatives: 8,
            estimatedEffort: '4-6 months',
            businessImpact: 'Limiting responsiveness for customer-facing applications',
          },
          {
            id: 'gap-003',
            capability: 'Natural Language Processing',
            currentState: 'No in-house NLP expertise',
            desiredState: 'NLP team capable of custom model development',
            priority: 'High',
            affectedInitiatives: 9,
            estimatedEffort: '6-12 months',
            businessImpact: 'Relying on expensive external vendors',
          },
          {
            id: 'gap-004',
            capability: 'MLOps and Model Governance',
            currentState: 'Manual deployment, no monitoring',
            desiredState: 'Automated MLOps pipeline with model monitoring and governance',
            priority: 'Critical',
            affectedInitiatives: 15,
            estimatedEffort: '3-6 months',
            businessImpact: 'Risk of model drift and compliance issues',
          },
        ]);

        setRecommendations([
          {
            id: 'rec-001',
            title: 'Establish Center of Excellence for Process Automation',
            category: 'Investment',
            description:
              'Create dedicated team to standardize automation approaches and accelerate delivery across departments.',
            rationale:
              'High demand trend and fragmented execution leading to duplicated effort and inconsistent quality.',
            expectedBenefit: 'Reduce automation delivery time by 40%, improve reusability by 60%',
            priority: 'Critical',
            timeframe: 'Q2 2024',
          },
          {
            id: 'rec-002',
            title: 'Implement Automated Bias Testing Framework',
            category: 'Governance',
            description:
              'Deploy automated tools to detect and measure bias in ML models during development and production.',
            rationale:
              'Growing regulatory focus and increasing governance review burden on manual bias assessments.',
            expectedBenefit: 'Reduce governance review time by 50%, improve compliance confidence',
            priority: 'High',
            timeframe: 'Q3 2024',
          },
          {
            id: 'rec-003',
            title: 'Invest in ML Engineering Talent Development',
            category: 'Investment',
            description:
              'Launch comprehensive training program and hire 3-5 senior ML engineers to close capability gap.',
            rationale:
              'Critical capability gap blocking 12 high-value initiatives worth $2.5M in potential value.',
            expectedBenefit: 'Unlock $2.5M in value, reduce external vendor costs by 40%',
            priority: 'Critical',
            timeframe: 'Immediate',
          },
          {
            id: 'rec-004',
            title: 'Standardize on Cloud-Native AI Platform',
            category: 'Technology',
            description:
              'Select and standardize on single cloud AI platform to reduce complexity and improve efficiency.',
            rationale:
              'Current multi-platform approach creating integration challenges and skill fragmentation.',
            expectedBenefit: 'Reduce infrastructure costs by 25%, improve deployment speed by 35%',
            priority: 'High',
            timeframe: 'Q2-Q3 2024',
          },
          {
            id: 'rec-005',
            title: 'Create Pre-Approved Solution Templates',
            category: 'Process',
            description:
              'Develop library of pre-approved architectural patterns and implementation templates for common use cases.',
            rationale:
              'Governance bottlenecks and repeated reviews of similar solutions slowing delivery.',
            expectedBenefit: 'Reduce approval time by 60%, accelerate delivery by 30%',
            priority: 'Medium',
            timeframe: 'Q3 2024',
          },
        ]);
      } catch (error) {
        console.error('Error fetching strategic insights data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredRecommendations =
    categoryFilter === 'all'
      ? recommendations
      : recommendations.filter((rec) => rec.category === categoryFilter);

  const impactColors: Record<string, string> = {
    High: 'bg-red-100 text-red-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-green-100 text-green-800',
  };

  const priorityColors: Record<string, string> = {
    Critical: 'bg-red-100 text-red-800',
    High: 'bg-orange-100 text-orange-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-green-100 text-green-800',
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Strategic Insights</h1>
        <p className="text-gray-600 mt-1">
          Trend analysis, capability gaps, and strategic recommendations
        </p>
      </div>

      {/* Trend Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Trend Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trends.map((trend) => (
              <div key={trend.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{trend.title}</h3>
                      {trend.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-600" />}
                      {trend.trend === 'down' && (
                        <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />
                      )}
                      {trend.trend === 'stable' && <div className="w-4 h-0.5 bg-gray-600"></div>}
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{trend.description}</p>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-100 text-blue-800">{trend.category}</Badge>
                      <Badge className={impactColors[trend.impact]}>{trend.impact} Impact</Badge>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm text-gray-600">Confidence</p>
                    <p className="text-2xl font-bold text-gray-900">{trend.confidence}%</p>
                    <p className="text-xs text-gray-500">{trend.dataPoints} data points</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Capability Gaps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Capability Gap Identification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {capabilityGaps.map((gap) => (
              <div key={gap.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{gap.capability}</h3>
                      <Badge className={priorityColors[gap.priority]}>{gap.priority}</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-xs font-medium text-gray-600 mb-1">Current State</p>
                        <p className="text-sm text-gray-700">{gap.currentState}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-600 mb-1">Desired State</p>
                        <p className="text-sm text-gray-700">{gap.desiredState}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-600">
                        <span className="font-medium">{gap.affectedInitiatives}</span> initiatives
                        affected
                      </span>
                      <span className="text-gray-600">
                        <span className="font-medium">{gap.estimatedEffort}</span> to close
                      </span>
                    </div>

                    <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                      <p className="text-sm text-yellow-900">
                        <span className="font-medium">Business Impact:</span> {gap.businessImpact}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Strategic Recommendations */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Strategic Recommendations
            </CardTitle>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Investment">Investment</SelectItem>
                  <SelectItem value="Process">Process</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Governance">Governance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRecommendations.map((rec) => (
              <div key={rec.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{rec.title}</h3>
                      <Badge className={priorityColors[rec.priority]}>{rec.priority}</Badge>
                      <Badge className="bg-gray-100 text-gray-800">{rec.category}</Badge>
                    </div>

                    <p className="text-sm text-gray-700 mb-3">{rec.description}</p>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-gray-600">Rationale</p>
                          <p className="text-sm text-gray-700">{rec.rationale}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Target className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-gray-600">Expected Benefit</p>
                          <p className="text-sm text-gray-700">{rec.expectedBenefit}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        <span className="font-medium">Timeframe:</span> {rec.timeframe}
                      </span>
                      <Button variant="ghost" size="sm" className="gap-1">
                        View Details
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Executive Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Key Findings</h4>
              <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                <li>Process automation demand growing 45% QoQ - consider dedicated CoE</li>
                <li>ML engineering capability gap blocking $2.5M in value - immediate action needed</li>
                <li>Cloud-native shift accelerating - standardization opportunity</li>
                <li>Governance bottlenecks increasing - automation and templates recommended</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Recommended Actions</h4>
              <ol className="text-sm text-green-800 space-y-1 list-decimal list-inside">
                <li>Invest in ML engineering talent (Critical - Immediate)</li>
                <li>Establish process automation CoE (Critical - Q2 2024)</li>
                <li>Implement automated bias testing (High - Q3 2024)</li>
                <li>Standardize cloud AI platform (High - Q2-Q3 2024)</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
