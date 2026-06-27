import React from "react";
import { useUserDashboard } from "../hooks/useUserDashboard";
import { DashboardStatsRow } from "../components/DashboardStatsRow";
import { BookingsListSection } from "../components/BookingsListSection";
import { RecentReviewsFeed } from "../components/RecentReviewsFeed";
import { UserDashboardHeader } from "../components/UserDashboardHeader";

function UserDashboardOverview() {
  const { loading, stats, bookingsList, reviewsFeed } = useUserDashboard();

  if (loading) {
    return (
      <div className='w-full h-96 flex items-center justify-center font-poppins text-stone-400'>
        Loading premium dashboard entries...
      </div>
    );
  }

  return (
    <div className='w-full max-w-6xl mx-auto flex flex-col grow min-w-0 relative gap-2'>
      <UserDashboardHeader />

      <DashboardStatsRow stats={stats} />

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 items-start grow w-full mt-4'>
        <div className='lg:col-span-7 w-full'>
          <BookingsListSection bookings={bookingsList} />
        </div>

        <div className='lg:col-span-5 w-full'>
          <RecentReviewsFeed reviews={reviewsFeed} />
        </div>
      </div>
    </div>
  );
}

export default UserDashboardOverview;
