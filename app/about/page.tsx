'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Language, t } from '@/lib/translations'
import { motion } from 'framer-motion'

const DEFAULT_SETTINGS = {
  templeName: 'Sri Karuppusamy Thirukovil',
  templeNameTa: 'ஸ்ரீ அய்யனார் கருப்பசாமி கோவில்',
  description: 'A sacred digital sanctuary dedicated to the protector Lord Ayyanar and Karuppasamy.',
  descriptionTa: 'ஸ்ரீ அய்யனார் மற்றும் கருப்பசாமிக்கு அர்ப்பணிக்கப்பட்ட புனித ஆன்மீகத் தளம்.',
  address: 'Mathanaickenpatti, Salem District, Tamil Nadu 636453',
  aboutContent: `Sri Karuppusamy Thirukovil at Mathanaickenpatti stands as a beacon of faith and community in Tamil Nadu. Dedicated to the village guardian deities Lord Ayyanar and Karuppasamy, this temple has been the spiritual heart of our community for generations.

The temple complex includes the main sanctum, a spacious mandapam for community events, and beautifully maintained grounds. Our priest conducts daily poojas at dawn and dusk, and special ceremonies are performed on auspicious days throughout the year.

We warmly welcome all devotees, visitors, and well-wishers to our temple. Together, we strive to keep the divine flame of faith burning bright.`,
  aboutContentTa: `மதநாயக்கன்பட்டியில் உள்ள ஸ்ரீ அய்யனார் கருப்பசாமி கோவில் தமிழ்நாட்டில் நம்பிக்கை மற்றும் சமூகத்தின் கலங்கரை விளக்கமாக நிற்கிறது. கிராமக் காவலர் தெய்வங்களான அய்யனார் மற்றும் கருப்பசாமிக்கு அர்ப்பணிக்கப்பட்ட இந்த கோவில் தலைமுறை தலைமுறையாக எங்கள் சமூகத்தின் ஆன்மீக இதயமாக இருந்து வருகிறது.

கோவில் வளாகத்தில் பிரதான சன்னிதி, சமூக நிகழ்வுகளுக்கான விசாலமான மண்டபம் மற்றும் அழகாக பராமரிக்கப்படும் மைதானம் ஆகியவை உள்ளன. எங்கள் அர்ச்சகர் அதிகாலையிலும் மாலையிலும் தினசரி பூஜைகளை நடத்துகிறார்.

அனைத்து பக்தர்களையும், பார்வையாளர்களையும், நலம் விரும்பிகளையும் எங்கள் கோவிலுக்கு அன்புடன் வரவேற்கிறோம். ஒன்றாக இணைந்து, நம்பிக்கையின் தெய்வீகச் சுடரை பிரகாசிக்கச் செய்ய முயற்சிப்போம்.`
}

export default function AboutPage() {
  const [language, setLanguage] = useState<Language>('en')
  const settings = DEFAULT_SETTINGS

  const name = language === 'ta' ? settings.templeNameTa : settings.templeName
  const description = language === 'ta' ? settings.descriptionTa : settings.description
  const aboutContent = language === 'ta' ? settings.aboutContentTa : settings.aboutContent

  return (
    <>
      <Header currentLanguage={language} onLanguageChange={setLanguage} />
      
      <main className="min-h-screen bg-ivory">
        {/* Page Header */}
        <section className="pt-36 pb-20 border-b border-gold/10 bg-ivory">
          <div className="container-custom text-center">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="section-label"
            >
              The Sacred Ancestry
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-5xl md:text-7xl font-serif font-bold text-gold-dark mb-8 tracking-tighter"
            >
              {name}
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="h-1 w-20 bg-saffron-glow mx-auto rounded-full mt-8"
            />
          </div>
        </section>

        {/* Portrait Section */}
        <section className="py-24 bg-ivory">
          <div className="container-custom">
            <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="lg:w-1/2 relative"
              >
                <div className="absolute inset-0 bg-gold blur-[100px] opacity-10 rounded-full animate-divine-flicker"></div>
                <div className="relative z-10 p-3 border border-gold/15 bg-ivory rounded-[40px] shadow-golden-lg">
                  <div className="aspect-[3/4] overflow-hidden rounded-[30px] border-4 border-saffron/20">
                    <img 
                      src="/deity_statue.png" 
                      alt="Sri Karuppusamy Thirukovil" 
                      className="w-full h-full object-cover grayscale transition-all duration-1000 hover:grayscale-0 hover:scale-105"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gold-dark mb-8 tracking-tight leading-tight">
                  {description}
                </h2>
                <div className="prose prose-temple max-w-none whitespace-pre-wrap mb-10">
                  <p>{aboutContent}</p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="card-temple p-6 border-l-4 border-l-maroon">
                    <span className="text-[10px] font-black text-saffron uppercase tracking-widest mb-1 block">Context</span>
                    <span className="text-gold-dark font-serif font-bold text-lg">Ancient Heritage</span>
                  </div>
                  <div className="card-temple p-6 border-l-4 border-l-maroon">
                    <span className="text-[10px] font-black text-saffron uppercase tracking-widest mb-1 block">Role</span>
                    <span className="text-gold-dark font-serif font-bold text-lg">Sacred Protector</span>
                  </div>
                  <div className="card-temple p-6 border-l-4 border-l-gold">
                    <span className="text-[10px] font-black text-saffron uppercase tracking-widest mb-1 block">Founded</span>
                    <span className="text-gold-dark font-serif font-bold text-lg">Generations Ago</span>
                  </div>
                  <div className="card-temple p-6 border-l-4 border-l-gold">
                    <span className="text-[10px] font-black text-saffron uppercase tracking-widest mb-1 block">Location</span>
                    <span className="text-gold-dark font-serif font-bold text-lg">Mathanaickenpatti</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer currentLanguage={language} />
    </>
  )
}
