import { useState } from 'react';
import { Users, Tag, Settings, ToggleLeft, Plus } from 'lucide-react';
import PageHeader from '@/components/workspace/PageHeader';
import StatusBadge from '@/components/workspace/StatusBadge';

const users = [
  { name: 'Sarah Mitchell', email: 'sarah.mitchell@dq.ai', role: 'employee', status: 'Active', lastLogin: '2025-04-20' },
  { name: 'David Chen', email: 'david.chen@dq.ai', role: 'manager', status: 'Active', lastLogin: '2025-04-19' },
  { name: 'James Okafor', email: 'james.okafor@dq.ai', role: 'owner', status: 'Active', lastLogin: '2025-04-18' },
  { name: 'Priya Nair', email: 'priya.nair@dq.ai', role: 'specialist', status: 'Active', lastLogin: '2025-04-20' },
  { name: 'Tom Adeyemi', email: 'tom.adeyemi@dq.ai', role: 'employee', status: 'Pending', lastLogin: 'Never' },
];

const roleLabels: Record<string, string> = {
  employee: 'Business User',
  manager: 'Manager',
  owner: 'Service Owner',
  specialist: 'Specialist',
  admin: 'Platform Admin',
  executive: 'Executive',
};

const featureFlags = [
  { name: 'Advanced AI Operations', module: 'S04', enabled: true },
  { name: 'Executive Dashboard', module: 'S04', enabled: true },
  { name: 'Specialist Workspaces', module: 'S04', enabled: false },
  { name: 'Governance Automation', module: 'S03', enabled: true },
  { name: 'Multi-level Approvals', module: 'S03', enabled: true },
];

const tabs = ['Users', 'Taxonomy', 'Services', 'Feature Flags'];

export default function PlatformAdmin() {
  const [activeTab, setActiveTab] = useState('Users');
  const [search, setSearch] = useState('');

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PageHeader title="Platform Admin Operations" subtitle="User access, taxonomy, service configuration, and feature management" />

      <div className="p-8">
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="flex border-b border-gray-200 px-4 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab ? 'border-[#0f1f5c] text-[#0f1f5c]' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-5">
            {activeTab === 'Users' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1f5c] w-64"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                  <button className="flex items-center gap-1.5 px-3 py-2 bg-[#0f1f5c] text-white rounded-lg text-sm font-medium hover:bg-[#1a2f7a] transition-colors">
                    <Plus className="h-4 w-4" /> Provision User
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        {['Name', 'Email', 'Role', 'Status', 'Last Login', 'Actions'].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredUsers.map((user, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 font-medium text-gray-900">{user.name}</td>
                          <td className="px-4 py-3 text-gray-600 text-xs">{user.email}</td>
                          <td className="px-4 py-3">
                            <span className="text-xs bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded-full font-medium">
                              {roleLabels[user.role]}
                            </span>
                          </td>
                          <td className="px-4 py-3"><StatusBadge state={user.status} /></td>
                          <td className="px-4 py-3 text-xs text-gray-400">{user.lastLogin}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button className="text-xs text-[#0f1f5c] hover:underline font-medium">Edit Role</button>
                              <button className="text-xs text-red-600 hover:underline font-medium">Revoke</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'Taxonomy' && (
              <div className="space-y-3">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-gray-600">Manage categories, tags, content types, and metadata structures</p>
                  <button className="flex items-center gap-1.5 px-3 py-2 bg-[#0f1f5c] text-white rounded-lg text-sm font-medium hover:bg-[#1a2f7a] transition-colors">
                    <Plus className="h-4 w-4" /> Add Category
                  </button>
                </div>
                {['AI Processing', 'Productivity', 'Customer Experience', 'Knowledge Management', 'Governance & Compliance', 'Analytics & Insights', 'Automation', 'Integration'].map((cat, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Tag className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-900">{cat}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-xs text-[#0f1f5c] hover:underline font-medium">Edit</button>
                      <button className="text-xs text-red-600 hover:underline font-medium">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'Services' && (
              <div className="space-y-3">
                <p className="text-sm text-gray-600 mb-4">Enable, disable, and configure platform services and modules</p>
                {[
                  { name: 'Document Intelligence Service', module: 'AI Processing', enabled: true },
                  { name: 'AI Copilot Platform', module: 'Productivity', enabled: true },
                  { name: 'RAG Knowledge Base', module: 'Knowledge Management', enabled: true },
                  { name: 'Conversational AI', module: 'Customer Experience', enabled: false },
                  { name: 'Model Evaluation Suite', module: 'Quality Assurance', enabled: true },
                ].map((svc, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Settings className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{svc.name}</p>
                        <p className="text-xs text-gray-500">{svc.module}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge state={svc.enabled ? 'Active' : 'Closed'} />
                      <button className="text-xs text-[#0f1f5c] hover:underline font-medium">Configure</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'Feature Flags' && (
              <div className="space-y-3">
                <p className="text-sm text-gray-600 mb-4">Feature flags, access toggles, and environment management</p>
                {featureFlags.map((flag, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <ToggleLeft className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{flag.name}</p>
                        <p className="text-xs text-gray-500">Module: {flag.module}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-5 rounded-full transition-colors ${flag.enabled ? 'bg-green-500' : 'bg-gray-300'} relative cursor-pointer`}>
                        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${flag.enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                      </div>
                      <span className="text-xs text-gray-500">{flag.enabled ? 'Enabled' : 'Disabled'}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
