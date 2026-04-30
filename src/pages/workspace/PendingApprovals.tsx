import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, DollarSign, AlertCircle, FileText } from 'lucide-react';
import { User, Approval } from '../../types/workspace';
import { workspaceDataService } from '../../services/workspaceData';

interface PendingApprovalsProps {
  user: User;
}

export default function PendingApprovals({ user }: PendingApprovalsProps) {
  const [loading, setLoading] = useState(true);
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [selectedApproval, setSelectedApproval] = useState<Approval | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState<'approve' | 'reject'>('approve');
  const [justification, setJustification] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await workspaceDataService.getPendingApprovals(user.id);
        setApprovals(data);
      } catch (error) {
        console.error('Error fetching pending approvals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.id]);

  const handleApprovalAction = (approval: Approval, action: 'approve' | 'reject') => {
    setSelectedApproval(approval);
    setModalAction(action);
    setShowModal(true);
    setJustification('');
  };

  const submitApproval = async () => {
    if (!selectedApproval) return;

    // Remove the approval from the list
    setApprovals(approvals.filter(a => a.id !== selectedApproval.id));
    setShowModal(false);
    setSelectedApproval(null);
    setJustification('');
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'Critical':
      case 'High':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Pending Approvals</h1>
        <p className="text-gray-600 mt-1">Review and approve requests from your team</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Pending</p>
              <p className="text-2xl font-bold text-gray-900">{approvals.length}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Critical</p>
              <p className="text-2xl font-bold text-red-600">
                {approvals.filter(a => a.urgency === 'Critical').length}
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-orange-600">
                {approvals.filter(a => a.urgency === 'High').length}
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-orange-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-green-600">
                ${(approvals.reduce((sum, a) => sum + (a.estimatedCost || 0), 0) / 1000).toFixed(0)}K
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Approvals List */}
      <div className="space-y-4">
        {approvals.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">All Caught Up!</h3>
            <p className="text-gray-600">You have no pending approvals at this time.</p>
          </div>
        ) : (
          approvals.map(approval => (
            <div
              key={approval.id}
              className={`bg-white rounded-lg shadow border-l-4 ${getUrgencyColor(approval.urgency)} p-6`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getUrgencyIcon(approval.urgency)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(approval.urgency)}`}>
                      {approval.urgency} Priority
                    </span>
                    <span className="text-sm text-gray-500">
                      {approval.type === 'request' ? 'AI Request' : 'AI Opportunity'}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{approval.itemTitle}</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Submitted By</p>
                      <p className="font-medium text-gray-900">{approval.submittedBy}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Submitted Date</p>
                      <p className="font-medium text-gray-900">
                        {new Date(approval.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                    {approval.estimatedCost && (
                      <div>
                        <p className="text-sm text-gray-600">Estimated Cost</p>
                        <p className="font-medium text-gray-900">
                          ${(approval.estimatedCost / 1000).toFixed(0)}K
                        </p>
                      </div>
                    )}
                    {approval.estimatedDuration && (
                      <div>
                        <p className="text-sm text-gray-600">Duration</p>
                        <p className="font-medium text-gray-900">{approval.estimatedDuration}</p>
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-1">Justification</p>
                    <p className="text-sm text-gray-600">{approval.justification}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => handleApprovalAction(approval, 'reject')}
                  className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>
                <button
                  onClick={() => handleApprovalAction(approval, 'approve')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Approval/Rejection Modal */}
      {showModal && selectedApproval && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {modalAction === 'approve' ? 'Approve Request' : 'Reject Request'}
            </h2>
            
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">{selectedApproval.itemTitle}</h3>
              <p className="text-sm text-gray-600 mb-4">
                Submitted by {selectedApproval.submittedBy} on{' '}
                {new Date(selectedApproval.submittedAt).toLocaleDateString()}
              </p>

              {modalAction === 'approve' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-green-800">
                    By approving this request, you confirm that it aligns with team priorities and has
                    the necessary resources allocated.
                  </p>
                </div>
              )}

              {modalAction === 'reject' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-red-800">
                    Please provide a clear justification for rejection to help the submitter understand
                    the decision.
                  </p>
                </div>
              )}

              <label className="block text-sm font-medium text-gray-700 mb-2">
                {modalAction === 'approve' ? 'Approval Notes (Optional)' : 'Rejection Reason (Required)'}
              </label>
              <textarea
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={
                  modalAction === 'approve'
                    ? 'Add any notes or conditions for this approval...'
                    : 'Explain why this request is being rejected...'
                }
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedApproval(null);
                  setJustification('');
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={submitApproval}
                disabled={modalAction === 'reject' && !justification.trim()}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  modalAction === 'approve'
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-red-600 text-white hover:bg-red-700'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {modalAction === 'approve' ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Confirm Approval
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4" />
                    Confirm Rejection
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
