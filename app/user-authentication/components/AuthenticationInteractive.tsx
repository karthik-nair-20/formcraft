'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Icon from "@/components/ui/Appicon";
import AuthToggle from './AuthToggle';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import SocialAuthButtons from './SocialAuthButtons';

export default function AuthenticationInteractive() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleLogin = async (email: string, password: string, rememberMe: boolean) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        router.push('/all-forms-dashboard');
      }, 1500);
    }, 2000);
  };

  const handleSignup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        router.push('/all-forms-dashboard');
      }, 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Success overlay */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-card rounded-2xl shadow-lift p-8 max-w-sm mx-4 animate-scale-in">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
                <Icon name="CheckCircleIcon" size={32} className="text-success" variant="solid" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                {mode === 'login' ? 'Welcome back!' : 'Account created!'}
              </h3>
              <p className="text-sm text-text-secondary">
                {mode === 'login' ?'Redirecting to your dashboard...' :'Redirecting to get you started...'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="relative w-full max-w-md">
        {/* Logo and back link */}
        <div className="text-center mb-8">
          <Link 
            href="/marketing-landing-page"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-smooth mb-6"
          >
            <Icon name="ArrowLeftIcon" size={16} />
            <span>Back to home</span>
          </Link>
          
          <Link href="/marketing-landing-page" className="inline-flex items-center justify-center gap-2 mb-2">
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
              <Icon name="DocumentTextIcon" size={24} className="text-primary-foreground" variant="solid" />
            </div>
            <span className="text-2xl font-bold text-text-primary">FormCraft</span>
          </Link>
          
          <p className="text-sm text-text-secondary mt-2">
            Build professional forms in minutes ✨
          </p>
        </div>

        {/* Auth card */}
        <div className="bg-card rounded-2xl shadow-lift p-8 border border-border">
          {/* Toggle */}
          <div className="mb-6">
            <AuthToggle activeMode={mode} onModeChange={setMode} />
          </div>

          {/* Form */}
          <div className="mb-6">
            {mode === 'login' ? (
              <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
            ) : (
              <SignupForm onSubmit={handleSignup} isLoading={isLoading} />
            )}
          </div>

          {/* Social auth */}
          <SocialAuthButtons mode={mode} />
        </div>

        {/* Footer links */}
        <div className="mt-6 text-center">
          <p className="text-xs text-text-secondary">
            By continuing, you agree to our{' '}
            <button className="text-primary hover:underline">Terms</button>
            {' '}and{' '}
            <button className="text-primary hover:underline">Privacy Policy</button>
          </p>
        </div>

        {/* Decorative doodle */}
        <svg
          className="absolute -bottom-16 -right-16 w-32 h-32 text-primary/10 pointer-events-none"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 50 Q 30 20, 50 30 T 80 50"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="80" cy="50" r="3" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}