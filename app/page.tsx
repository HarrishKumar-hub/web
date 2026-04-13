'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/useAuth'
import { useState } from 'react'
import { t, type Language } from '@/lib/translations'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function Home() {
  const { isAuthenticated } = useAuth()
  const [language, setLanguage] = useState<Language>('en')

  return (
    <>
      <Header currentLanguage={language} onLanguageChange={setLanguage} />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-600 to-red-800 text-white py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            {/* Background pattern or subtle deity image */}
          </div>
          <div className="container-custom text-center relative z-10 flex flex-col items-center">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-8 border-yellow-500/50 overflow-hidden mb-6 bg-orange-100 shadow-2xl relative group">
              <img 
                src="https://images.unsplash.com/photo-1544006659-f0b21f04cb1d?auto=format&fit=crop&q=80&w=800" 
                alt="Deity Sri Ayyanar Karuppasamy" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-600/40 to-transparent"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-md">
              {language === 'ta' ? 'ஸ்ரீ அய்யனார் கருப்பசாமி கோவில்' : 'Sri Ayyanar Karuppasamy Kovil'}
            </h1>
            <p className="text-xl mb-2 font-medium">Mathanaickenpatti, Tamil Nadu 636453</p>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              {language === 'ta'
                ? 'எங்கள் கோவிலுக்கு உங்களை அன்புடன் வரவேற்கிறோம். இது அனைத்து பக்தர்களுக்குமான ஒரு ஆன்மீக மையம்.'
                : 'A warm welcome to our temple. A spiritual center dedicated to peace and devotion for all devotees.'}
            </p>
            <div className="flex gap-4 justify-center">
              <a href="https://chat.whatsapp.com/your-group-invite" target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-600 shadow-md flex items-center gap-2">
                <span>💬</span> WhatsApp
              </a>
              <Link href="/events" className="bg-white text-orange-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 shadow-md">
                {t('nav.events', language)}
              </Link>
            </div>
          </div>
        </section>

        {/* Info Sections */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Events Card */}
              <Link href="/events">
                <div className="card cursor-pointer">
                  <div className="text-4xl mb-4">📅</div>
                  <h3 className="text-xl font-bold mb-2">
                    {t('nav.events', language)}
                  </h3>
                  <p>
                    {language === 'ta'
                      ? 'வரவிருக்கும் நிகழ்வுகள் மற்றும் விழா பார்ப்பி'
                      : 'Upcoming events and ceremonies'}
                  </p>
                </div>
              </Link>

              {/* News Card */}
              <Link href="/announcements">
                <div className="card cursor-pointer">
                  <div className="text-4xl mb-4">📢</div>
                  <h3 className="text-xl font-bold mb-2">
                    {t('announcement.title', language)}
                  </h3>
                  <p>
                    {language === 'ta'
                      ? 'சமீபத்திய செய்திகள் மற்றும் அறிவிப்புகள்'
                      : 'Latest news and announcements'}
                  </p>
                </div>
              </Link>

              {/* Membership Card */}
              <Link href={isAuthenticated ? '/members' : '/register'}>
                <div className="card cursor-pointer">
                  <div className="text-4xl mb-4">👥</div>
                  <h3 className="text-xl font-bold mb-2">
                    {t('member.directory', language)}
                  </h3>
                  <p>
                    {language === 'ta'
                      ? 'சமூக உறுப்பினர்களைம்apping பார்ப்பி'
                      : 'Connect with community members'}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {!isAuthenticated && (
          <section className="bg-secondary py-16">
            <div className="container-custom text-center">
              <h2 className="text-3xl font-bold mb-4 text-dark">
                {language === 'ta'
                  ? 'சமூகத்தை சேர்ந்து கொள்ளவும்'
                  : 'Join Our Community'}
              </h2>
              <p className="text-lg text-dark mb-8">
                {language === 'ta'
                  ? 'பணபணிர்களக் நீங்கள் தன் தொடை மாறிப்புவ'
                  : 'Become a member and get exclusive access to events, member directory, and more'}
              </p>
              <Link href="/register" className="btn-primary">
                {t('auth.signUp', language)}
              </Link>
            </div>
          </section>
        )}

        {/* Location Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8 text-center text-dark border-b pb-4">
              {language === 'ta' ? 'இருப்பிடம் வரைபடம்' : 'Location & Map'}
            </h2>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <h3 className="text-2xl font-bold text-orange-700 mb-4">Sri Ayyanar Karuppasamy Kovil</h3>
                <p className="text-gray-700 text-lg mb-4 whitespace-pre-wrap">
                  {language === 'ta' 
                    ? 'மதநாயக்கன்பட்டி,\nதமிழ்நாடு 636453\nஇந்தியா' 
                    : 'Mathanaickenpatti,\nTamil Nadu 636453\nIndia'}
                </p>
                <a href="https://maps.app.goo.gl/placeholder" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                  {language === 'ta' ? 'Google Maps-ல் பார்க்கவும்' : 'View on Google Maps'}
                </a>
              </div>
              <div className="md:w-2/3 h-80 rounded-xl overflow-hidden shadow-lg border-2 border-gray-200">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15632.748123!2d78.1!3d11.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDMwJzAwLjAiTiA3OMKwMDYnMDAuMCJF!5e0!3m2!1sen!2sin!4v1" 
                  width="100%" 
                  height="100%" 
                  style={{border:0}} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer currentLanguage={language} />
    </>
  )
}
