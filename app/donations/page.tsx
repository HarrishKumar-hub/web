'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Language, t } from '@/lib/translations'
import DonationForm from '@/components/donations/DonationForm'

export default function DonationsPage() {
  const [language, setLanguage] = useState<Language>('en')

  return (
    <>
      <Header currentLanguage={language} onLanguageChange={setLanguage} />
      <main className="min-h-screen relative overflow-hidden bg-slate-50">
        
        {/* Background Decorative Pattern */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-orange-100 to-slate-50 -z-10">
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/aztec.png')]"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 to-transparent"></div>
        </div>

        <div className="container-custom pt-24 pb-16 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Context Section */}
            <div className="space-y-8">
              <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 font-bold text-sm tracking-wide">
                {language === 'ta' ? 'அறக்கட்டளை' : 'Trust Initiatives'}
              </div>
              <h1 className="text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
                {language === 'ta' ? 'எங்கள் சமூகத்திற்கு ஆதரவு கொடுங்கள்' : 'Support Our Temple Community'}
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                {language === 'ta' 
                  ? 'உங்கள் தாராளமான நன்கொடைகள் கோவிலின் தினசரி பூஜைகள், சமூக அன்னதானம் மற்றும் ஆண்டு விழாக்களுக்கு நேரடியாக உதவுகின்றன.' 
                  : 'Your generous contributions directly support our daily poojas, community annadhanam (food distribution), and the continuous maintenance of the temple.'}
              </p>

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center text-2xl flex-shrink-0">
                    🍲
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{language === 'ta' ? 'அன்னதானம்' : 'Annadhanam'}</h3>
                    <p className="text-sm text-slate-500">{language === 'ta' ? 'தினசரி இலவச உணவு' : 'Free meals for devotees'}</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center text-2xl flex-shrink-0">
                    🛠️
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{language === 'ta' ? 'பராமரிப்பு' : 'Maintenance'}</h3>
                    <p className="text-sm text-slate-500">{language === 'ta' ? 'கோவில் வளர்ச்சி' : 'Temple upkeep'}</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl flex-shrink-0">
                    🌸
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{language === 'ta' ? 'பூஜைகள்' : 'Daily Poojas'}</h3>
                    <p className="text-sm text-slate-500">{language === 'ta' ? 'தினசரி சடங்குகள்' : 'Rituals and ceremonies'}</p>
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
