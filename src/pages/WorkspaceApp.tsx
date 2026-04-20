import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import WorkspaceLayout from '@/components/workspace/WorkspaceLayout';
import WorkspaceHub from '@/pages/workspace/WorkspaceHub';
import AIOpportunityWorkflow from '@/pages/workspace/AIOpportunityWorkflow';
import AIRequestWorkflow from '@/pages/workspace/AIRequestWorkflow';
import ProfileAccount from '@/pages/workspace/ProfileAccount';
import ProgressValue from '@/pages/workspace/ProgressValue';
import ServiceOwnerOps from '@/pages/workspace/ServiceOwnerOps';
import BusinessOwnerOps from '@/pages/workspace/BusinessOwnerOps';
import SpecialistOps from '@/pages/workspace/SpecialistOps';
import PlatformAdmin from '@/pages/workspace/PlatformAdmin';
import ContentOps from '@/pages/workspace/ContentOps';
import FulfilmentWorkflows from '@/pages/workspace/FulfilmentWorkflows';
import SpecialistRequests from '@/pages/workspace/SpecialistRequests';
import GovernanceOversight from '@/pages/workspace/GovernanceOversight';
import AdvancedAIOps from '@/pages/workspace/AdvancedAIOps';
import RiskCompliance from '@/pages/workspace/RiskCompliance';
import ExecutiveOverview from '@/pages/workspace/ExecutiveOverview';
import SpecialistWorkspaces from '@/pages/workspace/SpecialistWorkspaces';
import type { UserRole } from '@/types/workspace';

interface User {
  email: string;
  role: UserRole;
  name: string;
}

export default function WorkspaceApp() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('currentUser');
    if (!stored) {
      navigate('/login', { state: { from: { pathname: '/workspace' } } });
    } else {
      setUser(JSON.parse(stored));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <WorkspaceLayout user={user} onLogout={handleLogout}>
      <Routes>
        <Route index element={<WorkspaceHub user={user} />} />
        <Route path="opportunity" element={<AIOpportunityWorkflow />} />
        <Route path="request" element={<AIRequestWorkflow />} />
        <Route path="profile" element={<ProfileAccount user={user} />} />
        <Route path="progress" element={<ProgressValue />} />
        <Route path="service-ops" element={<ServiceOwnerOps />} />
        <Route path="business-ops" element={<BusinessOwnerOps />} />
        <Route path="specialist-ops" element={<SpecialistOps />} />
        <Route path="platform-admin" element={<PlatformAdmin />} />
        <Route path="content-ops" element={<ContentOps />} />
        <Route path="fulfilment" element={<FulfilmentWorkflows />} />
        <Route path="specialist-requests" element={<SpecialistRequests />} />
        <Route path="governance" element={<GovernanceOversight />} />
        <Route path="advanced-ops" element={<AdvancedAIOps />} />
        <Route path="risk-compliance" element={<RiskCompliance />} />
        <Route path="executive" element={<ExecutiveOverview />} />
        <Route path="specialist-workspaces" element={<SpecialistWorkspaces />} />
      </Routes>
    </WorkspaceLayout>
  );
}
