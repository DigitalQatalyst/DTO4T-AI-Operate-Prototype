import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockItems } from '@/data/aiopsFrameworkMarketplace';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import LoginModal from '@/components/LoginModal';
import { ChevronRight, Home, Clock, Users, Target, Award, BookOpen, CheckCircle2, ArrowLeft, Lock } from 'lucide-react';
import { useState, useEffect } from 'react';

const AIOpsFrameworkDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const [isChecking, setIsChecking] = useState(true); // Add loading state
  
  useEffect(() => {
    // Check if user is logged in AND has unlocked content in this session
    const user = localStorage.getItem('currentUser');
    const hasUnlockedContent = sessionStorage.getItem(`unlocked_${id}`);
    
    // ONLY unlock if BOTH conditions are true
    if (user && hasUnlockedContent === 'true') {
      setIsLoggedIn(true);
      setShowFullContent(true);
    } else {
      setShowFullContent(false);
      setIsLoggedIn(false);
    }
    
    setIsChecking(false);
  }, [id]);

  const handleViewContent = () => {
    // Check if user is logged in
    const user = localStorage.getItem('currentUser');
    
    if (!user) {
      setShowLoginModal(true);
    } else {
      setIsLoggedIn(true);
      setShowFullContent(true);
      // Mark this content as unlocked in this session
      sessionStorage.setItem(`unlocked_${id}`, 'true');
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowFullContent(true);
    setShowLoginModal(false);
    // Mark this content as unlocked in this session
    sessionStorage.setItem(`unlocked_${id}`, 'true');
  };
  
  const item = mockItems.find(i => i.id === id);

  if (!item) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen bg-white pt-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900">Content Not Found</h1>
            <Link to="/aiops-framework" className="text-blue-600 hover:underline mt-4 inline-block">
              ← Back to AIOps Build Library
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const typeLabels: Record<string, string> = {
    insight: 'Framework Document',
    regulatory: 'Policy Document',
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 pt-16">
        
        {/* Breadcrumb */}
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
              <Link to="/" className="hover:text-gray-900">Deploys</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link to="/aiops-framework" className="hover:text-gray-900">AIOps Build Library</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-gray-900">{typeLabels[item.type]}</span>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-16 pt-6">
          <button 
            onClick={() => navigate('/aiops-framework')}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to AIOps Build Library
          </button>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-16 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Header Card */}
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <div className="flex items-start justify-between mb-4">
                  <span className="inline-block px-3 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full">
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

                {/* Meta Info */}
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
                  {item.stage && (
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>Stage: {item.stage}</span>
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {item.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="border-b border-gray-200">
                  <div className="flex gap-0">
                    {['overview', 'details', 'implementation'].map(tab => (
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
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-8">
                  {!showFullContent ? (
                    // Locked Content Preview
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                        <Lock className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Content Locked</h3>
                      <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        Login to access the full framework documentation, implementation guides, and governance templates.
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
                            <p className="text-gray-700 leading-relaxed">
                              This {typeLabels[item.type].toLowerCase()} provides essential guidance for implementing 
                              enterprise-grade AI governance. The content has been reviewed and approved by the {item.ownerTeam} team 
                              to ensure alignment with organizational standards and regulatory requirements.
                            </p>
                          </div>

                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Key Information</h3>
                            <ul className="space-y-2">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">Target audience: {item.audience.join(', ')}</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">Topic areas: {item.topic.join(', ')}</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">Status: {item.status}</span>
                              </li>
                              {item.theme && (
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700">Theme: {item.theme}</span>
                                </li>
                              )}
                              {item.stage && (
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700">Lifecycle stage: {item.stage}</span>
                                </li>
                              )}
                            </ul>
                          </div>

                          {item.type === 'insight' && (
                            <div>
                              <h3 className="text-lg font-bold text-gray-900 mb-3">Framework Components</h3>
                              <p className="text-gray-700 leading-relaxed mb-3">
                                This framework provides comprehensive guidance across multiple dimensions:
                              </p>
                              <ul className="space-y-2 ml-4">
                                <li className="text-gray-700">• Clear roles and responsibilities definition</li>
                                <li className="text-gray-700">• Decision-making authority and escalation paths</li>
                                <li className="text-gray-700">• Process workflows and approval gates</li>
                                <li className="text-gray-700">• Compliance and audit requirements</li>
                              </ul>
                            </div>
                          )}

                          {item.type === 'regulatory' && (
                            <div>
                              <h3 className="text-lg font-bold text-gray-900 mb-3">Policy Requirements</h3>
                              <p className="text-gray-700 leading-relaxed mb-3">
                                This policy document establishes mandatory controls and requirements:
                              </p>
                              <ul className="space-y-2 ml-4">
                                <li className="text-gray-700">• Risk assessment and mitigation procedures</li>
                                <li className="text-gray-700">• Transparency and explainability standards</li>
                                <li className="text-gray-700">• Data governance and privacy controls</li>
                                <li className="text-gray-700">• Monitoring and reporting obligations</li>
                              </ul>
                            </div>
                          )}
                        </div>
                      )}

                      {activeTab === 'details' && (
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Detailed Information</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                              This section provides comprehensive details about the {typeLabels[item.type].toLowerCase()}.
                            </p>
                          </div>

                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Document Specifications</h3>
                            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                              <div className="flex justify-between py-2 border-b border-gray-200">
                                <span className="text-gray-600">Document Type</span>
                                <span className="font-semibold text-gray-900">{typeLabels[item.type]}</span>
                              </div>
                              <div className="flex justify-between py-2 border-b border-gray-200">
                                <span className="text-gray-600">Owner Team</span>
                                <span className="font-semibold text-gray-900">{item.ownerTeam}</span>
                              </div>
                              <div className="flex justify-between py-2 border-b border-gray-200">
                                <span className="text-gray-600">Status</span>
                                <span className="font-semibold text-gray-900">{item.status}</span>
                              </div>
                              {item.theme && (
                                <div className="flex justify-between py-2 border-b border-gray-200">
                                  <span className="text-gray-600">Theme</span>
                                  <span className="font-semibold text-gray-900">{item.theme}</span>
                                </div>
                              )}
                              {item.stage && (
                                <div className="flex justify-between py-2">
                                  <span className="text-gray-600">Lifecycle Stage</span>
                                  <span className="font-semibold text-gray-900">{item.stage}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Scope and Applicability</h3>
                            <p className="text-gray-700 leading-relaxed mb-3">
                              This framework applies to all AI initiatives within the organization and is mandatory for:
                            </p>
                            <ul className="space-y-2 ml-4">
                              <li className="text-gray-700">• All AI/ML model development and deployment</li>
                              <li className="text-gray-700">• Third-party AI tool procurement and integration</li>
                              <li className="text-gray-700">• AI-powered business process automation</li>
                              <li className="text-gray-700">• Generative AI and LLM implementations</li>
                            </ul>
                          </div>
                        </div>
                      )}

                      {activeTab === 'implementation' && (
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Implementation Guide</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                              Practical guidance for implementing this {typeLabels[item.type].toLowerCase()} in your organization.
                            </p>
                          </div>

                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Getting Started</h3>
                            <div className="space-y-4">
                              <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0f1f5c] text-white flex items-center justify-center font-bold text-sm">
                                  1
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-1">Review and Customize</h4>
                                  <p className="text-gray-700 text-sm">
                                    Review the framework documentation and customize it to fit your organizational context and requirements.
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0f1f5c] text-white flex items-center justify-center font-bold text-sm">
                                  2
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-1">Stakeholder Alignment</h4>
                                  <p className="text-gray-700 text-sm">
                                    Engage key stakeholders across {item.audience.join(', ')} roles to ensure buy-in and alignment.
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0f1f5c] text-white flex items-center justify-center font-bold text-sm">
                                  3
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-1">Pilot Implementation</h4>
                                  <p className="text-gray-700 text-sm">
                                    Start with a pilot project to validate the framework and identify any adjustments needed.
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0f1f5c] text-white flex items-center justify-center font-bold text-sm">
                                  4
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-1">Scale and Monitor</h4>
                                  <p className="text-gray-700 text-sm">
                                    Roll out across the organization and establish ongoing monitoring and improvement processes.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Available Resources</h3>
                            <div className="space-y-2">
                              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <BookOpen className="h-5 w-5 text-purple-600" />
                                <span className="font-medium text-gray-900">Implementation Templates</span>
                              </div>
                              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <BookOpen className="h-5 w-5 text-purple-600" />
                                <span className="font-medium text-gray-900">Training Materials</span>
                              </div>
                              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <BookOpen className="h-5 w-5 text-purple-600" />
                                <span className="font-medium text-gray-900">Best Practice Examples</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              
              {/* Provider Info */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Document Info
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-600">Maintained by</span>
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
                  {item.theme && (
                    <div>
                      <span className="text-gray-600">Theme</span>
                      <div className="font-semibold text-gray-900 mt-1">{item.theme}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="h-5 w-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-900">Quick Stats</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Downloads</span>
                    <span className="font-semibold text-gray-900">847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Implementations</span>
                    <span className="font-semibold text-gray-900">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Rating</span>
                    <span className="font-semibold text-gray-900">4.7/5.0</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
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
                  Download Framework
                </button>
                <button className="w-full py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-lg transition-colors">
                  Share with Team
                </button>
              </div>

              {/* Related Topics */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Related Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {item.topic.map(topic => (
                    <span key={topic} className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related Content */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Frameworks</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockItems.filter(i => i.id !== id).slice(0, 3).map(relatedItem => (
                <Link
                  key={relatedItem.id}
                  to={`/aiops-framework/${relatedItem.id}`}
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
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLoginSuccess}
      />
      
      <Footer />
    </>
  );
};

export default AIOpsFrameworkDetail;
