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
      
      <main className="min-h-screen bg-stone-900 py-32 text-stone-100 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(176,138,79,0.25) 0%, transparent 60%)' }} />
        
        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <span className="section-label-gold mb-4 inline-block">Temple Reach</span>
              <h1 className="text-4xl md:text-5xl font-serif font-semibold text-stone-100 mb-4 tracking-tight">
                {language === 'ta' ? 'தொடர்பு கொள்க' : 'Contact Us'}
              </h1>
              <p className="text-base md:text-lg text-stone-300">
                {language === 'ta' ? 'வரவிருக்கும் பூஜை பற்றிய கேள்விகள் அல்லது ஸ்பான்சர்ஷிப் விவரங்களுக்கு எங்களுக்கு ஒரு குறிப்பை அனுப்பவும்.' : 'Send us a note regarding an upcoming pooja, sponsorship query, or general feedback.'}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card-temple shadow-golden bg-stone-800 border border-brass/25 p-8 md:p-12 rounded-[28px]"
            >
              {status && (
                <div className={`p-4 rounded-xl mb-8 font-medium font-sans text-sm border-l-4 ${
                  status.type === 'success' ? 'bg-green-950/40 text-green-300 border-l-green-500 border border-green-500/20' : 'bg-red-950/40 text-red-300 border-l-red-500 border border-red-500/20'
                }`}>
                  <span className="font-semibold block mb-1 uppercase tracking-[0.15em] text-xs">Notice</span>
                  {status.msg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-stone-300 mb-2">
                      {language === 'ta' ? 'பெயர்' : 'Full Name'}
                    </label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      className="w-full bg-stone-900 border border-brass/30 rounded-xl p-4 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-brass-400 text-sm transition-colors"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-stone-300 mb-2">
                      {language === 'ta' ? 'மின்னஞ்சல்' : 'Email Address'}
                    </label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      className="w-full bg-stone-900 border border-brass/30 rounded-xl p-4 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-brass-400 text-sm transition-colors"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-stone-300 mb-2">
                    {language === 'ta' ? 'உங்கள் செய்தி' : 'Your Message'}
                  </label>
                  <textarea 
                    name="message" 
                    required 
                    rows={6}
                    className="w-full bg-stone-900 border border-brass/30 rounded-xl p-4 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-brass-400 text-sm transition-colors resize-none"
                    placeholder={language === 'ta' ? 'நாங்கள் எப்படி உதவ முடியும்?' : 'How can we help you today?'}
                  ></textarea>
                </div>

                <div className="pt-6 border-t border-brass/20 flex flex-col sm:flex-row gap-4 items-center justify-between">
                  {/* Back Link */}
                  <Link href="/" className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-200 font-semibold uppercase text-xs tracking-[0.15em] transition-all w-full sm:w-auto order-2 sm:order-1 text-center justify-center pt-4 sm:pt-0">
                    <span className="text-lg leading-none mb-0.5">←</span> {t('common.back', language)}
                  </Link>

                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="btn-premium w-full sm:w-auto px-10 py-3.5 text-xs order-1 sm:order-2 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-stone-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
