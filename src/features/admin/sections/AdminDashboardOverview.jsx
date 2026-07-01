import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router";
import StatCard from "../components/StatCard";
import RevenueAnalyticsChart from "../components/RevenueAnalyticsChart";
import BookingAnalyticsChart from "../components/BookingAnalyticsChart";
import EventStatusChart from "../components/EventStatusChart";
import VendorPerformanceChart from "../components/VendorPerformanceChart";
import RecentEventsTable from "../components/RecentEventsTable";
import RecentActivities from "../components/RecentActivities";
import { adminDashboardApi, getAdminErrorMessage } from "../api/adminApi";
import { mapAdminEvents, mapAdminSummaryCards } from "../utils/adminTransformers";

function AdminDashboardOverview() {
  const { globalSearch } = useOutletContext() || {};
  const [summary, setSummary] = useState({});
  const [revenueData, setRevenueData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [eventStatusData, setEventStatusData] = useState([]);
  const [vendorPerformanceData, setVendorPerformanceData] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadDashboard = async () => {
      setLoading(true);
      setError("");

      try {
        const [
          summaryRes,
          revenueRes,
          bookingRes,
          statusRes,
          vendorRes,
          recentEventsRes,
          activitiesRes,
        ] = await Promise.all([
          adminDashboardApi.summary({ range: "30d" }),
          adminDashboardApi.revenueAnalytics(),
          adminDashboardApi.bookingAnalytics(),
          adminDashboardApi.eventStatus(),
          adminDashboardApi.vendorPerformance(),
          adminDashboardApi.recentEvents({ page: 1, limit: 5 }),
          adminDashboardApi.activities(),
        ]);

        if (!active) return;

        setSummary(summaryRes.data?.data || {});
        setRevenueData(revenueRes.data?.data || []);
        setBookingData(bookingRes.data?.data || []);
        setEventStatusData(statusRes.data?.data || []);
        setVendorPerformanceData(vendorRes.data?.data || []);
        setRecentEvents(mapAdminEvents(recentEventsRes.data?.data?.items || []));
        setActivities(activitiesRes.data?.data || []);
      } catch (requestError) {
        if (!active) return;
        setError(getAdminErrorMessage(requestError, "Failed to load dashboard data."));
      } finally {
        if (active) setLoading(false);
      }
    };

    loadDashboard();

    return () => {
      active = false;
    };
  }, []);

  const stats = useMemo(() => mapAdminSummaryCards(summary), [summary]);

  return (
    <div className='space-y-6'>
      {error ? (
        <div className='rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200'>
          {error}
        </div>
      ) : null}
      {loading ? (
        <div className='rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-stone-300'>
          Loading dashboard data...
        </div>
      ) : null}

      <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        {stats.map((item) => (
          <StatCard key={item.label} item={item} />
        ))}
      </section>

      <section
        className='grid min-w-0 gap-4'
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
          alignItems: "stretch",
          height: "400px",
        }}
      >
        <RevenueAnalyticsChart
          data={revenueData}
          className='min-w-0 h-full overflow-y-auto'
        />
        <EventStatusChart
          data={eventStatusData}
          className='min-w-0 h-full overflow-y-auto'
        />
      </section>

      <section className='grid gap-6 xl:grid-cols-2'>
        <BookingAnalyticsChart data={bookingData} />
        <VendorPerformanceChart data={vendorPerformanceData} />
      </section>

      <section className='grid gap-6'>
        <RecentEventsTable rows={recentEvents} searchOverride={globalSearch} />
        <RecentActivities items={activities} />
      </section>
    </div>
  );
}

export default AdminDashboardOverview;
