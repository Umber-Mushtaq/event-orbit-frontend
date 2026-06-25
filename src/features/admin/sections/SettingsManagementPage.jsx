import { iconMap } from "../components/adminIconMap";
import { settingsCards } from "../data/settingsManagementData";

function SettingsManagementPage() {
  return (
    <div className='space-y-6'>
      <section>
        <h1 className='text-3xl font-black tracking-tight text-white md:text-4xl'>Settings</h1>
        <p className='mt-2 text-sm text-stone-400'>
          Configure roles, permissions, and platform-wide defaults.
        </p>
      </section>

      <section className='grid gap-4 lg:grid-cols-2'>
        {settingsCards.map((card) => {
          const Icon = iconMap[card.icon] || iconMap.settings;

          return (
            <article
              key={card.title}
              className='rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(12,12,12,0.98),rgba(7,7,7,0.98))] p-5 shadow-[0_14px_40px_rgba(0,0,0,0.35)]'
            >
              <div className='flex items-start gap-4'>
                <div className='inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-border-gold/25 bg-black/25 text-border-gold-hover'>
                  <Icon className='h-5 w-5' />
                </div>
                <div className='min-w-0'>
                  <h2 className='text-xl font-black tracking-tight text-white'>{card.title}</h2>
                  <p className='mt-1 text-sm text-stone-400'>{card.description}</p>
                </div>
              </div>

              <div className='mt-5 flex flex-wrap gap-2'>
                {card.chips.map((chip) => (
                  <span
                    key={chip}
                    className='rounded-full border border-white/8 bg-white/5 px-3 py-1 text-xs font-semibold text-stone-300'
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}

export default SettingsManagementPage;
