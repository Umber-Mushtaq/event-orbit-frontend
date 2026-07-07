import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import AvailabilityCalendar from "./AvailabilityCalender";
import CustomHeader from "../../../shared_components/CustomHeader";
import StatusIndicator from "../../../shared_components/StatusIndecator";

export default function CheckoutPage() {
  const { serviceId, vendorId } = useParams();
  const navigate = useNavigate();

  const dummyService = {
    title: "Premium Wedding Catering",
    vendorName: "Elite Catering Services",
    basePrice: 50000,
  };

  const [bookedDates, setBookedDates] = useState({});
  const [eventDate, setEventDate] = useState("");
  const [guestsCount, setGuestsCount] = useState(100);
  const [totalAmount, setTotalAmount] = useState(dummyService.basePrice);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [statusError, setStatusError] = useState("");
  const [statusSuccess, setStatusSuccess] = useState("");

  // 1. Unified Authentication Gate & Calendar Data Initializer
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    // Route Protection Check
    if (!token || !user) {
      // Pass the session error message silently down to the login page state context
      navigate("/auth/login", {
        state: {
          message:
            "Session expired or unauthorized. Please sign in to book an event.",
        },
      });
      return;
    }

    const fetchDisabledDates = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/bookings/booked-dates?serviceId=${serviceId}`,
        );
        const data = await response.json();
        if (data.success) {
          setBookedDates(data.bookedDates);
        }
      } catch (err) {
        console.error("Failed parsing disabled dates: ", err);
        setStatusError(
          "Failed to pull current date block vectors from servers.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchDisabledDates();
  }, [serviceId, navigate]);

  const handleGuestCountChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setGuestsCount(value);
    setTotalAmount(dummyService.basePrice + value * 500);
  };

  // 2. Process Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusError("");
    setStatusSuccess("");

    if (!eventDate) {
      setStatusError(
        "Please select an available event date from the calendar.",
      );
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth/login");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/bookings/service/${serviceId}/vendor/${vendorId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            eventDate,
            guestsCount,
            totalAmount,
          }),
        },
      );

      const data = await response.json();
      if (data.success) {
        setStatusSuccess("Booking request submitted successfully!");
        setBookedDates((prev) => ({ ...prev, [eventDate]: "Booked" }));
        setEventDate("");
      } else {
        // FIX: Replaced alert with statusError component state update
        setStatusError(
          data.message || "Something went wrong with your request validation.",
        );
      }
    } catch (err) {
      console.error("Booking submission error: ", err);
      // FIX: Replaced alert with statusError component state update
      setStatusError(
        "Server failure processing your reservation request transaction.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-neutral-950 text-amber-400'>
        <p className='text-xl font-semibold tracking-wider animate-pulse'>
          Verifying Credentials...
        </p>
      </div>
    );
  }

  return (
    <div className='flex flex-col mx-10 py-20 '>
      <CustomHeader badge='Checkout' title='Book your event' />

      <StatusIndicator
        error={statusError}
        success={statusSuccess}
        className='mt-6 w-full font-poppins text-xs p-4 rounded-xl'
      />

      <section className='max-w-full my-6 p-6 grid grid-cols-1 md:grid-cols-2 gap-10 bg-neutral-950 text-white rounded-lg shadow-gold-glow'>
        {/* Left: Calendar */}
        <AvailabilityCalendar
          bookedDates={bookedDates}
          onDateSelect={setEventDate}
        />

        {/* Right: Checkout Form */}
        <div>
          <h2 className='text-3xl font-bold mb-6 text-amber-400'>Checkout</h2>

          <div className='mb-6 border border-neutral-800 rounded-md p-4 bg-neutral-900'>
            <h3 className='text-xl font-semibold'>{dummyService.title}</h3>
            <p className='text-stone-400'>Vendor: {dummyService.vendorName}</p>
            <p className='text-stone-300 mt-2'>
              Base Price:{" "}
              <span className='text-amber-400'>
                PKR {dummyService.basePrice.toLocaleString()}
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-5'>
            <div>
              <label className='block text-sm text-stone-400 mb-1'>
                Event Date
              </label>
              <input
                type='text'
                value={eventDate}
                placeholder='Select from Calendar'
                readOnly
                required
                className='w-full rounded-md bg-neutral-900 text-amber-400 px-3 py-2 font-semibold border border-neutral-800'
              />
            </div>

            <div>
              <label className='block text-sm text-stone-400 mb-1'>
                Guests Count
              </label>
              <input
                type='number'
                min='1'
                value={guestsCount}
                onChange={handleGuestCountChange}
                required
                className='w-full rounded-md bg-neutral-900 text-stone-300 px-3 py-2 border border-neutral-800'
              />
            </div>

            <div>
              <label className='block text-sm text-stone-400 mb-1'>
                Total Amount
              </label>
              <input
                type='text'
                value={`PKR ${totalAmount.toLocaleString()}`}
                readOnly
                className='w-full rounded-md bg-neutral-900 text-amber-400 px-3 py-2 font-semibold border border-neutral-800'
              />
            </div>

            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full bg-amber-400 text-neutral-900 font-semibold py-3 rounded-md hover:bg-amber-500 transition disabled:bg-neutral-700 disabled:text-neutral-400'
            >
              {isSubmitting ? "Processing Request..." : "Confirm Booking"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
