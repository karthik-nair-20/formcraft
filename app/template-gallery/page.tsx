import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import TemplateGalleryInteractive from './components/TemplateGalleryInteractive';

export const metadata: Metadata = {
  title: 'Template Gallery - FormCraft',
  description: 'Browse professionally designed form templates for business, marketing, HR, events, and surveys. Start building faster with pre-built templates.',
};

export default function TemplateGalleryPage() {
  return (
    <>
      <Header />
      <TemplateGalleryInteractive />
    </>
  );
}