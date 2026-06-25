import { useMemo } from "react";
import { adminSectionCopy } from "../data/adminNavigationData";
import EventCategoriesPage from "./EventCategoriesPage";
import EventsManagementPage from "./EventsManagementPage";
import BookingManagementPage from "./BookingManagementPage";
import CalendarManagementPage from "./CalendarManagementPage";
import VendorManagementPage from "./VendorManagementPage";
import RevenueAnalyticsChart from "../components/RevenueAnalyticsChart";
import EventStatusChart from "../components/EventStatusChart";
import VendorPerformanceChart from "../components/VendorPerformanceChart";
import RecentActivities from "../components/RecentActivities";
import ChartCard from "../components/ChartCard";
import Badge from "../components/Badge";

function MiniCard({ label, value, tone = "default" }) {
  return (
    <div className='rounded-3xl border border-white/8 bg-white/5 p-5'>
      <p className='text-xs uppercase tracking-[0.22em] text-stone-500'>{label}</p>
      <div className='mt-3 flex items-center justify-between gap-3'>
        <span className='text-2xl font-black text-white'>{value}</span>
        <Badge tone={tone}>{tone}</Badge>
      </div>
    </div>
  );
}

function SectionHero({ title, description }) {
  return (
    <section className='rounded-[2rem] border border-border-gold/15 bg-[linear-gradient(135deg,rgba(20,20,20,0.98),rgba(10,10,10,0.92))] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.4)]'>
      <p className='text-xs font-semibold uppercase tracking-[0.24em] text-border-gold-hover/80'>
        Module Overview
      </p>
      <div className='mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
        <div>
          <h2 className='text-2xl font-black text-white md:text-3xl'>{title}</h2>
          <p className='mt-2 max-w-3xl text-sm leading-relaxed text-stone-400'>
            {description}
          </p>
        </div>
        <div className='flex flex-wrap gap-2'>
          <Badge tone='active'>Live</Badge>
          <Badge tone='confirmed'>Premium</Badge>
          <Badge tone='completed'>Responsive</Badge>
        </div>
      </div>
    </section>
  );
}

function AdminSectionPage({ sectionKey }) {
  const copy = adminSectionCopy[sectionKey] || adminSectionCopy.dashboard;

  const content = useMemo(() => {
    switch (sectionKey) {
      case "events":
        return <EventsManagementPage />;
      case "event-categories":
        return <EventCategoriesPage />;
      case "vendors":
        return <VendorManagementPage />;
      case "bookings":
        return <BookingManagementPage />;
      case "analytics":
        return (
          <section className='grid gap-6'>
            <div className='grid gap-6 xl:grid-cols-2'>
              <RevenueAnalyticsChart />
              <EventStatusChart />
            </div>
            <VendorPerformanceChart />
          </section>
        );
      case "calendar":
        return <CalendarManagementPage />;
      case "notifications":
        return (
          <section className='grid gap-6'>
            <RecentActivities />
          </section>
        );
      case "settings":
        return (
          <section className='grid gap-6'>
            <ChartCard title='Configuration Matrix' subtitle='Admin preferences and workspace controls.'>
              <div className='grid gap-3'>
                <MiniCard label='Theme' value='Black / Gold' tone='confirmed' />
                <MiniCard label='Locale' value='PKT' tone='active' />
                <MiniCard label='Access' value='Strict' tone='pending' />
              </div>
            </ChartCard>
          </section>
        );
      default:
        return (
          <section className='grid gap-6'>
            <ChartCard title='Workspace Preview' subtitle='This module is ready for your next iteration.'>
              <div className='grid gap-3'>
                <MiniCard label='Scope' value='Mock data' tone='confirmed' />
                <MiniCard label='Status' value='Ready' tone='active' />
                <MiniCard label='Next step' value='Connect API' tone='pending' />
              </div>
            </ChartCard>
          </section>
        );
    }
  }, [sectionKey]);

  return (
    <div className='space-y-6'>
      <SectionHero title={copy.title} description={copy.description} />
      {content}
    </div>
  );
}

export default AdminSectionPage;
