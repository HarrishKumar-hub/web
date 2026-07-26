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
          'Authorization': \`Bearer \${token}\`
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
      <main className="min-h-screen bg-ivory py-16">
        <div className="container-custom">
          {/* Breadcrumb */}
          <div className="mb-10 text-sm text-sacred-ash/50 font-sans font-bold uppercase tracking-widest flex items-center gap-2">
            <Link href="/admin" className="hover:text-saffron transition-colors flex items-center gap-1.5">
              <LayoutGrid className="w-3.5 h-3.5" />
              Admin
            </Link>
            <span className="opacity-30">/</span>
            <span className="text-sacred-ash">Media Content</span>
          </div>

          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gold-dark tracking-tight mb-4 leading-tight">Sacred Gallery</h1>
            <p className="text-sacred-ash/60 font-medium max-w-2xl font-lora">Communicate the temple's divine glory by uploading sacred moments to the global community gallery.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Upload Area */}
            <div className="card-temple p-10 md:p-12 border-none shadow-golden-lg">
              {status && (
                <div className={`p-5 rounded-2xl mb-8 flex items-center gap-3 font-bold text-sm shadow-ivory border ${status.type === "success" ? "bg-green-50 text-green-700 border-green-100" : "bg-red-50 text-red-700 border-red-100"}`}>
                  {status.type === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                  {status.msg}
                </div>
              )}

              <form onSubmit={handleUploadSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gold-dark mb-3 px-1">Media Title</label>
                  <input 
                    type="text" 
                    required 
                    value={title} 
                    onChange={e => setTitle(e.target.value)}
                    placeholder="E.g., Pongal Morning 2026"
                    className="input-temple"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gold-dark mb-3 px-1">Category Classification</label>
                  <select 
                    value={category} 
                    onChange={e => setCategory(e.target.value)}
                    className="input-temple appearance-none bg-no-repeat bg-[right_1rem_center]"
                  >
                    <option value="CEREMONY">Ceremony (Pooja/Homa)</option>
                    <option value="EVENT">Event (Festivals)</option>
                    <option value="OTHER">Other Highlights</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gold-dark mb-3 px-1">Drop Media Image</label>
                  <div className="border-[3px] border-dashed border-gold/20 rounded-[32px] p-12 text-center bg-ivory-warm hover:bg-gold/5 transition-all cursor-pointer relative group/upload">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange}
                      required 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    />
                    <div className="bg-ivory w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-5 border border-gold/20 shadow-ivory group-hover/upload:shadow-flame/10 transition-all">
                      <Upload className="w-8 h-8 text-saffron" />
                    </div>
                    <p className="font-serif font-bold text-gold-dark text-lg mb-1">Click or drag image to upload</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-sacred-ash/40">Supports strict JPG, PNG, WEBP (Max: 5MB)</p>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading || !file}
                  className="btn-sacred w-full py-5 text-base flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-flame/20"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Publishing to Sanctuary...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Publish to Community Gallery
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Live Preview Side */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gold-dark">Live Render Preview</h3>
                <div className="h-px flex-grow ml-5 bg-gold/10" />
              </div>
              <div className="aspect-[4/3] bg-ivory-warm rounded-[48px] border-[1px] border-gold/15 overflow-hidden flex items-center justify-center p-3 shadow-golden relative shadow-ivory">
                {preview ? (
                  <img src={preview} alt="Upload Request Preview" className="w-full h-full object-cover rounded-[36px] shadow-temple" />
                ) : (
                  <div className="text-center">
                    <div className="bg-ivory w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-5 border border-gold/15 opacity-50">
                      <ImageIcon className="w-10 h-10 text-gold-dark/40" strokeWidth={1} />
                    </div>
                    <p className="font-lora italic text-sacred-ash/40">Visualizing sacred boundaries</p>
                  </div>
                )}
              </div>
              {preview && (
                <div className="mt-8 p-6 bg-saffron/5 rounded-[24px] border border-saffron/20 text-saffron-dark text-xs flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-saffron animate-pulse flex-shrink-0" />
                  <p className="font-bold uppercase tracking-widest"><span className="opacity-60">File Identified:</span> {(file!.size / 1024 / 1024).toFixed(2)} MB • Automatic Cloudinary optimization active.</p>
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
