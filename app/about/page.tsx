'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Language, t } from '@/lib/translations'
import { motion } from 'framer-motion'

const DEFAULT_SETTINGS = {
  templeName: 'Sri Karuppusamy Thirukovil',
  templeNameTa: 'ஸ்ரீ அய்யனார் கருப்பசாமி கோவில்',
  description: 'Official information about the deities, history, and traditions of Sri Karuppasamy Thirukovil, Mathanaickenpatti.',
  descriptionTa: 'மதநாயக்கன்பட்டி ஸ்ரீ கருப்பசாமி திருக்கோவிலின் வரலாறு, தெய்வங்கள் மற்றும் வழிபாட்டு முறைகள் குறித்த அதிகாரபூர்வ தகவல்.',
  address: 'Mathanaickenpatti, Salem District, Tamil Nadu 636453',
  aboutContent: `Sri Karuppusamy Thirukovil in Mathanaickenpatti, Salem District, serves as the spiritual and cultural pillar of our village community. Dedicated to Lord Ayyanar and Sri Karuppusamy, the guardian deities of our land, this temple has been revered and preserved by our ancestors for generations.

{/* TODO: Trustee to verify exact year of founding or earliest historical record */}
The temple complex features the main sanctum, a mandapam for community worship, and traditional grounds maintained by our village trust. Daily poojas are observed according to traditional customs at dawn and dusk, with special ceremonies conducted during auspicious Tamil calendar days and annual festivals.

We welcome all villagers, visiting devotees, and community members living abroad to participate in our temple traditions and support the ongoing preservation of our heritage.`,
  aboutContentTa: `சேலம் மாவட்டம் மதநாயக்கன்பட்டியில் அமைந்துள்ள ஸ்ரீ கருப்பசாமி திருக்கோவில், நமது கிராம மக்களின் நம்பிக்கை மற்றும் ஆன்மீக அடையாளமாகத் திகழ்கிறது. நமது மண்ணின் காவல் தெய்வங்களான ஸ்ரீ அய்யனார் மற்றும் ஸ்ரீ கருப்பசாமி ஆகியோரின் அருள்பெறும் இத்தலம், நமது முன்னோர்களால் தலைமுறை தலைமுறையாகப் போற்றிப் பாதுகாக்கப்பட்டு வருகிறது.

{/* TODO: கோவில் நிறுவப்பட்ட ஆண்டு அல்லது வரலாற்று ஆவணங்களை நிர்வாகக் குழு சரிபார்க்க வேண்டும் */}
கோவில் வளாகத்தில் பிரதான சன்னிதி, கூட்டு வழிபாட்டிற்கான மண்டபம் மற்றும் கிராம நிர்வாகக் குழுவால் பராமரிக்கப்படும் இடங்கள் உள்ளன. தினசரி பூஜைகள் மரபுப்படி காலை மற்றும் மாலையில் நடைபெறுகின்றன. தமிழ் மாத விசேஷ நாட்கள் மற்றும் ஆண்டுத் திருவிழாக்களில் சிறப்பு வழிபாடுகள் நடத்தப்படுகின்றன.

கிராம மக்கள், வெளியூரிலிருந்து வரும் பக்தர்கள் மற்றும் வெளிநாடுகளில் வாழும் நமது சமூகத்தினர் அனைவரும் கோவில் வழிபாடுகளில் பங்கேற்க அன்புடன் அழைக்கிறோம்.`
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
      
      <main className="min-h-screen bg-stone-900 text-stone-100">
        {/* Page Header */}
        <section className="pt-36 pb-20 border-b border-brass/20 bg-stone-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(176,138,79,0.2) 0%, transparent 60%)' }} />
          <div className="container-custom text-center relative z-10">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="section-label-gold block mb-3"
            >
              {language === 'ta' ? 'கோவில் வரலாறு' : 'Temple History & Deities'}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold text-stone-100 mb-6 tracking-tight"
            >
              {name}
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="h-1 w-24 bg-gradient-to-r from-transparent via-brass-400 to-transparent mx-auto rounded-full mt-6"
            />
          </div>
        </section>

        {/* Portrait Section */}
        <section className="py-20 md:py-28 bg-stone-900">
          <div className="container-custom">
            <div className="flex flex-col lg:flex-row items-center gap-14 md:gap-20">
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/2 relative w-full max-w-lg lg:max-w-none"
              >
                <div className="absolute inset-0 bg-brass/15 blur-[80px] rounded-full animate-divine-flicker"></div>
                <div className="relative z-10 p-3 border border-brass/30 bg-stone-800 rounded-[24px] shadow-golden">
                  <div className="aspect-[3/4] overflow-hidden rounded-[16px] border border-brass/20 bg-stone-950">
                    <img 
                      src="/deity_statue.png" 
                      alt="Sri Karuppusamy Thirukovil Deity" 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
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
                <h2 className="text-2xl md:text-4xl font-serif font-semibold text-stone-100 mb-6 tracking-tight leading-snug">
                  {description}
                </h2>
                <div className="text-stone-300 leading-relaxed whitespace-pre-wrap mb-10 text-base md:text-lg space-y-4">
                  <p>{aboutContent}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="card-temple p-6 border-l-2 border-l-brass-400 bg-stone-800/90">
                    <span className="text-xs font-semibold text-brass-400 uppercase tracking-[0.2em] mb-1.5 block">Context</span>
                    <span className="text-stone-100 font-serif font-semibold text-xl">{language === 'ta' ? 'பாரம்பரியம்' : 'Village Heritage'}</span>
                  </div>
                  <div className="card-temple p-6 border-l-2 border-l-brass-400 bg-stone-800/90">
                    <span className="text-xs font-semibold text-brass-400 uppercase tracking-[0.2em] mb-1.5 block">Role</span>
                    <span className="text-stone-100 font-serif font-semibold text-xl">{language === 'ta' ? 'காவல் தெய்வம்' : 'Guardian Deity'}</span>
                  </div>
                  <div className="card-temple p-6 border-l-2 border-l-brass-400 bg-stone-800/90">
                    <span className="text-xs font-semibold text-brass-400 uppercase tracking-[0.2em] mb-1.5 block">Founded</span>
                    <span className="text-stone-100 font-serif font-semibold text-xl">Generations Ago</span>
                  </div>
                  <div className="card-temple p-6 border-l-2 border-l-brass-400 bg-stone-800/90">
                    <span className="text-xs font-semibold text-brass-400 uppercase tracking-[0.2em] mb-1.5 block">Location</span>
                    <span className="text-stone-100 font-serif font-semibold text-xl">Mathanaickenpatti</span>
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
