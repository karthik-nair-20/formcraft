import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import FormBuilderInteractive from './components/FormBuilderInteractive';

export const metadata: Metadata = {
  title: 'Form Builder - FormCraft',
  description: 'Create professional forms with our intuitive block-based editor featuring drag-and-drop functionality, real-time customization, and seamless publishing capabilities.',
};

export default function FormBuilderWorkspacePage() {
  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <Header />
      <div className="flex-1 flex flex-col overflow-hidden">
        <FormBuilderInteractive />
      </div>
    </div>
  );
}