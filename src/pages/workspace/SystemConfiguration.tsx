import { useState, useEffect } from 'react';
import { Settings, Save, RotateCcw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SystemConfig {
  workflow: {
    requestTimeout: number;
    autoApprovalThreshold: number;
    escalationDelay: number;
    notificationEnabled: boolean;
  };
  integration: {
    apiEndpoint: string;
    apiKey: string;
    webhookUrl: string;
    syncInterval: number;
    retryAttempts: number;
  };
  platform: {
    maintenanceMode: boolean;
    maxConcurrentRequests: number;
    sessionTimeout: number;
    enableAuditLogging: boolean;
    dataRetentionDays: number;
  };
}

export default function SystemConfiguration() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState<SystemConfig | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      setLoading(true);
      try {
        // Simulate API call with mock data
        await new Promise((resolve) => setTimeout(resolve, 300));
        
        const mockConfig: SystemConfig = {
          workflow: {
            requestTimeout: 48,
            autoApprovalThreshold: 5000,
            escalationDelay: 24,
            notificationEnabled: true,
          },
          integration: {
            apiEndpoint: 'https://api.example.com/v1',
            apiKey: '••••••••••••••••',
            webhookUrl: 'https://webhook.example.com/events',
            syncInterval: 15,
            retryAttempts: 3,
          },
          platform: {
            maintenanceMode: false,
            maxConcurrentRequests: 100,
            sessionTimeout: 30,
            enableAuditLogging: true,
            dataRetentionDays: 365,
          },
        };
        
        setConfig(mockConfig);
      } catch (error) {
        console.error('Error fetching system configuration:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Saving configuration:', config);
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving configuration:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
      // Reset logic would go here
      console.log('Resetting configuration to defaults');
    }
  };

  const updateConfig = (section: keyof SystemConfig, key: string, value: any) => {
    if (config) {
      setConfig({
        ...config,
        [section]: {
          ...config[section],
          [key]: value,
        },
      });
      setHasChanges(true);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="p-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Failed to load system configuration</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Configuration</h1>
          <p className="text-gray-600 mt-1">Manage workflow settings, integrations, and platform behavior</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset to Defaults
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges || saving} className="gap-2">
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {hasChanges && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>You have unsaved changes. Click "Save Changes" to apply them.</AlertDescription>
        </Alert>
      )}

      {/* Configuration Tabs */}
      <Tabs defaultValue="workflow" className="space-y-6">
        <TabsList>
          <TabsTrigger value="workflow">Workflow Settings</TabsTrigger>
          <TabsTrigger value="integration">Integration Configuration</TabsTrigger>
          <TabsTrigger value="platform">Platform Behavior</TabsTrigger>
        </TabsList>

        {/* Workflow Settings */}
        <TabsContent value="workflow" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Request Workflow Settings</CardTitle>
              <CardDescription>Configure timeouts, thresholds, and notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="request-timeout">Request Timeout (hours)</Label>
                <Input
                  id="request-timeout"
                  type="number"
                  value={config.workflow.requestTimeout}
                  onChange={(e) => updateConfig('workflow', 'requestTimeout', parseInt(e.target.value))}
                />
                <p className="text-sm text-gray-500">
                  Time before a pending request is automatically escalated
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="auto-approval">Auto-Approval Threshold ($)</Label>
                <Input
                  id="auto-approval"
                  type="number"
                  value={config.workflow.autoApprovalThreshold}
                  onChange={(e) => updateConfig('workflow', 'autoApprovalThreshold', parseInt(e.target.value))}
                />
                <p className="text-sm text-gray-500">
                  Requests below this amount can be auto-approved if all policies pass
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="escalation-delay">Escalation Delay (hours)</Label>
                <Input
                  id="escalation-delay"
                  type="number"
                  value={config.workflow.escalationDelay}
                  onChange={(e) => updateConfig('workflow', 'escalationDelay', parseInt(e.target.value))}
                />
                <p className="text-sm text-gray-500">
                  Time before blocked requests are escalated to management
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="notifications"
                  checked={config.workflow.notificationEnabled}
                  onCheckedChange={(checked) => updateConfig('workflow', 'notificationEnabled', checked)}
                />
                <Label htmlFor="notifications">Enable workflow notifications</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integration Configuration */}
        <TabsContent value="integration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>External Integration Settings</CardTitle>
              <CardDescription>Configure API endpoints, webhooks, and sync settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="api-endpoint">API Endpoint</Label>
                <Input
                  id="api-endpoint"
                  type="url"
                  value={config.integration.apiEndpoint}
                  onChange={(e) => updateConfig('integration', 'apiEndpoint', e.target.value)}
                />
                <p className="text-sm text-gray-500">Base URL for external API integration</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input
                  id="api-key"
                  type="password"
                  value={config.integration.apiKey}
                  onChange={(e) => updateConfig('integration', 'apiKey', e.target.value)}
                />
                <p className="text-sm text-gray-500">Authentication key for API access</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input
                  id="webhook-url"
                  type="url"
                  value={config.integration.webhookUrl}
                  onChange={(e) => updateConfig('integration', 'webhookUrl', e.target.value)}
                />
                <p className="text-sm text-gray-500">URL to receive event notifications</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sync-interval">Sync Interval (minutes)</Label>
                <Input
                  id="sync-interval"
                  type="number"
                  value={config.integration.syncInterval}
                  onChange={(e) => updateConfig('integration', 'syncInterval', parseInt(e.target.value))}
                />
                <p className="text-sm text-gray-500">Frequency of data synchronization with external systems</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="retry-attempts">Retry Attempts</Label>
                <Select
                  value={config.integration.retryAttempts.toString()}
                  onValueChange={(value) => updateConfig('integration', 'retryAttempts', parseInt(value))}
                >
                  <SelectTrigger id="retry-attempts">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 attempt</SelectItem>
                    <SelectItem value="2">2 attempts</SelectItem>
                    <SelectItem value="3">3 attempts</SelectItem>
                    <SelectItem value="5">5 attempts</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">Number of retry attempts for failed API calls</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Platform Behavior */}
        <TabsContent value="platform" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Behavior Settings</CardTitle>
              <CardDescription>Configure system-wide behavior and performance settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="font-medium">Maintenance Mode</p>
                    <p className="text-sm text-gray-600">Temporarily disable user access for system maintenance</p>
                  </div>
                </div>
                <Switch
                  checked={config.platform.maintenanceMode}
                  onCheckedChange={(checked) => updateConfig('platform', 'maintenanceMode', checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-requests">Max Concurrent Requests</Label>
                <Input
                  id="max-requests"
                  type="number"
                  value={config.platform.maxConcurrentRequests}
                  onChange={(e) => updateConfig('platform', 'maxConcurrentRequests', parseInt(e.target.value))}
                />
                <p className="text-sm text-gray-500">Maximum number of simultaneous requests the system can handle</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input
                  id="session-timeout"
                  type="number"
                  value={config.platform.sessionTimeout}
                  onChange={(e) => updateConfig('platform', 'sessionTimeout', parseInt(e.target.value))}
                />
                <p className="text-sm text-gray-500">Time before inactive user sessions expire</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="data-retention">Data Retention Period (days)</Label>
                <Input
                  id="data-retention"
                  type="number"
                  value={config.platform.dataRetentionDays}
                  onChange={(e) => updateConfig('platform', 'dataRetentionDays', parseInt(e.target.value))}
                />
                <p className="text-sm text-gray-500">How long to retain audit logs and historical data</p>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="audit-logging"
                  checked={config.platform.enableAuditLogging}
                  onCheckedChange={(checked) => updateConfig('platform', 'enableAuditLogging', checked)}
                />
                <Label htmlFor="audit-logging">Enable comprehensive audit logging</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>Current system status and version information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Platform Version</span>
                <span className="font-medium">2.4.1</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Database Version</span>
                <span className="font-medium">PostgreSQL 14.5</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Last Backup</span>
                <span className="font-medium">2 hours ago</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">System Uptime</span>
                <span className="font-medium">15 days, 7 hours</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
