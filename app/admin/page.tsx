'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Language, t } from '@/lib/translations'
import Link from 'next/link'
import { useAuth } from '@/lib/useAuth'
import { Users, Calendar, Megaphone, Image, Building2, BarChart3 } from 'lucide-react'

export default function AdminDashboard() {
  const [language, setLanguage] = useState<Language>('en')
  const { user } = useAuth()
  
  // Mock Stats
  const stats = [
    { label: language === 'ta' ? 'மொத்த உறுப்பினர்கள்' : 'Total Members', value: '15', icon: <Users className="w-6 h-6" />, color: 'bg-stone-900 text-brass-400 border border-brass/30' },
    { label: language === 'ta' ? 'வரவிருக்கும் நிகழ்வுகள்' : 'Upcoming Events', value: '4', icon: <Calendar className="w-6 h-6" />, color: 'bg-stone-900 text-stone-200 border border-brass/30' },
    { label: language === 'ta' ? 'அறிவிப்புகள்' : 'Announcements', value: '8', icon: <Megaphone className="w-6 h-6" />, color: 'bg-stone-900 text-brass-300 border border-brass/30' },
    { label: language === 'ta' ? 'கேலரி படங்கள்' : 'Gallery Photos', value: '24', icon: <Image className="w-6 h-6" />, color: 'bg-stone-900 text-stone-300 border border-brass/30' },
  ]

  const recentActivity = [
    { id: 1, action: 'New member joined', user: 'Arun Kumar', time: '2 hours ago' },
    { id: 2, action: 'New RSVP for Aadi Amavasai', user: 'Senthil', time: '5 hours ago' },
    { id: 3, action: 'Gallery updated', user: 'Admin', time: 'Yesterday' },
  ]

  return (
    <>
      <Header currentLanguage={language} onLanguageChange={setLanguage} />
      <main className="min-h-screen bg-stone-900 text-stone-100 py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(176,138,79,0.25) 0%, transparent 60%)' }} />
        <div className="container-custom relative z-10">
          {/* Admin Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4 pb-8 border-b border-brass/20">
            <div>
              <span className="section-label-gold mb-2 inline-block">Temple Administration</span>
              <h1 className="text-3xl md:text-5xl font-serif font-semibold text-stone-100 tracking-tight">
                {language === 'ta' ? 'நிர்வாக குழு' : 'Admin Dashboard'}
              </h1>
              <p className="text-stone-400 text-sm md:text-base mt-2">
                {language === 'ta' ? 'கணினி மேலாண்மை மற்றும் சமூக கண்காணிப்பு' : 'Manage temple activities and community members.'}
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/events/create" className="px-5 py-3 bg-stone-800 border border-brass/40 text-brass-300 font-mono font-semibold text-xs uppercase tracking-wider rounded-xl shadow-golden hover:bg-stone-700 hover:border-brass-400 transition-all active:scale-95">
                + {language === 'ta' ? 'நிகழ்வு சேர்' : 'Add Event'}
              </Link>
              <Link href="/announcements/create" className="px-5 py-3 bg-stone-800 border border-brass/25 text-stone-200 font-mono font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-stone-700 hover:border-brass/40 transition-all active:scale-95">
                + {language === 'ta' ? 'அறிவிப்பு' : 'Announcement'}
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, i) => (
              <div key={i} className="bg-stone-800 p-6 rounded-2xl shadow-golden border border-brass/25 flex items-center gap-5">
                <div className={`w-14 h-14 rounded-xl ${stat.color} flex items-center justify-center text-2xl shadow-inner shrink-0`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-xs font-mono font-semibold text-stone-400 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-3xl font-serif font-semibold text-stone-100 mt-1">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Management Sections */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-stone-800 rounded-3xl shadow-golden border border-brass/25 overflow-hidden">
                <div className="p-6 border-b border-brass/20 flex justify-between items-center bg-stone-900/50">
                  <h2 className="text-xl font-serif font-semibold text-stone-100">
                    {language === 'ta' ? 'விரைவான மேலாண்மை' : 'Quick Management'}
                  </h2>
                </div>
                <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Link href="/admin/members" className="group p-6 rounded-2xl border border-brass/20 bg-stone-900/40 hover:border-brass-400/50 hover:bg-stone-800 hover:shadow-golden transition-all duration-500">
                    <div className="mb-3 group-hover:scale-110 transition-transform">
                      <Users className="w-8 h-8 text-brass-400" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif font-semibold text-lg text-stone-100 group-hover:text-brass-300 transition-colors mb-1">{language === 'ta' ? 'உறுப்பினர்கள்' : 'Manage Members'}</h3>
                    <p className="text-sm text-stone-400 leading-relaxed">View and manage community member profiles.</p>
                  </Link>
                  <Link href="/events" className="group p-6 rounded-2xl border border-brass/20 bg-stone-900/40 hover:border-brass-400/50 hover:bg-stone-800 hover:shadow-golden transition-all duration-500">
                    <div className="mb-3 group-hover:scale-110 transition-transform">
                      <Calendar className="w-8 h-8 text-stone-300 group-hover:text-brass-300 transition-colors" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif font-semibold text-lg text-stone-100 group-hover:text-brass-300 transition-colors mb-1">{language === 'ta' ? 'நிகழ்வுகள்' : 'Manage Events'}</h3>
                    <p className="text-sm text-stone-400 leading-relaxed">Update the festival calendar and special poojas.</p>
                  </Link>
                  <Link href="/admin/gallery" className="group p-6 rounded-2xl border border-brass/20 bg-stone-900/40 hover:border-brass-400/50 hover:bg-stone-800 hover:shadow-golden transition-all duration-500">
                    <div className="mb-3 group-hover:scale-110 transition-transform">
                      <Image className="w-8 h-8 text-brass-400" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif font-semibold text-lg text-stone-100 group-hover:text-brass-300 transition-colors mb-1">{language === 'ta' ? 'கேலரி' : 'Manage Gallery'}</h3>
                    <p className="text-sm text-stone-400 leading-relaxed">Upload and organize temple photos and videos.</p>
                  </Link>
                  <Link href="/about" className="group p-6 rounded-2xl border border-brass/20 bg-stone-900/40 hover:border-brass-400/50 hover:bg-stone-800 hover:shadow-golden transition-all duration-500">
                    <div className="mb-3 group-hover:scale-110 transition-transform">
                      <Building2 className="w-8 h-8 text-stone-300 group-hover:text-brass-300 transition-colors" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif font-semibold text-lg text-stone-100 group-hover:text-brass-300 transition-colors mb-1">{language === 'ta' ? 'கோவில் தகவல்' : 'Temple Information'}</h3>
                    <p className="text-sm text-stone-400 leading-relaxed">Update temple history, location, and contact details.</p>
                  </Link>
                  <Link href="/admin/analytics" className="group p-6 rounded-2xl border border-brass/20 bg-stone-900/40 hover:border-brass-400/50 hover:bg-stone-800 hover:shadow-golden transition-all duration-500 md:col-span-2 lg:col-span-1">
                    <div className="mb-3 group-hover:scale-110 transition-transform">
                      <BarChart3 className="w-8 h-8 text-brass-400" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif font-semibold text-lg text-stone-100 group-hover:text-brass-300 transition-colors mb-1">{language === 'ta' ? 'பகுப்பாய்வு' : 'Analytics & Data'}</h3>
                    <p className="text-sm text-stone-400 leading-relaxed">View revenue reports, activities, and metrics.</p>
                  </Link>
                </div>
              </div>
            </div>

            {/* Recent Activity Sidebar */}
            <div className="bg-stone-800 rounded-3xl shadow-golden border border-brass/25 overflow-hidden h-fit">
              <div className="p-6 border-b border-brass/20 bg-stone-900/50">
                <h2 className="text-xl font-serif font-semibold text-stone-100">
                  {language === 'ta' ? 'சமீபத்திய நடவடிக்கை' : 'Recent Activity'}
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {recentActivity.map((item) => (
                    <div key={item.id} className="flex gap-4 items-start">
                      <div className="w-2 h-2 rounded-full bg-brass-400 mt-1.5 shrink-0"></div>
                      <div>
                        <p className="text-sm font-semibold text-stone-200">{item.action}</p>
                        <p className="text-xs text-stone-400 font-mono uppercase tracking-wider mt-0.5">by <span className="text-brass-300 font-semibold">{item.user}</span> • {item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-8 py-3 text-xs font-mono uppercase tracking-wider font-semibold text-stone-400 hover:text-stone-100 hover:bg-stone-900/50 rounded-xl transition-all">
                  {language === 'ta' ? 'அனைத்தையும் காண்க' : 'View All Activity'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer currentLanguage={language} />
    </>
  )
}
