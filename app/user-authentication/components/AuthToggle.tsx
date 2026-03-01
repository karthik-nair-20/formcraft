'use client';



interface AuthToggleProps {
  activeMode: 'login' | 'signup';
  onModeChange: (mode: 'login' | 'signup') => void;
}

export default function AuthToggle({ activeMode, onModeChange }: AuthToggleProps) {
  return (
    <div className="flex items-center gap-2 p-1 bg-surface rounded-lg">
      <button
        onClick={() => onModeChange('login')}
        className={`
          flex-1 px-6 py-2.5 rounded-md text-sm font-medium transition-smooth
          ${
            activeMode === 'login' ?'bg-background text-text-primary shadow-subtle' :'text-text-secondary hover:text-text-primary'
          }
        `}
      >
        Sign In
      </button>
      <button
        onClick={() => onModeChange('signup')}
        className={`
          flex-1 px-6 py-2.5 rounded-md text-sm font-medium transition-smooth
          ${
            activeMode === 'signup' ?'bg-background text-text-primary shadow-subtle' :'text-text-secondary hover:text-text-primary'
          }
        `}
      >
        Sign Up
      </button>
    </div>
  );
}