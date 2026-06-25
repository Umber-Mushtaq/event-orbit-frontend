import {
  Bold,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Quote,
  RotateCcw,
  Underline,
} from "lucide-react";

const editorActions = [
  { label: "Bold", icon: Bold, command: "bold" },
  { label: "Italic", icon: Italic, command: "italic" },
  { label: "Underline", icon: Underline, command: "underline" },
  { label: "Heading", icon: Heading2, command: "formatBlock", value: "h2" },
  { label: "Bullets", icon: List, command: "insertUnorderedList" },
  { label: "Numbered", icon: ListOrdered, command: "insertOrderedList" },
  { label: "Quote", icon: Quote, command: "formatBlock", value: "blockquote" },
];

function BlogEditorToolbar({ onCommand }) {
  return (
    <div className='mb-4 flex flex-wrap gap-2'>
      {editorActions.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.label}
            type='button'
            onClick={() => onCommand(action.command, action.value)}
            className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-stone-200 transition hover:border-border-gold/30 hover:text-white'
          >
            <Icon className='h-3.5 w-3.5 text-border-gold-hover' />
            {action.label}
          </button>
        );
      })}
      <button
        type='button'
        onClick={() => onCommand("removeFormat")}
        className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-stone-200 transition hover:border-border-gold/30 hover:text-white'
      >
        <RotateCcw className='h-3.5 w-3.5 text-border-gold-hover' />
        Clear
      </button>
    </div>
  );
}

export default BlogEditorToolbar;
