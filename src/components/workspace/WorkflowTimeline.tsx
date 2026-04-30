import { Check, Circle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TimelineStep {
  id: string;
  label: string;
  status: 'completed' | 'current' | 'upcoming';
  timestamp?: string;
  description?: string;
  actor?: string;
}

export interface WorkflowTimelineProps {
  steps: TimelineStep[];
  orientation?: 'vertical' | 'horizontal';
  compact?: boolean;
}

const statusStyles = {
  completed: {
    icon: 'bg-green-500 text-white',
    line: 'bg-green-500',
    text: 'text-gray-900',
  },
  current: {
    icon: 'bg-blue-500 text-white',
    line: 'bg-gray-300',
    text: 'text-gray-900 font-medium',
  },
  upcoming: {
    icon: 'bg-gray-300 text-gray-600',
    line: 'bg-gray-300',
    text: 'text-gray-500',
  },
};

const StatusIcon = ({ status }: { status: TimelineStep['status'] }) => {
  switch (status) {
    case 'completed':
      return <Check className="w-4 h-4" />;
    case 'current':
      return <Clock className="w-4 h-4" />;
    case 'upcoming':
      return <Circle className="w-3 h-3" />;
  }
};

export default function WorkflowTimeline({
  steps,
  orientation = 'vertical',
  compact = false,
}: WorkflowTimelineProps) {
  if (orientation === 'horizontal') {
    return (
      <div className="flex items-start justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'flex items-center justify-center w-10 h-10 rounded-full',
                  statusStyles[step.status].icon
                )}
              >
                <StatusIcon status={step.status} />
              </div>
              <div className="mt-2 text-center">
                <p className={cn('text-sm', statusStyles[step.status].text)}>{step.label}</p>
                {!compact && step.timestamp && (
                  <p className="text-xs text-gray-500 mt-1">{step.timestamp}</p>
                )}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={cn('flex-1 h-0.5 mx-2 mt-5', statusStyles[step.status].line)} />
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={step.id} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0',
                statusStyles[step.status].icon
              )}
            >
              <StatusIcon status={step.status} />
            </div>
            {index < steps.length - 1 && (
              <div className={cn('w-0.5 flex-1 mt-2', statusStyles[step.status].line)} />
            )}
          </div>
          <div className="flex-1 pb-8">
            <p className={cn('text-sm', statusStyles[step.status].text)}>{step.label}</p>
            {!compact && (
              <>
                {step.description && <p className="text-sm text-gray-600 mt-1">{step.description}</p>}
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  {step.timestamp && <span>{step.timestamp}</span>}
                  {step.actor && <span>by {step.actor}</span>}
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
