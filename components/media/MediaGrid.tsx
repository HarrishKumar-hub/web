import React, { useState } from 'react'
import { Language, t } from '@/lib/translations'

interface MediaGridProps {
  mediaFiles: any[]
  language: Language
}

export default function MediaGrid({ mediaFiles, language }: MediaGridProps) {
  const [selectedMedia, setSelectedMedia] = useState<any>(null)

  if (!mediaFiles || mediaFiles.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-lg">{language === 'ta' ? 'படங்கள் கிடைக்கவில்லை' : 'No media found.'}</p>
      </div>
    )
  }

  const closeModal = () => setSelectedMedia(null)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {mediaFiles.map((media) => {
          const displayTitle = language === 'ta' && media.titleTa ? media.titleTa : media.title
          
          return (
            <div 
              key={media.id} 
              className="group relative cursor-pointer overflow-hidden rounded-xl bg-gray-200 aspect-square shadow-sm"
              onClick={() => setSelectedMedia(media)}
            >
              <img 
                src={media.thumbnailUrl || media.fileUrl} 
                alt={displayTitle} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-xs font-bold text-white bg-primary inline-block px-2 py-1 rounded w-max mb-1">
                  {media.category}
                </span>
                <h3 className="text-white font-bold truncate text-sm">{displayTitle}</h3>
              </div>
              {media.type === 'VIDEO' && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8" onClick={closeModal}>
          <button className="absolute top-4 right-4 text-white hover:text-red-500 text-3xl font-bold z-50">×</button>
          
          <div className="max-w-5xl w-full max-h-full flex flex-col items-center justify-center" onClick={e => e.stopPropagation()}>
            {selectedMedia.type === 'VIDEO' ? (
              <video controls className="max-w-full max-h-[80vh] bg-black" autoPlay src={selectedMedia.fileUrl}>
                Your browser does not support the video tag.
              </video>
            ) : (
              <img src={selectedMedia.fileUrl} alt="Gallery" className="max-w-full max-h-[80vh] object-contain rounded" />
            )}
            
            <div className="mt-4 text-center text-white">
              <h2 className="text-2xl font-bold">{language === 'ta' && selectedMedia.titleTa ? selectedMedia.titleTa : selectedMedia.title}</h2>
              {(language === 'ta' && selectedMedia.descriptionTa ? selectedMedia.descriptionTa : selectedMedia.description) && (
                <p className="mt-2 text-gray-300">{language === 'ta' && selectedMedia.descriptionTa ? selectedMedia.descriptionTa : selectedMedia.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
