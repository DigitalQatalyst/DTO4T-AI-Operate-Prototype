import { Clock, BookOpen } from 'lucide-react';
import { Course } from '@/types/learning';

interface CourseCardProps {
  course: Course;
}

// Deterministic gradient per course id so each card looks distinct
const gradients = [
  'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
  'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
  'linear-gradient(135deg, #FFF7ED 0%, #FED7AA 100%)',
  'linear-gradient(135deg, #F0F9FF 0%, #BAE6FD 100%)',
  'linear-gradient(135deg, #FDF4FF 0%, #F5D0FE 100%)',
  'linear-gradient(135deg, #FFFBEB 0%, #FDE68A 100%)',
];

const iconColors = ['#6366F1', '#16A34A', '#EA580C', '#0284C7', '#9333EA', '#D97706'];

export function CourseCard({ course }: CourseCardProps) {
  const idx = parseInt(course.id, 10) % gradients.length;
  const gradient = gradients[idx];
  const iconColor = iconColors[idx];

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      {/* Image / visual area */}
      <div
        className="h-48 flex items-center justify-center flex-shrink-0 relative overflow-hidden"
        style={{ background: gradient }}
      >
        {/* Centered icon block */}
        <div
          className="flex items-center justify-center rounded-2xl transition-transform duration-200 hover:scale-105"
          style={{ width: 64, height: 64, background: iconColor, boxShadow: `0 8px 24px ${iconColor}55` }}
        >
          <BookOpen className="h-7 w-7 text-white" />
        </div>
        {/* Category pill */}
        {course.category && (
          <span
            className="absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(255,255,255,0.85)', color: '#374151', border: '1px solid rgba(0,0,0,0.08)' }}
          >
            {course.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-base font-bold text-gray-900 line-clamp-2 leading-snug mb-2">
          {course.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed flex-1 mb-3">
          {course.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 flex-shrink-0" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5 flex-shrink-0" />
            {course.lessons} Lessons
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <button className="flex-1 py-2 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900">
            View Details
          </button>
          <button
            className="flex-1 py-2 text-sm font-medium rounded-lg text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-slate-900"
            style={{ background: '#0a1930' }}
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = '#1a2d5a')}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = '#0a1930')}
          >
            Start Learning
          </button>
        </div>
      </div>
    </div>
  );
}
