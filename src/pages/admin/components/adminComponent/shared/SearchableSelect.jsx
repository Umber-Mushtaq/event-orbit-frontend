import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

function SearchableSelect({
  label,
  value,
  options = [],
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  loading = false,
  error = "",
  emptyMessage = "No options found.",
  required = false,
  onChange,
}) {
  const wrapperRef = useRef(null);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);
  const searchRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const [positioned, setPositioned] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);

  const selectedOption = useMemo(
    () => options.find((option) => option.id === value || option.label === value) || null,
    [options, value],
  );

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return options;

    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(normalizedQuery) ||
        String(option.id).toLowerCase().includes(normalizedQuery),
    );
  }, [options, query]);

  useEffect(() => {
    if (!open) return undefined;

    setQuery("");
    setHighlightIndex(
      Math.max(
        0,
        options.findIndex((option) => option.id === value || option.label === value),
      ),
    );

    const frame = window.requestAnimationFrame(() => {
      searchRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [open, options, value]);

  useEffect(() => {
    if (!open) return;
    setHighlightIndex((current) => {
      if (!filteredOptions.length) return 0;
      return Math.min(current, filteredOptions.length - 1);
    });
  }, [filteredOptions.length, open]);

  useEffect(() => {
    if (open) {
      setHighlightIndex(0);
    }
  }, [open, query]);

  useEffect(() => {
    if (!open) {
      setPositioned(false);
      return undefined;
    }

    const updatePosition = () => {
      const triggerRect = triggerRef.current?.getBoundingClientRect();
      const panel = panelRef.current;
      if (!triggerRect || !panel) return;

      const panelHeight = panel.offsetHeight || 0;
      const panelWidth = triggerRect.width;
      const gap = 8;
      const viewportPadding = 8;
      const maxLeft = Math.max(
        viewportPadding,
        window.innerWidth - panelWidth - viewportPadding,
      );

      let left = triggerRect.left;
      left = Math.min(Math.max(left, viewportPadding), maxLeft);

      let top = triggerRect.bottom + gap;
      if (
        panelHeight &&
        top + panelHeight + viewportPadding > window.innerHeight
      ) {
        top = Math.max(viewportPadding, triggerRect.top - panelHeight - gap);
      }

      setPosition({
        top: Math.round(top),
        left: Math.round(left),
        width: Math.round(panelWidth),
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
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    const handleOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleSelect = (option) => {
    onChange?.(option.id, option);
    setOpen(false);
    setQuery("");
  };

  const handleKeyDown = (event) => {
    if (!filteredOptions.length) {
      if (event.key === "Escape") setOpen(false);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightIndex((current) => Math.min(current + 1, filteredOptions.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightIndex((current) => Math.max(current - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      handleSelect(filteredOptions[highlightIndex] || filteredOptions[0]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} className='relative w-full'>
      <span className='mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone-400'>
        <span>{label}</span>
        {required ? (
          <span className='rounded-full border border-red-500/20 bg-red-500/10 px-2 py-0.5 text-[10px] font-bold tracking-[0.18em] text-red-200'>
            Required
          </span>
        ) : null}
      </span>

      <button
        ref={triggerRef}
        type='button'
        onClick={() => setOpen((current) => !current)}
        className='flex min-h-[52px] w-full items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-left text-sm text-white outline-none transition hover:border-border-gold/30 focus:border-border-gold/40'
        aria-haspopup='listbox'
        aria-expanded={open}
      >
        <span className={selectedOption ? "text-white" : "text-stone-500"}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown className={`h-4 w-4 text-stone-400 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open ? (
        <div
          ref={panelRef}
          className={`fixed z-[90] rounded-2xl border border-white/10 bg-[#111111] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-opacity duration-150 ${
            positioned ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          style={{ top: position.top, left: position.left, width: position.width }}
        >
          <input
            ref={searchRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={searchPlaceholder}
            className='mb-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-stone-500 focus:border-border-gold/40'
          />

          <div className='max-h-60 overflow-auto pr-1'>
            {loading ? (
              <div className='rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-stone-400'>
                Loading...
              </div>
            ) : error ? (
              <div className='rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200'>
                {error}
              </div>
            ) : filteredOptions.length ? (
              filteredOptions.map((option, index) => {
                const active = option.id === value || option.label === value;
                const highlighted = index === highlightIndex;

                return (
                  <button
                    key={option.id}
                    type='button'
                    onClick={() => handleSelect(option)}
                    onMouseEnter={() => setHighlightIndex(index)}
                    className={`mb-1 flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition last:mb-0 ${
                      active
                        ? "border-border-gold/30 bg-glass-gold text-border-gold-hover"
                        : highlighted
                          ? "border-border-gold/20 bg-white/5 text-white"
                          : "border-white/5 bg-black/10 text-stone-300 hover:border-border-gold/20 hover:text-white"
                    }`}
                    role='option'
                    aria-selected={active}
                  >
                    <span className='truncate'>{option.label}</span>
                    {active ? <Check className='h-4 w-4 shrink-0' /> : null}
                  </button>
                );
              })
            ) : (
              <div className='rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-stone-400'>
                {emptyMessage}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default SearchableSelect;
