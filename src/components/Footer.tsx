import { ExternalLink, BookOpen, FileText, Brain, Palette, MessageSquare, Share2, Linkedin, Youtube, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[hsl(228,100%,14%)] via-[hsl(224,56%,18%)] to-[hsl(228,100%,20%)] py-16">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Left Column - Brand */}
          <div>
            <h3 className="text-xl font-bold text-white">DIA AI Hub</h3>
            <p className="mt-4 text-sm text-white/60 leading-relaxed">
              The Cognitive Core
            </p>
            <p className="mt-2 text-sm text-white/50 leading-relaxed">
              Stay updated with the latest AI insights, governed copilots, agents, and innovations for DCO-Grade Man + Machine Collaboration.
            </p>
          </div>

          {/* Middle Column - For You */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">For You</h4>
            <ul className="space-y-3">
              <li>
                <a href="#marketplace" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                  <BookOpen className="h-4 w-4" />
                  <span>AI Learning Center</span>
                </a>
              </li>
              <li>
                <a href="#marketplace" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                  <FileText className="h-4 w-4" />
                  <span>AI Knowledge Center</span>
                </a>
              </li>
              <li>
                <a href="#marketplace" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                  <Brain className="h-4 w-4" />
                  <span>AI Services Center</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                  <Palette className="h-4 w-4" />
                  <span>Design System</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Right Column - Find Us */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Find Us</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Viva Engage</span>
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                  <span>SharePoint</span>
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Youtube className="h-4 w-4" />
                  <span>YouTube</span>
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  <span>DQ Corporate Website</span>
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-xs text-white/40">
            © 2026 DIA AI Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
