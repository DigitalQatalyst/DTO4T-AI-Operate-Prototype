import { useState, useEffect } from 'react';
import { Radio, Server, AlertTriangle, CheckCircle, Calendar, Bell, BellOff } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import { Switch } from '../../components/ui/switch';
import { Label } from '../../components/ui/label';

interface SystemStatus {
  service: string;
  status: 'Operational' | 'Degraded' | 'Down';
  lastChecked: string;
  uptime: number;
}

interface Deployment {
  id: string;
  service: string;
  version: string;
  scheduledDate: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Failed';
  description: string;
  impact: 'Low' | 'Medium' | 'High';
}

interface Incident {
  id: string;
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Investigating' | 'Identified' | 'Monitoring' | 'Resolved';
  affectedServices: string[];
  reportedAt: string;
  resolvedAt?: string;
  description: string;
}

interface SubscriptionPreferences {
  systemStatus: boolean;
  deployments: boolean;
  incidents: boolean;
  maintenanceWindows: boolean;
}

export default function OperationalUpdates() {
  const [loading, setLoading] = useState(true);
  const [systemStatuses, setSystemStatuses] = useState<SystemStatus[]>([]);
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [preferences, setPreferences] = useState<SubscriptionPreferences>({
    systemStatus: true,
    deployments: true,
    incidents: true,
    maintenanceWindows: false,
  });

  useEffect(() => {
    loadOperationalData();
  }, []);

  const loadOperationalData = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API calls
      setSystemStatuses([
        { service: 'AI Model API', status: 'Operational', lastChecked: new Date().toISOString(), uptime: 99.9 },
        { service: 'Data Pipeline', status: 'Operational', lastChecked: new Date().toISOString(), uptime: 99.5 },
        { service: 'Governance Engine', status: 'Degraded', lastChecked: new Date().toISOString(), uptime: 98.2 },
        { service: 'User Portal', status: 'Operational', lastChecked: new Date().toISOString(), uptime: 99.8 },
      ]);

      setDeployments([
        {
          id: '1',
          service: 'AI Model API',
          version: 'v2.3.0',
          scheduledDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'Scheduled',
          description: 'Performance improvements and bug fixes',
          impact: 'Low',
        },
        {
          id: '2',
          service: 'Governance Engine',
          version: 'v1.5.0',
          scheduledDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'Scheduled',
          description: 'New policy rules and compliance features',
          impact: 'Medium',
        },
        {
          id: '3',
          service: 'Data Pipeline',
          version: 'v3.1.2',
          scheduledDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'Completed',
          description: 'Security patches and stability improvements',
          impact: 'Low',
        },
      ]);

      setIncidents([
        {
          id: '1',
          title: 'Governance Engine Slow Response Times',
          severity: 'Medium',
          status: 'Monitoring',
          affectedServices: ['Governance Engine'],
          reportedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          description: 'Investigating elevated response times in policy evaluation',
        },
        {
          id: '2',
          title: 'API Rate Limiting Issues',
          severity: 'Low',
          status: 'Resolved',
          affectedServices: ['AI Model API'],
          reportedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          resolvedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
          description: 'Rate limiting was incorrectly applied to internal services',
        },
      ]);
    } catch (error) {
      console.error('Failed to load operational data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Operational':
        return 'bg-green-100 text-green-800';
      case 'Degraded':
        return 'bg-yellow-100 text-yellow-800';
      case 'Down':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Operational':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'Degraded':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'Down':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default:
        return <Server className="h-5 w-5 text-gray-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'destructive';
      case 'High':
        return 'default';
      case 'Medium':
        return 'secondary';
      case 'Low':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'destructive';
      case 'Medium':
        return 'default';
      case 'Low':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const handlePreferenceChange = (key: keyof SubscriptionPreferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Operational Updates</h1>
        <p className="text-gray-600 mt-2">
          System status, deployment schedules, and incident notifications
        </p>
      </div>

      <Tabs defaultValue="status" className="space-y-6">
        <TabsList>
          <TabsTrigger value="status">
            <Radio className="h-4 w-4 mr-2" />
            System Status
          </TabsTrigger>
          <TabsTrigger value="deployments">
            <Calendar className="h-4 w-4 mr-2" />
            Deployments
          </TabsTrigger>
          <TabsTrigger value="incidents">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Incidents
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <Bell className="h-4 w-4 mr-2" />
            Preferences
          </TabsTrigger>
        </TabsList>

        {/* System Status Tab */}
        <TabsContent value="status" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {systemStatuses.map((status) => (
              <Card key={status.service}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    {getStatusIcon(status.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status.status)}`}>
                      {status.status}
                    </span>
                  </div>
                  <CardTitle className="text-lg mt-2">{status.service}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Uptime</span>
                      <span className="font-medium">{status.uptime}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Last Checked</span>
                      <span className="font-medium">
                        {new Date(status.lastChecked).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Overall System Health</CardTitle>
              <CardDescription>
                {systemStatuses.filter(s => s.status === 'Operational').length} of {systemStatuses.length} services operational
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {systemStatuses.map((status) => (
                  <div key={status.service} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{status.service}</span>
                        <span className="text-sm text-gray-500">{status.uptime}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            status.status === 'Operational' ? 'bg-green-500' :
                            status.status === 'Degraded' ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${status.uptime}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Deployments Tab */}
        <TabsContent value="deployments" className="space-y-4">
          {deployments.map((deployment) => (
            <Card key={deployment.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={getImpactColor(deployment.impact) as any}>
                        {deployment.impact} Impact
                      </Badge>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        deployment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        deployment.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        deployment.status === 'Failed' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {deployment.status}
                      </span>
                    </div>
                    <CardTitle>{deployment.service} {deployment.version}</CardTitle>
                    <CardDescription className="mt-2">
                      {deployment.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {deployment.status === 'Scheduled' ? 'Scheduled for' : 'Deployed on'}{' '}
                    {new Date(deployment.scheduledDate).toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Incidents Tab */}
        <TabsContent value="incidents" className="space-y-4">
          {incidents.map((incident) => (
            <Card key={incident.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={getSeverityColor(incident.severity) as any}>
                        {incident.severity}
                      </Badge>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        incident.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                        incident.status === 'Monitoring' ? 'bg-blue-100 text-blue-800' :
                        incident.status === 'Identified' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {incident.status}
                      </span>
                    </div>
                    <CardTitle>{incident.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {incident.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500">Affected Services: </span>
                    <span className="font-medium">{incident.affectedServices.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Reported: </span>
                    <span className="font-medium">
                      {new Date(incident.reportedAt).toLocaleString()}
                    </span>
                  </div>
                  {incident.resolvedAt && (
                    <div>
                      <span className="text-gray-500">Resolved: </span>
                      <span className="font-medium">
                        {new Date(incident.resolvedAt).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose which operational updates you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="system-status">System Status Changes</Label>
                  <p className="text-sm text-gray-500">
                    Get notified when service status changes
                  </p>
                </div>
                <Switch
                  id="system-status"
                  checked={preferences.systemStatus}
                  onCheckedChange={() => handlePreferenceChange('systemStatus')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="deployments">Deployment Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Receive updates about scheduled and completed deployments
                  </p>
                </div>
                <Switch
                  id="deployments"
                  checked={preferences.deployments}
                  onCheckedChange={() => handlePreferenceChange('deployments')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="incidents">Incident Alerts</Label>
                  <p className="text-sm text-gray-500">
                    Get alerted about system incidents and their resolution
                  </p>
                </div>
                <Switch
                  id="incidents"
                  checked={preferences.incidents}
                  onCheckedChange={() => handlePreferenceChange('incidents')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenance">Maintenance Windows</Label>
                  <p className="text-sm text-gray-500">
                    Receive notifications about planned maintenance
                  </p>
                </div>
                <Switch
                  id="maintenance"
                  checked={preferences.maintenanceWindows}
                  onCheckedChange={() => handlePreferenceChange('maintenanceWindows')}
                />
              </div>

              <div className="pt-4 border-t">
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
