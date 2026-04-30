import { useState, useEffect } from 'react';
import { Send, MessageSquare, Eye, CheckCircle, AlertCircle } from 'lucide-react';
import { User, AIRequest, RequestState } from '../../types/workspace';
import { workspaceDataService } from '../../services/workspaceData';
import DataTable from '../../components/workspace/DataTable';

interface RequestReviewProps {
  user: User;
}

export default function RequestReview({ user }: RequestReviewProps) {
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<AIRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<AIRequest | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showGovernanceModal, setShowGovernanceModal] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await workspaceDataService.getTeamRequests(user.id);
        // Filter for requests in "Submitted" state awaiting manager review
        const pendingReview = data.filter(req => req.state === 'Submitted');
        setRequests(pendingReview);
      } catch (error) {
        console.error('Error fetching team requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.id]);

  const handleProvideFeedback = (request: AIRequest) => {
    setSelectedRequest(request);
    setShowFeedbackModal(true);
    setFeedback('');
  };

  const handleSendToGovernance = (request: AIRequest) => {
    setSelectedRequest(request);
    setShowGovernanceModal(true);
  };

  const submitFeedback = async () => {
    if (!selectedRequest || !feedback.trim()) return;

    // Update request with feedback
    const updatedRequests = requests.map(req =>
      req.id === selectedRequest.id
        ? { ...req, state: 'Clarification Needed' as RequestState }
        : req
    );
    setRequests(updatedRequests.filter(req => req.id !== selectedRequest.id));
    setShowFeedbackModal(false);
    setSelectedRequest(null);
    setFeedback('');
  };

  const submitToGovernance = async () => {
    if (!selectedRequest) return;

    // Update request state to governance review
    const updatedRequests = requests.filter(req => req.id !== selectedRequest.id);
    setRequests(updatedRequests);
    setShowGovernanceModal(false);
    setSelectedRequest(null);
  };

  const getStatusColor = (state: RequestState) => {
    switch (state) {
      case 'Submitted': return 'bg-blue-100 text-blue-800';
      case 'Manager Review': return 'bg-yellow-100 text-yellow-800';
      case 'Governance Review': return 'bg-purple-100 text-purple-800';
      case 'Clarification Needed': return 'bg-orange-100 text-orange-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'In Fulfillment': return 'bg-indigo-100 text-indigo-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const columns = [
    {
      key: 'title',
      label: 'Request',
      render: (req: AIRequest) => (
        <div>
          <p className="font-medium text-gray-900">{req.title}</p>
          <p className="text-sm text-gray-600">{req.submittedBy}</p>
        </div>
      )
    },
    {
      key: 'category',
      label: 'Category',
      render: (req: AIRequest) => (
        <span className="text-sm text-gray-700">{req.category}</span>
      )
    },
    {
      key: 'state',
      label: 'Status',
      render: (req: AIRequest) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(req.state)}`}>
          {req.state}
        </span>
      )
    },
    {
      key: 'submittedAt',
      label: 'Submitted',
      render: (req: AIRequest) => (
        <span className="text-sm text-gray-600">
          {new Date(req.submittedAt).toLocaleDateString()}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (req: AIRequest) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleProvideFeedback(req)}
            className="p-1 text-orange-600 hover:bg-orange-50 rounded"
            title="Provide Feedback"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleSendToGovernance(req)}
            className="p-1 text-green-600 hover:bg-green-50 rounded"
            title="Send to Governance"
          >
            <Send className="w-4 h-4" />
          </button>
          <button
            className="p-1 text-gray-600 hover:bg-gray-50 rounded"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

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
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Request Review</h1>
        <p className="text-gray-600 mt-1">Review AI requests from your team before governance submission</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">{requests.length}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Review Time</p>
              <p className="text-2xl font-bold text-gray-900">2.5 days</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sent to Governance</p>
              <p className="text-2xl font-bold text-gray-900">12 this month</p>
            </div>
            <Send className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-lg shadow">
        {requests.length === 0 ? (
          <div className="p-12 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">All Caught Up!</h3>
            <p className="text-gray-600">No requests pending your review at this time.</p>
          </div>
        ) : (
          <DataTable
            data={requests}
            columns={columns}
            emptyMessage="No requests found"
          />
        )}
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Provide Feedback</h2>
            
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">{selectedRequest.title}</h3>
              <p className="text-sm text-gray-600 mb-4">
                Submitted by {selectedRequest.submittedBy} on{' '}
                {new Date(selectedRequest.submittedAt).toLocaleDateString()}
              </p>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-orange-800">
                  Provide constructive feedback to help the submitter improve their request before
                  sending it to governance review.
                </p>
              </div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Feedback for Submitter
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Explain what needs to be clarified or improved..."
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowFeedbackModal(false);
                  setSelectedRequest(null);
                  setFeedback('');
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={submitFeedback}
                disabled={!feedback.trim()}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MessageSquare className="w-4 h-4" />
                Send Feedback
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Send to Governance Modal */}
      {showGovernanceModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Send to Governance Review</h2>
            
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">{selectedRequest.title}</h3>
              <p className="text-sm text-gray-600 mb-4">
                Submitted by {selectedRequest.submittedBy} on{' '}
                {new Date(selectedRequest.submittedAt).toLocaleDateString()}
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-green-800 mb-2">
                  <strong>Review Checklist:</strong>
                </p>
                <ul className="text-sm text-green-800 space-y-1 ml-4 list-disc">
                  <li>Business justification is clear and compelling</li>
                  <li>Expected outcomes are well-defined</li>
                  <li>Resource requirements are reasonable</li>
                  <li>Aligns with team and organizational priorities</li>
                  <li>No obvious policy or compliance concerns</li>
                </ul>
              </div>

              <p className="text-sm text-gray-600">
                By sending this request to governance, you confirm that it meets the quality standards
                and is ready for policy review and approval.
              </p>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowGovernanceModal(false);
                  setSelectedRequest(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={submitToGovernance}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send to Governance
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
