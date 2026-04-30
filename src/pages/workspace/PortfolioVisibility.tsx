import { useState, useEffect } from 'react';
import { Briefcase, DollarSign, TrendingUp, AlertTriangle, Filter } from 'lucide-react';
import DataTable, { Column } from '@/components/workspace/DataTable';
import MetricCard from '@/components/workspace/MetricCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { workspaceDataService } from '@/services/workspaceData';
import type { PortfolioItem } from '@/types/workspace';

const statusColors: Record<string, string> = {
  'Completed': 'bg-green-100 text-green-800',
  'In Progress': 'bg-blue-100 text-blue-800',
  'In Fulfilment': 'bg-blue-100 text-blue-800',
  'Under Review': 'bg-yellow-100 text-yellow-800',
  'Under Assessment': 'bg-yellow-100 text-yellow-800',
  'On Hold': 'bg-gray-100 text-gray-800',
};

const riskColors: Record<string, string> = {
  'Low': 'bg-green-100 text-green-800',
  'Medium': 'bg-yellow-100 text-yellow-800',
  'High': 'bg-red-100 text-red-800',
};

export default function PortfolioVisibility() {
  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [filteredPortfolio, setFilteredPortfolio] = useState<PortfolioItem[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [businessUnitFilter, setBusinessUnitFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await workspaceDataService.getPortfolio();
        setPortfolio(data);
        setFilteredPortfolio(data);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...portfolio];

    if (statusFilter !== 'all') {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    if (businessUnitFilter !== 'all') {
      filtered = filtered.filter((item) => item.businessUnit === businessUnitFilter);
    }

    if (riskFilter !== 'all') {
      filtered = filtered.filter((item) => item.riskLevel === riskFilter);
    }

    setFilteredPortfolio(filtered);
  }, [statusFilter, businessUnitFilter, riskFilter, portfolio]);

  const columns: Column<PortfolioItem>[] = [
    {
      key: 'title',
      label: 'Initiative',
      sortable: true,
      render: (value, row) => (
        <div>
          <p className="font-medium text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{row.type}</p>
        </div>
      ),
    },
    {
      key: 'businessUnit',
      label: 'Business Unit',
      sortable: true,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => (
        <Badge className={statusColors[value as string] || 'bg-gray-100 text-gray-800'}>
          {value}
        </Badge>
      ),
    },
    {
      key: 'investment',
      label: 'Investment',
      sortable: true,
      render: (value) => `$${(value / 1000).toFixed(0)}K`,
      className: 'text-right',
    },
    {
      key: 'expectedValue',
      label: 'Expected Value',
      sortable: true,
      render: (value) => `$${(value / 1000).toFixed(0)}K`,
      className: 'text-right',
    },
    {
      key: 'realizedValue',
      label: 'Realized Value',
      sortable: true,
      render: (value, row) => (
        <div className="text-right">
          <p className="font-medium">${(value / 1000).toFixed(0)}K</p>
          {row.expectedValue > 0 && (
            <p className="text-xs text-gray-500">
              {Math.round((value / row.expectedValue) * 100)}% of target
            </p>
          )}
        </div>
      ),
      className: 'text-right',
    },
    {
      key: 'riskLevel',
      label: 'Risk',
      sortable: true,
      render: (value) => (
        <Badge className={riskColors[value as string]}>
          {value}
        </Badge>
      ),
    },
    {
      key: 'targetCompletionDate',
      label: 'Target Date',
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString(),
    },
  ];

  const totalInvestment = filteredPortfolio.reduce((sum, item) => sum + item.investment, 0);
  const totalExpectedValue = filteredPortfolio.reduce((sum, item) => sum + item.expectedValue, 0);
  const totalRealizedValue = filteredPortfolio.reduce((sum, item) => sum + item.realizedValue, 0);
  const avgROI = totalInvestment > 0 ? ((totalRealizedValue / totalInvestment) * 100) : 0;

  const businessUnits = Array.from(new Set(portfolio.map((item) => item.businessUnit)));
  const statuses = Array.from(new Set(portfolio.map((item) => item.status)));

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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Portfolio Visibility</h1>
        <p className="text-gray-600 mt-1">All active AI initiatives with investment and progress tracking</p>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Initiatives"
          value={filteredPortfolio.length}
          subtitle={`of ${portfolio.length} total`}
          icon={Briefcase}
          variant="default"
        />

        <MetricCard
          title="Total Investment"
          value={`$${(totalInvestment / 1000000).toFixed(1)}M`}
          subtitle="Portfolio investment"
          icon={DollarSign}
          variant="default"
        />

        <MetricCard
          title="Realized Value"
          value={`$${(totalRealizedValue / 1000000).toFixed(1)}M`}
          subtitle={`${Math.round((totalRealizedValue / totalExpectedValue) * 100)}% of expected`}
          icon={TrendingUp}
          trend="up"
          trendValue="+18%"
          variant="success"
        />

        <MetricCard
          title="Average ROI"
          value={`${avgROI.toFixed(0)}%`}
          subtitle="Return on investment"
          icon={TrendingUp}
          trend="up"
          trendValue="+12%"
          variant="success"
        />
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Portfolio Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Business Unit</label>
              <Select value={businessUnitFilter} onValueChange={setBusinessUnitFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Units</SelectItem>
                  {businessUnits.map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Risk Level</label>
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {(statusFilter !== 'all' || businessUnitFilter !== 'all' || riskFilter !== 'all') && (
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setStatusFilter('all');
                  setBusinessUnitFilter('all');
                  setRiskFilter('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Portfolio Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active Initiatives</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredPortfolio}
            columns={columns}
            searchable
            searchPlaceholder="Search initiatives..."
            emptyMessage="No initiatives found matching the selected filters"
          />
        </CardContent>
      </Card>

      {/* Risk Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Risk Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Low', 'Medium', 'High'].map((risk) => {
              const count = filteredPortfolio.filter((item) => item.riskLevel === risk).length;
              const percentage = filteredPortfolio.length > 0
                ? Math.round((count / filteredPortfolio.length) * 100)
                : 0;

              return (
                <div key={risk} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{risk} Risk</span>
                    <Badge className={riskColors[risk]}>{count}</Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        risk === 'Low' ? 'bg-green-500' : risk === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{percentage}% of portfolio</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
