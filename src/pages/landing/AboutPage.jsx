import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  Compass,
  Headphones,
  HeartHandshake,
  Layers3,
  Lightbulb,
  LockKeyhole,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Target,
  Users,
  Zap,
} from "lucide-react";
import Badge from "../../shared_components/Badge";
import HeroBg from "../../assets/hero_bg.jpg";

const trustHighlights = [
  {
    icon: BadgeCheck,
    title: "Trusted Vendors",
    description:
      "Discover businesses with verified profiles, clear service information, and real customer feedback.",
  },
  {
    icon: Search,
    title: "Easy Search",
    description:
      "Browse categories, compare services, and find the right vendor without a complicated process.",
  },
  {
    icon: LockKeyhole,
    title: "Secure Platform",
    description:
      "User accounts, booking activity, and marketplace workflows are designed with trust at the center.",
  },
  {
    icon: Zap,
    title: "Fast Performance",
    description:
      "A clean, responsive experience helps customers move from discovery to decision quickly.",
  },
  {
    icon: Layers3,
    title: "Responsive Design",
    description:
      "Plan and explore comfortably from mobile, tablet, or desktop with consistent layouts.",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description:
      "Helpful paths make it easier for customers and vendors to connect with confidence.",
  },
];

const steps = [
  {
    icon: Compass,
    title: "Browse Categories",
    description: "Start with venues, catering, photography, decor, planning, and more.",
  },
  {
    icon: Store,
    title: "Choose a Vendor",
    description: "Compare trusted businesses by service details, pricing, and profile quality.",
  },
  {
    icon: Star,
    title: "View Vendor Details",
    description: "Review portfolios, ratings, descriptions, and contact information in one place.",
  },
  {
    icon: HeartHandshake,
    title: "Contact or Book",
    description: "Move forward with the vendor that best fits your event needs.",
  },
];

const stats = [
  { value: "25+", label: "Categories" },
  { value: "1000+", label: "Vendors" },
  { value: "5000+", label: "Happy Customers" },
  { value: "3000+", label: "Completed Services" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Trust",
    description: "We help customers make confident decisions with clearer vendor discovery.",
  },
  {
    icon: CheckCircle2,
    title: "Quality",
    description: "Every experience is shaped around useful information and polished presentation.",
  },
  {
    icon: Users,
    title: "Transparency",
    description: "Profiles, reviews, and service details keep both sides aligned from the start.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Modern tools make marketplace browsing simpler, faster, and more reliable.",
  },
  {
    icon: HeartHandshake,
    title: "Customer First",
    description: "The platform is built around real customer needs and dependable vendor access.",
  },
];

function CountOnView({ value }) {
  const ref = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    const element = ref.current;
    if (!element || hasStarted) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return undefined;

    let frameId = 0;
    let startTimestamp = 0;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / 1800, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.floor(eased * numericValue));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(step);
      }
    };

    frameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frameId);
  }, [hasStarted, numericValue]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

function SectionHeading({ badge, title, description, align = "center" }) {
  const alignment = align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <div className={`flex flex-col ${alignment}`}>
      <Badge title={badge} />
      <h2 className='mt-5 max-w-3xl font-montserrat text-3xl font-black uppercase text-foreground md:text-5xl'>
        {title}
      </h2>
      {description ? (
        <p className='mt-4 max-w-2xl font-poppins text-sm leading-7 text-muted-foreground md:text-base'>
          {description}
        </p>
      ) : null}
    </div>
  );
}

function IconCard({ icon: Icon, title, description }) {
  return (
    <article className='group rounded-2xl border border-border bg-card p-6 shadow-[var(--surface-shadow)] transition duration-300 hover:-translate-y-1 hover:border-border-gold hover:shadow-gold-glow'>
      <div className='mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-glass-gold text-primary transition duration-300 group-hover:bg-glass-gold-hover group-hover:text-primary-hover'>
        <Icon className='h-6 w-6' />
      </div>
      <h3 className='font-montserrat text-lg font-black text-foreground'>
        {title}
      </h3>
      <p className='mt-3 font-poppins text-sm leading-6 text-muted-foreground'>
        {description}
      </p>
    </article>
  );
}

function AboutPage() {
  return (
    <div className='bg-background text-foreground'>
      <section
        className='relative isolate overflow-hidden bg-cover bg-center px-5 py-24 md:px-10 md:py-32'
        style={{ backgroundImage: `url(${HeroBg})` }}
      >
        <div className='absolute inset-0 bg-black/65' />
        <div className='absolute inset-0 bg-[linear-gradient(135deg,rgba(245,158,11,0.22),transparent_45%,rgba(0,0,0,0.35))]' />

        <div className='relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]'>
          <div className='max-w-3xl animate-fade-in-up'>
            <Badge title='About Event Orbit' />
            <h1 className='mt-6 font-display text-5xl leading-tight text-white md:text-7xl'>
              About Us
            </h1>
            <p className='mt-6 max-w-2xl font-poppins text-base leading-8 text-stone-200 md:text-lg'>
              Event Orbit is a modern vendor marketplace that helps customers
              browse categories, discover trusted businesses, compare service
              details, and connect with reliable vendors faster.
            </p>
            <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
              <Link
                to='/categories'
                className='inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-poppins text-sm font-bold text-primary-foreground shadow-gold-glow transition duration-300 hover:bg-primary-hover hover:shadow-gold-glow-hover'
              >
                Explore Categories
                <ArrowRight className='h-4 w-4' />
              </Link>
              <Link
                to='/contact'
                className='inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-6 py-3 font-poppins text-sm font-bold text-white backdrop-blur-md transition duration-300 hover:border-primary hover:bg-white/15'
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className='relative mx-auto w-full max-w-md animate-scale-fade lg:max-w-lg'>
            <div className='rounded-2xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-xl'>
              <div className='rounded-2xl border border-white/10 bg-neutral-950/80 p-6'>
                <div className='flex items-center justify-between gap-4 border-b border-white/10 pb-5'>
                  <div>
                    <p className='font-poppins text-xs font-semibold uppercase text-amber-300'>
                      Marketplace Snapshot
                    </p>
                    <h2 className='mt-2 font-montserrat text-2xl font-black text-white'>
                      Find the right vendor
                    </h2>
                  </div>
                  <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-gold-glow'>
                    <BriefcaseBusiness className='h-7 w-7' />
                  </div>
                </div>
                <div className='mt-5 grid gap-3'>
                  {["Browse categories", "Compare vendor profiles", "Review ratings", "Contact or book"].map(
                    (item) => (
                      <div
                        key={item}
                        className='flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-stone-200'
                      >
                        <CheckCircle2 className='h-4 w-4 text-primary' />
                        {item}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='mx-auto grid max-w-7xl gap-10 px-5 py-20 md:px-10 lg:grid-cols-[0.9fr_1.1fr]'>
        <SectionHeading
          align='left'
          badge='Who We Are'
          title='A trusted bridge between customers and vendors'
          description='We bring marketplace discovery into one clean experience so customers can find dependable services and vendors can grow through stronger digital visibility.'
        />
        <div className='grid gap-5 sm:grid-cols-2'>
          <IconCard
            icon={Users}
            title='For Customers'
            description='Explore categories, compare vendor details, and choose services with better clarity.'
          />
          <IconCard
            icon={Store}
            title='For Vendors'
            description='Present services professionally and reach customers who are ready to discover reliable businesses.'
          />
        </div>
      </section>

      <section className='bg-background-soft px-5 py-20 md:px-10'>
        <div className='mx-auto grid max-w-7xl gap-6 lg:grid-cols-2'>
          <article className='rounded-2xl border border-border bg-card p-8 shadow-[var(--surface-shadow)] transition duration-300 hover:-translate-y-1 hover:border-border-gold'>
            <div className='mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-glass-gold text-primary'>
              <Target className='h-7 w-7' />
            </div>
            <h2 className='font-montserrat text-2xl font-black text-foreground'>
              Our Mission
            </h2>
            <p className='mt-4 font-poppins text-sm leading-7 text-muted-foreground md:text-base'>
              Our mission is to make finding trusted vendors simple, fast, and
              reliable while helping businesses grow through a modern digital
              marketplace.
            </p>
          </article>

          <article className='rounded-2xl border border-border bg-card p-8 shadow-[var(--surface-shadow)] transition duration-300 hover:-translate-y-1 hover:border-border-gold'>
            <div className='mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-glass-gold text-primary'>
              <Rocket className='h-7 w-7' />
            </div>
            <h2 className='font-montserrat text-2xl font-black text-foreground'>
              Our Vision
            </h2>
            <p className='mt-4 font-poppins text-sm leading-7 text-muted-foreground md:text-base'>
              We envision a marketplace where every customer can quickly find
              the right service and every quality vendor has a fair path to be
              discovered.
            </p>
          </article>
        </div>
      </section>

      <section className='mx-auto max-w-7xl px-5 py-20 md:px-10'>
        <SectionHeading
          badge='Why Choose Us'
          title='Built for confident decisions'
          description='Event Orbit combines clear discovery, trusted profiles, and responsive design for a better marketplace experience.'
        />
        <div className='mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {trustHighlights.map((item) => (
            <IconCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      <section className='bg-neutral-950 px-5 py-20 text-white md:px-10'>
        <div className='mx-auto max-w-7xl'>
          <SectionHeading
            badge='How It Works'
            title='From search to connection'
            description='A clear path helps customers move from browsing to booking without friction.'
          />

          <div className='relative mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
            <div className='absolute left-0 right-0 top-10 hidden h-px bg-border-gold/30 lg:block' />
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <article
                  key={step.title}
                  className='group relative rounded-2xl border border-white/10 bg-white/5 p-6 text-center shadow-2xl backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-border-gold'
                >
                  <div className='relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-border-gold bg-neutral-950 text-border-gold-hover shadow-gold-glow transition duration-300 group-hover:scale-105'>
                    <Icon className='h-8 w-8' />
                    <span className='absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary font-montserrat text-xs font-black text-primary-foreground'>
                      {index + 1}
                    </span>
                  </div>
                  <h3 className='font-montserrat text-lg font-black text-white'>
                    {step.title}
                  </h3>
                  <p className='mt-3 font-poppins text-sm leading-6 text-stone-400'>
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className='mx-auto max-w-7xl px-5 py-20 md:px-10'>
        <div className='rounded-2xl border border-border bg-card p-6 shadow-[var(--surface-shadow)] md:p-10'>
          <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
            {stats.map((stat) => (
              <div
                key={stat.label}
                className='text-center transition duration-300 hover:-translate-y-1'
              >
                <div className='font-montserrat text-4xl font-black text-primary md:text-5xl'>
                  <CountOnView value={stat.value} />
                </div>
                <p className='mt-3 font-poppins text-sm font-semibold text-muted-foreground'>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='bg-background-soft px-5 py-20 md:px-10'>
        <div className='mx-auto max-w-7xl'>
          <SectionHeading
            badge='Core Values'
            title='The principles behind the platform'
            description='Our values guide how we design discovery, vendor visibility, and customer confidence.'
          />
          <div className='mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5'>
            {values.map((item) => (
              <IconCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className='px-5 py-20 md:px-10'>
        <div className='mx-auto max-w-7xl overflow-hidden rounded-2xl border border-border-gold bg-neutral-950 p-8 text-center text-white shadow-2xl md:p-12'>
          <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-glass-gold text-border-gold-hover'>
            <Sparkles className='h-8 w-8' />
          </div>
          <h2 className='mx-auto mt-6 max-w-3xl font-montserrat text-3xl font-black uppercase md:text-5xl'>
            Ready to find the right vendor?
          </h2>
          <p className='mx-auto mt-4 max-w-2xl font-poppins text-sm leading-7 text-stone-300 md:text-base'>
            Browse trusted marketplace categories or join Event Orbit as a
            vendor and bring your services to customers looking for reliable
            businesses.
          </p>
          <div className='mt-8 flex flex-col justify-center gap-3 sm:flex-row'>
            <Link
              to='/categories'
              className='inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-poppins text-sm font-bold text-primary-foreground shadow-gold-glow transition duration-300 hover:bg-primary-hover hover:shadow-gold-glow-hover'
            >
              Browse Categories
              <ArrowRight className='h-4 w-4' />
            </Link>
            <Link
              to='/auth/register'
              className='inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-poppins text-sm font-bold text-white transition duration-300 hover:border-primary hover:bg-white/10'
            >
              Become a Vendor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
