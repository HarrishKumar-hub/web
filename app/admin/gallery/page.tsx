'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Language } from '@/lib/translations'
import Link from 'next/link'

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
      <main className="min-h-screen bg-[#f8fafc] py-12">
        <div className="container-custom">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-slate-500 font-medium">
            <Link href="/admin" className="hover:text-purple-600 transition-colors">Admin Dashboard</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900">Media Content</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Upload Media</h1>
            <p className="text-slate-500 mt-1">Publish photos to the central gallery storage bucket via Cloudinary.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Upload Area */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              {status && (
                <div className={\`p-4 rounded-xl mb-6 font-bold text-sm \${
                  status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }\`}>
                  {status.msg}
                </div>
              )}

              <form onSubmit={handleUploadSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Media Title</label>
                  <input 
                    type="text" 
                    required 
                    value={title} 
                    onChange={e => setTitle(e.target.value)}
                    placeholder="E.g., Pongal Morning 2026"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Category Classification</label>
                  <select 
                    value={category} 
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none"
                  >
                    <option value="CEREMONY">Ceremony (Pooja/Homa)</option>
                    <option value="EVENT">Event (Festivals)</option>
                    <option value="OTHER">Other Highlights</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Drop Media Image</label>
                  <div className="border-2 border-dashed border-purple-200 rounded-2xl p-8 text-center bg-purple-50/30 hover:bg-purple-50/60 transition-colors relative">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange}
                      required 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="text-4xl mb-2">📤</div>
                    <p className="font-bold text-purple-900">Click or drag image to upload</p>
                    <p className="text-xs text-purple-600 mt-1">Supports strict JPG, PNG, WEBP (Max: 5MB)</p>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading || !file}
                  className="w-full py-4 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 disabled:opacity-50 transition-colors shadow-lg shadow-purple-200"
                >
                  {isLoading ? 'Encrypting & Uploading...' : 'Publish to Cloudinary'}
                </button>
              </form>
            </div>

            {/* Live Preview Side */}
            <div>
              <h3 className="font-bold text-slate-900 mb-4">Live Render Preview</h3>
              <div className="aspect-[4/3] bg-slate-100 rounded-3xl border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center">
                {preview ? (
                  <img src={preview} alt="Upload Request Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center text-slate-400">
                    <span className="text-5xl block mb-2">🖼️</span>
                    <p className="font-medium text-sm">Image boundary preview</p>
                  </div>
                )}
              </div>
              {preview && (
                <div className="mt-4 p-4 bg-purple-50 rounded-xl border border-purple-100 text-purple-800 text-sm">
                  <span className="font-bold">File Identified:</span> {(file!.size / 1024 / 1024).toFixed(2)} MB • Set for automatic Cloudinary optimization format tracking.
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
