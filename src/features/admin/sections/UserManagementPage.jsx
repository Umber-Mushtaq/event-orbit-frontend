import { useMemo, useState } from "react";
import SharedCards from "../components/shared/SharedCards";
import SharedHeader from "../components/shared/SharedHeader";
import SharedTable from "../components/shared/SharedTable";
import { initialUsers, userStats, userStatusStyles } from "../data/userManagementData";

function UserManagementPage() {
  const [users] = useState(initialUsers);

  const rows = useMemo(() => users, [users]);

  const columns = [
    {
      key: "user",
      label: "User",
      render: (user) => {
        const initials = user.name
          .split(" ")
          .map((part) => part[0])
          .slice(0, 2)
          .join("");

        return (
          <div className='flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(180deg,#f7cd66,#d79f2c)] text-sm font-black text-black shadow-[0_8px_20px_rgba(212,175,55,0.18)]'>
              {initials}
            </div>
            <div>
              <p className='font-semibold text-white'>{user.name}</p>
              <p className='text-xs text-stone-500'>{user.id}</p>
            </div>
          </div>
        );
      },
    },
    {
      key: "email",
      label: "Email",
      render: (user) => <span className='text-stone-300'>{user.email}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (user) => (
        <span
          className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
            userStatusStyles[user.status] || userStatusStyles.Pending
          }`}
        >
          {user.status}
        </span>
      ),
    },
    {
      key: "events",
      label: "Events",
      render: (user) => <span className='font-semibold text-white'>{user.events}</span>,
    },
  ];

  return (
    <div className='space-y-6'>
      <SharedHeader
        title='User Management'
        description='Directory of platform users and their activity.'
      />

      <SharedCards items={userStats} />

      <section className='rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(12,12,12,0.98),rgba(7,7,7,0.98))] p-4 shadow-[0_14px_40px_rgba(0,0,0,0.35)] md:p-5'>
        <div className='mb-4'>
          <h2 className='text-2xl font-black tracking-tight text-white'>Directory</h2>
          <p className='mt-1 text-sm text-stone-400'>Recent users on the platform.</p>
        </div>

        <SharedTable
          rows={rows}
          columns={columns}
          showSearch={false}
          showFilters={false}
          showSort={false}
          showActions={false}
          emptyMessage='No users found.'
        />
      </section>
    </div>
  );
}

export default UserManagementPage;
