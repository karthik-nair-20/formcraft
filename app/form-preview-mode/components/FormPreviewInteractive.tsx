'use client';

import { useState, useEffect } from 'react';
import PreviewToolbar from './PreviewToolbar';
import FormBlock from './FormBlock';
import MultiStepProgress from './MultiStepProgress';
import Icon from '@/components/ui/AppIcon';
import { useRouter } from 'next/navigation';

interface FormStep {
  id: string;
  title: string;
  blocks: Array<{
    id: string;
    type: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    options?: string[];
    content?: string;
    imageUrl?: string;
    imageAlt?: string;
    videoUrl?: string;
    columns?: number;
  }>;
}

const FormPreviewInteractive = () => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentDevice, setCurrentDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const mockFormSteps: FormStep[] = [
  {
    id: 'step-1',
    title: 'Personal Info',
    blocks: [
    {
      id: 'heading-1',
      type: 'heading',
      content: 'Contact Information'
    },
    {
      id: 'paragraph-1',
      type: 'paragraph',
      content: 'Please provide your basic contact details so we can reach you.'
    },
    {
      id: 'name',
      type: 'short-text',
      label: 'Full Name',
      placeholder: 'John Doe',
      required: true
    },
    {
      id: 'email',
      type: 'short-text',
      label: 'Email Address',
      placeholder: 'john@example.com',
      required: true
    },
    {
      id: 'phone',
      type: 'short-text',
      label: 'Phone Number',
      placeholder: '+1 (555) 123-4567',
      required: false
    }]

  },
  {
    id: 'step-2',
    title: 'Preferences',
    blocks: [
    {
      id: 'heading-2',
      type: 'heading',
      content: 'Your Preferences'
    },
    {
      id: 'image-1',
      type: 'image',
      imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1238f578a-1764671987835.png",
      imageAlt: 'Modern workspace with laptop, notebook, and coffee cup on wooden desk'
    },
    {
      id: 'interest',
      type: 'multiple-choice',
      label: 'What brings you here today?',
      required: true,
      options: [
      'Looking for a new opportunity',
      'Exploring career options',
      'Networking and connections',
      'Learning and development']

    },
    {
      id: 'skills',
      type: 'checkboxes',
      label: 'Select your areas of expertise',
      required: true,
      options: [
      'Web Development',
      'Mobile Development',
      'UI/UX Design',
      'Data Science',
      'Project Management',
      'Marketing']

    }]

  },
  {
    id: 'step-3',
    title: 'Additional Info',
    blocks: [
    {
      id: 'heading-3',
      type: 'heading',
      content: 'Tell Us More'
    },
    {
      id: 'divider-1',
      type: 'divider'
    },
    {
      id: 'bio',
      type: 'long-text',
      label: 'Brief Introduction',
      placeholder: 'Tell us about yourself, your experience, and what you are looking for...',
      required: true
    },
    {
      id: 'resume',
      type: 'file-upload',
      label: 'Upload Your Resume',
      required: false
    }]

  }];


  const totalSteps = mockFormSteps.length;
  const currentStepData = mockFormSteps[currentStep - 1];

  const getDeviceWidth = () => {
    switch (currentDevice) {
      case 'mobile':
        return '375px';
      case 'tablet':
        return '768px';
      case 'desktop':
      default:
        return '100%';
    }
  };

  const handleBackToBuilder = () => {
    router.push('/form-builder-workspace');
  };

  const handleDeviceChange = (device: 'desktop' | 'tablet' | 'mobile') => {
    setCurrentDevice(device);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleValueChange = (blockId: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [blockId]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setCurrentStep(1);
        setFormData({});
      }, 3000);
    }, 1500);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2 text-text-secondary">
          <Icon name="RefreshIcon" size={24} className="animate-spin" />
          <span>Loading preview...</span>
        </div>
      </div>);

  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-slate-900' : 'bg-background'}`}>
      {/* Preview Container */}
      <div className="flex items-start justify-center min-h-screen p-6 pt-24 pb-32">
        <div
          className="transition-all duration-300"
          style={{
            width: getDeviceWidth(),
            maxWidth: currentDevice === 'desktop' ? '800px' : getDeviceWidth()
          }}>

          {/* Form Card */}
          <div
            className={`rounded-2xl shadow-lift overflow-hidden transition-colors duration-300 ${
            isDarkMode ? 'bg-slate-800' : 'bg-card'}`
            }>

            {/* Form Header */}
            <div className={`p-8 border-b ${isDarkMode ? 'border-slate-700' : 'border-border'}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
                  <Icon name="DocumentTextIcon" size={24} className="text-primary-foreground" variant="solid" />
                </div>
                <div>
                  <h1 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-text-primary'}`}>
                    Professional Application Form
                  </h1>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-text-secondary'}`}>
                    Please fill out all required fields
                  </p>
                </div>
              </div>

              {/* Multi-step Progress */}
              <MultiStepProgress
                currentStep={currentStep}
                totalSteps={totalSteps}
                stepTitles={mockFormSteps.map((step) => step.title)} />

            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-8">
              <div className="space-y-6">
                {currentStepData.blocks.map((block) =>
                <FormBlock
                  key={block.id}
                  block={block}
                  onValueChange={(value) => handleValueChange(block.id, value)}
                  isDarkMode={isDarkMode} />

                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-smooth
                    ${
                  currentStep === 1 ?
                  'opacity-40 cursor-not-allowed text-text-secondary' : 'text-text-primary hover:bg-surface'}
                  `
                  }>

                  <Icon name="ArrowLeftIcon" size={18} />
                  <span>Previous</span>
                </button>

                {currentStep < totalSteps ?
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-smooth shadow-subtle">

                    <span>Next Step</span>
                    <Icon name="ArrowRightIcon" size={18} />
                  </button> :

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-smooth shadow-subtle disabled:opacity-50 disabled:cursor-not-allowed">

                    {isSubmitting ?
                  <>
                        <Icon name="RefreshIcon" size={18} className="animate-spin" />
                        <span>Submitting...</span>
                      </> :

                  <>
                        <Icon name="CheckIcon" size={18} />
                        <span>Submit Form</span>
                      </>
                  }
                  </button>
                }
              </div>
            </form>
          </div>

          {/* Success Message */}
          {showSuccess &&
          <div className="mt-6 p-6 bg-success/10 border border-success rounded-xl flex items-center gap-3">
              <Icon name="CheckCircleIcon" size={24} className="text-success" variant="solid" />
              <div>
                <p className="font-medium text-success">Form submitted successfully!</p>
                <p className="text-sm text-text-secondary mt-1">
                  Thank you for your submission. We will review it shortly.
                </p>
              </div>
            </div>
          }

          {/* Preview Info Badge */}
          <div className="mt-6 p-4 bg-accent/10 border border-accent rounded-xl flex items-start gap-3">
            <Icon name="InformationCircleIcon" size={20} className="text-accent mt-0.5" variant="solid" />
            <div>
              <p className="text-sm font-medium text-text-primary">Preview Mode</p>
              <p className="text-xs text-text-secondary mt-1">
                This is a test preview. Form submissions will not be saved or trigger integrations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Toolbar */}
      <PreviewToolbar
        onBackToBuilder={handleBackToBuilder}
        onDeviceChange={handleDeviceChange}
        onThemeToggle={handleThemeToggle}
        currentDevice={currentDevice}
        isDarkMode={isDarkMode} />

    </div>);

};

export default FormPreviewInteractive;