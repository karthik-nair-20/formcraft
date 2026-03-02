interface Page {
  id: string;
  label: string;
}

interface PageControlProps {
  pages: Page[];
  currentPageId: string;
  onPageChange: (pageId: string) => void;
  onAddPage: () => void;
}

const PageControl = ({ pages, currentPageId, onPageChange, onAddPage }: PageControlProps) => {
  return (
    <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border/50">
      {pages.map((page) => (
        <button
          key={page.id}
          onClick={() => onPageChange(page.id)}
          className={`text-sm font-medium px-3 py-1.5 rounded-md transition-smooth ${
            page.id === currentPageId
              ? 'text-text-primary bg-surface underline decoration-2 underline-offset-4' :'text-text-secondary hover:text-text-primary hover:bg-surface/50'
          }`}
        >
          {page.label}
        </button>
      ))}
      <button
        onClick={onAddPage}
        className="text-sm font-medium text-text-secondary hover:text-text-primary px-3 py-1.5 rounded-md hover:bg-surface/50 transition-smooth"
      >
        + Add page
      </button>
    </div>
  );
};

export default PageControl;