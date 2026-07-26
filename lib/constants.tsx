import { Hourglass, Sparkles, Calendar, MapPin, Landmark, Scroll, Megaphone, Users } from 'lucide-react'
import React from 'react'

export const HERO_BACKGROUNDS = [
  { src: '/hero_k1.png', position: 'center center' },
  { src: '/hero_k2.png', position: 'center 20%' },
]

export const QUICK_ACTIONS = [
  { labelKey: 'nav.timings',   icon: <Hourglass className="w-8 h-8" strokeWidth={1.5}/>,  href: '/timings' },
  { labelKey: 'nav.gallery',   icon: <Sparkles className="w-8 h-8" strokeWidth={1.5}/>,   href: '/gallery' },
  { label: 'Calendar',         icon: <Calendar className="w-8 h-8" strokeWidth={1.5}/>,   href: '/events',       labelTa: 'நாள்காட்டி' },
  { labelKey: 'nav.reach',     icon: <MapPin className="w-8 h-8" strokeWidth={1.5}/>,     href: '/how-to-reach' },
  { labelKey: 'nav.facilities',icon: <Landmark className="w-8 h-8" strokeWidth={1.5}/>,   href: '/facilities' },
  { labelKey: 'nav.rules',     icon: <Scroll className="w-8 h-8" strokeWidth={1.5}/>,     href: '/rules' },
]

export const FEATURE_CARDS = [
  {
    titleKey: 'nav.events',
    icon: <Sparkles className="w-10 h-10 text-saffron" strokeWidth={1.5}/>,
    descEn: 'View the schedule of upcoming temple festivals, special poojas, and annual celebrations.',
    descTa: 'கோவிலில் நடைபெறும் விசேஷ பூஜைகள் மற்றும் திருவிழாக்களின் விவரங்களை அறியவும்.',
    href: '/events',
  },
  {
    titleKey: 'announcement.title',
    icon: <Megaphone className="w-10 h-10 text-saffron" strokeWidth={1.5}/>,
    descEn: 'Stay informed with official temple notices, volunteer updates, and committee announcements.',
    descTa: 'கோவில் நிர்வாகத்தின் முக்கிய அறிவிப்புகள் மற்றும் தகவல்களை உடனுக்குடன் தெரிந்துகொள்ளுங்கள்.',
    href: '/announcements',
  },
  {
    titleKey: 'member.directory',
    icon: <Users className="w-10 h-10 text-saffron" strokeWidth={1.5}/>,
    descEn: 'Join the Mathanaickenpatti temple community directory and connect with fellow devotees.',
    descTa: 'மதநாயக்கன்பட்டி கோவில் பக்தர்களின் சமூகத்தில் இணைந்து தொடர்பில் இருங்கள்.',
    hrefAuth: '/members',
    hrefGuest: '/register',
  },
]
