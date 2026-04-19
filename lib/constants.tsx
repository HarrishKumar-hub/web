import { Hourglass, Sparkles, Calendar, MapPin, Landmark, Scroll, Megaphone, Users } from 'lucide-react'
import React from 'react'

export const HERO_BACKGROUNDS = [
  { src: '/hero_k1.png', position: 'center center' },
  { src: '/hero_k2.png', position: 'center 20%' },
]

export const QUICK_ACTIONS = [
  { labelKey: 'nav.timings',   icon: <Hourglass className="w-8 h-8" strokeWidth={1.5}/>,  href: '/timings' },
  { label: 'Offerings',        icon: <Sparkles className="w-8 h-8" strokeWidth={1.5}/>,   href: '/booking',      labelTa: 'அபிஷேகம்' },
  { label: 'Calendar',         icon: <Calendar className="w-8 h-8" strokeWidth={1.5}/>,   href: '/events',       labelTa: 'நாள்காட்டி' },
  { labelKey: 'nav.reach',     icon: <MapPin className="w-8 h-8" strokeWidth={1.5}/>,     href: '/how-to-reach' },
  { labelKey: 'nav.facilities',icon: <Landmark className="w-8 h-8" strokeWidth={1.5}/>,   href: '/facilities' },
  { labelKey: 'nav.rules',     icon: <Scroll className="w-8 h-8" strokeWidth={1.5}/>,     href: '/rules' },
]

export const FEATURE_CARDS = [
  {
    titleKey: 'nav.events',
    icon: <Sparkles className="w-10 h-10 text-saffron" strokeWidth={1.5}/>,
    descEn: 'Experience the divine ceremonies and upcoming celestial festivals.',
    descTa: 'புனித விழாக்கள் மற்றும் வரவிருக்கும் நிகழ்வுகளை அனுபவிக்கவும்.',
    href: '/events',
  },
  {
    titleKey: 'announcement.title',
    icon: <Megaphone className="w-10 h-10 text-saffron" strokeWidth={1.5}/>,
    descEn: 'Stay updated with the latest temple news and sacred announcements.',
    descTa: 'சமீபத்திய கோவில் செய்திகள் மற்றும் தெய்வீக செய்திகளுடன் இணைந்திருங்கள்.',
    href: '/announcements',
  },
  {
    titleKey: 'member.directory',
    icon: <Users className="w-10 h-10 text-saffron" strokeWidth={1.5}/>,
    descEn: 'Connect with our global community of devout followers and seekers.',
    descTa: 'பக்தியுள்ள பின்பற்றுபவர்களின் உலகளாவிய சமூகத்துடன் இணையுங்கள்.',
    hrefAuth: '/members',
    hrefGuest: '/register',
  },
]
