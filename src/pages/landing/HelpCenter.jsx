import { Link } from "react-router";

export default function HelpCenter() {
  return (
    <section className='max-w-full bg-neutral-950 mx-auto py-12 px-6'>
      <h1 className='text-4xl font-bold text-amber-500 mb-8 text-center'>
        Help Center
      </h1>
      <p className='text-gray-300 text-center mb-12'>
        Browse guides and tutorials to quickly resolve issues.
      </p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        <Link
          to='/help/signup'
          className='block bg-neutral-900 border border-amber-500 rounded-lg p-6 '
        >
          <h2 className='text-xl font-semibold text-white mb-2'>
            Signup Process
          </h2>
          <p className='text-gray-400 text-sm'>
            Step-by-step guide to creating your account.
          </p>
          <span className='mt-4 inline-block text-amber-400 font-medium'>
            Read More →
          </span>
        </Link>

        <Link
          to='/help/password-reset'
          className='block bg-neutral-900 border border-amber-500 rounded-lg p-6 '
        >
          <h2 className='text-xl font-semibold text-white mb-2'>
            Password Reset
          </h2>
          <p className='text-gray-400 text-sm'>
            Learn how to reset or recover your password.
          </p>
          <span className='mt-4 inline-block text-amber-400 font-medium'>
            Read More →
          </span>
        </Link>

        <Link
          to='/help/billing'
          className='block bg-neutral-900 border border-amber-500 rounded-lg p-6 '
        >
          <h2 className='text-xl font-semibold text-white mb-2'>
            Billing & Payments
          </h2>
          <p className='text-gray-400 text-sm'>
            Understand invoices, subscriptions, and refunds.
          </p>
          <span className='mt-4 inline-block text-amber-400 font-medium'>
            Read More →
          </span>
        </Link>
      </div>
    </section>
  );
}
