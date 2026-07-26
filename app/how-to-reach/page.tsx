'use client'

import { useState } from 'react'
import { t, type Language } from '@/lib/translations'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Plane, Train, Bus, MapPin, Phone, Compass, ArrowRight } from 'lucide-react'

export default function HowToReach() {
  const [language, setLanguage] = useState<Language>('en')

  const reachItems = [
    {
      title: language === 'ta' ? 'விமானம் மூலம்' : 'By Air',
      icon: <Plane className="w-10 h-10" />,
      description: language === 'ta' 
        ? 'அருகிலுள்ள விமான நிலையம் சேலம் (50 கி.மீ) அல்லது கோயம்புத்தூர் (160 கி.மீ).'
        : 'The nearest airport is Salem (50 km) or Coimbatore (160 km). International travelers can use Chennai or Bangalore airports.'
    },
    {
      title: language === 'ta' ? 'ரயில் மூலம்' : 'By Rail',
      icon: <Train className="w-10 h-10" />,
      description: language === 'ta'
        ? 'மேட்டூர் அணை (Mettur Dam) அருகிலுள்ள முக்கிய ரயில் நிலையம் ஆகும்.'
        : 'Mettur Dam is the nearest railway station. Major trains stop at Salem Junction, from where you can take a bus or taxi.'
    },
    {
      title: language === 'ta' ? 'சாலை மூலம்' : 'By Road',
      icon: <Bus className="w-10 h-10" />,
      description: language === 'ta'
        ? 'சேலம் மற்றும் மேட்டூரிலிருந்து வழக்கமான பேருந்து வசதிகள் உள்ளன.'
        : 'Regular bus services are available from Salem, Mettur, and surrounding towns. The temple is well-connected by State Highways.'
    }
  ]

  return (
    <>
      <Header currentLanguage={language} onLanguageChange={setLanguage} />
      
      <main className="min-h-screen bg-stone-900 text-stone-100">
        {/* Page Header - Pure & Majestic */}
        <div className="bg-stone-900 py-32 text-center border-b border-brass/20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(176,138,79,0.2) 0%, transparent 60%)' }} />
          <div className="container-custom relative z-10">
            <span className="section-label-gold block mb-3">Temple Information</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold text-stone-100 mb-6 tracking-tight">
              {t('nav.reach', language)}
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-brass-400 to-transparent mx-auto rounded-full mt-6"></div>
          </div>
        </div>

        <section className="py-20 md:py-28">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              {reachItems.map((item, index) => (
                <div key={index} className="card-temple p-8 md:p-10 border border-brass/25 bg-stone-800 shadow-golden flex flex-col items-center text-center group relative overflow-hidden hover:border-brass-400 transition-all">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brass-400/40 to-transparent"></div>
                  <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-stone-900 border border-brass/25 text-brass-300 group-hover:border-brass-400 group-hover:scale-105 transition-all shadow-inner mb-8 shrink-0">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-serif font-semibold text-stone-100 mb-4 tracking-tight leading-tight">{item.title}</h3>
                  <p className="text-stone-300 leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="card-temple p-0 rounded-[28px] border border-brass/25 bg-stone-800 flex flex-col md:flex-row shadow-golden overflow-hidden">
              <div className="md:w-1/2 p-10 md:p-14 relative overflow-hidden bg-stone-800 flex flex-col justify-between">
                <div>
                  <span className="section-label-gold block mb-3">Temple Location</span>
                  <h2 className="text-3xl md:text-4xl font-serif font-semibold text-stone-100 mb-10 tracking-tight">{language === 'ta' ? 'கோவில் முகவரி' : 'Temple Address'}</h2>
                  <div className="space-y-8">
                    <div className="flex gap-6 items-center">
                      <div className="w-14 h-14 rounded-2xl bg-stone-900 border border-brass/25 flex items-center justify-center text-brass-400 flex-shrink-0 shadow-inner">
                        <MapPin className="w-7 h-7" />
                      </div>
                      <div>
                        <p className="font-serif font-semibold text-stone-100 text-xl">Sri Karuppusamy Thirukovil</p>
                        <p className="text-stone-300 font-medium text-sm md:text-base mt-0.5">Mathanaickenpatti, Mettur Taluk</p>
                        <p className="text-stone-300 font-medium text-sm md:text-base">Salem District, TN 636453</p>
                      </div>
                    </div>
                    <div className="flex gap-6 items-center">
                      <div className="w-14 h-14 rounded-2xl bg-stone-900 border border-brass/25 flex items-center justify-center text-brass-400 flex-shrink-0 shadow-inner">
                        <Phone className="w-6 h-6" />
                      </div>
                      <p className="text-brass-300 font-mono font-semibold text-lg md:text-xl tracking-tight">+91 427 1234567</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-brass/15">
                  <a 
                    href="https://maps.app.goo.gl/placeholder" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-premium inline-flex items-center justify-center gap-2.5 px-8 py-3 group text-xs"
                  >
                    Launch Guidance 
                    <Compass className="w-4 h-4 text-brass-400 group-hover:rotate-45 transition-transform shrink-0" />
                  </a>
                </div>
              </div>
              <div className="md:w-1/2 h-[450px] md:h-auto grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700 border-t md:border-t-0 md:border-l border-brass/20">
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
