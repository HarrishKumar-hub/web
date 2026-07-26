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
      <main className="min-h-screen bg-[#f8fafc] py-12">
        <div className="container-custom">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-slate-500 font-medium">
            <Link href="/admin" className="hover:text-orange-600 transition-colors">Admin Dashboard</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900">Member Management</span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Member Management</h1>
              <p className="text-slate-500 mt-1">Review, approve, and manage community user roles.</p>
            </div>
            
            <div className="w-full md:w-72">
              <input 
                type="text" 
                placeholder="Search by name or email..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-100 text-sm font-semibold text-slate-500">
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Joined Date</th>
                    <th className="p-4">Role</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 font-bold text-slate-900">{member.name}</td>
                      <td className="p-4 text-slate-600">{member.email}</td>
                      <td className="p-4 text-slate-500 text-sm">
                        {new Date(member.joinedDate).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <select 
                          value={member.role}
                          onChange={(e) => handleRoleChange(member.id, e.target.value)}
                          className={`text-xs font-bold rounded-full px-3 py-1 border-2 focus:outline-none cursor-pointer ${
                            member.role === 'ADMIN' ? 'bg-red-50 text-red-700 border-red-200' : 
                            member.role === 'MEMBER' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            'bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          <option value="ADMIN">ADMIN</option>
                          <option value="MEMBER">MEMBER</option>
                          <option value="GUEST">GUEST</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => handleDelete(member.id)}
                          className="text-red-500 hover:text-red-700 font-bold text-sm px-3 py-1 rounded bg-red-50 hover:bg-red-100 transition-colors"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredMembers.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-500">No members found matching your search.</td>
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
