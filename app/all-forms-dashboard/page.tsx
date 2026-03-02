import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import DashboardInteractive from './components/DashboardInteractive';

export const metadata: Metadata = {
  title: 'All Forms Dashboard - FormCraft',
  description: 'Manage and organize all your forms in one centralized dashboard. View form statistics, edit forms, manage submissions, and create new forms.',
};

export default function AllFormsDashboardPage() {
  return (
    <>
      <Header />
      <DashboardInteractive />
    </>
  );
}