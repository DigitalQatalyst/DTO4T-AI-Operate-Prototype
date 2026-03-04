import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { marketplaceClasses } from "../data/marketplace";

// Sample featured products from marketplace for Explore dropdown
const featuredProducts = [
  {
    ...marketplaceClasses[0].products[0], // AI News Center
    category: "DISCERN CLASS 01"
  },
  {
    name: "AI DocWriter",
    subtitle: "Content & Document Generation",
    desc: "AI-powered document creation and content generation for specifications, reports, and enterprise documentation.",
    icon: marketplaceClasses[1].icon,
    tag: "Content Generation",
    category: "DESIGNS CLASS 02",
    cta: "Explore Designs Marketplace"
  },
  {
    ...marketplaceClasses[0].products[3], // AI Learning Center
    category: "DISCERN CLASS 01"
  },
  {
    name: "AI Specification Studio",
    subtitle: "DocWriter",
    desc: "Collaborative workspace for defining AI solution specifications and requirements.",
    icon: marketplaceClasses[1].icon,
    tag: "Design & Spec",
    category: "DESIGNS CLASS 02",
    cta: "Explore Designs Marketplace"
  },
  {
    ...marketplaceClasses[2].products[7], // Digital Twin Ops (DTOps)
    category: "DEPLOYS CLASS 03"
  },
  {
    ...marketplaceClasses[3].products[0], // AI Self-Service Portal
    category: "DRIVE CLASS 04"
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
      className={`fixed top-0 z-50 w-full border-b border-white/10 backdrop-blur-lg transition-shadow ${
        scrolled ? "shadow-md" : ""
      }`}
      style={{
        background: 'linear-gradient(to right, rgba(139, 74, 111, 0.9), rgba(91, 74, 122, 0.9), rgba(58, 74, 122, 0.9))'
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-6">
          <span className="text-lg font-bold text-white">DIA AI Hub</span>

          {/* Explore Dropdown - Positioned after logo */}
          <div 
            className="relative hidden md:block"
            onMouseEnter={() => setExploreOpen(true)}
            onMouseLeave={() => setExploreOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-white/80 transition-colors hover:text-white">
              Explore
              <ChevronDown className="h-4 w-4" />
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

        {/* Right side buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button className="rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20">
            Request Support
          </button>
          <button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-white/90">
            Sign In
          </button>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-black/20 px-6 py-4 md:hidden">
          {/* Mobile Explore Section */}
          <div>
            <button 
              onClick={() => setExploreOpen(!exploreOpen)}
              className="flex items-center justify-between w-full py-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
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
