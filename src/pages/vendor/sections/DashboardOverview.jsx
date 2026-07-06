import { DashboardMetrics } from "../components/DashboardMatrix";
import { UpcomingBookings } from "../components/UpcommingBookings";
import { RecentReviews } from "../components/RecentReviews";

function DashboardOverview() {
  return (
    <div className='flex flex-col grow min-w-0 w-full'>
      <div className='mb-10 w-full z-10'>
        <DashboardMetrics />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 z-10 relative items-start grow w-full max-w-6xl mx-auto'>
        <div className='lg:col-span-7 w-full max-h-`max-h-120` overflow-y-auto'>
          <UpcomingBookings />
        </div>
        <div className='lg:col-span-5 w-full max-h-`max-h-120` overflow-y-auto'>
          <RecentReviews />
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;
