import { useState } from 'react';
import { BookOpen, Plus, FileText, HelpCircle } from 'lucide-react';
import PageHeader from '@/components/workspace/PageHeader';
import StatusBadge from '@/components/workspace/StatusBadge';

const playbooks = [
  { id: 'PB-001', title: 'AI Copilot Adoption Playbook', version: 'v2.3', status: 'Published', audience: 'All Users', updated: '2025-04-10' },
  { id: 'PB-002', title: 'RAG Implementation Playbook', version: 'v1.5', status: 'Published', audience: 'Specialist Team', updated: '2025-03-28' },
  { id: 'PB-003', title: 'AI Governance Playbook', version: 'v3.0', status: 'Draft', audience: 'Admin / Governance', updated: '2025-04-18' },
  { id: 'PB-004', title: 'Prompt Engineering Playbook', version: 'v1.2', status: 'Published', audience: 'All Users', updated: '2025-03-15' },
];

const pathways = [
  { title: 'New Employee AI Onboarding', steps: 5, audience: 'Business User', status: 'Active' },
  { title: 'Manager AI Enablement Journey', steps: 4, audience: 'Manager', status: 'Active' },
  { title: 'Specialist Certification Path', steps: 8, audience: 'Specialist Team', status: 'Draft' },
];

const guidanceAssets = [
  { title: 'AI Request Submission Template', type: 'Template', updated: '2025-04-01' },
  { title: 'Governance Policy Reference v4', type: 'Reference', updated: '2025-03-20' },
  { title: 'AI Use Case Scoring Rubric', type: 'Standard', updated: '2025-03-10' },
  { title: 'Data Handling Guidelines', type: 'Standard', updated: '2025-02-28' },
];

const tabs = ['Playbooks', 'Pathways', 'Guidance Assets', 'Support Content'];

export default function ContentOps() {
  const [activeTab, setActiveTab] = useState('Playbooks');

  return (
    <div>
      <PageHeader
        title="Content & Knowledge Operations"
        subtitle="Manage playbooks, pathways, guidance assets, and support content"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0f1f5c] text-white rounded-lg text-sm font-medium hover:bg-[#1a2f7a] transition-colors">
            <Plus className="h-4 w-4" /> New Content
          </button>
        }
      />

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
            {activeTab === 'Playbooks' && (
              <div className="space-y-3">
                {playbooks.map(pb => (
                  <div key={pb.id} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-gray-900">{pb.title}</p>
                          <span className="text-xs font-mono text-gray-400">{pb.version}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">Audience: {pb.audience} · Updated {pb.updated}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge state={pb.status} />
                      <button className="text-xs text-[#0f1f5c] hover:underline font-medium">Edit</button>
                      <button className="text-xs text-gray-500 hover:underline font-medium">Publish</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'Pathways' && (
              <div className="space-y-3">
                <p className="text-sm text-gray-600 mb-4">Define guided user pathways and curated content journeys</p>
                {pathways.map((path, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{path.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{path.steps} steps · {path.audience}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge state={path.status} />
                      <button className="text-xs text-[#0f1f5c] hover:underline font-medium">Configure</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'Guidance Assets' && (
              <div className="space-y-3">
                <p className="text-sm text-gray-600 mb-4">Manage reusable templates, reference documents, and standards</p>
                {guidanceAssets.map((asset, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{asset.title}</p>
                        <p className="text-xs text-gray-500">{asset.type} · Updated {asset.updated}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-xs text-[#0f1f5c] hover:underline font-medium">Edit</button>
                      <button className="text-xs text-gray-500 hover:underline font-medium">Download</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'Support Content' && (
              <div className="space-y-3">
                <p className="text-sm text-gray-600 mb-4">FAQs, how-to guides, and linked support materials</p>
                {[
                  { title: 'How do I submit an AI request?', type: 'FAQ', views: 342 },
                  { title: 'What is the governance approval process?', type: 'FAQ', views: 218 },
                  { title: 'Getting started with AI Copilot', type: 'How-To', views: 567 },
                  { title: 'Understanding AI opportunity scoring', type: 'How-To', views: 189 },
                  { title: 'Escalation process for AI service issues', type: 'Support Flow', views: 94 },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.type} · {item.views} views</p>
                      </div>
                    </div>
                    <button className="text-xs text-[#0f1f5c] hover:underline font-medium">Edit</button>
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
