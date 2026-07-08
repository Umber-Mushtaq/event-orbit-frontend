import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { vendorStatusStyles } from "../../../data/admin-data/vendorManagementData";

const statusOptions = ["Approved", "Rejected", "Suspended"];

function VendorStatusCell({
  vendor,
  isOpen,
  isUpdating,
  onOpen,
  onClose,
  onSelect,
}) {
  const menuRef = useRef(null);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [positioned, setPositioned] = useState(false);

  useEffect(() => {
    if (!isOpen) {
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

      setPosition({
        top: Math.round(top),
        left: Math.round(left),
      });
      setPositioned(true);
    };

    const frame = window.requestAnimationFrame(updatePosition);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <div ref={menuRef} className="relative inline-flex">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => (isOpen ? onClose() : onOpen())}
        className={`inline-flex cursor-pointer rounded-full border px-2.5 py-1 text-[11px] font-semibold transition ${vendorStatusStyles[vendor.status] || vendorStatusStyles.Pending}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        {vendor.status}
      </button>

      {isOpen ? (
        <div
          ref={panelRef}
          className={`fixed z-[80] w-44 max-w-[calc(100vw-16px)] rounded-3xl border border-admin-border bg-admin-surface p-2 shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-opacity duration-150 ${
            positioned ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          style={{ top: position.top, left: position.left }}
          role="menu"
        >
          {isUpdating ? (
            <div className="px-3 py-2 text-xs font-semibold text-admin-muted">
              Updating status...
            </div>
          ) : null}

          <div className="flex flex-col gap-1">
            {statusOptions.map((status) => {
              const active = vendor.status === status;

              return (
                <button
                  key={status}
                  type="button"
                  disabled={isUpdating}
                  onClick={() => onSelect(status)}
                  className={`flex w-full cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                    active
                      ? "border-border-gold/30 bg-admin-input text-admin-foreground"
                      : "border-admin-border bg-admin-input text-admin-foreground hover:border-border-gold/30 hover:text-white"
                  } ${isUpdating ? "cursor-not-allowed opacity-70" : ""}`}
                  role="menuitem"
                >
                  <span>{status}</span>
                  {active ? <Check className="h-4 w-4" /> : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default VendorStatusCell;
