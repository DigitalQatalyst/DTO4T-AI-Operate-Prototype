import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Shield, Layers, Lightbulb, FileText, ChevronRight, Home, ArrowRight } from 'lucide-react';

const DesignCategoryPage = () => {
  const marketplaces = [
    {
      icon: Shield,
      tag: 'GOVERNANCE',
      title: 'AI Governance Frameworks',
      subtitle: 'Enterprise Governance Models',
      description: 'Governance models, accountability structures, lifecycle frameworks, and responsible AI principles for enterprise AI deployment.',
      link: '/aiops-framework'
    },
    {
      icon: Layers,
      tag: 'ARCHITECTURE',
      title: 'AI Architecture Blueprints',
      subtitle: 'Proven Design Patterns',
      description: 'Proven architecture patterns for LLMs, RAG, agents, orchestration, security, and integration — ready to adapt and deploy.',
      link: '/blueprint'
    },
    {
      icon: Lightbulb,
      tag: 'USE CASES',
      title: 'AI Use Case Marketplace',
      subtitle: 'Business-Ready AI Use Cases',
      description: 'Explore, assess, and prioritise AI use cases across business functions and domains — with value scoring and feasibility guidance.',
      link: '/usecase'
    },
    {
      icon: FileText,
      tag: 'SPECIFICATION',
      title: 'AI Specification Studio',
      subtitle: 'Structured Spec Templates',
      description: 'Structured specification templates for AI models, agents, prompts, and workflows — ensuring design rigour before build begins.',
      link: '/design'
    }
  ];

  return (
    <>
      <NavBar />
      <div className="min-h-screen text-white" style={{ backgroundColor: '#0d2a5e' }}>
        {/* Breadcrumb */}
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Home className="h-4 w-4" />
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-white">Design</span>
            </div>
          </div>
        </div>

        {/* Page Header */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-design/20 text-design text-xs font-bold uppercase tracking-wider rounded-full mb-4">
              MARKETPLACE
            </span>
            <h1 className="text-4xl font-bold text-white mb-4">
              Design — Shape Solutions & Define Direction
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl">
              Access governance frameworks, architecture blueprints, use cases, and specification tools to design AI solutions with structure and intent.
            </p>
          </div>

          {/* Marketplace Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {marketplaces.map((marketplace, index) => {
              const Icon = marketplace.icon;
              return (
                <div
                  key={index}
                  className="bg-[#111827] border border-white/15 rounded-xl p-6 flex flex-col hover:border-design/50 transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 bg-design rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Category Tag */}
                  <span className="inline-block px-2 py-1 bg-design text-white text-[10px] font-bold uppercase tracking-wider rounded mb-3 self-start">
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
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#0d2a5e] transition-all duration-300"
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

export default DesignCategoryPage;
