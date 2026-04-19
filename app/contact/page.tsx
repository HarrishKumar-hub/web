'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Language, t } from '@/lib/translations'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ContactPage() {
  const [language, setLanguage] = useState<Language>('en')
  const [status, setStatus] = useState<{type: 'success' | 'error', msg: string} | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus(null)

    const formData = new FormData(e.currentTarget)
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Failed to send message')

      setStatus({ type: 'success', msg: language === 'ta' ? 'உங்கள் செய்தி வெற்றிகரமாக அனுப்பப்பட்டது.' : 'Your message has been delivered to the administrative team.' })
      e.currentTarget.reset()
    } catch (err: any) {
      setStatus({ type: 'error', msg: err.message })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header currentLanguage={language} onLanguageChange={setLanguage} />
      
      <main className="min-h-screen bg-ivory py-36 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-saffron/10 blur-[150px] opacity-60 rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gold/10 blur-[150px] opacity-60 rounded-full pointer-events-none" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <span className="section-label mb-6 inline-block">Temple Reach</span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gold-dark mb-4 tracking-tight">
                {language === 'ta' ? 'தொடர்பு கொள்க' : 'Contact Us'}
              </h1>
              <p className="text-lg text-sacred-ash/60 font-lora">
                {language === 'ta' ? 'வரவிருக்கும் பூஜை பற்றிய கேள்விகள் அல்லது ஸ்பான்சர்ஷிப் விவரங்களுக்கு எங்களுக்கு ஒரு குறிப்பை அனுப்பவும்.' : 'Send us a note regarding an upcoming pooja, sponsorship query, or general feedback.'}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card-temple shadow-golden-lg"
            >
              {status && (
                <div className={`p-5 rounded-xl mb-8 font-medium font-sans text-sm border-l-4 ${
                  status.type === 'success' ? 'bg-green-50 text-green-800 border-l-green-500' : 'bg-red-50 text-red-800 border-l-red-500'
                }`}>
                  <span className="font-bold block mb-1">Notice</span>
                  {status.msg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-bold text-gold-dark mb-2">
                      {language === 'ta' ? 'பெயர்' : 'Full Name'}
                    </label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      className="input-temple"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-bold text-gold-dark mb-2">
                      {language === 'ta' ? 'மின்னஞ்சல்' : 'Email Address'}
                    </label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      className="input-temple"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-gold-dark mb-2">
                    {language === 'ta' ? 'உங்கள் செய்தி' : 'Your Message'}
                  </label>
                  <textarea 
                    name="message" 
                    required 
                    rows={6}
                    className="input-temple resize-none"
                    placeholder={language === 'ta' ? 'நாங்கள் எப்படி உதவ முடியும்?' : 'How can we help you today?'}
                  ></textarea>
                </div>

                <div className="pt-4 border-t border-gold/10 flex flex-col sm:flex-row gap-4 items-center justify-between">
                  {/* Back Link */}
                  <Link href="/" className="inline-flex items-center gap-2 text-sacred-ash/50 hover:text-gold-dark font-medium uppercase text-xs tracking-widest transition-all w-full sm:w-auto order-2 sm:order-1 text-center justify-center pt-4 sm:pt-0">
                    <span className="text-lg leading-none mb-0.5">←</span> {t('common.back', language)}
                  </Link>

                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="btn-sacred w-full sm:w-auto px-10 order-1 sm:order-2 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (language === 'ta' ? 'செய்தியை அனுப்பு' : 'Send Message')}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer currentLanguage={language} />
    </>
  )
}
