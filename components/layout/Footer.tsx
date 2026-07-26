'use client'

import Link from 'next/link'
import { t, type Language } from '@/lib/translations'
import { Flame, MapPin, PhoneCall } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa6'

interface FooterProps {
  currentLanguage?: Language
}

const EXPLORE_LINKS = [
  { key: 'nav.about',  path: 'about' },
  { key: 'nav.events', path: 'events' },
  { key: 'nav.news',   path: 'announcements' },
  { key: 'nav.gallery',path: 'gallery' },
]
const SERVICE_LINKS = [
  { key: 'nav.timings',   path: 'timings' },
  { key: 'nav.reach',     path: 'how-to-reach' },
  { key: 'nav.facilities',path: 'facilities' },
  { key: 'nav.rules',     path: 'rules' },
]
const SOCIAL = [
  { label: 'Facebook',  icon: <FaFacebookF className="w-4 h-4" />, href: '#' },
  { label: 'Instagram', icon: <FaInstagram className="w-4 h-4" />, href: '#' },
  { label: 'YouTube',   icon: <FaYoutube className="w-5 h-5" />, href: '#' },
]

export default function Footer({ currentLanguage = 'en' }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden">
      <div className="flex items-center bg-stone-900 py-2">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-brass/35 to-transparent" />
        <div className="mx-6 text-brass/60 text-lg select-none">❖</div>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-brass/35 to-transparent" />
      </div>

      <div className="bg-temple-footer text-stone-100 relative border-t border-brass/20">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(176,138,79,0.15) 0%, transparent 32%), radial-gradient(circle at 80% 60%, rgba(196,106,43,0.15) 0%, transparent 28%)' }} />

        <div className="container-custom relative z-10 py-16 md:py-20">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 text-brass-400 mb-3">
                <Flame className="w-5 h-5 animate-lamp-flicker shrink-0" />
                <h3 className="text-2xl font-serif font-semibold text-stone-100 tracking-tight">Sri Karuppusamy Thirukovil</h3>
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-stone-400 mb-4">
                {currentLanguage === 'ta' ? 'மதநாயக்கன்பட்டி கோவில்' : 'Mathanaickenpatti Temple'}
              </p>
              <p className="max-w-sm text-base leading-relaxed text-stone-300">
                {currentLanguage === 'ta'
                  ? 'மதநாயக்கன்பட்டி கோவில் மற்றும் பக்தர்களுக்கான அதிகாரபூர்வ தகவல் தளம்.'
                  : 'Official temple information and community portal for devotees and residents of Mathanaickenpatti.'}
              </p>
            </div>

            <div>
              <h4 className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-brass-400">Explore</h4>
              <ul className="space-y-2.5">
                {EXPLORE_LINKS.map(({ key, path }) => (
                  <li key={key}>
                    <Link href={`/${path}`} className="text-sm text-stone-300 transition-colors hover:text-brass-400 py-1 inline-block">
                      {t(key, currentLanguage)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-brass-400">Services & Visits</h4>
              <ul className="space-y-2.5">
                {SERVICE_LINKS.map(({ key, path }) => (
                  <li key={key}>
                    <Link href={`/${path}`} className="text-sm text-stone-300 transition-colors hover:text-brass-400 py-1 inline-block">
                      {t(key, currentLanguage)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-brass-400">{currentLanguage === 'ta' ? 'கோவில் தொடர்பு' : 'Temple Contact'}</h4>
              <div className="space-y-3.5 text-sm text-stone-300">
                <p className="flex items-start gap-2.5 leading-relaxed">
                  <MapPin className="mt-1 h-4 w-4 text-brass-400 shrink-0" />
                  <span>Mathanaickenpatti, Salem District, Tamil Nadu</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <PhoneCall className="h-4 w-4 text-brass-400 shrink-0" />
                  <span>contact@kovilcommunity.org</span>
                </p>
              </div>
              <div className="mt-6 flex items-center gap-3">
                {SOCIAL.map(({ label, icon }) => (
                  <Link
                    key={label}
                    href="/contact"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-brass/30 bg-stone-800 text-stone-300 transition-all hover:border-brass-400 hover:text-brass-300 hover:scale-105 shadow-golden min-w-[44px] min-h-[44px]"
                  >
                    {icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-brass/15 pt-8 md:flex-row md:items-center md:justify-between">
            <p className="text-xs tracking-[0.15em] text-stone-400">
              © {year} Sri Karuppusamy Thirukovil, Mathanaickenpatti. {currentLanguage === 'ta' ? 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.' : 'All Rights Reserved.'}
            </p>
            <div className="flex gap-8">
              <Link href="/privacy" className="text-xs uppercase tracking-[0.18em] text-stone-400 transition-colors hover:text-brass-300 py-1 inline-block">Privacy</Link>
              <Link href="/terms" className="text-xs uppercase tracking-[0.18em] text-stone-400 transition-colors hover:text-brass-300 py-1 inline-block">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
