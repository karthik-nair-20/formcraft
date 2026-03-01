import Icon from '@/components/ui/AppIcon';

interface SubmissionStatsProps {
  totalSubmissions: number;
  completionRate: number;
  averageTime: string;
  recentActivity: number;
}

const SubmissionStats = ({
  totalSubmissions,
  completionRate,
  averageTime,
  recentActivity,
}: SubmissionStatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="p-5 bg-card border border-border/50 rounded-xl hover:shadow-subtle hover:border-border transition-all duration-300">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 bg-primary/10 rounded-lg">
            <Icon name="CollectionIcon" size={20} className="text-primary" />
          </div>
          <p className="text-sm font-medium text-text-secondary">Total Submissions</p>
        </div>
        <p className="text-3xl font-bold text-text-primary tracking-tight">
          {totalSubmissions}
        </p>
      </div>

      <div className="p-5 bg-card border border-border/50 rounded-xl hover:shadow-subtle hover:border-border transition-all duration-300">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 bg-success/10 rounded-lg">
            <Icon name="CheckCircleIcon" size={20} className="text-success" />
          </div>
          <p className="text-sm font-medium text-text-secondary">Completion Rate</p>
        </div>
        <p className="text-3xl font-bold text-text-primary tracking-tight">
          {completionRate}%
        </p>
      </div>

      <div className="p-5 bg-card border border-border/50 rounded-xl hover:shadow-subtle hover:border-border transition-all duration-300">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 bg-warning/10 rounded-lg">
            <Icon name="ClockIcon" size={20} className="text-warning" />
          </div>
          <p className="text-sm font-medium text-text-secondary">Average Time</p>
        </div>
        <p className="text-3xl font-bold text-text-primary tracking-tight">
          {averageTime}
        </p>
      </div>

      <div className="p-5 bg-card border border-border/50 rounded-xl hover:shadow-subtle hover:border-border transition-all duration-300">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 bg-accent/10 rounded-lg">
            <Icon name="TrendingUpIcon" size={20} className="text-accent" />
          </div>
          <p className="text-sm font-medium text-text-secondary">Recent Activity</p>
        </div>
        <p className="text-3xl font-bold text-text-primary tracking-tight">
          {recentActivity}
        </p>
      </div>
    </div>
  );
};

export default SubmissionStats;