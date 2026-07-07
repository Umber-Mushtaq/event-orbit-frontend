import {
  Bold,
  Code2,
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
  { label: "Bullets", icon: List, command: "insertUnorderedList" },
  { label: "Numbered", icon: ListOrdered, command: "insertOrderedList" },
  { label: "Quote", icon: Quote, command: "formatBlock", value: "blockquote" },
  { label: "Code", icon: Code2, command: "codeBlock" },
];

const headingOptions = [
  { label: "Paragraph", value: "p" },
  { label: "Heading 1", value: "h1" },
  { label: "Heading 2", value: "h2" },
  { label: "Heading 3", value: "h3" },
  { label: "Heading 4", value: "h4" },
  { label: "Heading 5", value: "h5" },
  { label: "Heading 6", value: "h6" },
];

function BlogEditorToolbar({ onCommand }) {
  return (
    <div className='mb-4 flex flex-wrap items-center gap-2'>
      <label className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-stone-200'>
        <span className='text-border-gold-hover'>Heading</span>
        <select
          defaultValue='p'
          onChange={(event) => onCommand("formatBlock", event.target.value)}
          className='bg-transparent text-xs font-semibold text-white outline-none'
        >
          {headingOptions.map((option) => (
            <option key={option.value} value={option.value} className='bg-[#111111]'>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      {editorActions.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.label}
            type='button'
            onMouseDown={(event) => event.preventDefault()}
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
        onMouseDown={(event) => event.preventDefault()}
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
