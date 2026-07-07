import { useCallback, useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router";
import AdminListShell from "../../components/adminComponent/AdminListShell";
import { filterOptions } from "../../data/admin-data/eventsManagementData";
import EventsToolbar from "../../components/adminComponent/events/EventsToolbar";
import EventsTable from "../../components/adminComponent/events/EventsTable";
import EventsDetailModal from "../../components/adminComponent/events/EventsDetailModal";
import EventFormModal from "../../components/adminComponent/events/EventFormModal";
import { adminEventsApi, getAdminErrorMessage } from "../../../../services/adminApi";
import { mapAdminEvents } from "../../../../utils/adminTransformers";

function EventsManagementPage() {
  const { globalSearch } = useOutletContext() || {};
  const [events, setEvents] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeView, setActiveView] = useState("List");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadEvents = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await adminEventsApi.list({
        search: searchQuery || globalSearch || undefined,
        status: activeFilter === "All" ? undefined : activeFilter,
        sortBy: "createdAt",
        sortOrder: "desc",
        limit: 100,
      });
      setEvents(mapAdminEvents(response.data?.data?.items || []));
    } catch (requestError) {
      setError(getAdminErrorMessage(requestError, "Failed to load events."));
    } finally {
      setLoading(false);
    }
  }, [activeFilter, globalSearch, searchQuery]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const filteredRows = useMemo(() => {
    return events;
  }, [events]);

  const stats = useMemo(
    () => [
      {
        label: "Upcoming",
        value: String(
          events.filter((event) => event.status === "Upcoming").length,
        ),
        growth: null,
        trend: "up",
      },
      {
        label: "Live Now",
        value: String(events.filter((event) => event.status === "Live").length),
        growth: null,
        trend: "up",
      },
      {
        label: "Completed",
        value: String(
          events.filter((event) => event.status === "Completed").length,
        ),
        growth: null,
        trend: "up",
      },
      {
        label: "Drafts",
        value: String(
          events.filter((event) => event.status === "Draft").length,
        ),
        growth: null,
        trend: "flat",
      },
    ],
    [events],
  );

  const handleSave = async (payload) => {
    try {
      if (editingEvent) {
        await adminEventsApi.update(editingEvent.id, payload);
      } else {
        await adminEventsApi.create(payload);
      }
      await loadEvents();
      setCreateOpen(false);
      setSelectedEvent(null);
      setEditingEvent(null);
    } catch (requestError) {
      setError(getAdminErrorMessage(requestError, "Failed to save event."));
    }
  };

  const handleDelete = async () => {
    if (!selectedEvent && !editingEvent) return;

    try {
      const target = selectedEvent || editingEvent;
      await adminEventsApi.remove(target.id);
      await loadEvents();
      setSelectedEvent(null);
      setEditingEvent(null);
    } catch (requestError) {
      setError(getAdminErrorMessage(requestError, "Failed to delete event."));
    }
  };

  return (
    <AdminListShell
      title="Event Management"
      description="Plan, schedule and track every event in one place."
      actionLabel="Create Event"
      onAction={() => {
        setEditingEvent(null);
        setCreateOpen(true);
      }}
      stats={stats}
    >
      {error ? (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}
      {loading ? (
        <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-stone-300">
          Loading events...
        </div>
      ) : null}

      <EventsToolbar
        query={searchQuery}
        onQueryChange={setSearchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        activeView={activeView}
        onViewChange={setActiveView}
        filterOptions={filterOptions}
      />

      <EventsTable
        rows={filteredRows}
        searchOverride={globalSearch || ""}
        viewMode={activeView}
        queryOverride={searchQuery}
        onViewRow={setSelectedEvent}
        onEditRow={(event) => {
          setEditingEvent(event);
          setCreateOpen(true);
        }}
        onDeleteRow={(event) => {
          setEditingEvent(event);
          setSelectedEvent(event);
        }}
      />

      <EventsDetailModal
        open={Boolean(selectedEvent)}
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onDelete={handleDelete}
      />

      <EventFormModal
        open={createOpen}
        mode={editingEvent ? "edit" : "create"}
        onClose={() => {
          setCreateOpen(false);
          setEditingEvent(null);
        }}
        onSave={handleSave}
        initialValue={editingEvent || undefined}
        submitError={error}
      />
    </AdminListShell>
  );
}

export default EventsManagementPage;
