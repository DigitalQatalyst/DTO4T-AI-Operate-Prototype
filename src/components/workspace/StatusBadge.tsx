import type { OpportunityState, RequestState } from '@/types/workspace';

type AnyState = OpportunityState | RequestState | string;

const stateStyles: Record<string, string> = {
  // Opportunity states
  Draft: 'bg-gray-100 text-gray-700 border-gray-200',
  Submitted: 'bg-blue-100 text-blue-800 border-blue-200',
  'Under Assessment': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Routed: 'bg-purple-100 text-purple-800 border-purple-200',
  'In Progress': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  Completed: 'bg-green-100 text-green-800 border-green-200',
  Closed: 'bg-gray-100 text-gray-500 border-gray-200',
  // Request states
  'Under Review': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Approved: 'bg-green-100 text-green-800 border-green-200',
  Returned: 'bg-red-100 text-red-800 border-red-200',
  'In Fulfilment': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  // Generic
  Active: 'bg-green-100 text-green-800 border-green-200',
  Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Critical: 'bg-red-100 text-red-800 border-red-200',
  High: 'bg-orange-100 text-orange-800 border-orange-200',
  Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Low: 'bg-gray-100 text-gray-700 border-gray-200',
};

interface StatusBadgeProps {
  state: AnyState;
  size?: 'sm' | 'md';
  governance?: boolean;
}

export default function StatusBadge({ state, size = 'sm', governance = false }: StatusBadgeProps) {
  const style = stateStyles[state] ?? 'bg-gray-100 text-gray-700 border-gray-200';
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1';
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border font-medium ${style} ${sizeClass}`}>
      {governance && <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />}
      {state}
    </span>
  );
}
