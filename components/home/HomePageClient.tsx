'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/lib/useAuth'
import { useState } from 'react'
import { type Language, t } from '@/lib/translations'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ArrowRight, BellRing, CalendarDays, Landmark, MapPin, ShieldCheck, TimerReset } from 'lucide-react'
import { HERO_BACKGROUNDS } from '@/lib/constants'

export default function HomePageClient() {
  const { isAuthenticated } = useAuth()
  const [language, setLanguage] = useState<Language>('en')

  const heroImage = HERO_BACKGROUNDS[0]

  const quickActions = [
    { href: '/timings', icon: TimerReset, label: language === 'ta' ? 'நாளாந்திர நேரங்கள்' : 'Timings' },
    { href: '/events', icon: CalendarDays, label: language === 'ta' ? 'விழாக்கள்' : 'Events' },
    { href: '/how-to-reach', icon: MapPin, label: language === 'ta' ? 'எப்படி வருவது' : 'How to Reach' },
  ]

  const templeNotes = [
    language === 'ta' ? 'தினசரி பூஜைகள் ஒழுங்காக நடத்தப்படுகின்றன' : 'Daily poojas are observed with discipline',
    language === 'ta' ? 'விழா அறிவிப்புகள் முதன்மையாக வெளியிடப்படும்' : 'Festival notices are published first here',
    language === 'ta' ? 'பக்தர்களுக்கான அமைதியான தகவல் மையம்' : 'A calm information center for devotees',
  ]

  return (
    <>
      <Header currentLanguage={language} onLanguageChange={setLanguage} />

      <main className="overflow-hidden bg-stone-900">
        <section className="relative isolate min-h-[88vh] flex items-end">
          <div className="absolute inset-0">
            <Image
              src={heroImage.src}
              alt="Sri Karuppusamy Thirukovil Sanctuary"
              fill
              priority
              className="object-cover"
              style={{ objectPosition: heroImage.position }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(176,138,79,0.12),_transparent_50%),linear-gradient(180deg,rgba(24,22,18,0.4)_0%,rgba(24,22,18,0.85)_70%,#181612_100%)]" />
          </div>

          <div className="container-custom relative z-10 pb-16 pt-32 md:pb-24">
            <div className="max-w-3xl text-stone-100">
              <div className="badge-sacred mb-6 bg-stone-900/80 text-brass-300 border-brass/30 backdrop-blur-md">
                <BellRing className="h-3.5 w-3.5 shrink-0 animate-lamp-flicker text-brass-400" />
                <span>{language === 'ta' ? 'அதிகாரபூர்வ வலைத்தளம்' : 'Official Temple Website'}</span>
              </div>
              <h1 className="max-w-2xl text-5xl font-serif font-semibold leading-[0.92] tracking-tight text-stone-100 text-balance md:text-7xl lg:text-[5.6rem]">
                {language === 'ta' ? 'ஸ்ரீ கருப்பசாமி திருக்கோவில்' : 'Sri Karuppusamy Thirukovil'}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone-300 md:text-lg">
                {language === 'ta'
                  ? 'மதநாயக்கன்பட்டி மக்களின் காவல் தெய்வமாக விளங்கும் ஸ்ரீ கருப்பசாமி திருக்கோவில். தலைமுறை தலைமுறையாக பக்தர்களின் நம்பிக்கையையும் வழிபாட்டையும் தாங்கி நிற்கும் புனிதத் தலம்.'
                  : 'Sri Karuppusamy Thirukovil has served the people of Mathanaickenpatti for generations. A sanctuary of protection, faith, and community worship.'}
              </p>

              <div className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center">
                <Link href="/timings" className="btn-premium inline-flex items-center justify-center gap-2">
                  <TimerReset className="h-4 w-4 shrink-0" />
                  {language === 'ta' ? 'நாளாந்திர நேரங்கள்' : 'View Timings'}
                </Link>
                <Link href="/announcements" className="btn-outline-gold inline-flex items-center justify-center gap-2">
                  {language === 'ta' ? 'அறிவிப்புகள்' : 'Announcements'}
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
              </div>

              <div className="mt-9 flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-stone-300">
                <span className="rounded-full border border-brass/25 bg-stone-900/80 px-4 py-2 backdrop-blur-sm">{language === 'ta' ? 'தினசரி பூஜை' : 'Daily Pooja Observed'}</span>
                <span className="rounded-full border border-brass/25 bg-stone-900/80 px-4 py-2 backdrop-blur-sm">{language === 'ta' ? 'மதநாயக்கன்பட்டி' : 'Mathanaickenpatti'}</span>
                <span className="rounded-full border border-brass/25 bg-stone-900/80 px-4 py-2 backdrop-blur-sm">{language === 'ta' ? 'பக்தர்களுக்கு அனுமதி' : 'Open to Devotees'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Immediate Value Grid - Answering devotee questions within 10 seconds */}
        <section className="bg-stone-900 py-12 md:py-16 border-t border-brass/20 relative z-20 shadow-2xl">
          <div className="container-custom">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {/* Card 1: Timings */}
              <Link href="/timings" className="card-temple group bg-stone-800/90 border border-brass/30 hover:border-brass-400 p-6 rounded-2xl transition-all hover:-translate-y-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-brass-400">{language === 'ta' ? 'நேரங்கள்' : 'Temple Timings'}</span>
                  <TimerReset className="w-5 h-5 text-brass-300 group-hover:rotate-45 transition-transform" />
                </div>
                <h3 className="text-base font-serif font-semibold text-stone-100 mb-1">{language === 'ta' ? 'காலை & மாலை பூஜை' : 'Morning & Evening'}</h3>
                <p className="text-sm text-stone-300 font-mono">6:00 AM – 12:00 PM | 5:00 PM – 8:30 PM</p>
              </Link>

              {/* Card 2: Upcoming Festival */}
              <Link href="/events" className="card-temple group bg-stone-800/90 border border-brass/30 hover:border-brass-400 p-6 rounded-2xl transition-all hover:-translate-y-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-brass-400">{language === 'ta' ? 'திருவிழா' : 'Next Festival'}</span>
                  <CalendarDays className="w-5 h-5 text-brass-300 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-base font-serif font-semibold text-stone-100 mb-1">{language === 'ta' ? 'ஆடி அமாவாசை பூஜை' : 'Aadi Amavasai Poojai'}</h3>
                <p className="text-sm text-stone-300 truncate">{language === 'ta' ? 'சிறப்பு அபிஷேகம் மற்றும் அன்னதானம்' : 'Special Abhishekam & Annadhanam'}</p>
              </Link>

              {/* Card 3: Latest Notice */}
              <Link href="/announcements" className="card-temple group bg-stone-800/90 border border-brass/30 hover:border-brass-400 p-6 rounded-2xl transition-all hover:-translate-y-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-brass-400">{language === 'ta' ? 'அறிவிப்பு' : 'Latest Notice'}</span>
                  <BellRing className="w-5 h-5 text-brass-300 group-hover:animate-bounce transition-transform" />
                </div>
                <h3 className="text-base font-serif font-semibold text-stone-100 mb-1">{language === 'ta' ? 'கோவில் திருப்பணி' : 'Renovation Phase 1'}</h3>
                <p className="text-sm text-stone-300 truncate">{language === 'ta' ? 'ராஜகோபுரம் பணிகள் நிறைவு' : 'Rajagopuram work completed successfully'}</p>
              </Link>

              {/* Card 4: Directions */}
              <Link href="/how-to-reach" className="card-temple group bg-stone-800/90 border border-brass/30 hover:border-brass-400 p-6 rounded-2xl transition-all hover:-translate-y-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-brass-400">{language === 'ta' ? 'எப்படி வருவது' : 'Directions'}</span>
                  <MapPin className="w-5 h-5 text-brass-300 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-base font-serif font-semibold text-stone-100 mb-1">{language === 'ta' ? 'மதநாயக்கன்பட்டி, சேலம்' : 'Mathanaickenpatti, Salem'}</h3>
                <p className="text-sm text-stone-300 truncate">{language === 'ta' ? 'எளிதான சாலை வசதி' : 'Direct road access from Salem highway'}</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Temple Story & Trustee Welcome - Asymmetrical Layout */}
        <section className="bg-stone-900/70 border-t border-brass/15 py-16 md:py-28">
          <div className="container-custom grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-6">
              <span className="section-label-gold inline-block">{language === 'ta' ? 'கோவில் வரலாறு & பாரம்பரியம்' : 'Temple History & Heritage'}</span>
              <h2 className="text-3xl md:text-5xl font-serif font-semibold text-stone-100 tracking-tight leading-tight">
                {language === 'ta'
                  ? 'தலைமுறை தலைமுறையாக மதநாயக்கன்பட்டி மக்களைக் காக்கும் தலம்'
                  : 'Serving Mathanaickenpatti for Generations'}
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-stone-300">
                {language === 'ta'
                  ? 'ஸ்ரீ கருப்பசாமி திருக்கோவில் அதிகாரபூர்வ வலைத்தளத்திற்கு அன்புடன் வரவேற்கிறோம். எங்கள் கிராமத்தின் காவல் தெய்வங்களான ஸ்ரீ அய்யனார் மற்றும் ஸ்ரீ கருப்பசாமி ஆகியோரின் வழிபாட்டிற்காக அர்ப்பணிக்கப்பட்ட இந்த கோவில், பக்தர்களின் நம்பிக்கை, அமைதி மற்றும் சமூக ஒற்றுமையின் அடையாளமாகத் திகழ்கிறது.'
                  : 'Welcome to the official website of Sri Karuppusamy Thirukovil. Dedicated to Lord Ayyanar and Sri Karuppusamy, the guardian deities of Mathanaickenpatti, our temple stands as a pillar of spiritual guidance, community service, and ancestral devotion in Salem District.'}
              </p>
              <p className="text-base leading-relaxed text-stone-300">
                {language === 'ta'
                  ? 'உள்ளூர் மக்களாக இருந்தாலும் அல்லது வெளியூரில் வசிக்கும் பக்தர்களாக இருந்தாலும், இந்த தளத்தின் மூலம் தினசரி பூஜை நேரங்கள், வரவிருக்கும் விசேஷ திருவிழாக்கள் மற்றும் கோவில் நிர்வாகத்தின் அதிகாரபூர்வ அறிவிப்புகளை உடனுக்குடன் தெரிந்துகொள்ளலாம்.'
                  : 'Whether you are a local resident, a visiting devotee, or a community member living abroad, this platform provides authoritative pooja timings, festival schedules, and volunteer opportunities.'}
              </p>

              <div className="pt-4 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-brass/25 bg-stone-900 p-4 text-sm leading-relaxed text-stone-200 shadow-inner">
                  <ShieldCheck className="mb-2.5 h-5 w-5 text-brass-400 shrink-0" />
                  <p className="font-semibold text-stone-100 mb-0.5">{language === 'ta' ? 'தினசரி பூஜைகள்' : 'Daily Poojas'}</p>
                  <p className="text-xs text-stone-400">{language === 'ta' ? 'காலசந்தி & சாயரட்சை முறைப்படி நடக்கிறது' : 'Kala Sandhi & Sayarakshai observed daily'}</p>
                </div>
                <div className="rounded-xl border border-brass/25 bg-stone-900 p-4 text-sm leading-relaxed text-stone-200 shadow-inner">
                  <ShieldCheck className="mb-2.5 h-5 w-5 text-brass-400 shrink-0" />
                  <p className="font-semibold text-stone-100 mb-0.5">{language === 'ta' ? 'அன்னதானம்' : 'Annadhanam'}</p>
                  <p className="text-xs text-stone-400">{language === 'ta' ? 'முக்கிய விசேஷ நாட்களில் அன்னதானம்' : 'Free prasadam during major festivals'}</p>
                </div>
                <div className="rounded-xl border border-brass/25 bg-stone-900 p-4 text-sm leading-relaxed text-stone-200 shadow-inner">
                  <ShieldCheck className="mb-2.5 h-5 w-5 text-brass-400 shrink-0" />
                  <p className="font-semibold text-stone-100 mb-0.5">{language === 'ta' ? 'சமூக நிர்வாகம்' : 'Community Trust'}</p>
                  <p className="text-xs text-stone-400">{language === 'ta' ? 'கோவில் நிர்வாக குழுவால் பராமரிக்கப்படுகிறது' : 'Managed by authoritative temple trustees'}</p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link href="/about" className="btn-premium inline-flex items-center gap-2">
                  <Landmark className="w-4 h-4" />
                  {language === 'ta' ? 'கோவில் வரலாறு' : 'Read Temple History'}
                </Link>
                <Link href="/events" className="btn-outline-gold inline-flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" />
                  {language === 'ta' ? 'விழா அட்டவணை' : 'Festival Calendar'}
                </Link>
              </div>
            </div>

            {/* Right Side Notice & Community Box */}
            <div className="bg-stone-800/90 border border-brass/30 rounded-3xl p-8 md:p-10 shadow-golden space-y-8">
              <div className="border-b border-brass/20 pb-6">
                <span className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-brass-400 block mb-2">{language === 'ta' ? 'முக்கிய அறிவிப்பு' : 'Notice Board Highlight'}</span>
                <h3 className="text-2xl font-serif font-semibold text-stone-100 mb-2">{language === 'ta' ? 'கோவில் திருப்பணி முதல் கட்டம் நிறைவு' : 'Temple Renovation Phase 1 Completed'}</h3>
                <p className="text-sm text-stone-300 leading-relaxed mb-4">
                  {language === 'ta'
                    ? 'ராஜகோபுரம் மற்றும் பிரதான சன்னதி புனரமைப்பு பணிகள் வெற்றிகரமாக நிறைவடைந்துள்ளன. பங்களித்த அனைத்து பக்தர்களுக்கும் நன்றி.'
                    : 'The first phase of our temple renovation project has been successfully completed. We express our heartfelt gratitude to all devotees and volunteers.'}
                </p>
                <Link href="/announcements/1" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brass-300 hover:text-brass-400 transition-colors">
                  {language === 'ta' ? 'முழு அறிவிப்பையும் படிக்க' : 'Read Official Notice'} <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
              </div>

              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-brass-400 block mb-2">{language === 'ta' ? 'கோவில் அமைவிடம்' : 'Sanctuary Location'}</span>
                <h3 className="text-lg font-semibold text-stone-100 mb-1">{language === 'ta' ? 'மதநாயக்கன்பட்டி, சேலம் மாவட்டம்' : 'Mathanaickenpatti, Salem District'}</h3>
                <p className="text-sm text-stone-300 leading-relaxed mb-4">
                  {language === 'ta'
                    ? 'சேலம் பிரதான சாலையிலிருந்து எளிதில் வரும் வகையில் அமைந்துள்ளது. வாகன நிறுத்துமிட வசதி உள்ளது.'
                    : 'Conveniently located with direct road access from the main highway. Adequate parking is available for visitors and family vehicles.'}
                </p>
                <Link href="/how-to-reach" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brass-300 hover:text-brass-400 transition-colors">
                  {language === 'ta' ? 'வழித்தடங்களை பார்க்க' : 'Get Directions & Map'} <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer currentLanguage={language} />
    </>
  )
}
