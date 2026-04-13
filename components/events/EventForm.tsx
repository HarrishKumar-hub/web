import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { t, Language } from '@/lib/translations'
import { CreateEventSchema, CreateEventInput } from '@/lib/validators'

interface EventFormProps {
  language: Language
  initialData?: CreateEventInput & { id?: string }
}

export default function EventForm({ language, initialData }: EventFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<CreateEventInput>({
    title: initialData?.title || '',
    titleTa: initialData?.titleTa || '',
    description: initialData?.description || '',
    descriptionTa: initialData?.descriptionTa || '',
    date: initialData?.date || new Date().toISOString().slice(0, 16),
    time: initialData?.time || '',
    location: initialData?.location || '',
    imageUrl: initialData?.imageUrl || '',
    capacity: initialData?.capacity || undefined,
    isPublic: initialData?.isPublic ?? true,
  })
  
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const parsedData = CreateEventSchema.parse({
        ...formData,
        date: new Date(formData.date).toISOString(),
        capacity: formData.capacity ? Number(formData.capacity) : undefined
      })

      const url = initialData?.id ? `/api/events/${initialData.id}` : '/api/events'
      const method = initialData?.id ? 'PUT' : 'POST'
      
      const token = localStorage.getItem('token')
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(parsedData)
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ? JSON.stringify(data.error) : 'Failed to save event')
      }

      router.push('/events')
      router.refresh()
    } catch (err: any) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Title (English) *</label>
          <input required name="title" value={formData.title} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Title (Tamil)</label>
          <input name="titleTa" value={formData.titleTa} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Description (English) *</label>
          <textarea required name="description" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded" rows={4} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description (Tamil)</label>
          <textarea name="descriptionTa" value={formData.descriptionTa} onChange={handleChange} className="w-full border p-2 rounded" rows={4} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">{t('event.date', language)} *</label>
          <input required type="datetime-local" name="date" value={formData.date} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t('event.location', language)} *</label>
          <input required name="location" value={formData.location} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Capacity</label>
          <input type="number" name="capacity" value={formData.capacity || ''} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>
      </div>

      <div className="flex items-center">
        <input type="checkbox" name="isPublic" checked={formData.isPublic} onChange={handleChange} className="mr-2" />
        <label className="text-sm font-medium">Is Public Event</label>
      </div>

      <div className="pt-4 border-t flex justify-end gap-4">
        <button type="button" onClick={() => router.back()} className="px-6 py-2 border rounded hover:bg-gray-50">
          {t('common.cancel', language)}
        </button>
        <button type="submit" disabled={isLoading} className="btn-primary disabled:opacity-50">
          {isLoading ? t('common.loading', language) : t('common.save', language)}
        </button>
      </div>
    </form>
  )
}
