'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Language, t } from '@/lib/translations'

// Default temple settings to show when API is unavailable
const DEFAULT_SETTINGS = {
  templeName: 'Sri Ayyanar Karuppasamy Kovil',
  templeNameTa: 'ஸ்ரீ அய்யனார் கருப்பசாமி கோவில்',
  description: 'A sacred temple dedicated to Lord Ayyanar and Karuppasamy, serving the community with spiritual guidance and cultural preservation.',
  descriptionTa: 'ஸ்ரீ அய்யனார் மற்றும் கருப்பசாமிக்கு அர்ப்பணிக்கப்பட்ட புனித கோவில், ஆன்மீக வழிகாட்டுதல் மற்றும் கலாச்சார பாதுகாப்புடன் சமூகத்திற்கு சேவை செய்கிறது.',
  email: 'info@kovilcommunity.org',
  phone: '+91 98765 43210',
  address: 'Mathanaickenpatti,\nTamil Nadu 636453\nIndia',
  bannerImageUrl: 'https://images.unsplash.com/photo-1544006659-f0b21f04cb1d?auto=format&fit=crop&q=80&w=1200',
  aboutContent: `Sri Ayyanar Karuppasamy Kovil at Mathanaickenpatti stands as a beacon of faith and community in Tamil Nadu. Dedicated to the village guardian deities Lord Ayyanar and Karuppasamy, this temple has been the spiritual heart of our community for generations.

Our temple serves as a gathering place for devotees from all walks of life. We observe all major Hindu festivals with traditional grandeur, including Chitra Vizha (Annual Festival), Aadi Amavasai, Maha Shivaratri, Thai Poosam, and many more sacred occasions.

The temple complex includes the main sanctum, a spacious mandapam for community events, and beautifully maintained grounds. Our priest conducts daily poojas at dawn and dusk, and special ceremonies are performed on auspicious days throughout the year.

We believe in preserving our rich cultural heritage while embracing the needs of our modern community. Our community programs include youth education, cultural workshops, charitable food distribution (Annadhanam), and community welfare activities.

We warmly welcome all devotees, visitors, and well-wishers to our temple. Together, we strive to keep the divine flame of faith burning bright.`,
  aboutContentTa: `மதநாயக்கன்பட்டியில் உள்ள ஸ்ரீ அய்யனார் கருப்பசாமி கோவில் தமிழ்நாட்டில் நம்பிக்கை மற்றும் சமூகத்தின் கலங்கரை விளக்கமாக நிற்கிறது. கிராமக் காவலர் தெய்வங்களான அய்யனார் மற்றும் கருப்பசாமிக்கு அர்ப்பணிக்கப்பட்ட இந்த கோவில் தலைமுறை தலைமுறையாக எங்கள் சமூகத்தின் ஆன்மீக இதயமாக இருந்து வருகிறது.

எங்கள் கோவில் அனைத்து நிலைகளிலும் பக்தர்களுக்கு ஒரு கூடும் இடமாக செயல்படுகிறது. சித்திரை திருவிழா, ஆடி அமாவாசை, மகா சிவராத்திரி, தை பூசம் உள்ளிட்ட அனைத்து முக்கிய இந்து திருவிழாக்களையும் பாரம்பரிய சிறப்புடன் கொண்டாடுகிறோம்.

கோவில் வளாகத்தில் பிரதான சன்னிதி, சமூக நிகழ்வுகளுக்கான விசாலமான மண்டபம் மற்றும் அழகாக பராமரிக்கப்படும் மைதானம் ஆகியவை உள்ளன. எங்கள் அர்ச்சகர் அதிகாலையிலும் மாலையிலும் தினசரி பூஜைகளை நடத்துகிறார்.

நமது பணக்கார கலாச்சார பாரம்பரியத்தைப் பாதுகாப்பதில் நம்பிக்கை கொண்டுள்ளோம். இளைஞர் கல்வி, கலாச்சார பட்டறைகள், அன்னதானம் மற்றும் சமூக நல நடவடிக்கைகள் ஆகியவை எங்கள் சமூக திட்டங்களில் உள்ளன.`
}

export default function AboutPage() {
  const [language, setLanguage] = useState<Language>('en')

  // Use default settings directly for reliable display
  const settings = DEFAULT_SETTINGS

  const name = language === 'ta' && settings.templeNameTa ? settings.templeNameTa : settings.templeName
  const description = language === 'ta' && settings.descriptionTa ? settings.descriptionTa : settings.description
  const aboutContent = language === 'ta' && settings.aboutContentTa ? settings.aboutContentTa : settings.aboutContent

  return (
    <>
      <Header currentLanguage={language} onLanguageChange={setLanguage} />
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="container-custom max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="h-64 bg-gradient-to-r from-red-800 to-primary flex items-center justify-center relative">
              {settings.bannerImageUrl && (
                <img src={settings.bannerImageUrl} alt={name} className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
              )}
              <h1 className="text-5xl font-extrabold text-white relative z-10 text-center px-4 drop-shadow-lg">{name}</h1>
            </div>

            <div className="p-8 md:p-12">
              <div className="text-xl text-primary font-medium mb-8 text-center border-b pb-8">
                {description}
              </div>

              <div className="prose max-w-none mb-12 text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                {aboutContent}
              </div>

              {/* Temple Timings */}
              <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 mb-8">
                <h3 className="text-2xl font-bold text-orange-800 mb-4 mt-0 border-b border-orange-200 pb-2">
                  {language === 'ta' ? 'கோவில் நேரம்' : 'Temple Timings'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-orange-100">
                    <p className="font-bold text-orange-700 mb-1">{language === 'ta' ? 'காலை பூஜை' : 'Morning Pooja'}</p>
                    <p className="text-gray-600">6:00 AM - 8:00 AM</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-orange-100">
                    <p className="font-bold text-orange-700 mb-1">{language === 'ta' ? 'மாலை பூஜை' : 'Evening Pooja'}</p>
                    <p className="text-gray-600">6:00 PM - 8:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="text-2xl font-bold text-dark mb-4 mt-0 border-b pb-2">
                  {language === 'ta' ? 'தொடர்பு கொள்ள' : 'Contact Information'}
                </h3>
                <div className="space-y-4 text-gray-600">
                  {settings.email && (
                    <div className="flex items-center">
                      <span className="w-8">📧</span> 
                      <a href={`mailto:${settings.email}`} className="hover:text-primary transition">{settings.email}</a>
                    </div>
                  )}
                  {settings.phone && (
                    <div className="flex items-center">
                      <span className="w-8">📞</span> 
                      <a href={`tel:${settings.phone}`} className="hover:text-primary transition">{settings.phone}</a>
                    </div>
                  )}
                  {settings.address && (
                    <div className="flex items-start mt-4 bg-white p-4 rounded border">
                      <span className="w-8 pt-1">📍</span> 
                      <span className="flex-1 whitespace-pre-wrap">{settings.address}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer currentLanguage={language} />
    </>
  )
}
