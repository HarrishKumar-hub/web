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
      <div className="text-center py-24 bg-ivory-warm rounded-[48px] border-2 border-dashed border-gold/15">
        <div className="bg-ivory w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6 border border-gold/20 shadow-ivory">
          <Image className="w-10 h-10 text-gold-dark/20" strokeWidth={1} />
        </div>
        <p className="text-sacred-ash/40 text-lg font-lora italic font-medium">{language === 'ta' ? 'படங்கள் கிடைக்கவில்லை' : 'The gallery awaits sacred contributions.'}</p>
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
              className="group relative cursor-pointer overflow-hidden rounded-[32px] bg-ivory-warm aspect-square shadow-golden-sm hover:shadow-golden-lg transition-all duration-500 border border-gold/5"
              onClick={() => setSelectedMedia(media)}
            >
              <img 
                src={media.thumbnailUrl || media.fileUrl} 
                alt={displayTitle} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gold-dark/90 via-gold-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                <span className="badge-sacred mb-2 text-[8px] max-w-fit shadow-flame/10">
                  {media.category}
                </span>
                <h3 className="text-ivory font-serif font-bold truncate text-lg leading-tight">{displayTitle}</h3>
              </div>
              {media.type === 'VIDEO' && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-xl group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-white fill-white ml-1" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gold-dark/95 backdrop-blur-sm p-4 md:p-12" onClick={closeModal}>
          <button className="absolute top-8 right-8 text-ivory/50 hover:text-white transition-all hover:rotate-90 z-50 p-2 bg-white/5 rounded-full border border-white/10">
            <X className="w-8 h-8" />
          </button>
          
          <div className="max-w-6xl w-full max-h-full flex flex-col items-center justify-center" onClick={e => e.stopPropagation()}>
            <div className="relative w-full shadow-2xl rounded-3xl overflow-hidden border border-white/10 group/modal">
              {selectedMedia.type === 'VIDEO' ? (
                <video controls className="w-full max-h-[75vh] bg-black" autoPlay src={selectedMedia.fileUrl}>
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img src={selectedMedia.fileUrl} alt="Gallery" className="w-full max-h-[75vh] object-contain bg-gold-dark/20" />
              )}
            </div>
            
            <div className="mt-8 text-center max-w-2xl px-4">
              <span className="badge-sacred mb-4 shadow-flame/10 backdrop-blur-md">
                {selectedMedia.category}
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-ivory mb-4 tracking-tight">
                {language === 'ta' && selectedMedia.titleTa ? selectedMedia.titleTa : selectedMedia.title}
              </h2>
              {(language === 'ta' && selectedMedia.descriptionTa ? selectedMedia.descriptionTa : selectedMedia.description) && (
                <p className="text-ivory/60 font-lora italic text-lg leading-relaxed">
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
