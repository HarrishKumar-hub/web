'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Language, t } from '@/lib/translations'
import Link from 'next/link'
import { useAuth } from '@/lib/useAuth'

export default function AdminDashboard() {
  const [language, setLanguage] = useState<Language>('en')
  const { user } = useAuth()
  
  // Mock Stats
  const stats = [
    { label: language === 'ta' ? 'மொத்த உறுப்பினர்கள்' : 'Total Members', value: '15', icon: '👥', color: 'bg-blue-50 text-blue-700' },
    { label: language === 'ta' ? 'வரவிருக்கும் நிகழ்வுகள்' : 'Upcoming Events', value: '4', icon: '🗓️', color: 'bg-orange-50 text-orange-700' },
    { label: language === 'ta' ? 'அறிவிப்புகள்' : 'Announcements', value: '8', icon: '📢', color: 'bg-green-50 text-green-700' },
    { label: language === 'ta' ? 'கேலரி படங்கள்' : 'Gallery Photos', value: '24', icon: '📸', color: 'bg-purple-50 text-purple-700' },
  ]

  const recentActivity = [
    { id: 1, action: 'New member joined', user: 'Arun Kumar', time: '2 hours ago' },
    { id: 2, action: 'New RSVP for Aadi Amavasai', user: 'Senthil', time: '5 hours ago' },
    { id: 3, action: 'Gallery updated', user: 'Admin', time: 'Yesterday' },
  ]

  return (
    <>
      <Header currentLanguage={language} onLanguageChange={setLanguage} />
      <main className="min-h-screen bg-[#f8fafc] py-12">
        <div className="container-custom">
          {/* Admin Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                {language === 'ta' ? 'நிர்வாக குழு' : 'Admin Dashboard'}
              </h1>
              <p className="text-slate-500 font-medium mt-1">
                {language === 'ta' ? 'கணினி மேலாண்மை மற்றும் சமூக கண்காணிப்பு' : 'Manage temple activities and community members.'}
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/events/create" className="px-5 py-2.5 bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-100 hover:bg-orange-700 transition-all active:scale-95">
                + {language === 'ta' ? 'நிகழ்வு சேர்' : 'Add Event'}
              </Link>
              <Link href="/announcements/create" className="px-5 py-2.5 bg-slate-900 text-white font-bold rounded-xl shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95">
                + {language === 'ta' ? 'அறிவிப்பு' : 'Announcement'}
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center text-2xl shadow-inner`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Management Sections */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                  <h2 className="text-xl font-bold text-slate-900">
                    {language === 'ta' ? 'விரைவான மேலாண்மை' : 'Quick Management'}
                  </h2>
                </div>
                <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Link href="/admin/members" className="group p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all">
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">👥</div>
                    <h3 className="font-bold text-slate-900 mb-1">{language === 'ta' ? 'உறுப்பினர்கள்' : 'Manage Members'}</h3>
                    <p className="text-sm text-slate-500">View and manage community member profiles.</p>
                  </Link>
                  <Link href="/events" className="group p-6 rounded-2xl border border-slate-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all">
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">🗓️</div>
                    <h3 className="font-bold text-slate-900 mb-1">{language === 'ta' ? 'நிகழ்வுகள்' : 'Manage Events'}</h3>
                    <p className="text-sm text-slate-500">Update the festival calendar and special poojas.</p>
                  </Link>
                  <Link href="/admin/gallery" className="group p-6 rounded-2xl border border-slate-100 hover:border-purple-200 hover:bg-purple-50/30 transition-all">
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">📸</div>
                    <h3 className="font-bold text-slate-900 mb-1">{language === 'ta' ? 'கேலரி' : 'Manage Gallery'}</h3>
                    <p className="text-sm text-slate-500">Upload and organize temple photos and videos.</p>
                  </Link>
                  <Link href="/about" className="group p-6 rounded-2xl border border-slate-100 hover:border-green-200 hover:bg-green-50/30 transition-all">
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">🏛️</div>
                    <h3 className="font-bold text-slate-900 mb-1">{language === 'ta' ? 'கோவில் தகவல்' : 'Temple Information'}</h3>
                    <p className="text-sm text-slate-500">Update temple history, location, and contact details.</p>
                  </Link>
                  <Link href="/admin/analytics" className="group p-6 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all md:col-span-2 lg:col-span-1">
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">📊</div>
                    <h3 className="font-bold text-slate-900 mb-1">{language === 'ta' ? 'பகுப்பாய்வு' : 'Analytics & Data'}</h3>
                    <p className="text-sm text-slate-500">View revenue reports, activities, and metrics.</p>
                  </Link>
                </div>
              </div>
            </div>

            {/* Recent Activity Sidebar */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden h-fit">
              <div className="p-6 border-b border-slate-50 bg-slate-50/50">
                <h2 className="text-xl font-bold text-slate-900">
                  {language === 'ta' ? 'சமீபத்திய நடவடிக்கை' : 'Recent Activity'}
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {recentActivity.map((item) => (
                    <div key={item.id} className="flex gap-4 items-start">
                      <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{item.action}</p>
                        <p className="text-xs text-slate-400 font-medium">by <span className="text-slate-600 font-bold">{item.user}</span> • {item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-8 py-3 text-sm font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all">
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
