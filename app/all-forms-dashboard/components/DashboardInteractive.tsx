'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import DashboardStats from './DashboardStats';
import SearchAndFilters from './SearchAndFilters';
import FormCard from './FormCard';
import EmptyState from './EmptyState';
import BulkActions from './BulkActions';
import DeleteConfirmationModal from './DeleteConfirmationModal';

interface Form {
  id: string;
  title: string;
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
  submissions: number;
  thumbnail: string;
  thumbnailAlt: string;
}

const DashboardInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [forms, setForms] = useState<Form[]>([]);
  const [filteredForms, setFilteredForms] = useState<Form[]>([]);
  const [selectedForms, setSelectedForms] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterStatus, setFilterStatus] = useState('all');
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    formId: string | null;
    formTitle: string;
    isMultiple: boolean;
  }>({
    isOpen: false,
    formId: null,
    formTitle: '',
    isMultiple: false
  });

  useEffect(() => {
    setIsHydrated(true);

    const mockForms: Form[] = [
    {
      id: '1',
      title: 'Customer Feedback Survey',
      status: 'published',
      createdAt: 'Dec 8, 2025',
      submissions: 142,
      thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1557e9288-1764661787238.png",
      thumbnailAlt: 'Modern office workspace with laptop showing colorful feedback survey dashboard on screen'
    },
    {
      id: '2',
      title: 'Job Application Form',
      status: 'published',
      createdAt: 'Dec 7, 2025',
      submissions: 89,
      thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_18b2efd25-1765154330444.png",
      thumbnailAlt: 'Professional woman in business attire reviewing job application documents at desk'
    },
    {
      id: '3',
      title: 'Event Registration',
      status: 'draft',
      createdAt: 'Dec 6, 2025',
      submissions: 0,
      thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_16d437cb2-1765094619514.png",
      thumbnailAlt: 'Large conference hall filled with attendees at business event with stage lighting'
    },
    {
      id: '4',
      title: 'Product Feedback',
      status: 'published',
      createdAt: 'Dec 5, 2025',
      submissions: 234,
      thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_122daf91b-1764676753294.png",
      thumbnailAlt: 'Business analytics dashboard displaying colorful charts and graphs on computer monitor'
    },
    {
      id: '5',
      title: 'Newsletter Signup',
      status: 'published',
      createdAt: 'Dec 4, 2025',
      submissions: 567,
      thumbnail: "https://images.unsplash.com/photo-1704360843640-cb238862b366",
      thumbnailAlt: 'Close-up of hands typing on laptop keyboard with email newsletter interface visible'
    },
    {
      id: '6',
      title: 'Contact Us Form',
      status: 'archived',
      createdAt: 'Dec 3, 2025',
      submissions: 45,
      thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1113955e4-1764671268430.png",
      thumbnailAlt: 'Professional businessman in suit working on contact management system on tablet device'
    }];


    setForms(mockForms);
    setFilteredForms(mockForms);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    let result = [...forms];

    if (searchQuery) {
      result = result.filter((form) =>
      form.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      result = result.filter((form) => form.status === filterStatus);
    }

    result.sort((a, b) => {
      if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'submissions') {
        return b.submissions - a.submissions;
      }
      return 0;
    });

    setFilteredForms(result);
  }, [searchQuery, sortBy, filterStatus, forms, isHydrated]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSort = (sort: string) => {
    setSortBy(sort);
  };

  const handleFilter = (status: string) => {
    setFilterStatus(status);
  };

  const handleDuplicate = (formId: string) => {
    const formToDuplicate = forms.find((f) => f.id === formId);
    if (formToDuplicate) {
      const newForm: Form = {
        ...formToDuplicate,
        id: `${Date.now()}`,
        title: `${formToDuplicate.title} (Copy)`,
        createdAt: 'Just now',
        submissions: 0
      };
      setForms([newForm, ...forms]);
    }
  };

  const handleDelete = (formId: string) => {
    const form = forms.find((f) => f.id === formId);
    if (form) {
      setDeleteModal({
        isOpen: true,
        formId,
        formTitle: form.title,
        isMultiple: false
      });
    }
  };

  const confirmDelete = () => {
    if (deleteModal.isMultiple) {
      setForms(forms.filter((f) => !selectedForms.has(f.id)));
      setSelectedForms(new Set());
    } else if (deleteModal.formId) {
      setForms(forms.filter((f) => f.id !== deleteModal.formId));
    }
  };

  const handleBulkDelete = () => {
    setDeleteModal({
      isOpen: true,
      formId: null,
      formTitle: '',
      isMultiple: true
    });
  };

  const handleBulkArchive = () => {
    setForms(
      forms.map((f) =>
      selectedForms.has(f.id) ? { ...f, status: 'archived' as const } : f
      )
    );
    setSelectedForms(new Set());
  };

  const totalSubmissions = forms.reduce((sum, form) => sum + form.submissions, 0);
  const activeForms = forms.filter((f) => f.status === 'published').length;

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">My Forms</h1>
              <p className="text-sm sm:text-base text-text-secondary">Manage and organize all your forms</p>
            </div>
          </div>
          <DashboardStats
            totalForms={0}
            activeForms={0}
            totalSubmissions={0} />

        </div>
      </div>);

  }

  return (
    <div className="min-h-screen gradient-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 sm:mb-10 gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2 overflow-hidden text-ellipsis">My Forms</h1>
            <p className="text-base sm:text-lg text-text-secondary overflow-hidden text-ellipsis">Create, manage, and organize all your forms</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link
              href="/template-gallery"
              className="flex items-center justify-center gap-2 px-5 py-3 bg-white border-2 border-primary/20 text-primary rounded-xl font-semibold hover:bg-primary/5 hover:border-primary/30 transition-smooth shadow-subtle whitespace-nowrap text-sm sm:text-base">

              <Icon name="TemplateIcon" size={20} className="flex-shrink-0" />
              <span className="overflow-hidden text-ellipsis">Browse Templates</span>
            </Link>
            <Link
              href="/form-builder-workspace"
              className="flex items-center justify-center gap-2 px-5 py-3 gradient-primary text-primary-foreground rounded-xl font-semibold hover:opacity-95 transition-smooth shadow-card whitespace-nowrap text-sm sm:text-base">

              <Icon name="PlusIcon" size={20} className="flex-shrink-0" />
              <span className="overflow-hidden text-ellipsis">Create New Form</span>
            </Link>
          </div>
        </div>

        <DashboardStats
          totalForms={forms.length}
          activeForms={activeForms}
          totalSubmissions={totalSubmissions} />


        {forms.length > 0 ?
        <>
            <SearchAndFilters
            onSearch={handleSearch}
            onSort={handleSort}
            onFilter={handleFilter} />


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
              {filteredForms.map((form) =>
            <FormCard
              key={form.id}
              {...form}
              onDuplicate={() => handleDuplicate(form.id)}
              onDelete={() => handleDelete(form.id)} />

            )}
            </div>

            {filteredForms.length === 0 &&
          <div className="text-center py-12">
                <Icon name="SearchIcon" size={48} className="text-text-secondary mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-text-primary mb-2">No forms found</h3>
                <p className="text-sm sm:text-base text-text-secondary">Try adjusting your search or filters</p>
              </div>
          }

            <BulkActions
            selectedCount={selectedForms.size}
            onArchive={handleBulkArchive}
            onDelete={handleBulkDelete}
            onClearSelection={() => setSelectedForms(new Set())} />

          </> :

        <EmptyState />
        }

        <DeleteConfirmationModal
          isOpen={deleteModal.isOpen}
          onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
          onConfirm={confirmDelete}
          formTitle={deleteModal.formTitle}
          isMultiple={deleteModal.isMultiple}
          count={selectedForms.size} />

      </div>
    </div>);

};

export default DashboardInteractive;