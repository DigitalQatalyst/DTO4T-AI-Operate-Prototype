export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessons: number;
  image?: string;
  department?: string;
  category?: string;
  provider?: string;
  courseType?: string;
  rating?: number;
  location?: string;
  audience?: string;
}

export type LearningTab = 'courses' | 'learning-tracks' | 'reviews';

export interface FilterState {
  department: string[];
  category: string[];
  provider: string[];
  courseType: string[];
  rating: string[];
  location: string[];
  audience: string[];
}
