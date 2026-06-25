import { useOutletContext } from "react-router";
import { adminStats, recentEvents } from "../data/adminMetricsData";
import StatCard from "../components/StatCard";
import RevenueAnalyticsChart from "../components/RevenueAnalyticsChart";
import BookingAnalyticsChart from "../components/BookingAnalyticsChart";
import EventStatusChart from "../components/EventStatusChart";
import VendorPerformanceChart from "../components/VendorPerformanceChart";
import RecentEventsTable from "../components/RecentEventsTable";

function AdminDashboardOverview() {
  const { globalSearch } = useOutletContext() || {};

  return (
    <div className='space-y-6'>
      <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        {adminStats.map((item) => (
          <StatCard key={item.label} item={item} />
        ))}
      </section>

      <section className='grid gap-6 xl:grid-cols-2'>
        <RevenueAnalyticsChart />
        <BookingAnalyticsChart />
      </section>

      <section className='grid gap-6 xl:grid-cols-2'>
        <EventStatusChart />
        <VendorPerformanceChart />
      </section>

      <section className='grid min-w-0 '>
        <RecentEventsTable rows={recentEvents} searchOverride={globalSearch} />
      </section>
    </div>
  );
}

export default AdminDashboardOverview;
