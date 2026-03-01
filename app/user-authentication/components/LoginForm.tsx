'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface LoginFormProps {
  onSubmit: (email: string, password: string, rememberMe: boolean) => void;
  isLoading: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(email, password, rememberMe);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="login-email" className="block text-sm font-medium text-text-primary mb-2">
          Email Address
        </label>
        <div className="relative">
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            className={`
              w-full px-4 py-3 pl-11 rounded-lg border bg-background text-text-primary
              transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40
              ${errors.email ? 'border-error' : 'border-input'}
            `}
            placeholder="you@example.com"
            disabled={isLoading}
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Icon name="MailIcon" size={20} className="text-text-secondary" />
          </div>
        </div>
        {errors.email && (
          <p className="text-sm text-error mt-2 flex items-center gap-1">
            <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="login-password" className="block text-sm font-medium text-text-primary mb-2">
          Password
        </label>
        <div className="relative">
          <input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors({ ...errors, password: undefined });
            }}
            className={`
              w-full px-4 py-3 pl-11 pr-11 rounded-lg border bg-background text-text-primary
              transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40
              ${errors.password ? 'border-error' : 'border-input'}
            `}
            placeholder="••••••••"
            disabled={isLoading}
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Icon name="LockClosedIcon" size={20} className="text-text-secondary" />
          </div>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-smooth"
            tabIndex={-1}
          >
            <Icon name={showPassword ? 'EyeOffIcon' : 'EyeIcon'} size={20} />
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-error mt-2 flex items-center gap-1">
            <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
            {errors.password}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-input text-primary focus:ring-2 focus:ring-primary focus:ring-opacity-40"
            disabled={isLoading}
          />
          <span className="text-sm text-text-secondary">Remember me</span>
        </label>
        <button
          type="button"
          className="text-sm text-primary hover:underline transition-smooth"
          disabled={isLoading}
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-subtle"
      >
        {isLoading ? (
          <>
            <Icon name="RefreshIcon" size={20} className="animate-spin" />
            <span>Signing in...</span>
          </>
        ) : (
          <>
            <Icon name="LoginIcon" size={20} />
            <span>Sign In</span>
          </>
        )}
      </button>
    </form>
  );
}