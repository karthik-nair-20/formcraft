'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SignupFormProps {
  onSubmit: (name: string, email: string, password: string) => void;
  isLoading: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function SignupForm({ onSubmit, isLoading }: SignupFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getPasswordStrength = (password: string): { strength: string; color: string; width: string } => {
    if (password.length === 0) return { strength: '', color: '', width: '0%' };
    if (password.length < 6) return { strength: 'Weak', color: 'bg-error', width: '33%' };
    if (password.length < 10) return { strength: 'Medium', color: 'bg-warning', width: '66%' };
    return { strength: 'Strong', color: 'bg-success', width: '100%' };
  };

  const passwordStrength = getPasswordStrength(password);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name) {
      newErrors.name = 'Full name is required';
    } else if (name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(name, email, password);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="signup-name" className="block text-sm font-medium text-text-primary mb-2">
          Full Name
        </label>
        <div className="relative">
          <input
            id="signup-name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({ ...errors, name: undefined });
            }}
            className={`
              w-full px-4 py-3 pl-11 rounded-lg border bg-background text-text-primary
              transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40
              ${errors.name ? 'border-error' : 'border-input'}
            `}
            placeholder="John Doe"
            disabled={isLoading}
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Icon name="UserIcon" size={20} className="text-text-secondary" />
          </div>
        </div>
        {errors.name && (
          <p className="text-sm text-error mt-2 flex items-center gap-1">
            <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="signup-email" className="block text-sm font-medium text-text-primary mb-2">
          Email Address
        </label>
        <div className="relative">
          <input
            id="signup-email"
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
        <label htmlFor="signup-password" className="block text-sm font-medium text-text-primary mb-2">
          Password
        </label>
        <div className="relative">
          <input
            id="signup-password"
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
        {password && (
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-text-secondary">Password strength</span>
              <span className={`text-xs font-medium ${passwordStrength.color.replace('bg-', 'text-')}`}>
                {passwordStrength.strength}
              </span>
            </div>
            <div className="h-1.5 bg-surface rounded-full overflow-hidden">
              <div
                className={`h-full ${passwordStrength.color} transition-all duration-300`}
                style={{ width: passwordStrength.width }}
              />
            </div>
          </div>
        )}
        {errors.password && (
          <p className="text-sm text-error mt-2 flex items-center gap-1">
            <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
            {errors.password}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-text-primary mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <input
            id="signup-confirm-password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
            }}
            className={`
              w-full px-4 py-3 pl-11 pr-11 rounded-lg border bg-background text-text-primary
              transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40
              ${errors.confirmPassword ? 'border-error' : 'border-input'}
            `}
            placeholder="••••••••"
            disabled={isLoading}
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Icon name="LockClosedIcon" size={20} className="text-text-secondary" />
          </div>
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-smooth"
            tabIndex={-1}
          >
            <Icon name={showConfirmPassword ? 'EyeOffIcon' : 'EyeIcon'} size={20} />
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-error mt-2 flex items-center gap-1">
            <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
            {errors.confirmPassword}
          </p>
        )}
      </div>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="terms"
          className="w-4 h-4 mt-0.5 rounded border-input text-primary focus:ring-2 focus:ring-primary focus:ring-opacity-40"
          disabled={isLoading}
          required
        />
        <label htmlFor="terms" className="text-sm text-text-secondary">
          I agree to the{' '}
          <button type="button" className="text-primary hover:underline">
            Terms of Service
          </button>{' '}
          and{' '}
          <button type="button" className="text-primary hover:underline">
            Privacy Policy
          </button>
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-subtle"
      >
        {isLoading ? (
          <>
            <Icon name="RefreshIcon" size={20} className="animate-spin" />
            <span>Creating account...</span>
          </>
        ) : (
          <>
            <Icon name="UserAddIcon" size={20} />
            <span>Create Account</span>
          </>
        )}
      </button>
    </form>
  );
}