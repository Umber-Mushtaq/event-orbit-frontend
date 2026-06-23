import { useEffect, useState } from "react";
import axios from "axios";
import { DashboardStatsRow } from "../components/DashboardStatsRow";
import { BookingsListSection } from "../components/BookingsListSection";
import { RecentReviewsFeed } from "../components/RecentReviewsFeed";
import { UserDashboardHeader } from "../components/UserDashboardHeader";

function UserDashboardOverview() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardContent = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/userDashboard/overview",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        setDashboardData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("no request gone");
        console.error(
          "Failed to recover database collections record mapping",
          error,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardContent();
  }, []);

  if (loading) {
    return (
      <div className='w-full h-96 flex items-center justify-center font-poppins text-stone-400'>
        Loading premium dashboard entries...
      </div>
    );
  }

  // 👉 FALLBACK METRICS: If the database returns an empty stats array, use these premium placeholders
  const backupStats = [
    {
      label: "Total Spent",
      value: "Rs. 0",
      subLabel: "On verified event orders",
    },
    { label: "Bookings Made", value: "0", subLabel: "Reserved item metrics" },
    { label: "Wishlist Saves", value: "0", subLabel: "Bookmarked items saved" },
  ];

  const activeStats =
    dashboardData?.stats && dashboardData.stats.length > 0
      ? dashboardData.stats
      : backupStats;

  return (
    <div className='w-full max-w-6xl mx-auto flex flex-col grow min-w-0 relative gap-2'>
      <UserDashboardHeader />

      {/* Fixed: Guaranteed to render layout now */}
      <DashboardStatsRow stats={activeStats} />

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 items-start grow w-full mt-4'>
        <div className='lg:col-span-7 w-full'>
          <BookingsListSection bookings={dashboardData?.bookingsList || []} />
        </div>

        <div className='lg:col-span-5 w-full'>
          <RecentReviewsFeed reviews={dashboardData?.reviewsFeed || []} />
        </div>
      </div>
    </div>
  );
}

export default UserDashboardOverview;
