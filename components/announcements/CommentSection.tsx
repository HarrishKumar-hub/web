'use client'

import React, { useState, useEffect } from 'react'
import { Language, t } from '@/lib/translations'
import { useAuth } from '@/lib/useAuth'

interface CommentSectionProps {
  announcementId: string
  language: Language
}

export default function CommentSection({ announcementId, language }: CommentSectionProps) {
  const { user, isAuthenticated } = useAuth()
  const [comments, setComments] = useState<any[]>([])
  const [newComment, setNewComment] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchComments()
  }, [announcementId])

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/announcements/${announcementId}/comments`)
      if (res.ok) {
        const data = await res.json()
        setComments(data)
      }
    } catch (error) {
      console.error('Failed to fetch comments', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setIsSubmitting(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`/api/announcements/${announcementId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: newComment })
      })

      if (res.ok) {
        setNewComment('')
        fetchComments() // Refresh comments
      }
    } catch (error) {
      console.error('Failed to post comment', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mt-8 border-t border-brass/20 pt-8">
      <h3 className="text-xl font-serif font-semibold text-stone-100 mb-6">
        {language === 'ta' ? 'கருத்துக்கள்' : 'Comments'} ({comments.length})
      </h3>

      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={language === 'ta' ? 'உங்கள் கருத்தை சேர்க்கவும்...' : 'Add your comment...'}
            className="w-full bg-stone-900 border border-brass/30 rounded-xl p-4 mb-3 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-brass-400 text-sm leading-relaxed"
            rows={3}
            required
          />
          <button
            type="submit"
            disabled={isSubmitting || !newComment.trim()}
            className="btn-premium px-6 py-2.5 text-xs"
          >
            {isSubmitting ? t('common.loading', language) : (language === 'ta' ? 'கருத்தை பதிவிடு' : 'Post Comment')}
          </button>
        </form>
      ) : (
        <div className="bg-stone-900/80 border border-brass/20 p-6 rounded-2xl text-center mb-8">
          <p className="text-stone-300 text-sm mb-2">
            {language === 'ta' ? 'கருத்துக்களைப் பதிவு செய்ய உள்நுழையவும்' : 'Please login to leave a comment'}
          </p>
          <a href="/login" className="text-brass-300 hover:text-brass-200 hover:underline font-semibold text-xs uppercase tracking-[0.15em]">
            {t('nav.login', language)}
          </a>
        </div>
      )}

      {isLoading ? (
        <div className="text-center text-stone-400 py-6 text-sm">{t('common.loading', language)}</div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3.5">
              <div className="flex-shrink-0">
                {comment.user?.profilePhotoUrl ? (
                  <img src={comment.user.profilePhotoUrl} alt="" className="w-10 h-10 rounded-full object-cover border border-brass/25" onError={(e) => { e.currentTarget.src = '/logo.png'; e.currentTarget.onerror = null; }} />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-stone-900 border border-brass/30 flex items-center justify-center text-lg">👤</div>
                )}
              </div>
              <div className="bg-stone-900/80 border border-brass/20 p-4 rounded-xl flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-stone-200 text-sm">{comment.user?.name}</span>
                  <span className="text-xs text-stone-400 font-mono">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-stone-300 whitespace-pre-wrap text-sm leading-relaxed">{comment.content}</p>
              </div>
            </div>
          ))}
          {comments.length === 0 && (
            <p className="text-center text-stone-400 italic text-sm py-4">
              {language === 'ta' ? 'முதல் கருத்தை பதிவு செய்யுங்கள்!' : 'Be the first to comment!'}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
