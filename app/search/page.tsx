'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Language, t } from '@/lib/translations'
import { Calendar, Megaphone, Image, SearchX, Search, Sparkles } from 'lucide-react'

// Use subsets of MOCK variables to simulate global filtering
const GLOBAL_SEARCH_DATA = {
  events: [
    { id: '1', type: 'EVENT', title: 'Aadi Amavasai Ceremony', desc: 'Join us for the sacred Aadi Amavasai ceremony.', date: '2026-08-11' },
    { id: '2', type: 'EVENT', title: 'Annual Festival (Chitra Vizha)', desc: 'The grand annual Chitra Vizha festival is the highlight.', date: '2026-04-25' },
    { id: '3', type: 'EVENT', title: 'Maha Shivaratri Special Pooja', desc: 'Celebrate the auspicious night of Maha Shivaratri', date: '2027-02-15' },
  ],
  announcements: [
    { id: '1', type: 'NEWS', title: 'Temple Renovation Update', desc: 'Phase 1 of the temple renovation is complete.' },
    { id: '2', type: 'NEWS', title: 'Volunteer Registration Open', desc: 'We are looking for volunteers for the upcoming Kumbhabhishekam.' },
  ],
  gallery: [
    { id: '1', type: 'MEDIA', title: 'Aadi Perukku Celebration', desc: 'Bhakthas gathering for the sacred Aadi Perukku.' },
    { id: '2', type: 'MEDIA', title: 'Morning Santhanam Pooja', desc: 'Special morning pooja rituals images.' }
  ]
}

export default function SearchPage() {
  const [language, setLanguage] = useState<Language>('en')
  const searchParams = useSearchParams()
  const rawQuery = searchParams.get('q') || ''
  
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API delay for global search indexing
    setIsLoading(true)
    const timer = setTimeout(() => {
      const q = rawQuery.toLowerCase()
      if (!q) {
        setResults([])
      } else {
        const matchingEvents = GLOBAL_SEARCH_DATA.events.filter(e => e.title.toLowerCase().includes(q) || e.desc.toLowerCase().includes(q))
        const matchingNews = GLOBAL_SEARCH_DATA.announcements.filter(a => a.title.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q))
        const matchingMedia = GLOBAL_SEARCH_DATA.gallery.filter(g => g.title.toLowerCase().includes(q) || g.desc.toLowerCase().includes(q))
        
        setResults([...matchingEvents, ...matchingNews, ...matchingMedia])
      }
      setIsLoading(false)
    }, 600)

    return () => clearTimeout(timer)
  }, [rawQuery])

  return (
    <>
      <Header currentLanguage={language} onLanguageChange={setLanguage} />
      <main className="min-h-screen bg-ivory py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/aztec.png')] -z-10"></div>
        <div className="container-custom max-w-4xl">
          <div className="mb-20 text-center">
            <span className="text-gold font-black uppercase tracking-[0.5em] text-[10px] mb-6 block">Temple Archives</span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-gold-dark mb-6 tracking-tight">
              {language === 'ta' ? 'தேடல் முடிவுகள்' : 'Search Results'}
            </h1>
            <p className="text-xl text-sacred-ash/60 font-lora italic leading-relaxed">
              {rawQuery ? (
                <span>Unveiling matches for <span className="font-bold text-saffron">"{rawQuery}"</span></span>
              ) : (
                <span>Divine query missing. Please enter a search term</span>
              )}
            </p>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 bg-ivory-warm rounded-[48px] border border-gold/10 shadow-ivory">
              <div className="relative">
                <Search className="w-16 h-16 text-saffron/20 animate-pulse" />
                <Sparkles className="w-6 h-6 text-saffron absolute -top-2 -right-2 animate-bounce" />
              </div>
              <p className="font-serif font-bold text-gold-dark/40 mt-8 text-xl tracking-widest uppercase">Querying temple archives...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {results.length > 0 ? (
                results.map((res, i) => (
                  <Link 
                    key={res.id + i} 
                    href={res.type === 'EVENT' ? `/events/${res.id}` : res.type === 'NEWS' ? `/announcements/${res.id}` : '/gallery'}
                    className="block bg-ivory-warm p-10 rounded-[40px] shadow-ivory border border-gold/10 hover:border-saffron hover:shadow-golden transition-all duration-700 group relative overflow-hidden"
                  >
                    <div className="flex items-center gap-8 relative z-10">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-ivory shadow-lg flex-shrink-0 transition-transform duration-700 group-hover:scale-110 ${
                        res.type === 'EVENT' ? 'bg-maroon shadow-maroon/20' : 
                        res.type === 'NEWS' ? 'bg-gold-dark shadow-gold/20' : 
                        'bg-saffron shadow-saffron/20'
                      }`}>
                        {res.type === 'EVENT' ? <Calendar className="w-8 h-8" /> : res.type === 'NEWS' ? <Megaphone className="w-8 h-8" /> : <Image className="w-8 h-8" />}
                      </div>
                      <div>
                        <h2 className="text-2xl font-serif font-bold text-gold-dark group-hover:text-maroon transition-colors mb-2 tracking-tight">
                          {res.title}
                        </h2>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-[10px] font-black uppercase tracking-widest bg-gold/10 text-gold-dark px-3 py-1 rounded-full">{res.type}</span>
                          {res.date && <span className="text-sacred-ash/40 text-[10px] font-black uppercase tracking-widest">• {res.date}</span>}
                        </div>
                        <p className="text-sacred-ash/70 font-lora italic leading-relaxed">{res.desc}</p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                rawQuery && (
                  <div className="text-center py-32 bg-ivory-warm rounded-[56px] border-2 border-dashed border-gold/15 shadow-inner">
                    <div className="w-20 h-20 bg-ivory rounded-full mx-auto flex items-center justify-center mb-10 border border-gold/10 shadow-ivory">
                      <SearchX className="w-10 h-10 text-gold-dark/20" strokeWidth={1} />
                    </div>
                    <h3 className="text-3xl font-serif font-bold text-gold-dark mb-4">Silence in the archives</h3>
                    <p className="text-sacred-ash/50 font-lora italic text-lg">The sacred vibrations of "{rawQuery}" could not be located at this moment.</p>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </main>
      <Footer currentLanguage={language} />
    </>
  )
}
