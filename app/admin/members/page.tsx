'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Language, t } from '@/lib/translations'
import Link from 'next/link'
import { useAuth } from '@/lib/useAuth'

// Mock admin data
const MOCK_ALL_MEMBERS = [
  { id: '1', name: 'Rajesh Kumar', email: 'rajesh@example.com', role: 'ADMIN', joinedDate: '2024-01-15T00:00:00.000Z' },
  { id: '2', name: 'Senthil Murugan', email: 'senthil@example.com', role: 'MEMBER', joinedDate: '2024-03-10T00:00:00.000Z' },
  { id: '3', name: 'Lakshmi Devi', email: 'lakshmi@example.com', role: 'MEMBER', joinedDate: '2024-06-22T00:00:00.000Z' },
  { id: '4', name: 'Arun Kumar', email: 'arun@example.com', role: 'MEMBER', joinedDate: '2025-01-05T00:00:00.000Z' },
  { id: '5', name: 'Guest User', email: 'guest@example.com', role: 'GUEST', joinedDate: '2026-04-10T00:00:00.000Z' },
]

export default function AdminMembersPage() {
  const [language, setLanguage] = useState<Language>('en')
  const { user } = useAuth()
  const [members, setMembers] = useState(MOCK_ALL_MEMBERS)
  const [searchTerm, setSearchTerm] = useState('')

  const handleRoleChange = (id: string, newRole: string) => {
    setMembers(members.map(m => m.id === id ? { ...m, role: newRole } : m))
    // Call API in real implementation: fetch(\`/api/users/\${id}\`, { method: 'PUT', body: JSON.stringify({ role: newRole }) })
  }

  const handleDelete = (id: string) => {
    if(confirm('Are you sure you want to remove this member?')) {
      setMembers(members.filter(m => m.id !== id))
    }
  }

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
            <span className="text-stone-200 font-semibold">Member Management</span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 pb-8 border-b border-brass/20">
            <div>
              <span className="section-label-gold mb-2 inline-block">Directory Control</span>
              <h1 className="text-3xl md:text-4xl font-serif font-semibold text-stone-100 tracking-tight">Member Management</h1>
              <p className="text-stone-400 text-sm mt-1">Review, approve, and manage community user roles and sanctuary permissions.</p>
            </div>
            
            <div className="w-full md:w-80">
              <input 
                type="text" 
                placeholder="Search by name or email..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-stone-800 border border-brass/30 rounded-xl focus:border-brass-400 focus:outline-none text-stone-100 placeholder-stone-500 text-sm font-mono shadow-inner transition-all"
              />
            </div>
          </div>

          <div className="bg-stone-800 rounded-3xl shadow-golden border border-brass/25 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-900/80 border-b border-brass/20 text-xs font-mono uppercase tracking-wider text-brass-300">
                    <th className="p-5 font-semibold">Name</th>
                    <th className="p-5 font-semibold">Email</th>
                    <th className="p-5 font-semibold">Joined Date</th>
                    <th className="p-5 font-semibold">Role</th>
                    <th className="p-5 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brass/10">
                  {filteredMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-stone-900/40 transition-colors">
                      <td className="p-5 font-serif font-semibold text-stone-100 text-base">{member.name}</td>
                      <td className="p-5 font-mono text-sm text-stone-300">{member.email}</td>
                      <td className="p-5 font-mono text-xs text-stone-400">
                        {new Date(member.joinedDate).toLocaleDateString()}
                      </td>
                      <td className="p-5">
                        <select 
                          value={member.role}
                          onChange={(e) => handleRoleChange(member.id, e.target.value)}
                          className={`text-xs font-mono font-semibold uppercase tracking-wider rounded-full px-3 py-1 border focus:outline-none cursor-pointer ${
                            member.role === 'ADMIN' ? 'bg-brass-400/20 text-brass-300 border-brass-400/40' : 
                            member.role === 'MEMBER' ? 'bg-stone-900 text-stone-200 border-brass/30' :
                            'bg-stone-900/50 text-stone-400 border-stone-700'
                          }`}
                        >
                          <option value="ADMIN" className="bg-stone-900 text-stone-100">ADMIN</option>
                          <option value="MEMBER" className="bg-stone-900 text-stone-100">MEMBER</option>
                          <option value="GUEST" className="bg-stone-900 text-stone-100">GUEST</option>
                        </select>
                      </td>
                      <td className="p-5 text-right">
                        <button 
                          onClick={() => handleDelete(member.id)}
                          className="text-red-400 hover:text-red-300 font-mono text-xs uppercase tracking-wider font-semibold px-3 py-1.5 rounded-lg bg-red-950/30 border border-red-500/20 hover:bg-red-950/60 transition-colors"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredMembers.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-12 text-center text-stone-400 font-serif italic text-base">No community members found matching your search criteria.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
      <Footer currentLanguage={language} />
    </>
  )
}
