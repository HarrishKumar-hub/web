'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Language, t } from '@/lib/translations'
import Link from 'next/link'

export default function AnalyticsDashboardPage() {
  const [language, setLanguage] = useState<Language>('en')
  
  // Mock analytics data
  const visitorData = [
    { month: 'Jan', count: 1200 },
    { month: 'Feb', count: 950 },
    { month: 'Mar', count: 2400 }, // Festival month
    { month: 'Apr', count: 1600 }
  ]

  const totalVisits = visitorData.reduce((acc, curr) => acc + curr.count, 0)
  
  return (
    <>
      <Header currentLanguage={language} onLanguageChange={setLanguage} />
      <main className="min-h-screen bg-stone-900 text-stone-100 py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(176,138,79,0.25) 0%, transparent 60%)' }} />
        <div className="container-custom relative z-10">
          {/* Breadcrumb */}
          <div className="mb-8 text-xs font-mono uppercase tracking-widest text-stone-400 flex items-center gap-2">
            <Link href="/admin" className="hover:text-brass-300 transition-colors">Admin Dashboard</Link>
            <span className="text-brass-400/40">/</span>
            <span className="text-stone-200 font-semibold">Analytics & Reports</span>
          </div>

          <div className="mb-12 pb-8 border-b border-brass/20">
            <span className="section-label-gold mb-2 inline-block">Devotional Engagement</span>
            <h1 className="text-3xl md:text-5xl font-serif font-semibold text-stone-100 tracking-tight">Analytics Dashboard</h1>
            <p className="text-stone-400 text-sm md:text-base mt-2">Sanctuary visit tracking, RSVPs, and community engagement metrics.</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-stone-800 p-6 rounded-2xl shadow-golden border border-brass/25 border-l-4 border-l-brass-400 relative overflow-hidden">
              <p className="text-xs font-mono font-semibold text-stone-400 uppercase tracking-wider">Sanctuary Visits (YTD)</p>
              <h2 className="text-4xl font-serif font-semibold text-stone-100 mt-2">{totalVisits.toLocaleString()}</h2>
              <p className="text-xs font-mono text-brass-300 font-semibold mt-2">↑ +24% from last year</p>
            </div>
            <div className="bg-stone-800 p-6 rounded-2xl shadow-golden border border-brass/25 border-l-4 border-l-stone-300 relative overflow-hidden">
              <p className="text-xs font-mono font-semibold text-stone-400 uppercase tracking-wider">Active RSVPs</p>
              <h2 className="text-4xl font-serif font-semibold text-stone-100 mt-2">310</h2>
              <p className="text-xs font-mono text-stone-300 font-semibold mt-2">Upcoming: Chitra Vizha</p>
            </div>
            <div className="bg-stone-800 p-6 rounded-2xl shadow-golden border border-brass/25 border-l-4 border-l-brass-300 relative overflow-hidden">
              <p className="text-xs font-mono font-semibold text-stone-400 uppercase tracking-wider">New Members (30d)</p>
              <h2 className="text-4xl font-serif font-semibold text-stone-100 mt-2">12</h2>
              <p className="text-xs font-mono text-brass-400 font-semibold mt-2">Steady growth</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            <div className="bg-stone-800 p-8 rounded-3xl shadow-golden border border-brass/25">
              <h3 className="font-serif font-semibold text-xl text-stone-100 mb-8 border-b border-brass/10 pb-4">Visitor Trends (2026)</h3>
              <div className="h-64 flex items-end gap-6 pt-6">
                {visitorData.map((data) => {
                  const height = (data.count / 3000) * 100
                  return (
                    <div key={data.month} className="flex-1 flex flex-col justify-end items-center gap-3 relative group">
                      <div className="absolute -top-10 bg-stone-950 text-brass-300 border border-brass/30 text-xs font-mono font-semibold px-2.5 py-1 rounded shadow-golden opacity-0 group-hover:opacity-100 transition-opacity">
                        {data.count} Visits
                      </div>
                      <div 
                        className="w-full bg-gradient-to-t from-brass/40 via-brass-400/80 to-brass-300 rounded-t-lg hover:opacity-90 transition-opacity cursor-pointer shadow-inner"
                        style={{ height: `${height}%` }}
                      ></div>
                      <p className="text-xs font-mono font-semibold text-stone-400 uppercase tracking-wider">{data.month}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="bg-stone-800 p-8 rounded-3xl shadow-golden border border-brass/25 flex flex-col">
              <h3 className="font-serif font-semibold text-xl text-stone-100 mb-6 border-b border-brass/10 pb-4">Recent Event RSVPs</h3>
              <div className="overflow-y-auto h-64 pr-2 space-y-3">
                {['Chitra Vizha', 'Amavasai Pooja', 'Pournami Pooja', 'Weekly Darshan', 'Special Abhishekham'].map((event, i) => (
                  <div key={event} className="flex justify-between items-center p-4 bg-stone-900/50 hover:bg-stone-900 rounded-xl border border-brass/10 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-stone-950 border border-brass/40 text-brass-400 flex items-center justify-center font-mono font-semibold shadow-inner">
                        ❖
                      </div>
                      <div>
                        <p className="font-serif font-semibold text-sm text-stone-100">Devotee Family #{i + 1}</p>
                        <p className="text-xs font-mono text-stone-400">{event} • Verified</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-semibold text-sm text-brass-300">{(i + 1) * 2} Guests</p>
                      <p className="text-xs font-mono text-stone-500 uppercase">Today</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-stone-800 border border-brass/30 p-8 rounded-3xl shadow-golden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <h3 className="font-serif font-semibold text-xl text-stone-100 mb-1">Export Sanctuary Reports</h3>
              <p className="text-sm text-stone-400">Download full CSV attendance and event RSVP logs for sanctuary records.</p>
            </div>
            <button className="btn-premium px-8 py-3.5 text-xs font-mono font-semibold uppercase tracking-wider shrink-0">
              Download CSV
            </button>
          </div>

        </div>
      </main>
      <Footer currentLanguage={language} />
    </>
  )
}
