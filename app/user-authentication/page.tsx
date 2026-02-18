import type { Metadata } from 'next';
import AuthenticationInteractive from './components/AuthenticationInteractive';

export const metadata: Metadata = {
  title: 'Sign In - FormCraft',
  description: 'Sign in to your FormCraft account to create, manage, and analyze professional forms with our intuitive block-based editor.',
};

export default function UserAuthenticationPage() {
  return <AuthenticationInteractive />;
}