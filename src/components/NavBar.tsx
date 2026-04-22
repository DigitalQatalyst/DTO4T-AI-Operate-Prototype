import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, User, LogOut, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { marketplaceClasses } from "../data/marketplace";

const featuredProducts = [
  { ...marketplaceClasses[0].products[0], category: "DISCERN", path: "/discern" },
  {
    name: "AI DocWriter",
    subtitle: "Content & Document Generation",
    desc: "AI-powered document creation and content generation for specifications, reports, and enterprise documentation.",
    icon: marketplaceClasses[1].icon,
    tag: "Content Generation",
    category: "DESIGNS",
    path: "/aiops-framework",
  },
  { ...marketplaceClasses[0].products[2], category: "DISCERN", path: "/discern" },
  {
    name: "AI Specification Studio",
    subtitle: "DocWriter",
    desc: "Collaborative workspace for defining AI solution specifications and requirements.",
    icon: marketplaceClasses[1].icon,
    tag: "Design & Spec",
    category: "DESIGNS",
    path: "/aiops-framework",
  },
  { ...marketplaceClasses[2].products[7], category: "DEPLOYS", path: "/discern" },
  { ...marketplaceClasses[3].products[0], category: "DRIVE", path: "/discern" },
];

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; role: string } | null>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sync auth state on every render (catches login/logout from other tabs too)
  useEffect(() => {
    const sync = () => {
      const stored = localStorage.getItem("currentUser");
      setCurrentUser(stored ? JSON.parse(stored) : null);
    };
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  // Close avatar dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setAvatarOpen(false);
    navigate("/");
  };

  const handleRequestSupport = () => {
    if (currentUser) {
      navigate("/workspace/request");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full text-white transition-all duration-300 bg-navy-deep border-b ${scrolled ? "shadow-md border-white/10" : "border-white/5"}`}
    >
      <div className="flex w-full items-center">
        {/* Logo */}
        <a className="py-2 px-4 flex items-center transition-all duration-300 h-16" href="/">
          <span className="text-lg font-bold text-white">DIA.AI</span>
        </a>

        {/* Main Nav */}
        <div className="flex-1 flex justify-between items-center bg-transparent px-4 transition-all duration-300 h-16">
          {/* Left — Explore */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <button
                onClick={() => setExploreOpen(!exploreOpen)}
                className="flex items-center text-white hover:text-[#FB5535] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 rounded-md px-2 py-1"
                aria-expanded={exploreOpen}
                aria-haspopup="true"
                aria-label="Explore marketplaces menu"
              >
                <span>Explore</span>
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${exploreOpen ? "rotate-180" : ""}`} />
              </button>

              {exploreOpen && (
                <div className="absolute left-0 top-full mt-2 w-[360px] rounded-xl border border-white/20 bg-white shadow-2xl overflow-hidden z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900">Explore DIA.AI</h3>
                    <p className="text-xs text-gray-600 mt-1">Discover AI capabilities, learning resources, and governed solutions for enterprise collaboration.</p>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {featuredProducts.map((product, index) => {
                      const Icon = product.icon;
                      return (
                        <button
                          key={index}
                          onClick={() => { navigate(product.path); setExploreOpen(false); }}
                          className="w-full flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 text-left"
                        >
                          <div className="flex-shrink-0">
                            <Icon className="h-5 w-5 text-orange-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900">{product.name}</h4>
                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">{product.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right — Request Support + Sign In / Avatar */}
          <div className="flex items-center ml-auto gap-3">
            {/* Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={handleRequestSupport}
                className="px-4 py-2 bg-white text-[#030F35] font-medium rounded-md hover:bg-white/90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                Request Support
              </button>

              {currentUser ? (
                /* Avatar dropdown */
                <div className="relative" ref={avatarRef}>
                  <button
                    onClick={() => setAvatarOpen(!avatarOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/30 hover:bg-white/10 transition-all"
                    aria-label="User menu"
                  >
                    <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold text-white">
                      {currentUser.name.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-white max-w-[120px] truncate">{currentUser.name}</span>
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${avatarOpen ? "rotate-180" : ""}`} />
                  </button>

                  {avatarOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl border border-gray-200 shadow-2xl overflow-hidden z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">{currentUser.name}</p>
                        <p className="text-xs text-gray-500 capitalize mt-0.5">{currentUser.role}</p>
                      </div>
                      <button
                        onClick={() => { navigate("/workspace/profile"); setAvatarOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <User className="h-4 w-4 text-gray-400" /> My Profile
                      </button>
                      <button
                        onClick={() => { navigate("/workspace"); setAvatarOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <LayoutDashboard className="h-4 w-4 text-gray-400" /> My Workspace
                      </button>
                      <div className="border-t border-gray-100">
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="h-4 w-4" /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-white border border-white/40 rounded-md hover:bg-white hover:text-[#030F35] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* md only (no lg) */}
            <div className="hidden md:flex lg:hidden items-center gap-2">
              <button
                onClick={handleRequestSupport}
                className="px-3 py-2 bg-white text-[#030F35] rounded-md hover:bg-white/90 transition-all duration-200 font-medium text-sm"
              >
                Request Support
              </button>
              {!currentUser && (
                <button onClick={() => navigate("/login")} className="px-3 py-2 text-white border border-white/40 rounded-md hover:bg-white/10 text-sm transition-all">
                  Sign In
                </button>
              )}
              {currentUser && (
                <button onClick={() => navigate("/workspace")} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold text-white">
                  {currentUser.name.charAt(0)}
                </button>
              )}
              <button
                className="p-2 text-white hover:bg-white/10 rounded-md transition-all"
                onClick={() => setOpen(!open)}
                aria-label="Open navigation menu"
                aria-expanded={open}
              >
                {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            {/* Mobile */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={handleRequestSupport}
                className="px-3 py-2 bg-white text-[#030F35] shadow-sm rounded-md hover:bg-white/90 transition-all font-medium text-sm"
              >
                Request Support
              </button>
              <button
                className="p-2 text-white hover:bg-white/10 rounded-md transition-all"
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

      {/* Mobile menu */}
      {open && (
        <div
          className="border-t border-white/10 px-6 py-4 md:hidden bg-navy-deep"
        >
          <div>
            <button
              onClick={() => setExploreOpen(!exploreOpen)}
              className="flex items-center justify-between w-full py-2 text-sm font-medium text-white hover:text-white/80"
            >
              Explore
              <ChevronDown className={`h-4 w-4 transition-transform ${exploreOpen ? "rotate-180" : ""}`} />
            </button>
            {exploreOpen && (
              <div className="mt-2 space-y-2 pl-4">
                {featuredProducts.map((product, index) => {
                  const Icon = product.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => { navigate(product.path); setOpen(false); setExploreOpen(false); }}
                      className="w-full flex items-start gap-2 py-2 text-xs text-white/70 hover:text-white transition-colors text-left"
                    >
                      <Icon className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-white/50 text-xs">{product.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
            {currentUser ? (
              <>
                <button onClick={() => { navigate("/workspace"); setOpen(false); }} className="w-full text-left py-2 text-sm text-white/80 hover:text-white">My Workspace</button>
                <button onClick={() => { handleSignOut(); setOpen(false); }} className="w-full text-left py-2 text-sm text-red-300 hover:text-red-200">Sign Out</button>
              </>
            ) : (
              <button onClick={() => { navigate("/login"); setOpen(false); }} className="w-full text-left py-2 text-sm text-white/80 hover:text-white">Sign In</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
