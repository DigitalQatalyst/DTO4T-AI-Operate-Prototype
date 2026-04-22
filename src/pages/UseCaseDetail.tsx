import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockItems } from '@/data/usecaseMarketplace';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import LoginModal from '@/components/LoginModal';
import { ChevronRight, Home, Clock, Users, Target, Award, CheckCircle2, ArrowLeft, Lock } from 'lucide-react';
import { useState, useEffect } from 'react';

const UseCaseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setIsLoggedIn(true);
      setShowFullContent(true);
    }
  }, []);

  const handleViewContent = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      setShowFullContent(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowFullContent(true);
    setShowLoginModal(false);
  };
  
  const item = mockItems.find(i => i.id === id);

  if (!item) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen bg-white pt-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900">Content Not Found</h1>
            <Link to="/usecase" className="text-blue-600 hover:underline mt-4 inline-block">
              ← Back to Use Case Library
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const typeLabels: Record<string, string> = {
    insight: 'Use Case Resource',
    use_case: 'Approved Use Case',
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-16 py-3">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Home className="h-3.5 w-3.5" />
              <Link to="/" className="hover:text-gray-900">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link to="/" className="hover:text-gray-900">Resources</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link to="/" className="hover:text-gray-900">DIA AI Hub</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link to="/usecase" className="hover:text-gray-900">Design</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-gray-900">{typeLabels[item.type]}</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-16 pt-6">
          <button 
            onClick={() => navigate('/usecase')}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Use Case Library
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-16 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <div className="flex items-start justify-between mb-4">
                  <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full">
                    {typeLabels[item.type]}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(item.publishedAt).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {item.title}
                </h1>

                <p className="text-lg text-gray-600 mb-6">
                  {item.summary}
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Owner: {item.ownerTeam}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    <span>Source: {item.source}</span>
                  </div>
                  {item.readTimeMins && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{item.readTimeMins} min read</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mt-6">
                  {item.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200">
                <div className="border-b border-gray-200">
                  <div className="flex gap-0">
                    {['overview', 'business-case', 'implementation'].map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        disabled={!showFullContent}
                        className={`px-6 py-3 text-sm font-medium capitalize border-b-2 transition-colors ${
                          activeTab === tab
                            ? 'border-[#0f1f5c] text-[#0f1f5c]'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        } ${!showFullContent ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {tab.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-8">
                  {!showFullContent ? (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                        <Lock className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Content Locked</h3>
                      <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        Login to access the full use case documentation.
                      </p>
                      <button
                        onClick={handleViewContent}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#0f1f5c] hover:bg-[#0a1640] text-white font-semibold rounded-lg transition-colors"
                      >
                        <Lock className="h-4 w-4" />
                        Login to View Full Content
                      </button>
                    </div>
                  ) : (
                    <>
                      {activeTab === 'overview' && (
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Overview</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                              {item.summary}
                            </p>
                          </div>

                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Key Information</h3>
                            <ul className="space-y-2">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">Relevant for: {item.audience.join(', ')}</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">Topic areas: {item.topic.join(', ')}</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">Status: {item.status}</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      )}

                      {activeTab === 'business-case' && (
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Business Case</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                              Detailed business justification and expected value.
                            </p>
                          </div>
                        </div>
                      )}

                      {activeTab === 'implementation' && (
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Implementation Plan</h2>
                            <div className="space-y-2">
                              {item.audience.map(aud => (
                                <div key={aud} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                  <Users className="h-5 w-5 text-emerald-600" />
                                  <span className="font-medium text-gray-900">{aud}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Provider Info
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-600">Provided by</span>
                    <div className="font-semibold text-gray-900 mt-1">{item.ownerTeam} Team</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Source</span>
                    <div className="font-semibold text-gray-900 mt-1">{item.source}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Status</span>
                    <div className="font-semibold text-gray-900 mt-1">{item.status}</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg border border-emerald-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="h-5 w-5 text-emerald-600" />
                  <h3 className="font-semibold text-gray-900">Quick Stats</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Value Band</span>
                    <span className="font-semibold text-gray-900">{item.valueBand || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Function</span>
                    <span className="font-semibold text-gray-900">{item.function || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-3">
                <button 
                  onClick={handleViewContent}
                  className="w-full py-3 bg-[#0f1f5c] hover:bg-[#0a1640] text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {showFullContent ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Content Unlocked
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" />
                      Login to Access
                    </>
                  )}
                </button>
                <button className="w-full py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-lg transition-colors">
                  Download Use Case
                </button>
                <button className="w-full py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-lg transition-colors">
                  Share with Team
                </button>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Related Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {item.topic.map(topic => (
                    <span key={topic} className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockItems.filter(i => i.id !== id).slice(0, 3).map(relatedItem => (
                <Link
                  key={relatedItem.id}
                  to={`/usecase/${relatedItem.id}`}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded mb-3">
                    {typeLabels[relatedItem.type]}
                  </span>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                    {relatedItem.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {relatedItem.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLoginSuccess}
      />
      
      <Footer />
    </>
  );
};

export default UseCaseDetail;
