'use client'

import Link from 'next/link'
import { t, type Language } from '@/lib/translations'
import { Flame } from 'lucide-react'
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
  { key: 'nav.booking',   path: 'booking' },
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
      {/* Sacred ornamental gold divider above footer */}
      <div className="flex items-center">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="mx-6 text-gold/50 text-2xl select-none">❖</div>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      </div>

      {/* Main footer body — dark maroon gradient */}
      <div className="bg-temple-footer text-ivory relative">

        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, #D4AF37 0%, transparent 60%), radial-gradient(circle at 75% 75%, #E8722A 0%, transparent 60%)' }}
        />

        <div className="container-custom relative z-10 pt-16 pb-10">
          {/* Top grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">

            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-5 text-saffron">
                <Flame className="w-6 h-6 animate-lamp-flicker" />
                <h3 className="text-lg font-serif font-bold text-gold tracking-tight">
                  Sri Karuppusamy Thirukovil
                </h3>
              </div>
              <p className="text-[9px] font-black text-saffron/70 uppercase tracking-[0.45em] mb-5">
                Mathanaickenpatti Sanctuary
              </p>
              <p className="text-ivory/55 font-sans text-sm leading-relaxed max-w-xs">
                {currentLanguage === 'ta'
                  ? 'ஒரு சமூக கூட்டமை தட்டமிடுவது'
                  : 'A sacred digital sanctuary dedicated to the devotees of Sri Karuppusamy Thirukovil.'}
              </p>
            </div>

            {/* Explore */}
            <div>
              <h4 className="text-[10px] font-black text-saffron/80 uppercase tracking-[0.4em] mb-6">Explore</h4>
              <ul className="space-y-3.5">
                {EXPLORE_LINKS.map(({ key, path }) => (
                  <li key={key}>
                    <Link
                      href={`/${path}`}
                      className="text-sm font-sans font-medium text-ivory/55 hover:text-gold transition-colors hover:translate-x-1 inline-block duration-300"
                    >
                      {t(key, currentLanguage)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-[10px] font-black text-saffron/80 uppercase tracking-[0.4em] mb-6">Services</h4>
              <ul className="space-y-3.5">
                {SERVICE_LINKS.map(({ key, path }) => (
                  <li key={key}>
                    <Link
                      href={`/${path}`}
                      className="text-sm font-sans font-medium text-ivory/55 hover:text-gold transition-colors hover:translate-x-1 inline-block duration-300"
                    >
                      {t(key, currentLanguage)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-[10px] font-black text-saffron/80 uppercase tracking-[0.4em] mb-6">Connect</h4>
              <div className="space-y-5">
                <p className="text-sm font-sans font-medium text-gold/80">
                  contact@kovilcommunity.org
                </p>
                <div className="flex gap-3">
                  {SOCIAL.map(({ label, icon, href }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-[11px] font-black text-ivory/50 hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-300"
                    >
                      {icon}
                    </a>
                  ))}
                </div>
                <Link href="/donations" className="btn-sacred inline-flex items-center justify-center gap-2 py-3 px-8 text-[10px] mt-2">
                  <Flame className="w-3 h-3" />
                  {currentLanguage === 'ta' ? 'நன்கொடை' : 'Donate Now'}
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[9px] font-black text-ivory/30 uppercase tracking-[0.4em]">
              © {year} Sri Karuppusamy Thirukovil Sanctuary.{' '}
              {currentLanguage === 'ta' ? 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை' : 'All Sacred Rights Reserved.'}
            </p>
            <div className="flex gap-8">
              <Link href="/privacy" className="text-[9px] font-black text-ivory/30 uppercase tracking-widest hover:text-gold transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-[9px] font-black text-ivory/30 uppercase tracking-widest hover:text-gold transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
