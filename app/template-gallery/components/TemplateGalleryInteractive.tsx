'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CategoryFilter from './CategoryFilter';
import SearchBar from './SearchBar';
import TemplateCard from './TemplateCard';
import EmptyState from './EmptyState';
import Icon from '@/components/ui/AppIcon';

interface Category {
  id: string;
  label: string;
  icon: string;
}

interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  alt: string;
  rating: number;
  usageCount: number;
  isFeatured: boolean;
  tags: string[];
}

const TemplateGalleryInteractive = () => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const categories: Category[] = [
  { id: 'all', label: 'All Templates', icon: '📋' },
  { id: 'business', label: 'Business', icon: '💼' },
  { id: 'marketing', label: 'Marketing', icon: '📊' },
  { id: 'hr', label: 'HR', icon: '👥' },
  { id: 'events', label: 'Events', icon: '🎉' },
  { id: 'surveys', label: 'Surveys', icon: '📝' }];


  const mockTemplates: Template[] = [
  {
    id: '1',
    title: 'Lead Generation Form',
    description: 'Capture qualified leads with this conversion-optimized form featuring progressive disclosure and smart field validation.',
    category: 'marketing',
    image: "https://images.unsplash.com/photo-1515408201103-f7a8c194a15c",
    alt: 'Modern laptop displaying colorful marketing analytics dashboard with graphs and charts on white desk',
    rating: 4.8,
    usageCount: 2847,
    isFeatured: true,
    tags: ['Marketing', 'Sales', 'B2B']
  },
  {
    id: '2',
    title: 'Customer Feedback Survey',
    description: 'Gather actionable customer insights with NPS scoring, satisfaction ratings, and open-ended feedback sections.',
    category: 'surveys',
    image: "https://images.unsplash.com/photo-1590402494562-4b788beb429e",
    alt: 'Business team reviewing customer feedback charts and sticky notes on glass wall in modern office',
    rating: 4.9,
    usageCount: 3521,
    isFeatured: true,
    tags: ['Feedback', 'NPS', 'CX']
  },
  {
    id: '3',
    title: 'Job Application Form',
    description: 'Streamline your hiring process with structured application fields, resume upload, and automated screening questions.',
    category: 'hr',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_10972182a-1764672250561.png",
    alt: 'Professional woman in business attire reviewing job applications and resumes at organized desk',
    rating: 4.7,
    usageCount: 1893,
    isFeatured: false,
    tags: ['Recruitment', 'HR', 'Hiring']
  },
  {
    id: '4',
    title: 'Event Registration',
    description: 'Manage event attendees with customizable registration fields, ticket selection, and payment integration support.',
    category: 'events',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_12681ab67-1764666699439.png",
    alt: 'Large conference hall filled with attendees at professional business event with stage lighting',
    rating: 4.6,
    usageCount: 2156,
    isFeatured: false,
    tags: ['Events', 'Registration', 'Ticketing']
  },
  {
    id: '5',
    title: 'Contact Us Form',
    description: 'Professional contact form with department routing, file attachments, and automated response confirmation.',
    category: 'business',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1aea2bccd-1765183165013.png",
    alt: 'Modern smartphone displaying contact form interface on wooden desk with coffee cup and notebook',
    rating: 4.5,
    usageCount: 4782,
    isFeatured: false,
    tags: ['Support', 'Contact', 'Communication']
  },
  {
    id: '6',
    title: 'Product Order Form',
    description: 'Simplify product orders with quantity selectors, variant options, shipping details, and order summary calculations.',
    category: 'business',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_13d1a950a-1764665872540.png",
    alt: 'E-commerce product order form displayed on tablet with shopping cart and payment options visible',
    rating: 4.7,
    usageCount: 1647,
    isFeatured: true,
    tags: ['E-commerce', 'Orders', 'Sales']
  },
  {
    id: '7',
    title: 'Employee Onboarding',
    description: 'Comprehensive onboarding checklist with document uploads, emergency contacts, and IT equipment requests.',
    category: 'hr',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_14efeac9c-1764830471582.png",
    alt: 'New employee completing onboarding paperwork at desk with laptop and welcome materials',
    rating: 4.8,
    usageCount: 987,
    isFeatured: false,
    tags: ['HR', 'Onboarding', 'Training']
  },
  {
    id: '8',
    title: 'Newsletter Signup',
    description: 'Grow your email list with GDPR-compliant signup form featuring preference center and double opt-in support.',
    category: 'marketing',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b9c9c673-1765273095536.png",
    alt: 'Email newsletter signup interface on laptop screen with colorful marketing graphics and subscribe button',
    rating: 4.6,
    usageCount: 3298,
    isFeatured: false,
    tags: ['Email', 'Marketing', 'Subscribers']
  },
  {
    id: '9',
    title: 'Workshop Registration',
    description: 'Manage workshop signups with session selection, dietary preferences, and accessibility requirements.',
    category: 'events',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ebca7506-1764775471730.png",
    alt: 'Interactive workshop session with participants collaborating around table with laptops and materials',
    rating: 4.5,
    usageCount: 1234,
    isFeatured: false,
    tags: ['Training', 'Workshops', 'Education']
  },
  {
    id: '10',
    title: 'Market Research Survey',
    description: 'Conduct professional market research with branching logic, demographic profiling, and data export capabilities.',
    category: 'surveys',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_162e1bb75-1764659449969.png",
    alt: 'Market research data visualization with colorful pie charts and bar graphs on computer monitor',
    rating: 4.9,
    usageCount: 2567,
    isFeatured: true,
    tags: ['Research', 'Analytics', 'Insights']
  },
  {
    id: '11',
    title: 'Volunteer Application',
    description: 'Recruit volunteers efficiently with availability scheduling, skills assessment, and background check consent.',
    category: 'hr',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c06f8634-1764666124817.png",
    alt: 'Group of diverse volunteers in matching t-shirts working together at community service event',
    rating: 4.4,
    usageCount: 876,
    isFeatured: false,
    tags: ['Volunteers', 'Non-profit', 'Community']
  },
  {
    id: '12',
    title: 'Service Request Form',
    description: 'Handle service requests with priority levels, issue categorization, and automated ticket creation.',
    category: 'business',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e2ade2b2-1764668076170.png",
    alt: 'Customer service representative reviewing service request tickets on dual monitor setup',
    rating: 4.6,
    usageCount: 1543,
    isFeatured: false,
    tags: ['Support', 'Service', 'Tickets']
  }];


  useEffect(() => {
    if (!isHydrated) return;

    let filtered = mockTemplates;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter((template) => template.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((template) =>
      template.title.toLowerCase().includes(query) ||
      template.description.toLowerCase().includes(query) ||
      template.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    setFilteredTemplates(filtered);
  }, [activeCategory, searchQuery, isHydrated]);

  const handleUseTemplate = (templateId: string) => {
    if (!isHydrated) return;
    router.push(`/form-builder-workspace?template=${templateId}`);
  };

  const handlePreview = (templateId: string) => {
    if (!isHydrated) return;
    router.push(`/form-preview-mode?template=${templateId}`);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-surface rounded-lg w-1/3"></div>
            <div className="h-10 bg-surface rounded-lg w-full max-w-md"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) =>
              <div key={i} className="h-96 bg-surface rounded-xl"></div>
              )}
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen gradient-background pt-16">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-subtle">
              <Icon name="TemplateIcon" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Template Gallery</h1>
              <p className="text-text-secondary">
                Start with professionally designed templates ✨
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search templates by name, category, or use case..." />

        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory} />


        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-text-secondary">
            {filteredTemplates.length} {filteredTemplates.length === 1 ? 'template' : 'templates'} found
          </p>
          {searchQuery &&
          <button
            onClick={handleClearSearch}
            className="text-sm text-primary hover:underline transition-smooth">

              Clear search
            </button>
          }
        </div>

        {/* Templates Grid */}
        {filteredTemplates.length > 0 ?
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) =>
          <TemplateCard
            key={template.id}
            template={template}
            onUseTemplate={handleUseTemplate}
            onPreview={handlePreview} />

          )}
          </div> :

        <EmptyState
          searchQuery={searchQuery}
          onClearSearch={handleClearSearch} />

        }

        {/* Bottom CTA */}
        {filteredTemplates.length > 0 &&
        <div className="mt-12 p-8 bg-surface border border-border rounded-xl text-center">
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              Can't find what you're looking for?
            </h3>
            <p className="text-text-secondary mb-6">
              Start from scratch and build your perfect form with our intuitive builder
            </p>
            <button
            onClick={() => router.push('/form-builder-workspace')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-smooth shadow-subtle">

              <Icon name="PlusIcon" size={20} />
              <span>Create Custom Form</span>
            </button>
          </div>
        }
      </div>
    </div>);

};

export default TemplateGalleryInteractive;