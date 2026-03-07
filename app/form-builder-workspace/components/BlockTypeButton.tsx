interface BlockTypeButtonProps {
  icon: string;
  label: string;
  description: string;
  onClick: () => void;
}

const BlockTypeButton = ({ icon, label, description, onClick }: BlockTypeButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-start gap-3 w-full px-3 py-2 rounded-lg text-left hover:bg-surface transition-smooth group"
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-surface group-hover:bg-primary/10 transition-smooth">
        <span className="text-lg">{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-text-primary">{label}</div>
        <div className="text-xs text-text-secondary truncate">{description}</div>
      </div>
    </button>
  );
};

export default BlockTypeButton;