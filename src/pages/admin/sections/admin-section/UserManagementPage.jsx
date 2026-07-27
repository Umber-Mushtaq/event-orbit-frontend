import { useEffect, useMemo, useState } from "react";
import SharedCards from "../../components/adminComponent/shared/SharedCards";
import SharedHeader from "../../components/adminComponent/shared/SharedHeader";
import SharedTable from "../../components/adminComponent/shared/SharedTable";
import { userStatusStyles } from "../../data/admin-data/userManagementData";
import { adminUsersApi, getAdminErrorMessage } from "../../../../services/adminApi";
import CustomLoading from "../../../../shared_components/CustomLoading";

function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUsers = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await adminUsersApi.list({ limit: 100 });
      setUsers(response.data?.data?.items || []);
    } catch (requestError) {
      setError(getAdminErrorMessage(requestError, "Failed to load users."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const rows = useMemo(() => users, [users]);

  const stats = useMemo(() => {
    const totalUsers = users.length;
    const active = users.filter((user) => user.status === "Active").length;
    const newThisMonth = users.filter((user) => {
      const created = user.createdAt ? new Date(user.createdAt) : null;
      if (!created || Number.isNaN(created.getTime())) return false;
      const now = new Date();
      return (
        created.getMonth() === now.getMonth() &&
        created.getFullYear() === now.getFullYear()
      );
    }).length;
    const avgEvents = totalUsers
      ? Number(
          (
            users.reduce((sum, user) => sum + Number(user.events || 0), 0) /
            totalUsers
          ).toFixed(1),
        )
      : 0;

    return [
      { label: "Total Users", value: String(totalUsers), icon: "users" },
      { label: "Active", value: String(active), icon: "badge-check" },
      {
        label: "New This Month",
        value: String(newThisMonth),
        icon: "user-plus",
      },
      {
        label: "Avg Events / User",
        value: String(avgEvents),
        icon: "calendar-range",
      },
    ];
  }, [users]);

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
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(180deg,#f7cd66,#d79f2c)] text-sm font-black text-black shadow-[0_8px_20px_rgba(212,175,55,0.18)]">
              {initials}
            </div>
            <div>
              <p className="font-semibold text-white">{user.name}</p>
              <p className="text-xs text-stone-500">{user.id}</p>
            </div>
          </div>
        );
      },
    },
    {
      key: "email",
      label: "Email",
      render: (user) => <span className="text-stone-300">{user.email}</span>,
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
      render: (user) => (
        <span className="font-semibold text-white">{user.events}</span>
      ),
    },
  ];

  if (loading) {
    return <CustomLoading msg='Loading users...' />;
  }

  return (
    <div className="space-y-6">
      <SharedHeader
        title="User Management"
        description="Directory of platform users and their activity."
      />

      <SharedCards items={stats} />

      {error ? (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <section className="rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(12,12,12,0.98),rgba(7,7,7,0.98))] p-4 shadow-[0_14px_40px_rgba(0,0,0,0.35)] md:p-5">
        <div className="mb-4">
          <h2 className="text-2xl font-black tracking-tight text-white">
            Directory
          </h2>
          <p className="mt-1 text-sm text-stone-400">
            Recent users on the platform.
          </p>
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
