// Translation dictionary - English and Tamil
const translations: Record<string, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.events': 'Events',
    'nav.news': 'News',
    'nav.members': 'Members',
    'nav.gallery': 'Gallery',
    'nav.donate': 'Donate',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    'nav.profile': 'Profile',
    'nav.reach': 'How To Reach',
    'nav.booking': 'Online Booking',
    'nav.timings': 'Pooja Timings',
    'nav.facilities': 'Pilgrim Facilities',
    'nav.rules': "Do's and Don'ts",

    'common.welcome': 'Welcome',
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.subscribe': 'Subscribe',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.create': 'Create',
    'common.back': 'Back',

    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Full Name',
    'auth.loginNow': 'Login Now',
    'auth.signUp': 'Sign Up',
    'auth.noAccount': "Don't have an account?",
    'auth.haveAccount': 'Already have an account?',

    'event.title': 'Events',
    'event.newEvent': 'New Event',
    'event.date': 'Date',
    'event.time': 'Time',
    'event.location': 'Location',
    'event.rsvp': 'RSVP',
    'event.description': 'Description',
    'event.upcomingEvents': 'Upcoming Events',
    'event.noEvents': 'No events found',

    'announcement.title': 'Announcements',
    'announcement.latest': 'Latest Announcements',
    'announcement.noAnnouncements': 'No announcements found',

    'member.directory': 'Member Directory',
    'member.members': 'Members',
    'member.profile': 'Profile',
    'member.joinDate': 'Join Date',
    'member.bio': 'Bio',

    'donation.donate': 'Donate',
    'donation.amount': 'Amount',
    'donation.currency': 'Currency',
    'donation.recurring': 'Recurring Donation',
    'donation.monthly': 'Monthly',
    'donation.yearly': 'Yearly',
    'donation.complete': 'Donation Completed',

    'footer.copyright': '© 2024 Kovil Community. All rights reserved.',
  },
  ta: {
    'nav.home': 'வீடு',
    'nav.about': 'பற்றி',
    'nav.events': 'நிகழ்வுகள்',
    'nav.news': 'செய்திகள்',
    'nav.members': 'உறுப்பினர்கள்',
    'nav.gallery': 'படத்தொகுப்பு',
    'nav.donate': 'நன்கொடையளிக்கவும்',
    'nav.login': 'உள்நுழைக',
    'nav.logout': 'வெளியேறு',
    'nav.profile': 'சுயவிவரம்',
    'nav.reach': 'வழித்தடம்',
    'nav.booking': 'முன்பதிவு',
    'nav.timings': 'பூஜை நேரங்கள்',
    'nav.facilities': 'பக்தர் வசதிகள்',
    'nav.rules': 'விதிமுறைகள்',

    'common.welcome': 'வரவேற்கிறோம்',
    'common.loading': 'ஏற்றுதல்...',
    'common.error': 'ஒரு பிழை ஏற்பட்டுவிட்டது',
    'common.subscribe': 'குழுசேர்',
    'common.cancel': 'ரத்துசெய்',
    'common.save': 'சேமிக்கவும்',
    'common.delete': 'அழிக்கவும்',
    'common.edit': 'திருத்து',
    'common.create': 'உருவாக்கவும்',
    'common.back': 'பின்செல்',

    'auth.login': 'உள்நுழைக',
    'auth.register': 'பதிவுசெய்',
    'auth.email': 'மின்னஞ்சல்',
    'auth.password': 'கடவுச்சொல்',
    'auth.name': 'முழு பெயர்',
    'auth.loginNow': 'இப்போது உள்நுழைக',
    'auth.signUp': 'பதிவுசெய்',
    'auth.noAccount': 'கணக்கு இல்லையா?',
    'auth.haveAccount': 'ஏற்கனவே கணக்கு உள்ளதா?',

    'event.title': 'நிகழ்வுகள்',
    'event.newEvent': 'புதிய நிகழ்வு',
    'event.date': 'தேதி',
    'event.time': 'நேரம்',
    'event.location': 'இடம்',
    'event.rsvp': 'RSVP',
    'event.description': 'விளக்கம்',
    'event.upcomingEvents': 'வரவிருக்கும் நிகழ்வுகள்',
    'event.noEvents': 'நிகழ்வுகள் கிடைக்கவில்லை',

    'announcement.title': 'அறிவிப்புகள்',
    'announcement.latest': 'சமீபத்திய அறிவிப்புகள்',
    'announcement.noAnnouncements': 'அறிவிப்புகள் கிடைக்கவில்லை',

    'member.directory': 'உறுப்பினர் அட்டவணை',
    'member.members': 'உறுப்பினர்கள்',
    'member.profile': 'சுயவிவரம்',
    'member.joinDate': 'சேர்ந்த தேதி',
    'member.bio': 'சுயவிவரம்',

    'donation.donate': 'நன்கொடையளிக்கவும்',
    'donation.amount': 'தொகை',
    'donation.currency': 'நாணயம்',
    'donation.recurring': 'திரும்ப வரும் நன்கொடை',
    'donation.monthly': 'மாதாந்தம்',
    'donation.yearly': 'வருடாந்தம்',
    'donation.complete': 'நன்கொடை முடிந்தது',

    'footer.copyright': '© 2024 கோவில் சமூகம் எல்லா உரிமைகளை உதயாக வைத்திருக்கிறது.',
  },
}

export type Language = 'en' | 'ta'

export function t(key: string, lang: Language = 'en'): string {
  return translations[lang]?.[key] || translations['en']?.[key] || key
}

export function getAllTranslations(lang: Language) {
  return translations[lang] || translations['en']
}

export function getLanguageName(lang: Language): string {
  return lang === 'ta' ? 'Tamil (தமிழ்)' : 'English'
}
