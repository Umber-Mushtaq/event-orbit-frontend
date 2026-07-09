import { useEffect, useState } from "react";
import { X } from "lucide-react";
import ModalShell from "../shared/ModalShell";
import SearchableSelect from "../shared/SearchableSelect";
import EventTimePicker from "../shared/EventTimePicker";
import { adminCategoriesApi, adminVenuesApi } from "../../../../../services/adminApi";

const emptyEvent = {
  eventName: "",
  categoryId: "",
  venueId: "",
  status: "Upcoming",
  attendees: "",
  revenue: "",
  eventDate: "",
  eventTime: "",
};

const toEditableNumber = (value) => String(value ?? "").replace(/[^0-9.-]/g, "");

function EventFormModal({ open, mode = "create", onClose, onSave, initialValue, submitError = "" }) {
  const [form, setForm] = useState(emptyEvent);
  const [categories, setCategories] = useState([]);
  const [venues, setVenues] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [venuesLoading, setVenuesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState("");
  const [venuesError, setVenuesError] = useState("");
  const [formError, setFormError] = useState("");

  const getMissingFields = () => {
    const missing = [];
    if (!form.eventName.trim()) missing.push("Event Name");
    if (!form.eventDate) missing.push("Event Date");
    if (!form.eventTime) missing.push("Event Time");
    if (!form.categoryId.trim()) missing.push("Category");
    if (!form.venueId.trim()) missing.push("Venue");
    return missing;
  };

  useEffect(() => {
    if (!open) return;

    setForm({
      ...emptyEvent,
      eventName: initialValue?.eventName || initialValue?.name || "",
      categoryId: initialValue?.categoryId || initialValue?.category || "",
      venueId: initialValue?.venueId || initialValue?.venue || "",
      status: initialValue?.status || "Upcoming",
      attendees: toEditableNumber(initialValue?.attendees),
      revenue: toEditableNumber(initialValue?.revenue),
      eventDate: initialValue?.eventDate || initialValue?.date || "",
      eventTime: initialValue?.eventTime || "",
    });
    setFormError("");
    setCategoriesError("");
    setVenuesError("");

    let mounted = true;

    const loadCategories = async () => {
      setCategoriesLoading(true);
      try {
        const response = await adminCategoriesApi.list({ limit: 100, sortBy: "name", sortOrder: "asc" });
        if (!mounted) return;

        setCategories(
          (response.data?.data?.items || []).map((item) => ({
            id: item.id,
            label: item.name,
          })),
        );
      } catch (error) {
        if (mounted) setCategoriesError("Failed to load categories.");
      } finally {
        if (mounted) setCategoriesLoading(false);
      }
    };

    const loadVenues = async () => {
      setVenuesLoading(true);
      try {
        const response = await adminVenuesApi.list({ limit: 100, sortBy: "name", sortOrder: "asc" });
        if (!mounted) return;

        setVenues(
          (response.data?.data?.items || []).map((item) => ({
            id: item.id,
            label: item.name,
          })),
        );
      } catch (error) {
        if (mounted) setVenuesError("Failed to load venues.");
      } finally {
        if (mounted) setVenuesLoading(false);
      }
    };

    loadCategories();
    loadVenues();

    return () => {
      mounted = false;
    };
  }, [initialValue, open]);

  if (!open) return null;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !form.eventName.trim() ||
      !form.categoryId.trim() ||
      !form.venueId.trim() ||
      !form.eventDate ||
      !form.eventTime
    ) {
      const missing = getMissingFields();
      setFormError(
        missing.length
          ? `Please select or enter: ${missing.join(", ")}.`
          : "Please complete the required event fields.",
      );
      return;
    }

    setFormError("");
    onSave(form);
  };

  const inputClassName =
    "w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-stone-500 focus:border-border-gold/40";

  return (
    <ModalShell open={open} innerClassName='max-w-2xl'>
      <div className='rounded-[2rem] border border-border-gold/15 bg-[#111111] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.6)] max-h-[calc(100vh-4rem)] overflow-y-auto'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.24em] text-border-gold-hover/80'>
              {mode === "edit" ? "Edit Event" : "Add Event"}
            </p>
            <h3 className='mt-2 text-2xl font-black text-white'>
              {mode === "edit" ? "Update event details" : "Create a new event"}
            </h3>
          </div>
          <button
            type='button'
            onClick={onClose}
            className='inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-stone-200 transition hover:border-border-gold/30 hover:text-white'
            aria-label='Close event form'
          >
            <X className='h-4 w-4' />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='mt-6 grid gap-4 md:grid-cols-2'>
          {submitError || formError ? (
            <p className='md:col-span-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200'>
              {submitError || formError}
            </p>
          ) : null}

          <label className='block'>
            <span className='mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone-400'>
              <span>Event Name</span>
              <span className='rounded-full border border-red-500/20 bg-red-500/10 px-2 py-0.5 text-[10px] font-bold tracking-[0.18em] text-red-200'>
                Required
              </span>
            </span>
            <input
              type='text'
              value={form.eventName}
              onChange={(event) =>
                setForm((current) => ({ ...current, eventName: event.target.value }))
              }
              className={inputClassName}
              required
            />
          </label>

          <label className='block'>
            <span className='mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone-400'>
              <span>Event Date</span>
              <span className='rounded-full border border-red-500/20 bg-red-500/10 px-2 py-0.5 text-[10px] font-bold tracking-[0.18em] text-red-200'>
                Required
              </span>
            </span>
            <input
              type='date'
              value={form.eventDate}
              onChange={(event) =>
                setForm((current) => ({ ...current, eventDate: event.target.value }))
              }
              className={`${inputClassName} admin-date-input`}
              required
            />
          </label>

          <EventTimePicker
            value={form.eventTime}
            onChange={(value) =>
              setForm((current) => ({ ...current, eventTime: value }))
            }
          />

          <SearchableSelect
            label='Category'
            value={form.categoryId}
            options={categories}
            placeholder='Select category'
            searchPlaceholder='Search category...'
            loading={categoriesLoading}
            error={categoriesError}
            emptyMessage='No categories found.'
            required
            onChange={(value) => setForm((current) => ({ ...current, categoryId: value }))}
          />

          <SearchableSelect
            label='Venue'
            value={form.venueId}
            options={venues}
            placeholder='Select venue'
            searchPlaceholder='Search venue...'
            loading={venuesLoading}
            error={venuesError}
            emptyMessage='No venues found.'
            required
            onChange={(value) => setForm((current) => ({ ...current, venueId: value }))}
          />

          <label className='block'>
            <span className='mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-400'>
              Attendees
            </span>
            <input
              type='number'
              min='0'
              value={form.attendees}
              onChange={(event) =>
                setForm((current) => ({ ...current, attendees: event.target.value }))
              }
              className={inputClassName}
            />
          </label>

          <label className='block'>
            <span className='mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-400'>
              Revenue
            </span>
            <input
              type='text'
              value={form.revenue}
              onChange={(event) =>
                setForm((current) => ({ ...current, revenue: event.target.value }))
              }
              className={inputClassName}
            />
          </label>

          <label className='block md:col-span-2'>
            <span className='mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-400'>
              Status
            </span>
            <select
              value={form.status}
              onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
              className={inputClassName}
            >
              {["Upcoming", "Live", "Completed", "Draft", "Cancelled"].map((status) => (
                <option key={status} value={status} className='bg-[#111111]'>
                  {status}
                </option>
              ))}
            </select>
          </label>

          <div className='md:col-span-2 flex justify-end gap-3'>
            <button
              type='button'
              onClick={onClose}
              className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-stone-200 transition hover:border-border-gold/30 hover:text-white'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='rounded-2xl border border-border-gold/25 bg-glass-gold px-5 py-3 text-sm font-semibold text-border-gold-hover shadow-gold-glow transition hover:border-border-gold/40 hover:bg-glass-gold-hover'
            >
              {mode === "edit" ? "Update Event" : "Save Event"}
            </button>
          </div>
        </form>
      </div>
    </ModalShell>
  );
}

export default EventFormModal;
