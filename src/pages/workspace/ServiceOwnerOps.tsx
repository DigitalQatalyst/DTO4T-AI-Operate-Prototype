import { useState } from 'react';
import { Plus, Settings, Tag, HelpCircle, Bell } from 'lucide-react';
import PageHeader from '@/components/workspace/PageHeader';
import StatusBadge from '@/components/workspace/StatusBadge';

const services = [
  { id: 'SVC-001', name: 'Document Intelligence Service', category: 'AI Processing', status: 'Active', users: 47, offers: 2, updated: '2025-04-18' },
  { id: 'SVC-002', name: 'AI Copilot Platform', category: 'Productivity', status: 'Active', users: 124, offers: 3, updated: '2025-04-15' },
  { id: 'SVC-003', name: 'Conversational AI — Customer Support', category: 'Customer Experience', status: 'Pending', users: 0, offers: 1, updated: '2025-04-10' },
  { id: 'SVC-004', name: 'RAG Knowledge Base', category: 'Knowledge Management', status: 'Active', users: 31, offers: 2, updated: '2025-04-05' },
];

const offers = [
  { service: 'Document Intelligence Service', tier: 'Standard', access: 'All Business Users', price: 'Included', status: 'Active' },
  { service: 'Document Intelligence Service', tier: 'Premium', access: 'Finance & Legal', price: '$200/mo', status: 'Active' },
  { service: 'AI Copilot Platform', tier: 'Basic', access: 'All Users', price: 'Included', status: 'Active' },
  { service: 'AI Copilot Platform', tier: 'Advanced', access: 'Specialist Teams', price: '$150/mo', status: 'Active' },
];

const tabs = ['Services', 'Offers', 'Categories', 'Support', 'Updates'];

export default function ServiceOwnerOps() {
  const [activeTab, setActiveTab] = useState('Services');
  const [selected, setSelected] = useState(services[0]);

  return (
    <div>
      <PageHeader
        title="Service Owner Operations"
        subtitle="Configure, manage, and maintain AI services on the platform"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0f1f5c] text-white rounded-lg text-sm font-medium hover:bg-[#1a2f7a] transition-colors">
            <Plus className="h-4 w-4" /> New Service
          </button>
        }
      />

      <div className="p-8">
        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 mb-6">
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
            {activeTab === 'Services' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-1 space-y-2">
                  {services.map(svc => (
                    <button
                      key={svc.id}
                      onClick={() => setSelected(svc)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        selected.id === svc.id ? 'border-[#0f1f5c] bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <span className="text-xs font-mono text-gray-400">{svc.id}</span>
                        <StatusBadge state={svc.status} />
                      </div>
                      <p className="text-sm font-semibold text-gray-900">{svc.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{svc.category} · {svc.users} users</p>
                    </button>
                  ))}
                </div>
                <div className="lg:col-span-2 bg-gray-50 rounded-xl border border-gray-200 p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900">{selected.name}</h3>
                      <p className="text-sm text-gray-500 mt-0.5">{selected.category}</p>
                    </div>
                    <StatusBadge state={selected.status} size="md" />
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
                      <p className="text-2xl font-bold text-gray-900">{selected.users}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Active Users</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
                      <p className="text-2xl font-bold text-gray-900">{selected.offers}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Offers</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
                      <p className="text-sm font-bold text-gray-900">{selected.updated}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Last Updated</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      <Settings className="h-3.5 w-3.5" /> Configure
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      <Tag className="h-3.5 w-3.5" /> Manage Offers
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      <Bell className="h-3.5 w-3.5" /> Publish Update
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Offers' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-gray-600">Manage service offers, pricing tiers, and access conditions</p>
                  <button className="flex items-center gap-1.5 px-3 py-2 bg-[#0f1f5c] text-white rounded-lg text-xs font-medium hover:bg-[#1a2f7a] transition-colors">
                    <Plus className="h-3.5 w-3.5" /> New Offer
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        {['Service', 'Tier', 'Access', 'Price', 'Status'].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {offers.map((offer, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 font-medium text-gray-900">{offer.service}</td>
                          <td className="px-4 py-3 text-gray-700">{offer.tier}</td>
                          <td className="px-4 py-3 text-gray-600">{offer.access}</td>
                          <td className="px-4 py-3 text-gray-700">{offer.price}</td>
                          <td className="px-4 py-3"><StatusBadge state={offer.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'Categories' && (
              <div className="space-y-3">
                <p className="text-sm text-gray-600 mb-4">Assign and maintain service taxonomy and category alignment</p>
                {['AI Processing', 'Productivity', 'Customer Experience', 'Knowledge Management', 'Governance & Compliance', 'Analytics & Insights'].map((cat, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Tag className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-900">{cat}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500">{Math.floor(Math.random() * 5) + 1} services</span>
                      <button className="text-xs text-[#0f1f5c] hover:underline font-medium">Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'Support' && (
              <div className="space-y-3">
                <p className="text-sm text-gray-600 mb-4">Link FAQs, guidance, and support flows to each service</p>
                {[
                  { title: 'Getting Started with Document Intelligence', type: 'FAQ', service: 'Document Intelligence Service' },
                  { title: 'AI Copilot Onboarding Guide', type: 'Guide', service: 'AI Copilot Platform' },
                  { title: 'RAG Knowledge Base — Data Ingestion FAQ', type: 'FAQ', service: 'RAG Knowledge Base' },
                  { title: 'Escalation Path — AI Service Issues', type: 'Support Flow', service: 'All Services' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.type} · {item.service}</p>
                      </div>
                    </div>
                    <button className="text-xs text-[#0f1f5c] hover:underline font-medium">Edit</button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'Updates' && (
              <div className="space-y-3">
                <p className="text-sm text-gray-600 mb-4">Publish service changes, version notes, and availability updates</p>
                {[
                  { service: 'Document Intelligence Service', version: 'v2.1', note: 'Improved extraction accuracy for scanned PDFs. New table detection feature.', date: '2025-04-18', status: 'Published' },
                  { service: 'AI Copilot Platform', version: 'v3.0', note: 'Major update: multi-modal support, improved context window, new governance controls.', date: '2025-04-15', status: 'Published' },
                  { service: 'RAG Knowledge Base', version: 'v1.4', note: 'Performance improvements and new chunking strategies for large documents.', date: '2025-04-05', status: 'Draft' },
                ].map((update, i) => (
                  <div key={i} className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="text-sm font-semibold text-gray-900">{update.service}</span>
                        <span className="ml-2 text-xs text-gray-500 font-mono">{update.version}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">{update.date}</span>
                        <StatusBadge state={update.status} />
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{update.note}</p>
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
