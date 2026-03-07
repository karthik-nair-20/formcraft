'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface NavigationItem {
  label: string;
  path: string;
  icon: string;
  tooltip: string;
}

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });

  const navigationItems: NavigationItem[] = [
    {
      label: 'Dashboard',
      path: '/all-forms-dashboard',
      icon: 'ViewGridIcon',
      tooltip: 'Manage all your forms',
    },
    {
      label: 'Templates',
      path: '/template-gallery',
      icon: 'TemplateIcon',
      tooltip: 'Browse form templates',
    },
    {
      label: 'Builder',
      path: '/form-builder-workspace',
      icon: 'PencilAltIcon',
      tooltip: 'Create and edit forms',
    },
    {
      label: 'Preview',
      path: '/form-preview-mode',
      icon: 'EyeIcon',
      tooltip: 'Preview your forms',
    },
    {
      label: 'Submissions',
      path: '/form-submissions-view',
      icon: 'DocumentTextIcon',
      tooltip: 'View form responses',
    },
  ];

  const secondaryItems: NavigationItem[] = [
    {
      label: 'Integrations',
      path: '/integrations-marketplace',
      icon: 'PuzzleIcon',
      tooltip: 'Connect your tools',
    },
  ];

  const isActive = (path: string) => pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMoreMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isMoreMenuOpen) {
      const rect = event.currentTarget.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8, // 8px gap below button
        right: window.innerWidth - rect.right
      });
    }
    setIsMoreMenuOpen(!isMoreMenuOpen);
  };

  // Calculate visible items based on screen width
  const primaryVisibleItems = navigationItems.slice(0, 3); // First 3 items always visible on desktop
  const moreMenuItems = navigationItems.slice(3); // Rest in "More" menu

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-background border-b border-border">
      <nav className="flex items-center h-16 px-4 sm:px-6 max-w-full overflow-hidden">
        {/* Logo - Responsive sizing */}
        <Link 
          href="/all-forms-dashboard" 
          className="flex items-center gap-2 mr-4 lg:mr-8 flex-shrink-0 transition-smooth hover:opacity-80"
        >
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="DocumentTextIcon" size={20} className="text-primary-foreground" variant="solid" />
          </div>
          <span className="text-lg sm:text-xl font-semibold text-text-primary hidden sm:inline">FormCraft</span>
        </Link>

        {/* Desktop Navigation - Progressive collapse strategy */}
        <div className="hidden lg:flex items-center flex-1 gap-1 min-w-0">
          {primaryVisibleItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap
                transition-smooth hover-lift flex-shrink-0
                ${
                  isActive(item.path)
                    ? 'bg-primary text-primary-foreground shadow-subtle'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                }
              `}
              title={item.tooltip}
            >
              <Icon name={item.icon as any} size={18} variant={isActive(item.path) ? 'solid' : 'outline'} />
              <span className="hidden xl:inline">{item.label}</span>
            </Link>
          ))}
          
          {/* "More" dropdown for overflow items */}
          <div className="flex-shrink-0">
            <button
              onClick={toggleMoreMenu}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap
                transition-smooth hover-lift
                ${
                  moreMenuItems.some(item => isActive(item.path))
                    ? 'bg-primary text-primary-foreground shadow-subtle'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                }
              `}
              title="More options"
            >
              <Icon name="DotsHorizontalIcon" size={18} />
              <span className="hidden xl:inline">More</span>
            </button>
          </div>
        </div>

        {/* Desktop Secondary Actions - Responsive hiding */}
        <div className="hidden lg:flex items-center gap-2 ml-auto flex-shrink-0">
          {secondaryItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap
                transition-smooth hover-lift flex-shrink-0
                ${
                  isActive(item.path)
                    ? 'bg-primary text-primary-foreground shadow-subtle'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                }
              `}
              title={item.tooltip}
            >
              <Icon name={item.icon as any} size={18} variant={isActive(item.path) ? 'solid' : 'outline'} />
              <span className="hidden xl:inline">{item.label}</span>
            </Link>
          ))}
          
          <div className="w-px h-6 bg-border mx-2 hidden xl:block" />
          
          <button
            className="flex items-center justify-center w-10 h-10 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface transition-smooth flex-shrink-0"
            title="Notifications"
          >
            <Icon name="BellIcon" size={20} />
          </button>
          
          <button
            className="hidden xl:flex items-center justify-center w-10 h-10 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface transition-smooth flex-shrink-0"
            title="Settings"
          >
            <Icon name="CogIcon" size={20} />
          </button>
          
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-smooth flex-shrink-0"
            title="User Profile"
          >
            JD
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden flex items-center justify-center w-10 h-10 ml-auto rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface transition-smooth flex-shrink-0"
          aria-label="Toggle menu"
        >
          <Icon name={isMobileMenuOpen ? 'XIcon' : 'MenuIcon'} size={24} />
        </button>
      </nav>

      {/* More Menu Dropdown - Fixed positioning to appear above all content */}
      {isMoreMenuOpen && (
        <>
          <div 
            className="fixed inset-0 z-[9998]" 
            onClick={() => setIsMoreMenuOpen(false)}
          />
          <div 
            className="fixed w-48 bg-white border border-border rounded-lg shadow-xl overflow-hidden z-[9999]"
            style={{
              top: `${dropdownPosition.top}px`,
              right: `${dropdownPosition.right}px`
            }}
          >
            {moreMenuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMoreMenuOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 text-sm font-medium transition-smooth
                  ${
                    isActive(item.path)
                      ? 'bg-primary/10 text-primary' :'text-text-secondary hover:text-text-primary hover:bg-surface'
                  }
                `}
              >
                <Icon name={item.icon as any} size={18} variant={isActive(item.path) ? 'solid' : 'outline'} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* Mobile Menu - Full width, scrollable */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            {[...navigationItems, ...secondaryItems].map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                  transition-smooth
                  ${
                    isActive(item.path)
                      ? 'bg-primary text-primary-foreground shadow-subtle'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                  }
                `}
              >
                <Icon name={item.icon as any} size={20} variant={isActive(item.path) ? 'solid' : 'outline'} />
                <span>{item.label}</span>
              </Link>
            ))}
            
            <div className="h-px bg-border my-2" />
            
            <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface transition-smooth">
              <Icon name="BellIcon" size={20} />
              <span>Notifications</span>
            </button>
            
            <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface transition-smooth">
              <Icon name="CogIcon" size={20} />
              <span>Settings</span>
            </button>
            
            <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface transition-smooth">
              <Icon name="UserIcon" size={20} />
              <span>Profile</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;