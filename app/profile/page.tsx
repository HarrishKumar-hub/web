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
    return <div className="min-h-screen flex items-center justify-center">{t('common.loading', language)}</div>
  }

  return (
    <>
      <Header currentLanguage={language} onLanguageChange={setLanguage} />
      <main className="min-h-screen bg-ivory py-16">
        <div className="container-custom max-w-2xl">
          <div className="card-temple p-10 md:p-14 border-none shadow-golden-lg">
            {/* Profile Header */}
            <div className="text-center mb-12 pb-8 border-b border-gold/10">
              <div className="relative inline-block group mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto bg-ivory-warm border-4 border-gold p-1 shadow-golden">
                  <div className="w-full h-full rounded-full overflow-hidden bg-ivory flex items-center justify-center">
                    {formData.profilePhotoUrl ? (
                      <img src={formData.profilePhotoUrl} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <UserCircle className="w-16 h-16 text-gold/40" strokeWidth={1} />
                    )}
                  </div>
                </div>
                <div className="absolute bottom-1 right-1 bg-ivory text-saffron p-2.5 rounded-full border border-gold/20 shadow-flame/10 cursor-pointer active:scale-95 transition-all">
                  <Camera className="w-5 h-5" />
                </div>
              </div>
              <h1 className="text-4xl font-serif font-bold text-gold-dark mb-2 tracking-tight">
                {t('nav.profile', language)}
              </h1>
              <div className="flex items-center justify-center gap-2 text-sacred-ash/60 mb-4">
                <Mail className="w-4 h-4 text-saffron/50" />
                <span className="font-medium text-sm">{user?.email}</span>
              </div>
              <div className="flex justify-center">
                <span className={`badge-sacred flex items-center gap-1.5 ${
                  user?.role === 'ADMIN' ? 'bg-maroon/5 text-maroon border-maroon/20' : 'bg-saffron/5 text-saffron border-saffron/20'
                }`}>
                  <Shield className="w-3 h-3" />
                  {user?.role === 'ADMIN' ? (language === 'ta' ? 'நிர்வாகி' : 'Admin') : (language === 'ta' ? 'உறுப்பினர்' : 'Member')}
                </span>
              </div>
            </div>
            
            {message.text && (
              <div className={`p-4 rounded-xl mb-6 ${message.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gold-dark mb-3 px-1">{t('auth.name', language)} *</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="input-temple" />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gold-dark mb-3 px-1">{language === 'ta' ? 'சுயவிவரம்' : 'Bio'}</label>
                <textarea rows={3} value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="input-temple max-h-32" placeholder={language === 'ta' ? 'உங்களைப் பற்றி...' : 'Tell us about yourself...'} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gold-dark mb-3 px-1">{language === 'ta' ? 'தொலைபேசி' : 'Phone'}</label>
                  <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="input-temple" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gold-dark mb-3 px-1">{language === 'ta' ? 'விருப்பமான மொழி' : 'Preferred Language'}</label>
                  <select value={formData.preferredLanguage} onChange={e => setFormData({...formData, preferredLanguage: e.target.value})} className="input-temple appearance-none bg-no-repeat bg-[right_1rem_center]">
                    <option value="en">English</option>
                    <option value="ta">Tamil (தமிழ்)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gold-dark mb-3 px-1">{language === 'ta' ? 'முகவரி' : 'Address'}</label>
                <textarea rows={2} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="input-temple" />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gold-dark mb-3 px-1">{language === 'ta' ? 'சுயவிவர புகைப்பட URL' : 'Profile Photo URL'}</label>
                <input type="url" value={formData.profilePhotoUrl} onChange={e => setFormData({...formData, profilePhotoUrl: e.target.value})} className="input-temple" placeholder="https://..." />
                {formData.profilePhotoUrl && (
                  <div className="mt-6 flex items-center gap-4 p-4 bg-ivory-warm rounded-2xl border border-gold/10 shadow-ivory">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-ivory border-2 border-gold shadow-golden">
                      <img src={formData.profilePhotoUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gold">{language === 'ta' ? 'முன்னோட்டம்' : 'Image Preview'}</p>
                      <p className="text-xs text-sacred-ash/50">Changes visible in directory</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center pt-2 bg-ivory-warm p-5 rounded-2xl border border-gold/10 border-dashed">
                <div className="relative flex items-center h-5">
                  <input type="checkbox" checked={formData.isProfilePublic} onChange={e => setFormData({...formData, isProfilePublic: e.target.checked})} className="w-5 h-5 accent-saffron bg-ivory border-gold/30 rounded focus:ring-saffron/20 transition-all cursor-pointer" id="publicProfile" />
                </div>
                <label htmlFor="publicProfile" className="ml-4 text-sm font-medium text-sacred-ash/70 cursor-pointer flex items-center gap-2">
                  <Globe className="w-4 h-4 text-saffron/40" />
                  {language === 'ta' ? 'என் சுயவிவரத்தை உறுப்பினர் அட்டவணையில் காண்பி' : 'Make my profile visible in the Member Directory'}
                </label>
              </div>

              <div className="pt-10 border-t border-gold/10 flex flex-col sm:flex-row justify-end gap-5">
                <button type="button" onClick={() => router.back()} className="btn-outline-gold px-10 flex items-center justify-center gap-2">
                  <X className="w-4 h-4" />
                  {t('common.cancel', language)}
                </button>
                <button type="submit" disabled={isSubmitting} className="btn-sacred px-14 flex items-center justify-center gap-2">
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
