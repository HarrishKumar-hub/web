'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Language } from '@/lib/translations'
import Link from 'next/link'
import { Upload, Image as ImageIcon, LayoutGrid, ChevronLeft, CheckCircle, AlertCircle } from 'lucide-react'

export default function AdminGalleryPage() {
  const [language, setLanguage] = useState<Language>('en')
  
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('CEREMONY')
  const [preview, setPreview] = useState<string>('')
  
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<{type: 'error' | 'success', msg: string} | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (selectedFile.size > 5 * 1024 * 1024) {
        setStatus({ type: 'error', msg: 'File exceeds 5MB size limit.' })
        return
      }
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
      setStatus(null)
    }
  }

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setIsLoading(true)
    setStatus(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('title', title)
      formData.append('category', category)

      const token = localStorage.getItem('auth_token')
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      setStatus({ type: 'success', msg: 'Media successfully uploaded to Cloudinary!' })
      // Reset formatting
      setFile(null)
      setPreview('')
      setTitle('')
      
    } catch (err: any) {
      setStatus({ type: 'error', msg: err.message })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header currentLanguage={language} onLanguageChange={setLanguage} />
      <main className="min-h-screen bg-stone-900 text-stone-100 py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(176,138,79,0.25) 0%, transparent 60%)' }} />
        <div className="container-custom relative z-10">
          {/* Breadcrumb */}
          <div className="mb-10 text-xs font-mono font-semibold uppercase tracking-widest text-stone-400 flex items-center gap-2">
            <Link href="/admin" className="hover:text-brass-300 transition-colors flex items-center gap-1.5">
              <LayoutGrid className="w-3.5 h-3.5 text-brass-400" />
              Admin
            </Link>
            <span className="text-brass-400/40">/</span>
            <span className="text-stone-200">Media Content</span>
          </div>

          <div className="mb-12 pb-8 border-b border-brass/20">
            <span className="section-label-gold mb-2 inline-block">Sanctuary Archives</span>
            <h1 className="text-3xl md:text-5xl font-serif font-semibold text-stone-100 tracking-tight mb-3">Sacred Gallery Management</h1>
            <p className="text-stone-400 text-sm md:text-base max-w-2xl font-serif italic">Communicate the temple&apos;s divine glory by uploading sacred moments to the global community gallery.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Upload Area */}
            <div className="bg-stone-800 rounded-3xl p-8 md:p-12 border border-brass/25 shadow-golden relative">
              {status && (
                <div className={`p-5 rounded-2xl mb-8 flex items-center gap-3 font-mono font-semibold text-xs uppercase tracking-wider border ${status.type === "success" ? "bg-green-950/40 text-green-300 border-green-500/30" : "bg-red-950/40 text-red-300 border-red-500/30"}`}>
                  {status.type === "success" ? <CheckCircle className="w-5 h-5 shrink-0 text-green-400" /> : <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />}
                  {status.msg}
                </div>
              )}

              <form onSubmit={handleUploadSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-stone-300 mb-2">Media Title *</label>
                  <input 
                    type="text" 
                    required 
                    value={title} 
                    onChange={e => setTitle(e.target.value)}
                    placeholder="E.g., Pongal Morning 2026"
                    className="w-full px-4 py-3.5 bg-stone-900 border border-brass/30 rounded-xl focus:outline-none focus:border-brass-400 transition-all text-stone-100 placeholder-stone-500 text-sm md:text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-stone-300 mb-2">Category Classification *</label>
                  <select 
                    value={category} 
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-4 py-3.5 bg-stone-900 border border-brass/30 rounded-xl focus:outline-none focus:border-brass-400 transition-all text-stone-100 text-sm md:text-base appearance-none"
                  >
                    <option value="CEREMONY" className="bg-stone-900 text-stone-100">Ceremony (Pooja/Homa)</option>
                    <option value="EVENT" className="bg-stone-900 text-stone-100">Event (Festivals)</option>
                    <option value="OTHER" className="bg-stone-900 text-stone-100">Other Highlights</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-stone-300 mb-2">Drop Media Image *</label>
                  <div className="border-2 border-dashed border-brass/30 rounded-2xl p-10 text-center bg-stone-900/50 hover:bg-stone-900 hover:border-brass-400 transition-all cursor-pointer relative group/upload">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange}
                      required 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    />
                    <div className="bg-stone-950 w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4 border border-brass/40 shadow-inner group-hover/upload:scale-105 transition-transform">
                      <Upload className="w-7 h-7 text-brass-400" />
                    </div>
                    <p className="font-serif font-semibold text-stone-200 text-base mb-1">Click or drag image to upload</p>
                    <p className="text-xs font-mono uppercase tracking-wider text-stone-500">Supports strict JPG, PNG, WEBP (Max: 5MB)</p>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading || !file}
                  className="btn-premium w-full py-4 text-xs font-mono font-semibold uppercase tracking-[0.15em] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-stone-900/30 border-t-stone-900 rounded-full animate-spin" />
                      Publishing to Sanctuary...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Publish to Community Gallery
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Live Preview Side */}
            <div className="bg-stone-800 rounded-3xl p-8 md:p-12 border border-brass/25 shadow-golden">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-brass-300">Live Render Preview</h3>
                <div className="h-px flex-grow ml-5 bg-brass/20" />
              </div>
              <div className="aspect-[4/3] bg-stone-900/80 rounded-2xl border border-brass/20 overflow-hidden flex items-center justify-center p-3 shadow-inner relative">
                {preview ? (
                  <img src={preview} alt="Upload Request Preview" className="w-full h-full object-cover rounded-xl shadow-golden" onError={(e) => { e.currentTarget.src = '/hero_premium.png'; e.currentTarget.onerror = null; }} />
                ) : (
                  <div className="text-center p-6">
                    <div className="bg-stone-950 w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4 border border-brass/20 shadow-inner opacity-60">
                      <ImageIcon className="w-8 h-8 text-stone-500" strokeWidth={1} />
                    </div>
                    <p className="font-serif italic text-stone-500 text-sm">Preview will appear when file is selected</p>
                  </div>
                )}
              </div>
              {preview && (
                <div className="mt-6 p-5 bg-stone-900/90 rounded-xl border border-brass/30 text-brass-300 text-xs font-mono flex items-center gap-3 shadow-inner">
                  <div className="w-2 h-2 rounded-full bg-brass-400 animate-pulse shrink-0" />
                  <p className="leading-relaxed"><span className="text-stone-400">File Identified:</span> {(file!.size / 1024 / 1024).toFixed(2)} MB • Cloudinary optimization active.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>
      <Footer currentLanguage={language} />
    </>
  )
}
