import { useState } from 'react'
import { Language, t } from '@/lib/translations'
import { Play, X, Image } from 'lucide-react'

interface MediaGridProps {
  mediaFiles: any[]
  language: Language
}

export default function MediaGrid({ mediaFiles, language }: MediaGridProps) {
  const [selectedMedia, setSelectedMedia] = useState<any>(null)

  if (!mediaFiles || mediaFiles.length === 0) {
    return (
      <div className="text-center py-20 bg-stone-800/50 rounded-2xl border border-dashed border-brass/25">
        <div className="bg-stone-900 w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 border border-brass/25 shadow-inner">
          <Image className="w-8 h-8 text-stone-500" strokeWidth={1.5} />
        </div>
        <p className="text-stone-400 text-sm font-medium">{language === 'ta' ? 'படங்கள் கிடைக்கவில்லை' : 'No photos have been uploaded to the gallery yet.'}</p>
      </div>
    )
  }

  const closeModal = () => setSelectedMedia(null)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mediaFiles.map((media) => {
          const displayTitle = language === 'ta' && media.titleTa ? media.titleTa : media.title
          
          return (
            <div 
              key={media.id} 
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-stone-800 aspect-square shadow-golden border border-brass/25 hover:border-brass-400/50 transition-all duration-500"
              onClick={() => setSelectedMedia(media)}
            >
              <img 
                src={media.thumbnailUrl || media.fileUrl} 
                alt={displayTitle} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                onError={(e) => { e.currentTarget.src = '/hero_premium.png'; e.currentTarget.onerror = null; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5">
                <span className="px-2.5 py-1 bg-brass-400/20 border border-brass-400/30 text-brass-300 font-mono font-semibold text-[10px] uppercase tracking-[0.15em] rounded-full mb-2 max-w-fit">
                  {media.category}
                </span>
                <h3 className="text-stone-100 font-serif font-semibold truncate text-base leading-tight">{displayTitle}</h3>
              </div>
              {media.type === 'VIDEO' && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-stone-900/80 rounded-full flex items-center justify-center border border-brass/40 shadow-xl group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 text-brass-300 fill-brass-300 ml-0.5" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/95 p-4 md:p-12" onClick={closeModal}>
          <button className="absolute top-6 right-6 text-stone-400 hover:text-stone-100 transition-all hover:rotate-90 z-50 p-2 bg-stone-900/80 rounded-full border border-brass/30">
            <X className="w-6 h-6" />
          </button>
          
          <div className="max-w-6xl w-full max-h-full flex flex-col items-center justify-center" onClick={e => e.stopPropagation()}>
            <div className="relative w-full shadow-2xl rounded-2xl overflow-hidden border border-brass/30 bg-stone-900">
              {selectedMedia.type === 'VIDEO' ? (
                <video controls className="w-full max-h-[75vh] bg-black" autoPlay src={selectedMedia.fileUrl}>
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img src={selectedMedia.fileUrl} alt="Gallery" className="w-full max-h-[75vh] object-contain bg-stone-950" onError={(e) => { e.currentTarget.src = '/hero_premium.png'; e.currentTarget.onerror = null; }} />
              )}
            </div>
            
            <div className="mt-6 text-center max-w-2xl px-4">
              <span className="px-3.5 py-1.5 bg-brass-400/20 border border-brass-400/30 text-brass-300 font-mono font-semibold text-xs uppercase tracking-[0.15em] rounded-full mb-4 inline-block">
                {selectedMedia.category}
              </span>
              <h2 className="text-2xl md:text-4xl font-serif font-semibold text-stone-100 mb-3 tracking-tight">
                {language === 'ta' && selectedMedia.titleTa ? selectedMedia.titleTa : selectedMedia.title}
              </h2>
              {(language === 'ta' && selectedMedia.descriptionTa ? selectedMedia.descriptionTa : selectedMedia.description) && (
                <p className="text-stone-300 text-sm md:text-base leading-relaxed">
                  {language === 'ta' && selectedMedia.descriptionTa ? selectedMedia.descriptionTa : selectedMedia.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
