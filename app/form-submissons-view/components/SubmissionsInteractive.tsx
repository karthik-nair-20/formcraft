'use client';

import { useState, useEffect } from 'react';
import SubmissionStats from './SubmissionStats';
import FilterControls from './FilterControls';
import SubmissionsTable from './SubmissionsTable';
import SubmissionDetailModal from './SubmissionDetailModal';
import MobileSubmissionCard from './MobileSubmissionCard';

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

interface SubmissionDetail extends Submission {
  metadata: {
    ipAddress: string;
    userAgent: string;
    completionTime: string;
  };
}

const SubmissionsInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({
    start: '2025-12-01',
    end: '2025-12-10',
  });
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortColumn, setSortColumn] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const mockSubmissions: Submission[] = [
    {
      id: '1',
      timestamp: '2025-12-10T08:30:00',
      respondent: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
      },
      status: 'complete',
      fields: {
        'Full Name': 'Sarah Johnson',
        'Email Address': 'sarah.johnson@example.com',
        'Phone Number': '+1 (555) 123-4567',
        'Company Name': 'Tech Innovations Inc.',
        'Job Title': 'Product Manager',
        'How did you hear about us?': 'LinkedIn',
        'What are your main goals?': 'Looking to streamline our form collection process and improve response rates. We need better analytics and integration with our existing tools.',
      },
    },
    {
      id: '2',
      timestamp: '2025-12-10T07:15:00',
      respondent: {
        name: 'Michael Chen',
        email: 'michael.chen@example.com',
      },
      status: 'complete',
      fields: {
        'Full Name': 'Michael Chen',
        'Email Address': 'michael.chen@example.com',
        'Phone Number': '+1 (555) 234-5678',
        'Company Name': 'Digital Solutions LLC',
        'Job Title': 'Marketing Director',
        'How did you hear about us?': 'Google Search',
        'What are your main goals?': 'Need to create professional surveys for customer feedback and market research.',
      },
    },
    {
      id: '3',
      timestamp: '2025-12-09T16:45:00',
      respondent: {
        name: 'Emily Rodriguez',
        email: 'emily.rodriguez@example.com',
      },
      status: 'complete',
      fields: {
        'Full Name': 'Emily Rodriguez',
        'Email Address': 'emily.rodriguez@example.com',
        'Phone Number': '+1 (555) 345-6789',
        'Company Name': 'Creative Agency Co.',
        'Job Title': 'Operations Manager',
        'How did you hear about us?': 'Referral',
        'What are your main goals?': 'Building client intake forms and project questionnaires for our agency.',
      },
    },
    {
      id: '4',
      timestamp: '2025-12-09T14:20:00',
      respondent: {
        name: 'David Park',
        email: 'david.park@example.com',
      },
      status: 'incomplete',
      fields: {
        'Full Name': 'David Park',
        'Email Address': 'david.park@example.com',
        'Phone Number': '+1 (555) 456-7890',
      },
    },
    {
      id: '5',
      timestamp: '2025-12-09T11:30:00',
      respondent: {
        name: 'Jessica Williams',
        email: 'jessica.williams@example.com',
      },
      status: 'complete',
      fields: {
        'Full Name': 'Jessica Williams',
        'Email Address': 'jessica.williams@example.com',
        'Phone Number': '+1 (555) 567-8901',
        'Company Name': 'Startup Ventures',
        'Job Title': 'Founder & CEO',
        'How did you hear about us?': 'Twitter',
        'What are your main goals?': 'Creating investor questionnaires and partnership application forms.',
      },
    },
  ];

  const mockSubmissionDetails: Record<string, SubmissionDetail> = {
    '1': {
      ...mockSubmissions[0],
      metadata: {
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        completionTime: '3m 45s',
      },
    },
    '2': {
      ...mockSubmissions[1],
      metadata: {
        ipAddress: '192.168.1.101',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        completionTime: '2m 30s',
      },
    },
    '3': {
      ...mockSubmissions[2],
      metadata: {
        ipAddress: '192.168.1.102',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15',
        completionTime: '4m 15s',
      },
    },
    '4': {
      ...mockSubmissions[3],
      metadata: {
        ipAddress: '192.168.1.103',
        userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
        completionTime: 'Incomplete',
      },
    },
    '5': {
      ...mockSubmissions[4],
      metadata: {
        ipAddress: '192.168.1.104',
        userAgent: 'Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X) AppleWebKit/605.1.15',
        completionTime: '5m 20s',
      },
    },
  };

  const filteredSubmissions = mockSubmissions.filter((submission) => {
    const matchesSearch =
      submission.respondent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.respondent.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || submission.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredSubmissions.map((s) => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    }
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const handleViewDetails = (id: string) => {
    setSelectedSubmission(mockSubmissionDetails[id]);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSubmission(null);
  };

  const completionRate = Math.round(
    (mockSubmissions.filter((s) => s.status === 'complete').length /
      mockSubmissions.length) *
      100
  );

  if (!isHydrated) {
    return (
      <div className="flex-1 p-6 space-y-6">
        <div className="animate-pulse space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-surface rounded-lg" />
            ))}
          </div>
          <div className="h-48 bg-surface rounded-lg" />
          <div className="h-96 bg-surface rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 p-6 space-y-6">
        {/* Stats */}
        <SubmissionStats
          totalSubmissions={mockSubmissions.length}
          completionRate={completionRate}
          averageTime="3m 42s"
          recentActivity={2}
        />

        {/* Filters */}
        <FilterControls
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          resultsCount={filteredSubmissions.length}
        />

        {/* Table or Mobile Cards */}
        {isMobile ? (
          <div className="space-y-4">
            {filteredSubmissions.map((submission) => (
              <MobileSubmissionCard
                key={submission.id}
                submission={submission}
                isSelected={selectedIds.includes(submission.id)}
                onSelect={(checked) => handleSelectOne(submission.id, checked)}
                onViewDetails={() => handleViewDetails(submission.id)}
              />
            ))}
          </div>
        ) : (
          <SubmissionsTable
            submissions={filteredSubmissions}
            selectedIds={selectedIds}
            onSelectAll={handleSelectAll}
            onSelectOne={handleSelectOne}
            onSort={handleSort}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onViewDetails={handleViewDetails}
          />
        )}
      </div>

      {/* Detail Modal */}
      <SubmissionDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        submission={selectedSubmission}
      />
    </>
  );
};

export default SubmissionsInteractive;