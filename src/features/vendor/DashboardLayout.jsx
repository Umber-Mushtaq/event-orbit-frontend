import { Outlet } from "react-router";
import { DashboardSidebar } from "./components/DashboardSidebar";
import { DashboardHeader } from "./components/DashboardHeader";

function DashboardLayout() {
  return (
    <div className='min-h-screen w-full bg-neutral-800 text-white flex relative'>
      <DashboardSidebar />
      <main className='grow pl-20 relative overflow-hidden flex flex-col justify-start min-w-0'>
        <div className='w-full max-w-full mx-auto py-12 px-6 md:px-12 lg:px-16 flex flex-col justify-start grow'>
          <DashboardHeader />
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
