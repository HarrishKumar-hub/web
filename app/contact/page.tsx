'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Language, t } from '@/lib/translations'

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
      <main className="min-h-screen relative bg-slate-50">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621213204918-05b18aa124b8?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center bg-fixed opacity-5 grayscale pointer-events-none"></div>
        <div className="container-custom py-24 relative">
          
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                {language === 'ta' ? 'தொடர்பு கொள்க' : 'Contact Temple Reach'}
              </h1>
              <p className="text-lg text-slate-600">
                {language === 'ta' ? 'வரவிருக்கும் பூஜை பற்றிய கேள்விகள் அல்லது ஸ்பான்சர்ஷிப் விவரங்களுக்கு எங்களுக்கு ஒரு குறிப்பை அனுப்பவும்.' : 'Send us a note regarding an upcoming pooja, sponsorship query, or general feedback.'}
              </p>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-slate-100 relative overflow-hidden">
              {/* Decorative circle */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-100 rounded-full mix-blend-multiply opacity-50 blur-xl"></div>
              
              {status && (
                <div className={\`p-4 rounded-xl mb-8 font-bold \${
                  status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                }\`}>
                  {status.msg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{language === 'ta' ? 'பெயர்' : 'Full Name'}</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{language === 'ta' ? 'மின்னஞ்சல்' : 'Email Address'}</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{language === 'ta' ? 'உங்கள் செய்தி' : 'Your Message'}</label>
                  <textarea 
                    name="message" 
                    required 
                    rows={6}
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all resize-none"
                    placeholder={language === 'ta' ? 'நாங்கள் எப்படி உதவ முடியும்?' : 'How can we help you today?'}
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full md:w-auto px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 tracking-wide"
                  >
                    {isLoading ? 'Delivering...' : (language === 'ta' ? 'செய்தியை அனுப்பு' : 'Send Message')}
                  </button>
                </div>
              </form>
            </div>
            
          </div>
        </div>
      </main>
      <Footer currentLanguage={language} />
    </>
  )
}
