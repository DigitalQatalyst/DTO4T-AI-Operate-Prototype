import { useState, useEffect } from 'react';
import { Shield, Users, CheckCircle, AlertTriangle, Activity, Settings } from 'lucide-react';
import MetricCard from '@/components/workspace/MetricCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SystemHealthMetrics {
  totalUsers: number;
  activeUsers: number;
  totalRequests: number;
  governanceCompliance: number;
  policyViolations: number;
  systemUptime: number;
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<SystemHealthMetrics | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 300));
        
        setMetrics({
          totalUsers: 247,
          activeUsers: 189,
          totalRequests: 156,
          governanceCompliance: 94.2,
          policyViolations: 8,
          systemUptime: 99.8,
        });
      } catch (error) {
        console.error('Error fetching admin dashboard data:', error);
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
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">System health, user activity, and governance overview</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Settings className="w-4 h-4" />
          System Settings
        </Button>
      </div>

      {/* System Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Total Users"
          value={metrics?.totalUsers || 0}
          subtitle={`${metrics?.activeUsers || 0} active in last 7 days`}
          icon={Users}
          variant="default"
        />
        
        <MetricCard
          title="Active Requests"
          value={metrics?.totalRequests || 0}
          subtitle="Across all workflows"
          icon={Activity}
          trend="up"
          trendValue="+12%"
          variant="default"
        />
        
        <MetricCard
          title="Governance Compliance"
          value={`${metrics?.governanceCompliance || 0}%`}
          subtitle="Policy adherence rate"
          icon={CheckCircle}
          trend="up"
          trendValue="+2.3%"
          variant="success"
        />
        
        <MetricCard
          title="Policy Violations"
          value={metrics?.policyViolations || 0}
          subtitle="Requiring review"
          icon={AlertTriangle}
          variant={metrics && metrics.policyViolations > 10 ? 'danger' : 'warning'}
        />
        
        <MetricCard
          title="System Uptime"
          value={`${metrics?.systemUptime || 0}%`}
          subtitle="Last 30 days"
          icon={Shield}
          trend="stable"
          variant="success"
        />
        
        <MetricCard
          title="User Activity"
          value="High"
          subtitle="Peak usage: 2-4 PM"
          icon={Activity}
          trend="up"
          trendValue="+8%"
          variant="default"
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Admin Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Users className="w-6 h-6" />
              <span>Manage Users</span>
            </Button>
            
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Shield className="w-6 h-6" />
              <span>Review Policies</span>
            </Button>
            
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <AlertTriangle className="w-6 h-6" />
              <span>Check Violations</span>
            </Button>
            
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Settings className="w-6 h-6" />
              <span>System Config</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Recent System Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium">New user account created</p>
                  <p className="text-sm text-gray-600">Jessica Martinez added to Sales department</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Policy rule updated</p>
                  <p className="text-sm text-gray-600">PII Data Access Control enabled</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">5 hours ago</span>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-medium">System configuration changed</p>
                  <p className="text-sm text-gray-600">Workflow timeout increased to 48 hours</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>
            
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Policy violation detected</p>
                  <p className="text-sm text-gray-600">High-cost request missing executive approval</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">2 days ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
