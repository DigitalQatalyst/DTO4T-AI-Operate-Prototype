import { useState } from 'react';
import { Mail, Phone, MessageCircle, BookOpen, Video, FileText, Send, CheckCircle, ExternalLink, HelpCircle, Zap, Users } from 'lucide-react';

interface SupportAccessProps {}

const supportChannels = [
  {
    icon: MessageCircle,
    title: 'Live Chat Support',
    description: 'Get instant help from our support team',
    availability: 'Mon-Fri, 9 AM - 5 PM EST',
    action: 'Start Chat',
    color: 'bg-blue-50 border-blue-200 text-blue-700',
    iconBg: 'bg-blue-100',
  },
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Send us a detailed message',
    availability: 'Response within 24 hours',
    action: 'Send Email',
    email: 'ai-support@company.com',
    color: 'bg-green-50 border-green-200 text-green-700',
    iconBg: 'bg-green-100',
  },
  {
    icon: Phone,
    title: 'Phone Support',
    description: 'Speak directly with a specialist',
    availability: 'Mon-Fri, 9 AM - 5 PM EST',
    action: 'Call Now',
    phone: '+1 (555) 123-4567',
    color: 'bg-purple-50 border-purple-200 text-purple-700',
    iconBg: 'bg-purple-100',
  },
];

const helpResources = [
  {
    icon: BookOpen,
    title: 'Documentation',
    description: 'Comprehensive guides and tutorials',
    link: '/knowledge',
    color: 'text-blue-600',
  },
  {
    icon: Video,
    title: 'Video Tutorials',
    description: 'Step-by-step video walkthroughs',
    link: '/learning',
    color: 'text-purple-600',
  },
  {
    icon: FileText,
    title: 'FAQs',
    description: 'Answers to common questions',
    link: '/glossary',
    color: 'text-green-600',
  },
  {
    icon: Users,
    title: 'Community Forum',
    description: 'Connect with other users',
    link: '/community',
    color: 'text-orange-600',
  },
];

const commonTopics = [
  { title: 'Getting Started with AI Tools', category: 'Onboarding' },
  { title: 'Submitting an AI Request', category: 'Requests' },
  { title: 'Understanding Approval Workflows', category: 'Workflows' },
  { title: 'Accessing AI Services', category: 'Access' },
  { title: 'Troubleshooting Common Issues', category: 'Technical' },
  { title: 'Best Practices for AI Usage', category: 'Guidance' },
];

export default function SupportAccess({}: SupportAccessProps) {
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: 'general',
    priority: 'medium',
    description: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitted(true);
    setSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setTicketForm({
        subject: '',
        category: 'general',
        priority: 'medium',
        description: '',
      });
    }, 3000);
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Support & Help</h1>
        <p className="text-sm text-gray-500 mt-1">
          Get assistance, access resources, and connect with our support team
        </p>
      </div>

      {/* Support Channels */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Support</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {supportChannels.map((channel, i) => (
            <div
              key={i}
              className={`rounded-xl border p-5 ${channel.color}`}
            >
              <div className={`w-12 h-12 ${channel.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                <channel.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{channel.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{channel.description}</p>
              <p className="text-xs text-gray-500 mb-4">{channel.availability}</p>
              {channel.email && (
                <p className="text-sm font-medium text-gray-900 mb-3">{channel.email}</p>
              )}
              {channel.phone && (
                <p className="text-sm font-medium text-gray-900 mb-3">{channel.phone}</p>
              )}
              <button className="w-full px-4 py-2 bg-white border border-gray-200 text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                {channel.action}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Help Resources */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Help Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {helpResources.map((resource, i) => (
            <a
              key={i}
              href={resource.link}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-gray-300 transition-all group"
            >
              <resource.icon className={`h-8 w-8 ${resource.color} mb-3`} />
              <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-[#0f1f5c] transition-colors">
                {resource.title}
              </h3>
              <p className="text-xs text-gray-600">{resource.description}</p>
              <div className="flex items-center gap-1 mt-3 text-xs text-blue-600 font-medium">
                Explore <ExternalLink className="h-3 w-3" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Common Topics */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Common Topics</h2>
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {commonTopics.map((topic, i) => (
            <button
              key={i}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{topic.title}</p>
                  <p className="text-xs text-gray-500">{topic.category}</p>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Support Ticket Form */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Submit a Support Ticket</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ticket Submitted Successfully</h3>
              <p className="text-sm text-gray-600 mb-4">
                We've received your support request and will respond within 24 hours.
              </p>
              <p className="text-xs text-gray-500">
                Ticket ID: <span className="font-mono font-medium">TKT-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={ticketForm.subject}
                  onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                  placeholder="Brief description of your issue"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={ticketForm.category}
                    onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Issue</option>
                    <option value="access">Access Request</option>
                    <option value="training">Training & Guidance</option>
                    <option value="billing">Billing & Account</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={ticketForm.priority}
                    onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low - General question</option>
                    <option value="medium">Medium - Need assistance</option>
                    <option value="high">High - Blocking my work</option>
                    <option value="critical">Critical - System down</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={ticketForm.description}
                  onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                  placeholder="Please provide detailed information about your issue or question..."
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Include any error messages, steps to reproduce, or relevant details
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#0f1f5c] text-white text-sm font-medium rounded-lg hover:bg-[#1a2f7c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit Ticket
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setTicketForm({
                    subject: '',
                    category: 'general',
                    priority: 'medium',
                    description: '',
                  })}
                  className="px-6 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Clear
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <Zap className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-gray-900 text-sm mb-2">Quick Tips</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Check our documentation and FAQs before submitting a ticket</li>
              <li>• Include screenshots or error messages when reporting technical issues</li>
              <li>• For urgent issues, use live chat or phone support during business hours</li>
              <li>• Track your ticket status in the Profile & Account section</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
