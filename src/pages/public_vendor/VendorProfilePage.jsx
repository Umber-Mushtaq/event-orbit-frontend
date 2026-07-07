import React from "react";
import { useParams } from "react-router";
import { usePublicVendorProfile } from "../../hooks/usePublicVendorProfile";
import VendorProfile from "./ui/VendorProfile";

function VendorProfilePage() {
  const { id } = useParams();
  const { profile, reviews, loading, error } = usePublicVendorProfile(id);

  if (loading) return <p className='text-stone-400'>Loading profile...</p>;
  if (error) return <p className='text-red-400'>{error}</p>;

  return <VendorProfile profile={profile} reviews={reviews} />;
}

export default VendorProfilePage;
