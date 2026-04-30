import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  icon?: React.ElementType;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

const variantStyles = {
  default: 'border-gray-200',
  success: 'border-green-200 bg-green-50/50',
  warning: 'border-yellow-200 bg-yellow-50/50',
  danger: 'border-red-200 bg-red-50/50',
};

const trendStyles = {
  up: 'text-green-600',
  down: 'text-red-600',
  stable: 'text-gray-600',
};

const TrendIcon = ({ trend }: { trend: 'up' | 'down' | 'stable' }) => {
  switch (trend) {
    case 'up':
      return <TrendingUp className="w-4 h-4" />;
    case 'down':
      return <TrendingDown className="w-4 h-4" />;
    case 'stable':
      return <Minus className="w-4 h-4" />;
  }
};

export default function MetricCard({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  icon: Icon,
  variant = 'default',
}: MetricCardProps) {
  return (
    <Card className={cn('border', variantStyles[variant])}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <div className="mt-2 flex items-baseline gap-2">
              <p className="text-3xl font-bold text-gray-900">{value}</p>
              {trend && trendValue && (
                <span className={cn('flex items-center gap-1 text-sm font-medium', trendStyles[trend])}>
                  <TrendIcon trend={trend} />
                  {trendValue}
                </span>
              )}
            </div>
            {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
          </div>
          {Icon && (
            <div className="flex-shrink-0 p-3 bg-gray-100 rounded-lg">
              <Icon className="w-6 h-6 text-gray-600" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
