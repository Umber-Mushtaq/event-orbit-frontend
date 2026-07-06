import { useState, useEffect } from "react";
import axios from "axios";

export function useUserDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardContent = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/userDashboard/overview",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setDashboardData(response.data);
      } catch (error) {
        console.error(
          "Failed to recover database collections record mapping:",
          error,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardContent();
  }, []);

  const backupStats = [
    {
      label: "Total Spent",
      value: "Rs. 0",
      subLabel: "On verified event orders",
    },
    {
      label: "Bookings Made",
      value: "0",
      subLabel: "Reserved item metrics",
    },
    {
      label: "Wishlist Saves",
      value: "0",
      subLabel: "Bookmarked items saved",
    },
  ];

  const activeStats =
    dashboardData?.stats && dashboardData.stats.length > 0
      ? dashboardData.stats
      : backupStats;

  return {
    loading,
    stats: activeStats,
    bookingsList: dashboardData?.bookingsList || [],
    reviewsFeed: dashboardData?.reviewsFeed || [],
  };
}
