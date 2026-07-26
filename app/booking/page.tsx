'use client'

import { useState } from 'react'
import Link from 'next/link'
import { t, type Language } from '@/lib/translations'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useAuth } from '@/lib/useAuth'
import { Flame, Droplets, Wind, Utensils, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react'

export default function BookingPage() {
  const [language, setLanguage] = useState<Language>('en')
  const { isAuthenticated } = useAuth()
  
  const services = [
    {
      id: 'pooja-1',
      name: language === 'ta' ? 'அர்ச்சனை' : 'Archana',
      price: 50,
      description: language === 'ta' ? 'சுவாமிக்கு அர்ச்சனை செய்தல்' : 'Individual Archana to the deity.',
      icon: <Flame className="w-12 h-12" />
    },
    {
      id: 'pooja-2',
      name: language === 'ta' ? 'அபிஷேகம்' : 'Abishekam',
      price: 500,
      description: language === 'ta' ? 'பால் மற்றும் திருமஞ்சன அபிஷேகம்' : 'Sacred bath with milk and other substances.',
      icon: <Droplets className="w-12 h-12" />
    },
    {
      id: 'pooja-3',
      name: language === 'ta' ? 'சங்காபிஷேகம்' : 'Sankabishekam',
      price: 1500,
      description: language === 'ta' ? 'சங்கு மூலம் அபிஷேகம்' : 'Abishekam with 108 conches.',
      icon: <Wind className="w-12 h-12" />
    },
    {
      id: 'pooja-4',
      name: language === 'ta' ? 'அன்னதானம்' : 'Annadhanam',
      price: 2000,
      description: language === 'ta' ? 'பக்தர்களுக்கு உணவு வழங்குதல்' : 'Feeding devotees on your behalf.',
      icon: <Utensils className="w-12 h-12" />
    }
  ]

  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleBook = (id: string) => {
    if (!isAuthenticated) {
      alert(language === 'ta' ? 'முன்பதிவு செய்ய தயவுசெய்து உள்நுழையவும்' : 'Please login to book a service.')
      return
    }
    setSelectedService(id)
    setBookingStatus('loading')
    setTimeout(() => {
      setBookingStatus('success')
    }, 1500)
  }

  return (
    <>
      <Header currentLanguage={language} onLanguageChange={setLanguage} />
      
      <main className="min-h-screen bg-ivory">
        {/* Banner - Pure Elegance */}
        <div className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-ivory">
          <div className="absolute inset-0 bg-saffron/5"></div>
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/aztec.png')]"></div>
          <div className="container-custom relative z-10 text-center">
            <span className="text-gold font-black uppercase tracking-[0.5em] text-[10px] mb-6 block">Temple Services</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-gold-dark mb-8 tracking-tighter">
              {t('nav.booking', language)}
            </h1>
            <p className="text-lg md:text-xl text-sacred-ash/60 max-w-2xl mx-auto font-lora italic leading-relaxed">
              {language === 'ta' ? 'உங்கள் சேவைகளை ஆன்லைனில் எளிதாக பதிவு செய்யுங்கள்' : 'Reserve your sacred pooja and offerings through our digital sanctuary.'}
            </p>
          </div>
        </div>

        <section className="py-24">
          <div className="container-custom">
            {!isAuthenticated && (
              <div className="max-w-4xl mx-auto mb-24 p-10 rounded-[48px] border border-gold/15 bg-ivory-warm flex flex-col md:flex-row items-center justify-between gap-8 shadow-ivory">
                <div className="flex items-center gap-8">
                  <div className="w-16 h-16 rounded-full bg-saffron/10 flex items-center justify-center text-saffron shadow-inner">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-2xl text-gold-dark">{language === 'ta' ? 'முன்பதிவு செய்ய உள்நுழைக' : 'Member Access Required'}</h3>
                    <p className="text-sacred-ash/50 text-sm font-medium mt-1">Access exclusive pooja reservations by signing into your account.</p>
                  </div>
                </div>
                <Link href="/login" className="btn-sacred flex items-center gap-2 group">
                  {t('nav.login', language)}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}

            {bookingStatus === 'success' ? (
              <div className="max-w-xl mx-auto bg-ivory-warm border border-gold/20 p-20 rounded-[64px] text-center shadow-golden-lg">
                <div className="bg-ivory w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-10 border border-gold/20 shadow-ivory">
                  <CheckCircle2 className="w-12 h-12 text-saffron" />
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-gold-dark mb-8 tracking-tight">
                  {language === 'ta' ? 'முன்பதிவு வெற்றி!' : 'Sacred Confirmation'}
                </h2>
                <p className="text-sacred-ash/60 mb-12 text-lg font-lora italic leading-relaxed">
                  {language === 'ta' 
                    ? 'உங்கள் முன்பதிவு உறுதி செய்யப்பட்டது. விவரங்கள் மின்னஞ்சலுக்கு அனுப்பப்படும்.'
                    : 'Your divine offering has been recorded. Confirmation details have been dispatched to your soul (and email).'}
                </p>
                <button 
                  onClick={() => {setBookingStatus('idle'); setSelectedService(null);}} 
                  className="btn-sacred w-full"
                >
                  {language === 'ta' ? 'மீண்டும் முன்பதிவு செய்' : 'Book Another Service'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service) => (
                  <div key={service.id} className="group bg-ivory-warm rounded-[48px] border border-gold/10 p-10 flex flex-col h-full transition-all duration-700 hover:border-saffron hover:shadow-golden-lg shadow-ivory">
                    <div className="h-56 rounded-[36px] bg-ivory flex items-center justify-center text-saffron group-hover:scale-105 transition-transform duration-700 border border-gold/5 shadow-inner">
                      {service.icon}
                    </div>
                    <div className="mt-8 flex flex-col flex-grow">
                      <div className="flex flex-col gap-2 mb-6">
                        <h3 className="text-2xl font-serif font-bold text-gold-dark tracking-tight">{service.name}</h3>
                        <span className="text-gold-dark font-black text-xl tracking-tighter bg-saffron/10 px-3 py-1 rounded-full max-w-fit">
                          ₹{service.price}
                        </span>
                      </div>
                      <p className="text-sacred-ash/60 text-sm mb-10 leading-relaxed flex-grow font-lora italic">{service.description}</p>
                      <button 
                        onClick={() => handleBook(service.id)}
                        disabled={bookingStatus === 'loading'}
                        className={`w-full py-5 rounded-[24px] font-sans font-black uppercase tracking-[0.2em] text-[10px] transition-all transform active:scale-95 shadow-ivory ${
                          bookingStatus === 'loading' && selectedService === service.id
                            ? 'bg-saffron/10 text-sacred-ash/40 cursor-not-allowed'
                            : 'bg-maroon text-ivory hover:bg-gold-dark hover:shadow-golden-sm'
                        }`}
                      >
                        {bookingStatus === 'loading' && selectedService === service.id
                          ? (language === 'ta' ? 'செயலாக்கம்...' : 'Aligning Stars...')
                          : (language === 'ta' ? 'முன்பதிவு செய்' : 'Reserve Service')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer currentLanguage={language} />
    </>
  )
}
