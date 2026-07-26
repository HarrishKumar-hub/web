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
      <main className="min-h-screen bg-stone-900 py-32 text-stone-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(176,138,79,0.25) 0%, transparent 60%)' }} />
        <div className="container-custom max-w-4xl relative z-10">
          <div className="mb-16 text-center">
            <span className="section-label-gold mb-4 inline-block">Temple Archives</span>
            <h1 className="text-4xl md:text-6xl font-serif font-semibold text-stone-100 mb-6 tracking-tight">
              {language === 'ta' ? 'தேடல் முடிவுகள்' : 'Search Results'}
            </h1>
            <p className="text-base md:text-lg text-stone-300 leading-relaxed">
              {rawQuery ? (
                <span>Unveiling matches for <span className="font-semibold text-brass-300">"{rawQuery}"</span></span>
              ) : (
                <span>Divine query missing. Please enter a search term</span>
              )}
            </p>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-stone-800/50 rounded-2xl border border-brass/25">
              <div className="relative">
                <Search className="w-12 h-12 text-brass-400/40 animate-pulse" />
                <Sparkles className="w-5 h-5 text-brass-400 absolute -top-1 -right-1 animate-bounce" />
              </div>
              <p className="font-serif font-semibold text-stone-400 mt-6 text-base tracking-widest uppercase">Querying temple archives...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {results.length > 0 ? (
                results.map((res, i) => (
                  <Link 
                    key={res.id + i} 
                    href={res.type === 'EVENT' ? `/events/${res.id}` : res.type === 'NEWS' ? `/announcements/${res.id}` : '/gallery'}
                    className="block bg-stone-800 p-8 rounded-2xl border border-brass/25 hover:border-brass-400/50 hover:shadow-golden transition-all duration-500 group relative overflow-hidden"
                  >
                    <div className="flex items-center gap-6 relative z-10">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-stone-900 border border-brass/30 text-brass-400 shadow-inner shrink-0 transition-transform duration-500 group-hover:scale-105">
                        {res.type === 'EVENT' ? <Calendar className="w-6 h-6" /> : res.type === 'NEWS' ? <Megaphone className="w-6 h-6" /> : <Image className="w-6 h-6" />}
                      </div>
                      <div>
                        <h2 className="text-2xl font-serif font-semibold text-stone-100 group-hover:text-brass-300 transition-colors mb-2 tracking-tight">
                          {res.title}
                        </h2>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.15em] bg-stone-900 border border-brass/30 text-brass-300 px-3 py-1 rounded-full">{res.type}</span>
                          {res.date && <span className="text-stone-400 text-xs font-mono uppercase tracking-wider">• {res.date}</span>}
                        </div>
                        <p className="text-stone-300 text-sm md:text-base leading-relaxed">{res.desc}</p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                rawQuery && (
                  <div className="text-center py-20 bg-stone-800/50 rounded-2xl border border-dashed border-brass/25">
                    <div className="w-16 h-16 bg-stone-900 rounded-full mx-auto flex items-center justify-center mb-6 border border-brass/25 shadow-inner">
                      <SearchX className="w-8 h-8 text-stone-500" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-serif font-semibold text-stone-100 mb-3">Silence in the archives</h3>
                    <p className="text-stone-400 text-sm md:text-base">The sacred vibrations of "{rawQuery}" could not be located at this moment.</p>
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
