'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Language, t } from '@/lib/translations'
import { useAuth } from '@/lib/useAuth'

export default function ProfilePage() {
  const [language, setLanguage] = useState<Language>('en')
  const { user, isAuthenticated, isLoading: authLoading, updateUser } = useAuth()
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    phone: '',
    address: '',
    profilePhotoUrl: '',
    isProfilePublic: true,
    preferredLanguage: 'en'
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login')
    } else if (user) {
      // Pre-fill form with user data from auth context
      setFormData({
        name: user.name || '',
        bio: '',
        phone: '',
        address: '',
        profilePhotoUrl: user.profilePhotoUrl || '',
        isProfilePublic: true,
        preferredLanguage: 'en'
      })
      // Then try to fetch full profile data
      fetchUserProfile()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, isAuthenticated, user?.id])

  const fetchUserProfile = async () => {
    if (!user?.id) return
    try {
      const res = await fetch(`/api/users/${user.id}`)
      if (res.ok) {
        const data = await res.json()
        setFormData({
          name: data.name || '',
          bio: data.bio || '',
          phone: data.phone || '',
          address: data.address || '',
          profilePhotoUrl: data.profilePhotoUrl || '',
          isProfilePublic: data.isProfilePublic ?? true,
          preferredLanguage: data.preferredLanguage || 'en'
        })
      }
    } catch (error) {
      console.error('Failed to fetch profile', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })
    setIsSubmitting(true)

    try {
      const token = localStorage.getItem('auth_token')
      const res = await fetch(`/api/users/${user?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to update profile')
      }

      const updatedData = await res.json()
      setMessage({ type: 'success', text: language === 'ta' ? 'சுயவிவரம் புதுப்பிக்கப்பட்டது!' : 'Profile updated successfully!' })
      
      // Update the auth context with new user data
      updateUser({
        name: updatedData.name,
        profilePhotoUrl: updatedData.profilePhotoUrl,
      })
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (authLoading || !isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center">{t('common.loading', language)}</div>
  }

  return (
    <>
      <Header currentLanguage={language} onLanguageChange={setLanguage} />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom max-w-2xl">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            {/* Profile Header */}
            <div className="text-center mb-8 pb-6 border-b border-gray-100">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 bg-orange-50 border-4 border-orange-100 flex items-center justify-center">
                {formData.profilePhotoUrl ? (
                  <img src={formData.profilePhotoUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl">👤</span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-dark">
                {t('nav.profile', language)}
              </h1>
              <p className="text-gray-500 mt-1">{user?.email}</p>
              <span className={`inline-block mt-2 text-xs px-3 py-1 rounded-full font-medium ${
                user?.role === 'ADMIN' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {user?.role === 'ADMIN' ? (language === 'ta' ? 'நிர்வாகி' : 'Admin') : (language === 'ta' ? 'உறுப்பினர்' : 'Member')}
              </span>
            </div>
            
            {message.text && (
              <div className={`p-4 rounded-xl mb-6 ${message.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t('auth.name', language)} *</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all" />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{language === 'ta' ? 'சுயவிவரம்' : 'Bio'}</label>
                <textarea rows={3} value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all max-h-32" placeholder={language === 'ta' ? 'உங்களைப் பற்றி...' : 'Tell us about yourself...'} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">{language === 'ta' ? 'தொலைபேசி' : 'Phone'}</label>
                  <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">{language === 'ta' ? 'விருப்பமான மொழி' : 'Preferred Language'}</label>
                  <select value={formData.preferredLanguage} onChange={e => setFormData({...formData, preferredLanguage: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all">
                    <option value="en">English</option>
                    <option value="ta">Tamil (தமிழ்)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{language === 'ta' ? 'முகவரி' : 'Address'}</label>
                <textarea rows={2} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all" />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{language === 'ta' ? 'சுயவிவர புகைப்பட URL' : 'Profile Photo URL'}</label>
                <input type="url" value={formData.profilePhotoUrl} onChange={e => setFormData({...formData, profilePhotoUrl: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all" placeholder="https://..." />
                {formData.profilePhotoUrl && (
                  <div className="mt-4">
                    <p className="text-xs text-gray-500 mb-2">{language === 'ta' ? 'முன்னோட்டம்:' : 'Preview:'}</p>
                    <img src={formData.profilePhotoUrl} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-orange-200" />
                  </div>
                )}
              </div>

              <div className="flex items-center pt-2 bg-gray-50 p-4 rounded-xl">
                <input type="checkbox" checked={formData.isProfilePublic} onChange={e => setFormData({...formData, isProfilePublic: e.target.checked})} className="mr-3 w-4 h-4 accent-orange-600" id="publicProfile" />
                <label htmlFor="publicProfile" className="text-sm font-medium text-gray-700">
                  {language === 'ta' ? 'என் சுயவிவரத்தை உறுப்பினர் அட்டவணையில் காண்பி' : 'Make my profile visible in the Member Directory'}
                </label>
              </div>

              <div className="pt-6 border-t flex justify-end gap-4">
                <button type="button" onClick={() => router.back()} className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 font-medium transition-all">
                  {t('common.cancel', language)}
                </button>
                <button type="submit" disabled={isSubmitting} className="px-8 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-bold shadow-lg hover:shadow-orange-200 hover:-translate-y-0.5 transition-all disabled:opacity-50">
                  {isSubmitting ? t('common.loading', language) : t('common.save', language)}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer currentLanguage={language} />
    </>
  )
}
