import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Lock, User, ArrowRight } from 'lucide-react';

// Mock users with different roles
const mockUsers = [
  { email: 'employee@dewa.ae', password: 'demo123', role: 'employee', name: 'Ahmed Hassan' },
  { email: 'manager@dewa.ae', password: 'demo123', role: 'manager', name: 'Sarah Al Mansoori' },
  { email: 'owner@dewa.ae', password: 'demo123', role: 'owner', name: 'Mohammed Al Falasi' },
  { email: 'specialist@dewa.ae', password: 'demo123', role: 'specialist', name: 'Fatima Al Zaabi' },
  { email: 'admin@dewa.ae', password: 'demo123', role: 'admin', name: 'Khalid Al Shamsi' },
  { email: 'executive@dewa.ae', password: 'demo123', role: 'executive', name: 'Dr. Saeed Al Tayer' },
];

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showDemoAccounts, setShowDemoAccounts] = useState(true);

  const from = (location.state as any)?.from?.pathname || '/workspace';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = mockUsers.find(u => u.email === email && u.password === password);

    if (user) {
      // Store user in localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      // Redirect to workspace or original destination
      navigate(from, { replace: true });
    } else {
      setError('Invalid email or password');
    }
  };

  const quickLogin = (user: typeof mockUsers[0]) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    navigate(from, { replace: true });
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-[#0f1f5c] to-[#1a3a8f] pt-16 flex items-center justify-center px-6">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 py-12">
          
          {/* Left Column - Login Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to DIA.AI</h1>
              <p className="text-gray-600">Sign in to access your personalized workspace</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@dewa.ae"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f1f5c] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f1f5c] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-[#0f1f5c] hover:bg-[#0a1640] text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                Sign In
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>

            <div className="mt-6 text-center">
              <a href="#" className="text-sm text-[#0f1f5c] hover:underline">
                Forgot your password?
              </a>
            </div>
          </div>

          {/* Right Column - Demo Accounts */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 lg:p-12">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Demo Accounts</h2>
              <p className="text-white/80 text-sm">Click any account to quick login and explore role-based features</p>
            </div>

            <div className="space-y-3">
              {mockUsers.map((user) => (
                <button
                  key={user.email}
                  onClick={() => quickLogin(user)}
                  className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-lg p-4 text-left transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white mb-1">{user.name}</div>
                      <div className="text-sm text-white/70">{user.email}</div>
                      <div className="text-xs text-white/60 mt-1 capitalize">Role: {user.role}</div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-white/60 group-hover:text-white transition-colors" />
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 bg-white/10 rounded-lg p-4 border border-white/20">
              <p className="text-xs text-white/80">
                <strong>Password for all accounts:</strong> demo123
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
