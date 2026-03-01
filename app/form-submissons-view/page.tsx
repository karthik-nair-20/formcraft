import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import SubmissionsInteractive from './components/SubmissionsInteractive';

export const metadata: Metadata = {
  title: 'Form Submissions - FormCraft',
  description: 'View and analyze form submission data with advanced filtering, search, and export capabilities for comprehensive response management.',
};

export default function FormSubmissionsViewPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <SubmissionsInteractive />
      </main>
    </div>
  );
}