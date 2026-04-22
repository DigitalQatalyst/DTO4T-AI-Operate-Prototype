import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Grid3x3, ShoppingCart, FileCode, Workflow, TrendingUp, Activity, ChevronRight, Home, ArrowRight } from 'lucide-react';

const DriveCategoryPage = () => {
  const marketplaces = [
    {
      icon: Grid3x3,
      tag: 'PRODUCTIVITY',
      title: 'AI Workspace',
      subtitle: 'Role-Based AI Workspaces',
      description: 'Role-based copilots, task assistants, and shared productivity tools for day-to-day AI work across every team and function.',
      link: '/drive'
    },
    {
      icon: ShoppingCart,
      tag: 'SERVICES',
      title: 'AI Service Marketplace',
      subtitle: 'Enterprise AI Services',
      description: 'Browse, request, and manage AI services across the organisation — from available offerings to support and enhancements.',
      link: '/drive'
    },
    {
      icon: FileCode,
      tag: 'PROMPTS',
      title: 'Prompt Library',
      subtitle: 'Governed Prompt Catalogue',
      description: 'Curated prompt catalogue with role-based prompts, performance analytics, version control, and governance — for consistent, high-quality AI interactions.',
      link: '/drive'
    },
    {
      icon: Workflow,
      tag: 'ORCHESTRATION',
      title: 'AI Orchestration Hub',
      subtitle: 'Workflow Execution & Coordination',
      description: 'Monitor and manage AI workflow execution, cross-system coordination, bottleneck identification, and failure handling across the enterprise.',
      link: '/drive'
    },
    {
      icon: TrendingUp,
      tag: 'VALUE TRACKING',
      title: 'AI Performance & Value',
      subtitle: 'ROI & Transformation Tracking',
      description: 'Track AI adoption rates, productivity gains, ROI, and transformation impact — connecting AI activity to measurable business outcomes.',
      link: '/drive'
    },
    {
      icon: Activity,
      tag: 'MONITORING',
      title: 'AI Monitoring Center',
      subtitle: 'AI System Health & Compliance',
      description: 'Monitor AI systems for bias, fairness, drift, anomalies, and reliability issues — ensuring responsible and stable AI operation at scale.',
      link: '/drive'
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
              <span className="text-white">Drive</span>
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
              Drive — Govern, Optimise & Realise Value
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl">
              Manage AI workspaces, services, prompts, orchestration, performance tracking, and monitoring. Drive is where AI adoption becomes measurable enterprise value.
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

export default DriveCategoryPage;
