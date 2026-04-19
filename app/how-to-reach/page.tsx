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
      
      <main className="min-h-screen bg-ivory">
        {/* Page Header - Pure & Majestic */}
        <div className="bg-ivory py-32 text-center border-b border-gold/10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/aztec.png')] -z-10"></div>
          <div className="container-custom relative">
            <span className="text-gold font-black uppercase tracking-[0.5em] text-[10px] mb-6 block">Temple Information</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-gold-dark mb-8 tracking-tight">
              {t('nav.reach', language)}
            </h1>
            <div className="h-1.5 w-32 bg-gold-metallic mx-auto rounded-full shadow-flame/10"></div>
          </div>
        </div>

        <section className="py-24">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
              {reachItems.map((item, index) => (
                <div key={index} className="bg-ivory-warm p-12 rounded-[56px] border border-gold/10 hover:border-saffron hover:shadow-golden-lg transition-all duration-700 flex flex-col items-center text-center group shadow-ivory relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
                  <div className="w-24 h-24 flex items-center justify-center rounded-[32px] bg-ivory border border-gold/10 text-saffron group-hover:bg-saffron group-hover:text-ivory transition-all duration-700 shadow-ivory group-hover:shadow-flame/20 group-hover:-translate-y-2 mb-10">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gold-dark mb-6 tracking-tight leading-tight">{item.title}</h3>
                  <p className="text-sacred-ash/60 font-lora italic leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="card-temple p-0 rounded-[64px] border-none flex flex-col md:flex-row shadow-golden-lg overflow-hidden">
              <div className="md:w-1/2 p-16 md:p-20 relative overflow-hidden bg-ivory-warm">
                <div className="absolute top-0 right-0 w-64 h-64 bg-saffron/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <span className="text-gold font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Temple Location</span>
                <h2 className="text-5xl font-serif font-bold text-gold-dark mb-12 tracking-tight">Sacred Grounds</h2>
                <div className="space-y-12">
                  <div className="flex gap-8 items-center">
                    <div className="w-16 h-16 rounded-[24px] bg-ivory border border-gold/20 flex items-center justify-center text-saffron flex-shrink-0 shadow-ivory">
                      <MapPin className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="font-serif font-bold text-gold-dark text-xl">Sri Karuppusamy Thirukovil</p>
                      <p className="text-sacred-ash/60 font-medium">Mathanaickenpatti, Mettur Taluk</p>
                      <p className="text-sacred-ash/60 font-medium">Salem District, TN 636453</p>
                    </div>
                  </div>
                  <div className="flex gap-8 items-center">
                    <div className="w-16 h-16 rounded-[24px] bg-ivory border border-gold/20 flex items-center justify-center text-saffron flex-shrink-0 shadow-ivory">
                      <Phone className="w-7 h-7" />
                    </div>
                    <p className="text-gold-dark font-sans font-black text-xl tracking-tighter">+91 427 1234567</p>
                  </div>
                </div>

                <div className="mt-16">
                  <a 
                    href="https://maps.app.goo.gl/placeholder" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-sacred flex items-center justify-center gap-3 px-12 group"
                  >
                    Launch Guidance 
                    <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                  </a>
                </div>
              </div>
              <div className="md:w-1/2 h-[500px] md:h-auto grayscale hover:grayscale-0 transition-all duration-1000">
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
