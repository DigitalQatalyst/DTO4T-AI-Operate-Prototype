import { useState, useEffect } from 'react';
import { Filter, Search, ArrowUpDown, CheckCircle, Send, Eye } from 'lucide-react';
import { User, AIOpportunity, OpportunityState } from '../../types/workspace';
import { workspaceDataService } from '../../services/workspaceData';
import DataTable from '../../components/workspace/DataTable';

interface TeamOpportunitiesProps {
  user: User;
}

export default function TeamOpportunities({ user }: TeamOpportunitiesProps) {
  const [loading, setLoading] = useState(true);
  const [opportunities, setOpportunities] = useState<AIOpportunity[]>([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<AIOpportunity[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<OpportunityState | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [selectedOpportunity, setSelectedOpportunity] = useState<AIOpportunity | null>(null);
  const [showActionModal, setShowActionModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await workspaceDataService.getTeamOpportunities(user.id);
        setOpportunities(data);
        setFilteredOpportunities(data);
      } catch (error) {
        console.error('Error fetching team opportunities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.id]);

  useEffect(() => {
    let filtered = opportunities;

    if (searchTerm) {
      filtered = filtered.filter(opp =>
        opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(opp => opp.state === statusFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(opp => opp.priority === priorityFilter);
    }

    setFilteredOpportunities(filtered);
  }, [searchTerm, statusFilter, priorityFilter, opportunities]);

  const handleAssess = (opportunity: AIOpportunity) => {
    setSelectedOpportunity(opportunity);
    setShowActionModal(true);
  };

  const handleRoute = async (serviceArea: string) => {
    if (!selectedOpportunity) return;
    
    // Update opportunity state to "Routed"
    const updatedOpportunities = opportunities.map(opp =>
      opp.id === selectedOpportunity.id
        ? { ...opp, state: 'Routed' as OpportunityState, assignedTo: serviceArea }
        : opp
    );
    setOpportunities(updatedOpportunities);
    setShowActionModal(false);
    setSelectedOpportunity(null);
  };

  const getStatusColor = (state: OpportunityState) => {
    switch (state) {
      case 'Captured': return 'bg-gray-100 text-gray-800';
      case 'In Assessment': return 'bg-blue-100 text-blue-800';
      case 'Routed': return 'bg-green-100 text-green-800';
      case 'In Progression': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const columns = [
    {
      key: 'title',
      label: 'Opportunity',
      render: (opp: AIOpportunity) => (
        <div>
          <p className="font-medium text-gray-900">{opp.title}</p>
          <p className="text-sm text-gray-600">{opp.submittedBy}</p>
        </div>
      )
    },
    {
      key: 'category',
      label: 'Category',
      render: (opp: AIOpportunity) => (
        <span className="text-sm text-gray-700">{opp.category}</span>
      )
    },
    {
      key: 'priority',
      label: 'Priority',
      render: (opp: AIOpportunity) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(opp.priority)}`}>
          {opp.priority}
        </span>
      )
    },
    {
      key: 'state',
      label: 'Status',
      render: (opp: AIOpportunity) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(opp.state)}`}>
          {opp.state}
        </span>
      )
    },
    {
      key: 'submittedAt',
      label: 'Submitted',
      render: (opp: AIOpportunity) => (
        <span className="text-sm text-gray-600">
          {new Date(opp.submittedAt).toLocaleDateString()}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (opp: AIOpportunity) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleAssess(opp)}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
            title="Assess & Route"
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
        <h1 className="text-3xl font-bold text-gray-900">Team Opportunities</h1>
        <p className="text-gray-600 mt-1">Review and route AI opportunities from your team</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search opportunities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as OpportunityState | 'all')}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="all">All Statuses</option>
              <option value="Captured">Captured</option>
              <option value="In Assessment">In Assessment</option>
              <option value="Routed">Routed</option>
              <option value="In Progression">In Progression</option>
            </select>
          </div>
          <div className="relative">
            <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="all">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-600">
              Showing {filteredOpportunities.length} of {opportunities.length} opportunities
            </span>
          </div>
        </div>
      </div>

      {/* Opportunities Table */}
      <div className="bg-white rounded-lg shadow">
        <DataTable
          data={filteredOpportunities}
          columns={columns}
          emptyMessage="No opportunities found"
        />
      </div>

      {/* Assessment & Routing Modal */}
      {showActionModal && selectedOpportunity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Assess & Route Opportunity</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="font-semibold text-gray-900">{selectedOpportunity.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{selectedOpportunity.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-medium">{selectedOpportunity.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Priority</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedOpportunity.priority)}`}>
                    {selectedOpportunity.priority}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Submitted By</p>
                  <p className="font-medium">{selectedOpportunity.submittedBy}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Submitted Date</p>
                  <p className="font-medium">{new Date(selectedOpportunity.submittedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Route to Service Area
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select service area...</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Process Automation">Process Automation</option>
                <option value="NLP & Chatbots">NLP & Chatbots</option>
                <option value="Computer Vision">Computer Vision</option>
              </select>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowActionModal(false);
                  setSelectedOpportunity(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRoute('Data Analytics')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Route Opportunity
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
