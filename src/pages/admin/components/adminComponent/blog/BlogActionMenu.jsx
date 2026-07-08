import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";

function BlogActionMenu({ onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [positioned, setPositioned] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      setPositioned(false);
      return undefined;
    }

    const updatePosition = () => {
      const triggerRect = triggerRef.current?.getBoundingClientRect();
      const panel = panelRef.current;

      if (!triggerRect || !panel) return;

      const panelWidth = panel.offsetWidth || 176;
      const panelHeight = panel.offsetHeight || 0;
      const gap = 10;
      const viewportPadding = 8;
      const maxLeft = Math.max(viewportPadding, window.innerWidth - panelWidth - viewportPadding);

      let left = triggerRect.right - panelWidth;
      left = Math.min(Math.max(left, viewportPadding), maxLeft);

      let top = triggerRect.bottom + gap;
      if (panelHeight && top + panelHeight + viewportPadding > window.innerHeight) {
        top = Math.max(viewportPadding, triggerRect.top - panelHeight - gap);
      }

      setMenuPosition({
        top: Math.round(top),
        left: Math.round(left),
      });
      setPositioned(true);
    };

    const frame = window.requestAnimationFrame(updatePosition);

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);

  return (
    <div ref={menuRef} className='relative'>
      {/* Three-dot menu keeps edit and delete actions tucked away until needed. */}
      <button
        ref={triggerRef}
        type='button'
        onClick={() => setOpen((value) => !value)}
        className='inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-stone-200 transition hover:border-border-gold/30 hover:text-white'
        aria-label='Open blog actions'
      >
        <MoreVertical className='h-4 w-4' />
      </button>

      {open ? (
        <div
          ref={panelRef}
          className={`fixed z-[80] w-44 max-w-[calc(100vw-16px)] rounded-3xl border border-border-gold/15 bg-[#111111] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-opacity duration-150 ${
            positioned ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          style={{ top: menuPosition.top, left: menuPosition.left }}
        >
          <div className='flex flex-col gap-1'>
            <button
              type='button'
              onClick={() => {
                setOpen(false);
                onEdit();
              }}
              className='w-full rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-stone-200 transition hover:border-border-gold/30 hover:text-white'
            >
              Edit
            </button>
            <button
              type='button'
              onClick={() => {
                setOpen(false);
                onDelete();
              }}
              className='w-full rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-left text-sm font-semibold text-red-200 transition hover:border-red-400/30 hover:text-red-100'
            >
              Delete
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default BlogActionMenu;
