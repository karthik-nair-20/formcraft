import type { Metadata } from 'next';
import FormPreviewInteractive from './components/FormPreviewInteractive';

export const metadata: Metadata = {
  title: 'Form Preview Mode - FormCraft',
  description: 'Test your forms exactly as respondents will experience them with device previews, theme switching, and multi-step navigation before publishing.',
};

export default function FormPreviewModePage() {
  return <FormPreviewInteractive />;
}