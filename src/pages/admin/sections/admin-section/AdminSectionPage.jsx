import { useEffect, useMemo, useState } from "react";
import { adminSectionCopy } from "../../data/admin-data/adminNavigationData";
import EventCategoriesPage from "./EventCategoriesPage";
import EventsManagementPage from "./EventsManagementPage";
import VendorManagementPage from "./VendorManagementPage";
import RevenueAnalyticsChart from "../../components/adminComponent/RevenueAnalyticsChart";
import EventStatusChart from "../../components/adminComponent/EventStatusChart";
import VendorPerformanceChart from "../../components/adminComponent/VendorPerformanceChart";
import RecentActivities from "../../components/adminComponent/RecentActivities";
import ChartCard from "../../components/adminComponent/ChartCard";
import Badge from "../../components/adminComponent/Badge";
import { adminDashboardApi, getAdminErrorMessage } from "../../../../services/adminApi";
import CustomLoading from "../../../../shared_components/CustomLoading";

function MiniCard({ label, value, tone = "default" }) {
  return (
    <div className="rounded-3xl border border-white/8 bg-white/5 p-5">
      <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
        {label}
      </p>
      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="text-2xl font-black text-white">{value}</span>
        <Badge tone={tone}>{tone}</Badge>
      </div>
    </div>
  );
}

function SectionHero({ title, description }) {
  return (
    <section className="rounded-[2rem] border border-border-gold/15 bg-[linear-gradient(135deg,rgba(20,20,20,0.98),rgba(10,10,10,0.92))] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.4)]">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-border-gold-hover/80">
        Module Overview
      </p>
      <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-2xl font-black text-white md:text-3xl">
            {title}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-400">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge tone="active">Live</Badge>
          <Badge tone="confirmed">Premium</Badge>
          <Badge tone="completed">Responsive</Badge>
        </div>
      </div>
    </section>
  );
}

function AdminSectionPage({ sectionKey }) {
  const copy = adminSectionCopy[sectionKey] || adminSectionCopy.dashboard;
  const [analytics, setAnalytics] = useState({
    revenue: [],
    eventStatus: [],
    vendorPerformance: [],
    activities: [],
    notifications: [],
  });
  const [loading, setLoading] = useState(["analytics", "notifications"].includes(sectionKey));
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadSectionData = async () => {
      if (!["analytics", "notifications"].includes(sectionKey)) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const [
          revenueRes,
          statusRes,
          vendorRes,
          activitiesRes,
          notificationsRes,
        ] = await Promise.all([
          adminDashboardApi.revenueAnalytics(),
          adminDashboardApi.eventStatus(),
          adminDashboardApi.vendorPerformance(),
          adminDashboardApi.activities(),
          adminDashboardApi.notifications(),
        ]);

        if (!active) return;

        setAnalytics({
          revenue: revenueRes.data?.data || [],
          eventStatus: statusRes.data?.data || [],
          vendorPerformance: vendorRes.data?.data || [],
          activities: activitiesRes.data?.data || [],
          notifications: notificationsRes.data?.data || [],
        });
      } catch (requestError) {
        if (!active) return;
        setError(
          getAdminErrorMessage(
            requestError,
            "Failed to load admin section data.",
          ),
        );
      } finally {
        if (active) setLoading(false);
      }
    };

    loadSectionData();

    return () => {
      active = false;
    };
  }, [sectionKey]);

  const content = useMemo(() => {
    switch (sectionKey) {
      case "events":
        return <EventsManagementPage />;
      case "services":
        return <EventCategoriesPage />;
      case "vendors":
        return <VendorManagementPage />;
      case "analytics":
        return (
          <section className="grid gap-6">
            <div className="grid gap-6 xl:grid-cols-2">
              <RevenueAnalyticsChart data={analytics.revenue} />
              <EventStatusChart data={analytics.eventStatus} />
            </div>
            <VendorPerformanceChart data={analytics.vendorPerformance} />
          </section>
        );
      case "notifications":
        return (
          <section className="grid gap-6">
            <RecentActivities
              items={(analytics.notifications.length
                ? analytics.notifications
                : analytics.activities
              ).map((item) => ({
                title: item.title,
                description: item.description,
                time: item.time,
                tone: item.read ? "neutral" : "gold",
                icon: item.icon || "bell",
              }))}
            />
          </section>
        );
      case "settings":
        return (
          <section className="grid gap-6">
            <ChartCard
              title="Configuration Matrix"
              subtitle="Admin preferences and workspace controls."
            >
              <div className="grid gap-3">
                <MiniCard label="Theme" value="Black / Gold" tone="confirmed" />
                <MiniCard label="Locale" value="PKT" tone="active" />
                <MiniCard label="Access" value="Strict" tone="pending" />
              </div>
            </ChartCard>
          </section>
        );
      default:
        return (
          <section className="grid gap-6">
            <ChartCard
              title="Workspace Preview"
              subtitle="This module is ready for your next iteration."
            >
              <div className="grid gap-3">
                <MiniCard label="Scope" value="Live backend" tone="confirmed" />
                <MiniCard label="Status" value="Ready" tone="active" />
                <MiniCard
                  label="Next step"
                  value="Refine filters"
                  tone="pending"
                />
              </div>
            </ChartCard>
          </section>
        );
    }
  }, [analytics, sectionKey]);

  return (
    <div className="space-y-6">
      <SectionHero title={copy.title} description={copy.description} />
      {error ? (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}
      {loading ? <CustomLoading msg='Loading admin data...' /> : content}
    </div>
  );
}

export default AdminSectionPage;
