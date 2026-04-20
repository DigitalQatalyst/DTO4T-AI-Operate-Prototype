import { User, Mail, Briefcase, Bookmark, History, FileText } from 'lucide-react';
import PageHeader from '@/components/workspace/PageHeader';
import StatusBadge from '@/components/workspace/StatusBadge';
import type { UserRole } from '@/types/workspace';

interface ProfileAccountProps {
  user: { name: string; role: UserRole; email: string };
}

const roleLabels: Record<UserRole, string> = {
  employee: 'Business User / Employee',
  manager: 'Manager / Team Lead',
  owner: 'Service Owner / Business Owner',
  specialist: 'Specialist Team',
  admin: 'Platform Admin / Governance',
  executive: 'Leadership / Executive',
};

const ownedItems = [
  { id: 'REQ-001', title: 'AI Copilot Access — Legal Team', type: 'Request', status: 'Under Review' },
  { id: 'OPP-001', title: 'Automated Invoice Processing', type: 'Opportunity', status: 'In Progress' },
  { id: 'REQ-004', title: 'RAG Knowledge Base — HR Policies', type: 'Request', status: 'Draft' },
];

const savedPathways = [
  { title: 'RAG Implementation Guide', category: 'Knowledge', saved: '3 days ago' },
  { title: 'Prompt Engineering Best Practices', category: 'Learning', saved: '1 week ago' },
  { title: 'AI Governance Framework v2', category: 'Governance', saved: '2 weeks ago' },
  { title: 'Agent Lifecycle Management Blueprint', category: 'Blueprint', saved: '3 weeks ago' },
];

const participationHistory = [
  { action: 'Completed training: Prompt Engineering Basics', date: '2025-04-15', type: 'training' },
  { action: 'Submitted AI Opportunity: Invoice Processing', date: '2025-03-10', type: 'opportunity' },
  { action: 'Reviewed: Document Analysis Tool request', date: '2025-03-05', type: 'review' },
  { action: 'Completed workflow: AI Copilot Onboarding', date: '2025-02-20', type: 'workflow' },
];

export default function ProfileAccount({ user }: ProfileAccountProps) {
  return (
    <div>
      <PageHeader title="Profile & Account" subtitle="Your account details, owned items, and activity history" />

      <div className="p-8 space-y-6">
        {/* Account Details */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start gap-5">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, rgb(251,85,53) 0%, rgb(26,46,110) 100%)' }}
            >
              {user.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500 mt-0.5">{roleLabels[user.role]}</p>
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4 text-gray-400" />
                  {user.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Briefcase className="h-4 w-4 text-gray-400" />
                  DigitalQatalyst — AI Operations
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="h-4 w-4 text-gray-400" />
                  {roleLabels[user.role]}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Owned Items */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
              <FileText className="h-4 w-4 text-gray-500" />
              <h2 className="font-semibold text-gray-900">Owned Items</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {ownedItems.map((item, i) => (
                <div key={i} className="px-5 py-3.5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-400 font-mono">{item.id}</span>
                      <span className="text-xs text-gray-400">·</span>
                      <span className="text-xs text-gray-500">{item.type}</span>
                    </div>
                  </div>
                  <StatusBadge state={item.status} />
                </div>
              ))}
            </div>
          </div>

          {/* Saved Pathways */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
              <Bookmark className="h-4 w-4 text-gray-500" />
              <h2 className="font-semibold text-gray-900">Saved Pathways</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {savedPathways.map((item, i) => (
                <div key={i} className="px-5 py-3.5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.category} · Saved {item.saved}</p>
                  </div>
                  <button className="text-xs text-[#0f1f5c] hover:underline font-medium">View</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Participation History */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
            <History className="h-4 w-4 text-gray-500" />
            <h2 className="font-semibold text-gray-900">Participation History</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {participationHistory.map((entry, i) => (
              <div key={i} className="px-5 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#0f1f5c] flex-shrink-0" />
                  <p className="text-sm text-gray-900">{entry.action}</p>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0 ml-4">{entry.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
