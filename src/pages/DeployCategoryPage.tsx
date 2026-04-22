import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Package, GitBranch, MessageSquare, Network, Copy, ChevronRight, Home, ArrowRight } from 'lucide-react';

const DeployCategoryPage = () => {
  const marketplaces = [
    {
      icon: Package,
      tag: 'ASSETS',
      title: 'AI Asset Library',
      subtitle: 'Reusable AI Components',
      description: 'Reusable AI assets — prompts, agents, workflows, and evaluation frameworks — versioned, governed, and ready for deployment.',
      link: '/deploys'
    },
    {
      icon: GitBranch,
      tag: 'MLOPS',
      title: 'Model Operations (MLOps)',
      subtitle: 'ML Lifecycle Management',
      description: 'Manage the full ML model lifecycle from build and training through to validation, release, and continuous performance monitoring.',
      link: '/mlops'
    },
    {
      icon: MessageSquare,
      tag: 'BOTOPS',
      title: 'Conversational Systems (BotOps)',
      subtitle: 'Bot Configuration & Operations',
      description: 'Configure, test, release, and monitor conversational AI systems and virtual assistants across the organisation.',
      link: '/botops'
    },
    {
      icon: Network,
      tag: 'AGENTOPS',
      title: 'Agent Operations (AgentOps)',
      subtitle: 'AI Agent Orchestration',
      description: 'Orchestrate, monitor, and govern AI agents — including permissions management, multi-agent coordination, and escalation handling.',
      link: '/agentops'
    },
    {
      icon: Copy,
      tag: 'DTOPS',
      title: 'Digital Twin Operations (DTOps)',
      subtitle: 'Process & Decision Alignment',
      description: 'Align digital twin processes to organisational roles, workflows, and decision ownership structures for operational AI execution.',
      link: '/dtops'
    }
  ];

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-[#0A0F1E] text-white">
        {/* Breadcrumb */}
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Home className="h-4 w-4" />
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-white">Deploy</span>
            </div>
          </div>
        </div>

        {/* Page Header */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-[#3B6EF8]/20 text-[#3B6EF8] text-xs font-bold uppercase tracking-wider rounded-full mb-4">
              MARKETPLACE
            </span>
            <h1 className="text-4xl font-bold text-white mb-4">
              Deploy — Build, Operate & Execute AI
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl">
              Access operational tools for AI models, conversational systems, agents, workflows, and digital twin operations. Deploy is where AI moves from design into live operation.
            </p>
          </div>

          {/* Marketplace Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {marketplaces.map((marketplace, index) => {
              const Icon = marketplace.icon;
              return (
                <div
                  key={index}
                  className="bg-[#111827] border border-white/15 rounded-xl p-6 flex flex-col hover:border-[#3B6EF8]/50 transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 bg-[#3B6EF8] rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Category Tag */}
                  <span className="inline-block px-2 py-1 bg-[#3B6EF8] text-white text-[10px] font-bold uppercase tracking-wider rounded mb-3 self-start">
                    {marketplace.tag}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2">
                    {marketplace.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-sm text-gray-400 mb-3">
                    {marketplace.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-gray-400 mb-6 flex-grow">
                    {marketplace.description}
                  </p>

                  {/* CTA Button */}
                  <Link
                    to={marketplace.link}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#0A0F1E] transition-all duration-300"
                  >
                    Explore Marketplace
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DeployCategoryPage;
