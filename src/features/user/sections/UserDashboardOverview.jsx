import { DashboardStatsRow } from "../components/DashboardStatsRow";
import { BookingsListSection } from "../components/BookingsListSection";
import { RecentReviewsFeed } from "../components/RecentReviewsFeed";
import { UserDashboardHeader } from "../components/UserDashboardHeader";

function UserDashboardOverview() {
  return (
    <div className='w-full max-w-6xl mx-auto flex flex-col grow min-w-0 relative'>
      <UserDashboardHeader />
      <DashboardStatsRow />

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 items-start grow w-full'>
        <div className='lg:col-span-7 w-full'>
          <BookingsListSection />
        </div>

        <div className='lg:col-span-5 w-full'>
          <RecentReviewsFeed />
        </div>
      </div>
    </div>
  );
}

export default UserDashboardOverview;
