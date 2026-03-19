import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { marketplaceClasses } from "../data/marketplace";

// Sample featured products from marketplace for Explore dropdown
const featuredProducts = [
  {
    ...marketplaceClasses[0].products[0], // AI News Center
    category: "DISCERN"
  },
  {
    name: "AI DocWriter",
    subtitle: "Content & Document Generation",
    desc: "AI-powered document creation and content generation for specifications, reports, and enterprise documentation.",
    icon: marketplaceClasses[1].icon,
    tag: "Content Generation",
    category: "DESIGNS",
    cta: "Explore Designs Marketplace"
  },
  {
    ...marketplaceClasses[0].products[3], // AI Learning Center
    category: "DISCERN"
  },
  {
    name: "AI Specification Studio",
    subtitle: "DocWriter",
    desc: "Collaborative workspace for defining AI solution specifications and requirements.",
    icon: marketplaceClasses[1].icon,
    tag: "Design & Spec",
    category: "DESIGNS",
    cta: "Explore Designs Marketplace"
  },
  {
    ...marketplaceClasses[2].products[7], // Digital Twin Ops (DTOps)
    category: "DEPLOYS"
  },
  {
    ...marketplaceClasses[3].products[0], // AI Self-Service Portal
    category: "DRIVE"
  },
];

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full text-white transition-all duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
      style={{
        background: 'linear-gradient(135deg, rgb(251, 85, 53) 0%, rgb(26, 46, 110) 50%, rgb(3, 15, 53) 100%)'
      }}
    >
      <div className="flex w-full items-center">
        {/* Logo Section */}
        <a className="py-2 px-4 flex items-center transition-all duration-300 h-16" href="/">
          <span className="text-lg font-bold text-white">DIA AI Hub</span>
        </a>

        {/* Main Navigation Section */}
        <div className="flex-1 flex justify-between items-center bg-transparent px-4 transition-all duration-300 h-16">
          {/* Left Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Explore Dropdown */}
            <div className="relative">
              <button
                onClick={() => setExploreOpen(!exploreOpen)}
                className="flex items-center text-white hover:text-[#FB5535] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 rounded-md px-2 py-1"
                aria-expanded={exploreOpen}
                aria-haspopup="true"
                aria-label="Explore marketplaces menu"
              >
                <span>Explore</span>
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${exploreOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {exploreOpen && (
                <div className="absolute left-0 top-full mt-2 w-[360px] rounded-xl border border-white/20 bg-white shadow-2xl overflow-hidden">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900">Explore DIA AI Hub</h3>
                    <p className="text-xs text-gray-600 mt-1">Discover AI capabilities, learning resources, and governed solutions for enterprise collaboration.</p>
                  </div>
                  
                  <div className="max-h-[400px] overflow-y-auto">
                    {featuredProducts.map((product, index) => {
                      const Icon = product.icon;
                      return (
                        <a
                          key={index}
                          href={`#marketplace`}
                          onClick={() => setExploreOpen(false)}
                          className="flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                        >
                          <div className="flex-shrink-0">
                            <Icon className="h-5 w-5 text-orange-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900">{product.name}</h4>
                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">{product.desc}</p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center ml-auto relative">
            <div className="hidden lg:flex items-center space-x-3">
              <button className="px-4 py-2 bg-white text-[#030F35] font-medium rounded-md hover:bg-white/90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20">
                Request Support
              </button>
              <button className="px-4 py-2 text-white border border-white/40 rounded-md hover:bg-white hover:text-[#030F35] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20">
                Sign In
              </button>
            </div>

            <div className="hidden md:flex lg:hidden items-center">
              <button className="px-3 py-2 bg-white text-[#030F35] rounded-md hover:bg-white/90 transition-all duration-200 font-medium text-sm">
                Request Support
              </button>
            </div>

            <div className="flex items-center space-x-2 md:hidden">
              <button className="px-3 py-2 bg-white text-[#030F35] shadow-sm rounded-md hover:bg-white/90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 font-medium text-sm">
                Request Support
              </button>
              <button
                className="p-2 text-white hover:bg-white/10 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20"
                onClick={() => setOpen(!open)}
                aria-label="Open navigation menu"
                aria-expanded={open}
              >
                {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            <div className="hidden md:flex lg:hidden items-center">
              <button
                className="p-2 text-white hover:bg-white/10 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20"
                onClick={() => setOpen(!open)}
                aria-label="Open navigation menu"
                aria-expanded={open}
              >
                {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 px-6 py-4 md:hidden" style={{ background: 'linear-gradient(135deg, rgb(251, 85, 53) 0%, rgb(26, 46, 110) 50%, rgb(3, 15, 53) 100%)' }}>
          {/* Mobile Explore Section */}
          <div>
            <button 
              onClick={() => setExploreOpen(!exploreOpen)}
              className="flex items-center justify-between w-full py-2 text-sm font-medium text-white transition-colors hover:text-white/80"
            >
              Explore
              <ChevronDown className={`h-4 w-4 transition-transform ${exploreOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {exploreOpen && (
              <div className="mt-2 space-y-2 pl-4">
                {featuredProducts.map((product, index) => {
                  const Icon = product.icon;
                  return (
                    <a
                      key={index}
                      href={`#marketplace`}
                      onClick={() => {
                        setOpen(false);
                        setExploreOpen(false);
                      }}
                      className="flex items-start gap-2 py-2 text-xs text-white/70 hover:text-white transition-colors"
                    >
                      <Icon className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-white/50 text-xs">{product.desc}</div>
                      </div>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
