'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Language, t } from '@/lib/translations'
import { useAuth } from '@/lib/useAuth'
import { UserCircle, Mail, Shield, Camera, Save, X, Globe } from 'lucide-react'

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
    return <div className="min-h-screen bg-stone-900 text-stone-100 flex items-center justify-center font-serif text-lg">{t('common.loading', language)}</div>
  }

  return (
    <>
      <Header currentLanguage={language} onLanguageChange={setLanguage} />
      <main className="min-h-screen bg-stone-900 text-stone-100 py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(176,138,79,0.25) 0%, transparent 60%)' }} />
        <div className="container-custom max-w-2xl relative z-10">
          <div className="bg-stone-800 rounded-3xl shadow-golden p-8 md:p-14 border border-brass/25 relative z-10">
            {/* Profile Header */}
            <div className="text-center mb-12 pb-8 border-b border-brass/20">
              <div className="relative inline-block group mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto bg-stone-900 border-2 border-brass/40 p-1 shadow-inner">
                  <div className="w-full h-full rounded-full overflow-hidden bg-stone-950 flex items-center justify-center">
                    {formData.profilePhotoUrl ? (
                      <img src={formData.profilePhotoUrl} alt="Profile" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = '/logo.png'; e.currentTarget.onerror = null; }} />
                    ) : (
                      <UserCircle className="w-16 h-16 text-stone-500" strokeWidth={1.5} />
                    )}
                  </div>
                </div>
                <div className="absolute bottom-1 right-1 bg-stone-900 text-brass-400 p-2.5 rounded-full border border-brass/40 shadow-golden cursor-pointer active:scale-95 transition-all hover:bg-stone-800">
                  <Camera className="w-5 h-5" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-semibold text-stone-100 mb-2 tracking-tight">
                {t('nav.profile', language)}
              </h1>
              <div className="flex items-center justify-center gap-2 text-stone-400 mb-4">
                <Mail className="w-4 h-4 text-brass-400" />
                <span className="font-mono text-sm">{user?.email}</span>
              </div>
              <div className="flex justify-center">
                <span className={`px-3 py-1 text-[10px] font-mono font-semibold uppercase tracking-[0.15em] rounded-full inline-flex items-center gap-1.5 ${
                  user?.role === 'ADMIN' ? 'bg-brass-400/20 text-brass-300 border border-brass-400/40' : 'bg-stone-900 text-stone-300 border border-brass/25'
                }`}>
                  <Shield className="w-3.5 h-3.5 text-brass-400" />
                  {user?.role === 'ADMIN' ? (language === 'ta' ? 'நிர்வாகி' : 'Admin') : (language === 'ta' ? 'உறுப்பினர்' : 'Member')}
                </span>
              </div>
            </div>
            
            {message.text && (
              <div className={`p-4 rounded-xl mb-6 text-sm border ${message.type === 'error' ? 'bg-red-950/40 text-red-300 border-red-500/20' : 'bg-green-950/40 text-green-300 border-green-500/20'}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-stone-300 mb-2">{t('auth.name', language)} *</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3.5 bg-stone-900 border border-brass/30 rounded-xl focus:outline-none focus:border-brass-400 transition-all text-stone-100 placeholder-stone-500 text-sm md:text-base" />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-stone-300 mb-2">{language === 'ta' ? 'சுயவிவரம்' : 'Bio'}</label>
                <textarea rows={3} value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full px-4 py-3.5 bg-stone-900 border border-brass/30 rounded-xl focus:outline-none focus:border-brass-400 transition-all text-stone-100 placeholder-stone-500 text-sm md:text-base max-h-32" placeholder={language === 'ta' ? 'உங்களைப் பற்றி...' : 'Tell us about yourself...'} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-stone-300 mb-2">{language === 'ta' ? 'தொலைபேசி' : 'Phone'}</label>
                  <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3.5 bg-stone-900 border border-brass/30 rounded-xl focus:outline-none focus:border-brass-400 transition-all text-stone-100 placeholder-stone-500 text-sm md:text-base" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-stone-300 mb-2">{language === 'ta' ? 'விருப்பமான மொழி' : 'Preferred Language'}</label>
                  <select value={formData.preferredLanguage} onChange={e => setFormData({...formData, preferredLanguage: e.target.value})} className="w-full px-4 py-3.5 bg-stone-900 border border-brass/30 rounded-xl focus:outline-none focus:border-brass-400 transition-all text-stone-100 text-sm md:text-base appearance-none">
                    <option value="en" className="bg-stone-900 text-stone-100">English</option>
                    <option value="ta" className="bg-stone-900 text-stone-100">Tamil (தமிழ்)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-stone-300 mb-2">{language === 'ta' ? 'முகவரி' : 'Address'}</label>
                <textarea rows={2} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-3.5 bg-stone-900 border border-brass/30 rounded-xl focus:outline-none focus:border-brass-400 transition-all text-stone-100 placeholder-stone-500 text-sm md:text-base" />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-stone-300 mb-2">{language === 'ta' ? 'சுயவிவர புகைப்பட URL' : 'Profile Photo URL'}</label>
                <input type="url" value={formData.profilePhotoUrl} onChange={e => setFormData({...formData, profilePhotoUrl: e.target.value})} className="w-full px-4 py-3.5 bg-stone-900 border border-brass/30 rounded-xl focus:outline-none focus:border-brass-400 transition-all text-stone-100 placeholder-stone-500 text-sm md:text-base" placeholder="https://..." />
                {formData.profilePhotoUrl && (
                  <div className="mt-6 flex items-center gap-4 p-4 bg-stone-900/50 rounded-2xl border border-brass/25">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-stone-950 border-2 border-brass/40 p-0.5 shadow-inner">
                      <img src={formData.profilePhotoUrl} alt="Preview" className="w-full h-full object-cover rounded-full" onError={(e) => { e.currentTarget.src = '/logo.png'; e.currentTarget.onerror = null; }} />
                    </div>
                    <div>
                      <p className="text-xs font-mono font-semibold uppercase tracking-wider text-brass-300">{language === 'ta' ? 'முன்னோட்டம்' : 'Image Preview'}</p>
                      <p className="text-xs text-stone-400">Changes visible in directory</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center pt-2 bg-stone-900/40 p-5 rounded-2xl border border-brass/20 border-dashed">
                <div className="relative flex items-center h-5">
                  <input type="checkbox" checked={formData.isProfilePublic} onChange={e => setFormData({...formData, isProfilePublic: e.target.checked})} className="w-5 h-5 accent-brass-400 bg-stone-900 border-brass/40 rounded focus:ring-brass-400/20 transition-all cursor-pointer" id="publicProfile" />
                </div>
                <label htmlFor="publicProfile" className="ml-4 text-sm font-medium text-stone-300 cursor-pointer flex items-center gap-2">
                  <Globe className="w-4 h-4 text-brass-400" />
                  {language === 'ta' ? 'என் சுயவிவரத்தை உறுப்பினர் அட்டவணையில் காண்பி' : 'Make my profile visible in the Member Directory'}
                </label>
              </div>

              <div className="pt-8 border-t border-brass/20 flex flex-col sm:flex-row justify-end gap-4">
                <button type="button" onClick={() => router.back()} className="px-8 py-3.5 rounded-xl border border-brass/30 text-stone-300 hover:text-stone-100 hover:border-brass/60 font-semibold text-xs uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2">
                  <X className="w-4 h-4" />
                  {t('common.cancel', language)}
                </button>
                <button type="submit" disabled={isSubmitting} className="btn-premium px-12 py-3.5 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.15em] font-semibold disabled:opacity-50">
                  <Save className="w-4 h-4" />
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
