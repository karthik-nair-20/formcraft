'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from '@/components/ui/AppIcon';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'signup';
}

const AuthModal = ({ isOpen, onClose, defaultMode = 'login' }: AuthModalProps) => {
  const [mode, setMode] = useState<'login' | 'signup'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; name?: string }>({});

  if (!isOpen) return null;

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: { email?: string; password?: string; name?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (mode === 'signup' && !name) {
      newErrors.name = 'Name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card rounded-2xl shadow-lift w-full max-w-md animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-semibold text-text-primary">
              {mode === 'login' ? 'Welcome back' : 'Create account'}
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              {mode === 'login' ?'Sign in to continue building forms' :'Start creating professional forms today'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface transition-smooth"
            aria-label="Close modal"
          >
            <Icon name="XIcon" size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {mode === 'signup' && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`
                  w-full px-4 py-3 rounded-lg border bg-background text-text-primary
                  transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40
                  ${errors.name ? 'border-error' : 'border-input'}
                `}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-sm text-error mt-1 flex items-center gap-1">
                  <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
                  {errors.name}
                </p>
              )}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`
                w-full px-4 py-3 rounded-lg border bg-background text-text-primary
                transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40
                ${errors.email ? 'border-error' : 'border-input'}
              `}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-sm text-error mt-1 flex items-center gap-1">
                <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`
                w-full px-4 py-3 rounded-lg border bg-background text-text-primary
                transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40
                ${errors.password ? 'border-error' : 'border-input'}
              `}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-sm text-error mt-1 flex items-center gap-1">
                <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
                {errors.password}
              </p>
            )}
          </div>

          {mode === 'login' && (
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-input text-primary focus:ring-2 focus:ring-primary focus:ring-opacity-40"
                />
                <span className="text-sm text-text-secondary">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-primary hover:underline transition-smooth"
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Icon name="RefreshIcon" size={20} className="animate-spin" />
                <span>{mode === 'login' ? 'Signing in...' : 'Creating account...'}</span>
              </>
            ) : (
              <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
            )}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-text-secondary">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-3 border border-input rounded-lg text-sm font-medium text-text-primary hover:bg-surface transition-smooth"
            >
              <Icon name="MailIcon" size={18} />
              <span>Google</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-3 border border-input rounded-lg text-sm font-medium text-text-primary hover:bg-surface transition-smooth"
            >
              <Icon name="CodeIcon" size={18} />
              <span>GitHub</span>
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 bg-surface border-t border-border rounded-b-2xl">
          <p className="text-sm text-center text-text-secondary">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-primary font-medium hover:underline transition-smooth"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' 
    ? createPortal(modalContent, document.body)
    : null;
};

export default AuthModal;