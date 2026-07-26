'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Language, t } from '@/lib/translations'
import { useAuth } from '@/lib/useAuth'

export default function CreateAnnouncementPage() {
  const [language, setLanguage] = useState<Language>('en')
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    title: '',
    titleTa: '',
    content: '',
    contentTa: '',
    imageUrl: '',
    isPinned: false,
    allowComments: true
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login')
    } else if (!authLoading && isAuthenticated && user?.role !== 'ADMIN') {
      router.push('/announcements')
    }
  }, [authLoading, isAuthenticated, user, router])

  if (authLoading || !isAuthenticated || user?.role !== 'ADMIN') {
    return <div className="min-h-screen flex items-center justify-center">{t('common.loading', language)}</div>
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to create announcement')
      }

      router.push('/announcements')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Header currentLanguage={language} onLanguageChange={setLanguage} />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom max-w-3xl bg-white p-8 rounded-xl shadow">
          <h1 className="text-3xl font-bold text-dark mb-6">Create Announcement</h1>
          
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded mb-6">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Title (English) *</label>
                <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border p-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Title (Tamil)</label>
                <input value={formData.titleTa} onChange={e => setFormData({...formData, titleTa: e.target.value})} className="w-full border p-2 rounded" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Content (English) *</label>
                <textarea required rows={5} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full border p-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Content (Tamil)</label>
                <textarea rows={5} value={formData.contentTa} onChange={e => setFormData({...formData, contentTa: e.target.value})} className="w-full border p-2 rounded" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input type="url" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full border p-2 rounded" />
            </div>

            <div className="flex gap-6">
              <label className="flex items-center">
                <input type="checkbox" checked={formData.isPinned} onChange={e => setFormData({...formData, isPinned: e.target.checked})} className="mr-2" />
                Pin Announcement
              </label>
              <label className="flex items-center">
                <input type="checkbox" checked={formData.allowComments} onChange={e => setFormData({...formData, allowComments: e.target.checked})} className="mr-2" />
                Allow Comments
              </label>
            </div>

            <div className="pt-4 border-t flex justify-end gap-4">
              <button type="button" onClick={() => router.back()} className="px-6 py-2 border rounded hover:bg-gray-50">Cancel</button>
              <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-50">
                {isSubmitting ? 'Saving...' : 'Publish'}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer currentLanguage={language} />
    </>
  )
}
