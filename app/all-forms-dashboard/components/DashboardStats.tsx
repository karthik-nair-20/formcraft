

interface DashboardStatsProps {
  totalForms: number;
  activeForms: number;
  totalSubmissions: number;
}

const DashboardStats = ({ totalForms, activeForms, totalSubmissions }: DashboardStatsProps) => {
  const stats = [
    {
      label: 'Total Forms',
      value: totalForms,
      icon: 'DocumentTextIcon' as const,
      gradient: 'gradient-primary',
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Active Forms',
      value: activeForms,
      icon: 'CheckCircleIcon' as const,
      gradient: 'gradient-success',
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      label: 'Total Submissions',
      value: totalSubmissions,
      icon: 'CollectionIcon' as const,
      gradient: 'gradient-accent',
      iconColor: 'text-violet-600',
      bgColor: 'bg-violet-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-6 sm:mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-2xl border border-border/50 p-6 sm:p-7 hover-lift transition-smooth shadow-card group"
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className={`flex items-center justify-center w-14 h-14 rounded-xl ${stat.bgColor} flex-shrink-0 group-hover:scale-110 transition-smooth`}>
              <svg className={`w-7 h-7 ${stat.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0 text-right">
              <p className="text-sm font-medium text-text-secondary mb-1 overflow-hidden text-ellipsis">{stat.label}</p>
              <p className="text-4xl font-bold text-text-primary overflow-hidden text-ellipsis">{stat.value.toLocaleString()}</p>
            </div>
          </div>
          <div className={`h-1.5 ${stat.gradient} rounded-full w-full opacity-80`}></div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;