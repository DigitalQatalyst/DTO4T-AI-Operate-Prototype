import { useState, useEffect } from 'react';
import { AlertCircle, Clock, CheckCircle, XCircle, Filter, MessageSquare } from 'lucide-react';
import { User, Escalation } from '../../types/workspace';
import { workspaceDataService } from '../../services/workspaceData';

interface EscalationsProps {
  user: User;
}

type SeverityFilter = 'All' | 'Critical' | 'High' | 'Medium' | 'Low';
type StatusFilter = 'All' | 'Open' | 'In Progress' | 'Resolved';

export default function Escalations({ user }: EscalationsProps) {
  const [loading, setLoading] = useState(true);
  const [escalations, setEscalations] = useState<Escalation[]>([]);
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>('All');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [selectedEscalation, setSelectedEscalation] = useState<Escalation | null>(null);
  const [showActionModal, setShowActionModal] = useState(false);

  useEffect(() => {
    loadEscalations();
  }, [user.id]);

  const loadEscalations = async () => {
    setLoading(true);
    try {
      const data = await workspaceDataService.getEscalations(user.id);
      setEscalations(data);
    } catch (error) {
      console.error('Failed to load escalations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEscalations = escalations.filter((esc) => {
    if (severityFilter !== 'All' && esc.severity !== severityFilter) return false;
    if (statusFilter !== 'All' && esc.status !== statusFilter) return false;
    return true;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'High': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'text-red-600 bg-red-50';
      case 'In Progress': return 'text-blue-600 bg-blue-50';
      case 'Resolved': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Open': return <AlertCircle className="w-4 h-4" />;
      case 'In Progress': return <Clock className="w-4 h-4" />;
      case 'Resolved': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleAction = (escalation: Escalation, action: 'acknowledge' | 'resolve' | 'reassign') => {
    setSelectedEscalation(escalation);
    setShowActionModal(true);
    // In a real app, this would trigger the appropriate action
    console.log(`Action ${action} on escalation ${escalation.id}`);
  };

  const getTimeSince = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    return 'Just now';
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Escalations</h1>
          <p className="text-gray-600 mt-1">Loading escalations...</p>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header with Filters */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Escalations</h1>
            <p className="text-gray-600 mt-1">Issues requiring manager intervention</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{filteredEscalations.length} escalations</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Severity:</span>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value as SeverityFilter)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Escalations List */}
      {filteredEscalations.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <p className="text-gray-600">No escalations found</p>
          <p className="text-sm text-gray-500 mt-1">All issues are being handled smoothly</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEscalations.map((escalation) => (
            <div key={escalation.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getSeverityColor(escalation.severity)}`}>
                      {escalation.severity}
                    </span>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${getStatusColor(escalation.status)}`}>
                      {getStatusIcon(escalation.status)}
                      {escalation.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      {escalation.relatedItemType === 'opportunity' ? 'AI Opportunity' : 'AI Request'} #{escalation.relatedItemId}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{escalation.title}</h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-4">{escalation.description}</p>

              {/* Timeline */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Escalation Timeline</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">Escalated by {escalation.raisedBy}</p>
                      <p className="text-xs text-gray-500">{getTimeSince(escalation.raisedAt)}</p>
                    </div>
                  </div>
                  {escalation.status === 'In Progress' && (
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">Investigation started</p>
                        <p className="text-xs text-gray-500">2h ago</p>
                      </div>
                    </div>
                  )}
                  {escalation.status === 'Resolved' && (
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">Issue resolved</p>
                        <p className="text-xs text-gray-500">1d ago</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                {escalation.status === 'Open' && (
                  <>
                    <button
                      onClick={() => handleAction(escalation, 'acknowledge')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Acknowledge
                    </button>
                    <button
                      onClick={() => handleAction(escalation, 'reassign')}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                    >
                      Reassign
                    </button>
                  </>
                )}
                {escalation.status === 'In Progress' && (
                  <>
                    <button
                      onClick={() => handleAction(escalation, 'resolve')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      Mark Resolved
                    </button>
                    <button
                      onClick={() => handleAction(escalation, 'reassign')}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                    >
                      Reassign
                    </button>
                  </>
                )}
                <button
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Add Comment
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Action Modal (placeholder) */}
      {showActionModal && selectedEscalation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Action on Escalation
            </h3>
            <p className="text-gray-600 mb-4">
              {selectedEscalation.title}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowActionModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowActionModal(false);
                  // Handle action
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
