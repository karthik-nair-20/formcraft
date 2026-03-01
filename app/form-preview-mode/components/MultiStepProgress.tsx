'use client';

import Icon from '@/components/ui/AppIcon';

interface MultiStepProgressProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

const MultiStepProgress = ({ currentStep, totalSteps, stepTitles }: MultiStepProgressProps) => {
  return (
    <div className="w-full mb-8">
      {/* Progress Bar */}
      <div className="relative mb-6">
        <div className="h-2 bg-surface rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`
                flex items-center justify-center w-8 h-8 rounded-full border-2 transition-smooth
                ${
                  index + 1 < currentStep
                    ? 'bg-primary border-primary text-primary-foreground'
                    : index + 1 === currentStep
                    ? 'bg-primary border-primary text-primary-foreground'
                    : 'bg-background border-border text-text-secondary'
                }
              `}
            >
              {index + 1 < currentStep ? (
                <Icon name="CheckIcon" size={16} variant="solid" />
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Titles */}
      <div className="flex justify-between">
        {stepTitles.map((title, index) => (
          <div
            key={index}
            className={`
              text-xs font-medium transition-smooth
              ${
                index + 1 === currentStep
                  ? 'text-primary'
                  : index + 1 < currentStep
                  ? 'text-text-primary' :'text-text-secondary'
              }
            `}
          >
            {title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiStepProgress;