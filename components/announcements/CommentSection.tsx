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
    <div className="mt-8 border-t pt-8">
      <h3 className="text-2xl font-bold mb-6">
        {language === 'ta' ? 'கருத்துக்கள்' : 'Comments'} ({comments.length})
      </h3>

      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={language === 'ta' ? 'உங்கள் கருத்தை சேர்க்கவும்...' : 'Add your comment...'}
            className="w-full border border-gray-300 rounded-lg p-3 mb-2 focus:outline-none focus:border-primary"
            rows={3}
            required
          />
          <button
            type="submit"
            disabled={isSubmitting || !newComment.trim()}
            className="btn-primary"
          >
            {isSubmitting ? t('common.loading', language) : (language === 'ta' ? 'கருத்தை பதிவிடு' : 'Post Comment')}
          </button>
        </form>
      ) : (
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-8">
          <p className="text-gray-600 mb-2">
            {language === 'ta' ? 'கருத்துக்களைப் பதிவு செய்ய உள்நுழையவும்' : 'Please login to leave a comment'}
          </p>
          <a href="/login" className="text-primary hover:underline font-medium">
            {t('nav.login', language)}
          </a>
        </div>
      )}

      {isLoading ? (
        <div className="text-center text-gray-500 py-4">{t('common.loading', language)}</div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <div className="flex-shrink-0">
                {comment.user?.profilePhotoUrl ? (
                  <img src={comment.user.profilePhotoUrl} alt="" className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl">👤</div>
                )}
              </div>
              <div className="bg-gray-50 p-4 rounded-lg flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-dark">{comment.user?.name}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
              </div>
            </div>
          ))}
          {comments.length === 0 && (
            <p className="text-center text-gray-500 italic">
              {language === 'ta' ? 'முதல் கருத்தை பதிவு செய்யுங்கள்!' : 'Be the first to comment!'}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
