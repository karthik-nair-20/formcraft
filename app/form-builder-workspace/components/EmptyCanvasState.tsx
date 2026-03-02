import Icon from '@/components/ui/AppIcon';

interface EmptyCanvasStateProps {
  onAddBlock: () => void;
}

const EmptyCanvasState = ({ onAddBlock }: EmptyCanvasStateProps) => {
  return (
    <div className="flex items-center justify-center min-h-[500px] p-8">
      <div className="text-center max-w-md">
        {/* Doodle SVG */}
        <div className="relative inline-block mb-6">
          <div className="flex items-center justify-center w-20 h-20 bg-primary/10 rounded-2xl">
            <Icon name="DocumentTextIcon" size={40} className="text-primary" variant="solid" />
          </div>
          <svg
            className="absolute -top-2 -right-2 w-12 h-12"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 8L28 16L36 20L28 24L24 32L20 24L12 20L20 16L24 8Z"
              fill="#F59E0B"
              opacity="0.8"
            />
          </svg>
        </div>

        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Start building your form ✨
        </h3>
        <p className="text-sm text-text-secondary mb-6 leading-relaxed">
          Type <kbd className="px-2 py-1 bg-surface border border-border rounded text-xs font-mono">/</kbd> to open the block menu, or press <kbd className="px-2 py-1 bg-surface border border-border rounded text-xs font-mono">Enter</kbd> to add your first block
        </p>

        <button
          onClick={onAddBlock}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-smooth shadow-subtle"
        >
          <Icon name="PlusIcon" size={20} />
          <span>Add First Block</span>
        </button>

        {/* Helper Tips */}
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-xs text-text-secondary mb-3 font-medium">Quick Tips 💡</p>
          <div className="space-y-2 text-left">
            <div className="flex items-start gap-2 text-xs text-text-secondary">
              <Icon name="LightningBoltIcon" size={14} className="mt-0.5 flex-shrink-0" />
              <span>Use <strong className="text-text-primary">markdown shortcuts</strong> like # for headings</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-text-secondary">
              <Icon name="CursorClickIcon" size={14} className="mt-0.5 flex-shrink-0" />
              <span>Drag blocks to <strong className="text-text-primary">reorder</strong> or create columns</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-text-secondary">
              <Icon name="EyeIcon" size={14} className="mt-0.5 flex-shrink-0" />
              <span>Click <strong className="text-text-primary">Preview</strong> to see the end-user view</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCanvasState;