export interface LearningItem {
  id: string;
  type: 'foundational' | 'prompt' | 'pathway' | 'governance' | 'tool' | 'advanced' | 'certification' | 'resource';
  title: string;
  summary: string;
  contentUrl: string;
  publishedAt: string;
  ownerTeam: string;
  source: 'Internal' | 'External';
  status: 'Active' | 'Archived';
  tags: string[];
  topic: string[];
  audience: string[];
  // optional by type
  role?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMins?: number;
  format?: 'Course' | 'Guide' | 'Video' | 'Workshop' | 'Playbook' | 'Reference';
  pathway?: string;
  certificationTrack?: string;
  toolName?: string;
  completionRate?: number;
}

export interface LearningTabConfig {
  id: string;
  label: string;
  description: string;
  type: LearningItem['type'];
}
