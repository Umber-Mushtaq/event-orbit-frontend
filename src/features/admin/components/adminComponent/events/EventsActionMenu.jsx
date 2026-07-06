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

  return (
    <div ref={menuRef} className='relative'>
      <button
        type='button'
        onClick={() => setOpen((value) => !value)}
        className={triggerClassName}
      >
        {trigger || <MoreHorizontal className='h-4 w-4' />}
      </button>

      {open ? (
        <div
          className={`absolute top-[calc(100%+10px)] z-20 w-52 rounded-3xl border border-border-gold/15 bg-[#111111] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.45)] ${
            align === "right" ? "right-0" : "left-0"
          } ${panelClassName}`}
        >
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
      ) : null}
    </div>
  );
}

export default EventsActionMenu;
