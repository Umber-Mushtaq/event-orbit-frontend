import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";

function VendorActionMenu({ onView, onApprove, onReject, onSuspend, onEdit, onDelete }) {
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
        className='inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-stone-200 transition hover:border-border-gold/30 hover:text-white'
        aria-label='Open vendor actions'
      >
        <MoreVertical className='h-4 w-4' />
      </button>

      {open ? (
        <div className='absolute right-0 top-[calc(100%+10px)] z-20 w-44 rounded-3xl border border-border-gold/15 bg-[#111111] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.45)]'>
          {[
            ["View", onView],
            ["Approve", onApprove],
            ["Reject", onReject, "danger"],
            ["Suspend", onSuspend],
            ["Edit", onEdit],
            ["Delete", onDelete, "danger"],
          ].map(([label, action, variant]) => (
            <button
              key={label}
              type='button'
              onClick={() => {
                setOpen(false);
                action?.();
              }}
              className={`w-full rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                variant === "danger"
                  ? "border-red-500/20 bg-red-500/10 text-red-200 hover:border-red-400/30 hover:text-red-100"
                  : "border-white/8 bg-white/5 text-stone-200 hover:border-border-gold/30 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default VendorActionMenu;
