import { useEffect, useRef, useState } from "react";
import { MoreHorizontal, Plus } from "lucide-react";

function EventsActionMenu({
  trigger,
  items,
  align = "right",
  triggerClassName = "",
  panelClassName = "",
}) {
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
      if (event.key === "Escape") setOpen(false);
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

      const panelWidth = panel.offsetWidth || 208;
      const panelHeight = panel.offsetHeight || 0;
      const gap = 10;
      const viewportPadding = 8;
      const maxLeft = Math.max(viewportPadding, window.innerWidth - panelWidth - viewportPadding);

      let left = align === "right" ? triggerRect.right - panelWidth : triggerRect.left;
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
  }, [align, open]);

  return (
    <div ref={menuRef} className='relative'>
      <button
        ref={triggerRef}
        type='button'
        onClick={() => setOpen((value) => !value)}
        className={triggerClassName}
      >
        {trigger || <MoreHorizontal className='h-4 w-4' />}
      </button>

      {open ? (
        <div
          ref={panelRef}
          className={`fixed z-[80] w-52 max-w-[calc(100vw-16px)] rounded-3xl border border-border-gold/15 bg-[#111111] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-opacity duration-150 ${
            positioned ? "opacity-100" : "pointer-events-none opacity-0"
          } ${panelClassName}`}
          style={{ top: menuPosition.top, left: menuPosition.left }}
        >
          <div className='flex flex-col gap-1'>
            {items.map((item) => {
              const Icon = item.icon || Plus;

              return (
                <button
                  key={item.label}
                  type='button'
                  onClick={() => {
                    setOpen(false);
                    item.onClick?.();
                  }}
                  className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                    item.variant === "danger"
                      ? "border-red-500/20 bg-red-500/10 text-red-200 hover:border-red-400/30 hover:text-red-100"
                      : "border-white/8 bg-white/5 text-stone-200 hover:border-border-gold/30 hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  <Icon className='h-4 w-4' />
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default EventsActionMenu;
