'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Language, t } from '@/lib/translations'
import Link from 'next/link'

export default function AnalyticsDashboardPage() {
  const [language, setLanguage] = useState<Language>('en')
  
  // Mock analytics data
  const revenueData = [
    { month: 'Jan', amount: 15000 },
    { month: 'Feb', amount: 12500 },
    { month: 'Mar', amount: 28000 }, // Festival month
    { month: 'Apr', amount: 18000 }
  ]

  const totalDonations = revenueData.reduce((acc, curr) => acc + curr.amount, 0)
  
  return (
    <>
      <Header currentLanguage={language} onLanguageChange={setLanguage} />
      <main className="min-h-screen bg-[#f8fafc] py-12">
        <div className="container-custom">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-slate-500 font-medium">
            <Link href="/admin" className="hover:text-orange-600 transition-colors">Admin Dashboard</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900">Analytics & Reports</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Analytics Dashboard</h1>
            <p className="text-slate-500 mt-1">Donation tracking, RSVPs, and site engagement metrics.</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-green-500">
              <p className="text-sm font-bold text-slate-400 uppercase">Total Revenue (YTD)</p>
              <h2 className="text-4xl font-black text-slate-900 mt-2">₹{totalDonations.toLocaleString()}</h2>
              <p className="text-xs text-green-600 font-bold mt-2">↑ +24% from last year</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-orange-500">
              <p className="text-sm font-bold text-slate-400 uppercase">Active RSVPs</p>
              <h2 className="text-4xl font-black text-slate-900 mt-2">310</h2>
              <p className="text-xs text-orange-600 font-bold mt-2">Upcoming: Chitra Vizha</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-blue-500">
              <p className="text-sm font-bold text-slate-400 uppercase">New Members (30d)</p>
              <h2 className="text-4xl font-black text-slate-900 mt-2">12</h2>
              <p className="text-xs text-blue-600 font-bold mt-2">Steady growth</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-6">Donation Trends (2026)</h3>
              <div className="h-64 flex items-end gap-4">
                {revenueData.map((data) => {
                  const height = (data.amount / 30000) * 100
                  return (
                    <div key={data.month} className="flex-1 flex flex-col justify-end items-center gap-2 relative group">
                      <div className="absolute -top-8 bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        ₹{data.amount}
                      </div>
                      <div 
                        className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-md hover:opacity-80 transition-opacity cursor-pointer"
                        style={{ height: \`\${height}%\` }}
                      ></div>
                      <p className="text-xs font-bold text-slate-500">{data.month}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-6">Recent Transactions</h3>
              <div className="overflow-y-auto h-64 pr-2">
                <div className="space-y-4">
                  {[1,2,3,4,5].map((i) => (
                    <div key={i} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-lg border border-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">
                          ₹
                        </div>
                        <div>
                          <p className="font-bold text-sm text-slate-900">Anonymous Devotee {i}</p>
                          <p className="text-xs text-slate-500">Annadhanam Fund • Stripe</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-sm text-green-600">+₹{i * 1000}</p>
                        <p className="text-xs text-slate-400">Today</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 p-6 rounded-2xl flex justify-between items-center">
            <div>
              <h3 className="font-bold text-orange-900">Export Reports</h3>
              <p className="text-sm text-orange-700">Download full CSV reports for accounting</p>
            </div>
            <button className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-sm transition-colors">
              Download CSV
            </button>
          </div>

        </div>
      </main>
      <Footer currentLanguage={language} />
    </>
  )
}
