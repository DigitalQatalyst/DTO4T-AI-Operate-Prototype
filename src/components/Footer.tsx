import { ExternalLink, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ background: '#0B1736', color: '#9CA3AF' }} className="px-6 py-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-8">

          {/* Column 1 — Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #6366F1, #4F46E5)', borderRadius: 8 }} />
              <span style={{ color: 'white', fontWeight: 700, fontSize: 15 }}>DQ | Digital<br />Workspace</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
              Stay connected with the latest tools, learning resources, and workspace updates from DQ.
            </p>
            {/* Email input */}
            <div className="flex" style={{ border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, overflow: 'hidden' }}>
              <input
                type="email"
                placeholder="Enter your DQ email"
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', padding: '8px 12px', fontSize: 13, color: 'white' }}
              />
              <button
                style={{ background: '#6366F1', border: 'none', padding: '8px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                <ArrowRight style={{ width: 16, height: 16, color: 'white' }} />
              </button>
            </div>
          </div>

          {/* Column 2 — Get to Know Us */}
          <div>
            <h4 style={{ color: 'white', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>Get to Know Us</h4>
            <ul className="space-y-2">
              {['About DQ Workspace', 'Help Centre', 'DQ Governance & Guidelines', 'Privacy Policy', 'Terms of Use'].map(item => (
                <li key={item}>
                  <a href="#" style={{ fontSize: 13, color: '#9CA3AF', display: 'block', transition: 'color 0.15s' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'white')}
                    onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#9CA3AF')}
                  >{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — For You */}
          <div>
            <h4 style={{ color: 'white', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>For You</h4>
            <ul className="space-y-2">
              {['DQ Learning Center', 'Services & Requests', 'Communities & Surveys', 'News & Announcements'].map(item => (
                <li key={item}>
                  <a href="#" style={{ fontSize: 13, color: '#9CA3AF', display: 'block', transition: 'color 0.15s' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'white')}
                    onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#9CA3AF')}
                  >{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Find Us */}
          <div>
            <h4 style={{ color: 'white', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>Find Us</h4>
            <ul className="space-y-2">
              {['Viva Engage', 'SharePoint', 'LinkedIn', 'YouTube', 'DQ Corporate Website'].map(item => (
                <li key={item}>
                  <a href="#" className="flex items-center gap-1.5" style={{ fontSize: 13, color: '#9CA3AF', transition: 'color 0.15s' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'white')}
                    onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#9CA3AF')}
                  >
                    {item}
                    <ExternalLink style={{ width: 11, height: 11, flexShrink: 0 }} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <p style={{ fontSize: 12 }}>© 2025 DQ | Digital Workspace. All rights reserved.</p>
          <p style={{ fontSize: 12 }}>Version v2.1.0</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
