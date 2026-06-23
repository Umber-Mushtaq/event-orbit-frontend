import ServiceListings from "../../user/sections/ServiceListings";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

function PublicServices() {
  return (
    <div className='bg-neutral-800 py-5 px-8'>
      <ServiceListings />
    </div>
  );
}

export default PublicServices;
