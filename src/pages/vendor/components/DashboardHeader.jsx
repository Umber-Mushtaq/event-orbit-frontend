import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";
import AvatarPlaceholder from "../../../assets/avatar3.jpg";
import ThemeToggle from "../../../shared_components/ThemeToggle";

export function DashboardHeader() {
  const [avatarPreview, setAvatarPreview] = useState(AvatarPlaceholder);
  const [vendorName, setVendorName] = useState("Vendor");

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          "http://localhost:5000/api/vendor/profile",
          config,
        );

        const vendor =
          response.data.profile || response.data.vendor || response.data;

        if (vendor) {
          if (vendor.firstName || vendor.lastName) {
            setVendorName(vendor.firstName + " " + vendor.lastName);
          }

          if (vendor.profileImage || vendor.avatar) {
            setAvatarPreview(vendor.profileImage || vendor.avatar);
          }
        }
      } catch (err) {
        console.error("Failed to fetch header profile image:", err);
      }
    };

    fetchHeaderData();
  }, []);

  return (
    <div className='w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 z-10 relative'>
      <div className='flex flex-col gap-4'>
        <h1 className='font-montserrat font-black text-2xl md:text-3xl text-foreground tracking-tight'>
          Welcome,{" "}
          <span className='bg-linear-to-r from-foreground to-muted-foreground bg-clip-text text-transparent'>
            {vendorName}
          </span>
        </h1>
        <p className='font-poppins font-light text-[11px] md:text-sm text-muted-foreground mt-0.5'>
          Here is a baseline summary overview tracking activity.
        </p>
      </div>

      <div className='flex items-center gap-3 self-start sm:self-auto'>
        <ThemeToggle />
        <Link
          to='profile'
          className='group flex items-center gap-2.5 rounded-full border border-border bg-card py-1 pl-2 pr-4 shadow-md backdrop-blur-md transition-all duration-200 hover:border-primary/40 hover:bg-muted md:py-1.5 md:pl-2.5 md:pr-5'
        >
          <div className='w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden border border-primary/30 shrink-0 transition-transform duration-200 group-hover:scale-105'>
            <img
              src={avatarPreview}
              alt='Vendor profile view'
              className='w-full h-full object-cover'
            />
          </div>
          <span className='font-poppins text-[11px] md:text-xs font-semibold text-foreground tracking-wide whitespace-nowrap transition-colors duration-200 group-hover:text-primary'>
            {vendorName} Profile
          </span>
        </Link>
      </div>
    </div>
  );
}
