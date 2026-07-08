import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

export function SignupArticlePage() {
  return (
    <section className='max-w-full bg-neutral-950 mx-auto py-12 px-6'>
      <Link
        to='/help'
        className='inline-flex items-center gap-2 font-poppins text-xs text-neutral-950 font-semibold bg-amber-400 px-3 py-2 rounded-md duration-200 cursor-pointer group my-5'
      >
        <ArrowLeft className='w-4 h-4 transition-transform group-hover:-translate-x-1' />
        Back to Home
      </Link>
      <h1 className='text-3xl font-bold text-amber-500 mb-6'>Signup Process</h1>
      <p className='text-gray-300 leading-relaxed mb-6'>
        Creating an account is the first step to accessing all features. Follow
        this guide to complete your signup smoothly.
      </p>

      <h2 className='text-xl font-semibold text-white mb-4'>
        Step-by-Step Guide
      </h2>
      <ol className='list-decimal list-inside text-gray-300 space-y-2 mb-6'>
        <li>
          Click on the{" "}
          <span className='text-amber-400 font-semibold'>Sign Up</span> button
          on the homepage.
        </li>
        <li>Enter your name, email address, and create a secure password.</li>
        <li>Agree to the terms and conditions.</li>
        <li>
          Click{" "}
          <span className='text-amber-400 font-semibold'>Create Account</span>.
        </li>
        <li>
          Check your email for a verification link and confirm your account.
        </li>
      </ol>

      <h2 className='text-xl font-semibold text-white mb-4'>
        Tips for a Smooth Signup
      </h2>
      <ul className='list-disc list-inside text-gray-300 space-y-2 mb-6'>
        <li>Use a strong password with letters, numbers, and symbols.</li>
        <li>Ensure your email address is valid and accessible.</li>
        <li>Whitelist our domain to avoid missing the verification email.</li>
      </ul>

      <p className='text-gray-400 italic'>
        Once verified, you can log in and start exploring all features
        immediately.
      </p>
    </section>
  );
}

export function PasswordResetArticlePage() {
  return (
    <section className='max-w-full bg-neutral-950 mx-auto py-12 px-6'>
      <Link
        to='/help'
        className='inline-flex items-center gap-2 font-poppins text-xs text-neutral-950 font-semibold bg-amber-400 px-3 py-2 rounded-md duration-200 cursor-pointer group my-5'
      >
        <ArrowLeft className='w-4 h-4 transition-transform group-hover:-translate-x-1' />
        Back to Home
      </Link>
      <h1 className='text-3xl font-bold text-amber-500 mb-6'>Password Reset</h1>
      <p className='text-gray-300 leading-relaxed mb-6'>
        If you’ve forgotten your password, don’t worry. Resetting it is quick
        and secure.
      </p>

      <h2 className='text-xl font-semibold text-white mb-4'>Reset Steps</h2>
      <ol className='list-decimal list-inside text-gray-300 space-y-2 mb-6'>
        <li>
          Go to the login page and click{" "}
          <span className='text-amber-400 font-semibold'>Forgot Password?</span>
          .
        </li>
        <li>Enter your registered email address.</li>
        <li>Check your inbox for the reset link.</li>
        <li>Click the link and set a new password.</li>
        <li>Log in with your new credentials.</li>
      </ol>

      <h2 className='text-xl font-semibold text-white mb-4'>
        Security Recommendations
      </h2>
      <ul className='list-disc list-inside text-gray-300 space-y-2 mb-6'>
        <li>Never reuse old passwords.</li>
        <li>Enable two-factor authentication for extra protection.</li>
        <li>Update your password regularly.</li>
      </ul>

      <p className='text-gray-400 italic'>
        If you don’t receive the reset email, check your spam folder or contact
        support.
      </p>
    </section>
  );
}

export function BillingArticlePage() {
  return (
    <section className='max-w-full bg-neutral-950 mx-auto py-12 px-6'>
      <Link
        to='/help'
        className='inline-flex items-center gap-2 font-poppins text-xs text-neutral-950 font-semibold bg-amber-400 px-3 py-2 rounded-md duration-200 cursor-pointer group my-5'
      >
        <ArrowLeft className='w-4 h-4 transition-transform group-hover:-translate-x-1' />
        Back to Home
      </Link>
      <h1 className='text-3xl font-bold text-amber-500 mb-6'>
        Billing & Payments
      </h1>
      <p className='text-gray-300 leading-relaxed mb-6'>
        Managing your billing ensures uninterrupted service. Here’s everything
        you need to know.
      </p>

      <h2 className='text-xl font-semibold text-white mb-4'>Payment Methods</h2>
      <ul className='list-disc list-inside text-gray-300 space-y-2 mb-6'>
        <li>Credit/Debit Cards (Visa, MasterCard)</li>
        <li>Bank Transfers</li>
        <li>Digital Wallets (PayPal, Stripe)</li>
      </ul>

      <h2 className='text-xl font-semibold text-white mb-4'>
        Invoices & Receipts
      </h2>
      <p className='text-gray-300 mb-6'>
        You can download invoices from your account dashboard under{" "}
        <span className='text-amber-400 font-semibold'>Billing History</span>.
      </p>

      <h2 className='text-xl font-semibold text-white mb-4'>Refund Policy</h2>
      <p className='text-gray-300 mb-6'>
        Refunds are available within 14 days of purchase if the service hasn’t
        been used. Contact support to initiate a refund.
      </p>

      <h2 className='text-xl font-semibold text-white mb-4'>Tips</h2>
      <ul className='list-disc list-inside text-gray-300 space-y-2 mb-6'>
        <li>
          Keep your payment method updated to avoid service interruptions.
        </li>
        <li>Enable billing notifications for reminders.</li>
        <li>Review invoices regularly to track expenses.</li>
      </ul>

      <p className='text-gray-400 italic'>
        For any billing issues, reach out to our support team for assistance.
      </p>
    </section>
  );
}
