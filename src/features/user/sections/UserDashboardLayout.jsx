import { Outlet } from "react-router";
import { DashboardSidebar } from "../components/DashboardSideBar";

function DashboardLayout() {
  return (
    <div className='min-h-screen w-full bg-neutral-800 text-white flex relative'>
      <DashboardSidebar />
      <main className='grow pl-20 relative overflow-hidden flex flex-col justify-start min-w-0'>
        <div className='w-full max-w-full mx-auto py-12 px-6 md:px-10 flex flex-col justify-start grow z-10 relative'>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
