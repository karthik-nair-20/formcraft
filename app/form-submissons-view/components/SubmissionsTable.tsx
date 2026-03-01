import Icon from '@/components/ui/AppIcon';

interface Submission {
  id: string;
  timestamp: string;
  respondent: {
    name: string;
    email: string;
  };
  status: 'complete' | 'incomplete';
  fields: Record<string, string>;
}

interface SubmissionsTableProps {
  submissions: Submission[];
  selectedIds: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectOne: (id: string, checked: boolean) => void;
  onSort: (column: string) => void;
  sortColumn: string;
  sortDirection: 'asc' | 'desc';
  onViewDetails: (id: string) => void;
}

const SubmissionsTable = ({
  submissions,
  selectedIds,
  onSelectAll,
  onSelectOne,
  onSort,
  sortColumn,
  sortDirection,
  onViewDetails,
}: SubmissionsTableProps) => {
  const allSelected = submissions.length > 0 && selectedIds.length === submissions.length;

  return (
    <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface/50 border-b border-border/50">
            <tr>
              <th className="w-12 px-4 py-4">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary focus:ring-2"
                />
              </th>
              <th className="px-4 py-4 text-left">
                <button
                  onClick={() => onSort('timestamp')}
                  className="flex items-center gap-2 text-sm font-semibold text-text-primary hover:text-primary transition-colors"
                >
                  <span>Date & Time</span>
                  <Icon
                    name={sortColumn === 'timestamp' && sortDirection === 'asc' ? 'ChevronUpIcon' : 'ChevronDownIcon'}
                    size={16}
                  />
                </button>
              </th>
              <th className="px-4 py-4 text-left">
                <button
                  onClick={() => onSort('name')}
                  className="flex items-center gap-2 text-sm font-semibold text-text-primary hover:text-primary transition-colors"
                >
                  <span>Respondent</span>
                  <Icon
                    name={sortColumn === 'name' && sortDirection === 'asc' ? 'ChevronUpIcon' : 'ChevronDownIcon'}
                    size={16}
                  />
                </button>
              </th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-text-primary">Status</th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-text-primary">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {submissions.map((submission) => (
              <tr
                key={submission.id}
                className="hover:bg-surface/30 transition-colors"
              >
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(submission.id)}
                    onChange={(e) => onSelectOne(submission.id, e.target.checked)}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary focus:ring-2"
                  />
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-text-secondary">
                    {new Date(submission.timestamp).toLocaleString()}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {submission.respondent.name}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {submission.respondent.email}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium ${
                      submission.status === 'complete'
                        ? 'bg-success/10 text-success' :'bg-warning/10 text-warning'
                    }`}
                  >
                    <Icon
                      name={submission.status === 'complete' ? 'CheckCircleIcon' : 'ClockIcon'}
                      size={14}
                    />
                    <span className="capitalize">{submission.status}</span>
                  </span>
                </td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => onViewDetails(submission.id)}
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmissionsTable;