'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Language, t } from '@/lib/translations'
import DonationForm from '@/components/donations/DonationForm'
import { Utensils, Construction, Sparkles } from 'lucide-react'

export default function DonationsPage() {
  const [language, setLanguage] = useState<Language>('en')

  return (
    <>
      <Header currentLanguage={language} onLanguageChange={setLanguage} />
      <main className="min-h-screen relative overflow-hidden bg-ivory">
        
        {/* Background Decorative Pattern */}
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-saffron/5 to-ivory -z-10">
          <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/aztec.png')]"></div>
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-ivory to-transparent"></div>
        </div>

        <div className="container-custom pt-24 pb-16 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Context Section */}
            <div className="space-y-10">
              <div className="inline-flex px-4 py-1.5 rounded-full bg-saffron/10 border border-saffron/20 text-saffron-dark font-black uppercase tracking-[0.2em] text-[10px]">
                {language === 'ta' ? 'அறக்கட்டளை' : 'Trust Initiatives'}
              </div>
              <h1 className="text-5xl lg:text-7xl font-serif font-bold text-gold-dark leading-[1.1] tracking-tight">
                {language === 'ta' ? 'எங்கள் சமூகத்திற்கு ஆதரவு கொடுங்கள்' : 'Support Our Temple Community'}
              </h1>
              <p className="text-xl text-sacred-ash/70 leading-relaxed font-lora italic">
                {language === 'ta' 
                  ? 'உங்கள் தாராளமான நன்கொடைகள் கோவிலின் தினசரி பூஜைகள், சமூக அன்னதானம் மற்றும் ஆண்டு விழாக்களுக்கு நேரடியாக உதவுகின்றன.' 
                  : 'Your generous contributions directly support our daily poojas, community annadhanam (food distribution), and the continuous maintenance of the temple.'}
              </p>

              {/* Trust badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
                <div className="flex gap-4 items-center p-4 bg-ivory-warm rounded-2xl border border-gold/10 shadow-ivory">
                  <div className="w-14 h-14 rounded-2xl bg-saffron/10 text-saffron flex items-center justify-center flex-shrink-0 shadow-inner">
                    <Utensils className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-gold-dark">{language === 'ta' ? 'அன்னதானம்' : 'Annadhanam'}</h3>
                    <p className="text-xs uppercase tracking-widest text-sacred-ash/50 font-bold mt-1">{language === 'ta' ? 'தினசரி உணவு' : 'Sacred Food'}</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center p-4 bg-ivory-warm rounded-2xl border border-gold/10 shadow-ivory">
                  <div className="w-14 h-14 rounded-2xl bg-gold/10 text-gold-dark flex items-center justify-center flex-shrink-0 shadow-inner">
                    <Construction className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-gold-dark">{language === 'ta' ? 'பராமரிப்பு' : 'Infrastructure'}</h3>
                    <p className="text-xs uppercase tracking-widest text-sacred-ash/50 font-bold mt-1">{language === 'ta' ? 'கோவில் வளர்ச்சி' : 'Temple Upkeep'}</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center p-4 bg-ivory-warm rounded-2xl border border-gold/10 shadow-ivory">
                  <div className="w-14 h-14 rounded-2xl bg-maroon/5 text-maroon flex items-center justify-center flex-shrink-0 shadow-inner">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-gold-dark">{language === 'ta' ? 'பூஜைகள்' : 'Divine Rituals'}</h3>
                    <p className="text-xs uppercase tracking-widest text-sacred-ash/50 font-bold mt-1">{language === 'ta' ? 'தினசரி சடங்குகள்' : 'Ceremonies'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="relative">
              {/* Decorative blobs behind form */}
              <div className="absolute top-10 -right-10 w-64 h-64 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
              
              <DonationForm language={language} />
            </div>

          </div>
        </div>
      </main>
      <Footer currentLanguage={language} />
    </>
  )
}
