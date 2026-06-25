import { useMemo, useState } from "react";
import { useOutletContext } from "react-router";
import AdminListShell from "../components/AdminListShell";
import { eventRows, eventStats, filterOptions } from "../data/eventsManagementData";
import EventsToolbar from "../components/events/EventsToolbar";
import EventsTable from "../components/events/EventsTable";
import EventsDetailModal from "../components/events/EventsDetailModal";
import EventFormModal from "../components/events/EventFormModal";

function EventsManagementPage() {
  const { globalSearch } = useOutletContext() || {};
  const [events, setEvents] = useState(eventRows);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeView, setActiveView] = useState("List");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);

  const filteredRows = useMemo(() => {
    if (activeFilter === "All") return events;
    return events.filter((event) => event.status === activeFilter);
  }, [activeFilter, events]);

  return (
    <AdminListShell
      title='Event Management'
      description='Plan, schedule and track every event in one place.'
      actionLabel='Create Event'
      onAction={() => setCreateOpen(true)}
      stats={eventStats}
    >
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
      />

      <EventsDetailModal
        open={Boolean(selectedEvent)}
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      <EventFormModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSave={(payload) => {
          setEvents((current) => [
            {
              id: `EVT-${Date.now().toString().slice(-4)}`,
              name: payload.name,
              category: payload.category,
              date: payload.date || new Date().toISOString().slice(0, 10),
              venue: payload.venue,
              status: payload.status,
              attendees: payload.attendees || "0",
              revenue: payload.revenue || "--",
            },
            ...current,
          ]);
          setCreateOpen(false);
        }}
      />
    </AdminListShell>
  );
}

export default EventsManagementPage;
