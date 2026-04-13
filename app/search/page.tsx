'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Language, t } from '@/lib/translations'

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
      <main className="min-h-screen bg-slate-50 py-12">
        <div className="container-custom max-w-4xl">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
              {language === 'ta' ? 'தேடல் முடிவுகள்' : 'Search Results'}
            </h1>
            <p className="text-lg text-slate-500">
              {rawQuery ? (
                <span>Showing results for <span className="font-bold text-orange-600">"{rawQuery}"</span></span>
              ) : (
                <span>Please enter a search term</span>
              )}
            </p>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <svg className="animate-spin h-10 w-10 text-orange-500 mb-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="font-bold text-slate-400">Querying temple archives...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {results.length > 0 ? (
                results.map((res, i) => (
                  <Link 
                    key={res.id + i} 
                    href={res.type === 'EVENT' ? \`/events/\${res.id}\` : res.type === 'NEWS' ? \`/announcements/\${res.id}\` : '/gallery'}
                    className="block bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-orange-200 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className={\`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0 \${
                        res.type === 'EVENT' ? 'bg-orange-100 text-orange-600' : 
                        res.type === 'NEWS' ? 'bg-blue-100 text-blue-600' : 
                        'bg-purple-100 text-purple-600'
                      }\`}>
                        {res.type === 'EVENT' ? '🗓️' : res.type === 'NEWS' ? '📢' : '📸'}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                          {res.title}
                        </h2>
                        <p className="text-sm font-bold text-slate-400 mb-2">{res.type} {res.date && \`• \${res.date}\`}</p>
                        <p className="text-slate-600">{res.desc}</p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                rawQuery && (
                  <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                    <span className="text-6xl block mb-4">📭</span>
                    <h3 className="text-xl font-bold text-slate-900">No matches found</h3>
                    <p className="text-slate-500 mt-2">We couldn't find any events or announcements matching your query.</p>
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
