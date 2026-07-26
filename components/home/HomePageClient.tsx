'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/lib/useAuth'
import { useState, useEffect } from 'react'
import { t, type Language } from '@/lib/translations'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame, MapPin } from 'lucide-react'
import { HERO_BACKGROUNDS, QUICK_ACTIONS, FEATURE_CARDS } from '@/lib/constants'

export default function HomePageClient() {
  const { isAuthenticated } = useAuth()
  const [language, setLanguage] = useState<Language>('en')
  const [bgIndex, setBgIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setBgIndex((prev) => (prev + 1) % HERO_BACKGROUNDS.length), 5500)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <Header currentLanguage={language} onLanguageChange={setLanguage} />

      <main className="bg-ivory overflow-hidden">

        {/* ── HERO — Full Screen Slideshow ────────────────── */}
        <section className="relative h-screen overflow-hidden">
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={bgIndex}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.2, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <Image
                  src={HERO_BACKGROUNDS[bgIndex].src}
                  alt="Temple Background"
                  fill
                  priority={bgIndex === 0}
                  className="object-cover"
                  style={{ objectPosition: HERO_BACKGROUNDS[bgIndex].position }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Vignette blending to ivory */}
            <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-ivory to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/20 to-transparent z-10 pointer-events-none" />
          </div>

          {/* Slide indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {HERO_BACKGROUNDS.map((_, i) => (
              <button
                key={i}
                onClick={() => setBgIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 transition-all duration-700 rounded-full ${
                  i === bgIndex ? 'w-10 bg-saffron' : 'w-3 bg-ivory/40'
                }`}
              />
            ))}
          </div>
        </section>

        {/* ── TEMPLE IDENTITY — Below Hero ─────────────────── */}
        <section className="bg-ivory py-32 text-center relative z-10 overflow-hidden">
          {/* Divine Glow behind title */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] divine-glow-gold rounded-full opacity-50 pointer-events-none" />
          
          <div className="container-custom flex flex-col items-center relative z-10">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="badge-sacred mb-8 backdrop-blur-md"
            >
              <Flame className="w-3 h-3 animate-lamp-flicker" />
              <span>Divine Presence</span>
            </motion.div>

            {/* Temple Name */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold tracking-tighter leading-none max-w-6xl mb-6"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-gold-dark via-gold to-saffron-dark drop-shadow-sm">
                {language === 'ta' ? 'ஸ்ரீ கருப்பசாமி திருக்கோவில்' : 'Sri Karuppusamy Thirukovil'}
              </span>
            </motion.h1>

            {/* Location ornament */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-8 mb-10"
            >
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold/40" />
              <p className="text-sacred-ash font-black uppercase tracking-[0.5em] text-[10px] text-gold-dark/80">
                Mathanaickenpatti Sanctuary
              </p>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold/40" />
            </motion.div>

            {/* Tagline with deeper contrast */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-xl md:text-2xl mb-14 max-w-3xl text-sacred-ash/90 leading-relaxed font-lora italic"
            >
              {language === 'ta'
                ? 'புனிதமான அமைதி மற்றும் பக்தியின் புகலிடம். தெய்வத்தின் ஆன்மீக சாரத்தை அனுபவிக்கவும்.'
                : 'A divine sanctuary of peace and devotion. Experience the spiritual essence of the protector deity.'}
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-5 justify-center"
            >
              <Link href="/donations" className="btn-sacred px-14 flex items-center justify-center gap-2">
                <Flame className="w-4 h-4" /> {language === 'ta' ? 'நன்கொடை' : 'Offer Devotion'}
              </Link>
              <Link href="/booking" className="btn-outline-gold px-14">
                {t('nav.booking', language)}
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── QUICK ACTIONS ─────────────────────────────────── */}
        <section className="py-32 bg-ivory-warm relative overflow-hidden">
          {/* Subtle radial bg accent */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(232,114,42,0.06) 0%, transparent 100%)' }}
          />

          {/* Heritage Border Patterns */}
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-gold/5 to-transparent pointer-events-none opacity-40 HeritagePatternRotate" />

          <div className="container-custom relative z-10">
            <div className="text-center mb-20">
              <span className="section-label-gold">Sacred Pathway</span>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-gold-dark tracking-tight">
                Gateway to Devotion
              </h2>
            </div>
            
            {/* Asymmetrical Grid Layout */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8"
            >
              {QUICK_ACTIONS.map((action, idx) => {
                const label = action.labelKey
                  ? t(action.labelKey, language)
                  : language === 'ta' ? action.labelTa! : action.label!
                
                // Asymmetrical spans to break the grid
                const spans = [
                  "lg:col-span-4", // Item 1 (Large)
                  "lg:col-span-3", // Item 2
                  "lg:col-span-5", // Item 3 (Extra Large)
                  "lg:col-span-3", // Item 4
                  "lg:col-span-5", // Item 5 (Extra Large)
                  "lg:col-span-4", // Item 6
                ][idx % 6];
                
                return (
                  <motion.div
                    key={idx}
                    className={`${spans} col-span-1`}
                    variants={{
                      hidden: { opacity: 0, scale: 0.95 },
                      visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
                    }}
                  >
                    <Link href={action.href} className="group flex flex-col items-center h-full">
                      <div className="w-full h-full min-h-[160px] rounded-[40px] border border-gold/15 bg-ivory flex flex-col items-center justify-center p-8 text-center transition-all duration-700 hover:border-saffron/50 hover:shadow-golden-lg hover:-translate-y-3 relative overflow-hidden">
                        {/* Heritage Motifs inside cards */}
                        <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none" style={{ backgroundImage: 'var(--heritage-pattern)' }} />
                        
                        <div className="mb-4 relative z-10 group-hover:scale-125 transition-transform duration-700 text-saffron drop-shadow-flame">
                          {action.icon}
                        </div>
                        <span className="text-xs font-black text-sacred-ash group-hover:text-saffron-dark uppercase tracking-[0.3em] relative z-10 leading-tight transition-colors">
                          {label}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ── FEATURE CARDS ─────────────────────────────────── */}
        <section className="py-32 bg-ivory border-t border-gold/10">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-center mb-20"
            >
              <span className="section-label">What Awaits You</span>
              <h2 className="text-5xl font-serif font-bold text-gold-dark tracking-tight mb-5">
                Divine Services
              </h2>
              <div className="h-1 w-20 bg-saffron-glow mx-auto rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {FEATURE_CARDS.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.18 }}
                  className="h-full"
                >
                  <Link href={'hrefAuth' in card ? (isAuthenticated ? card.hrefAuth! : card.hrefGuest!) : card.href!} className="group block h-full">
                    <div className="h-full p-10 md:p-12 rounded-[48px] border border-gold/12 bg-ivory hover:border-saffron/30 transition-all duration-600 hover:shadow-flame flex flex-col relative overflow-hidden">
                      {/* Top saffron accent bar on hover */}
                      <div className="absolute top-0 left-8 right-8 h-0.5 bg-saffron-glow scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />
                      <div className="mb-8 transition-transform duration-600 group-hover:scale-110 group-hover:rotate-6 origin-left">
                        {card.icon}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-serif font-bold text-gold-dark mb-5 group-hover:text-saffron-dark transition-colors duration-400">
                        {t(card.titleKey, language)}
                      </h3>
                      <p className="text-sacred-ash/70 leading-relaxed font-lora mb-8 flex-grow text-base">
                        {language === 'ta' ? card.descTa : card.descEn}
                      </p>
                      <div className="mt-auto flex items-center gap-3 text-saffron font-black text-[10px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all -translate-x-3 group-hover:translate-x-0 duration-400">
                        Explore <span>→</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LOCATION ──────────────────────────────────────── */}
        <section className="py-32 bg-ivory-warm relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 50% 60% at 80% 50%, rgba(123,28,28,0.04) 0%, transparent 100%)' }}
          />
          <div className="container-custom relative z-10">
            <div className="flex flex-col lg:flex-row gap-20 items-center">

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="lg:w-1/2"
              >
                <span className="section-label">The Map to Peace</span>
                <h2 className="text-5xl md:text-6xl font-serif font-bold text-gold-dark mb-10 leading-tight tracking-tight">
                  Sacred Pilgrimage Path
                </h2>
                <div className="flex gap-6 items-start mb-10">
                  <div className="w-14 h-14 rounded-2xl bg-ivory border border-saffron/20 flex items-center justify-center shadow-flame/20 flex-shrink-0">
                    <MapPin className="w-6 h-6 text-saffron" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-gold-dark text-xl mb-2">Temple Address</h4>
                    <p className="text-sacred-ash/80 font-lora text-lg leading-relaxed">
                      {language === 'ta'
                        ? 'மதநாயக்கன்பட்டி, மேட்டூர் தாலுக்கா,\nசேலம் மாவட்டம், தமிழ்நாடு 636453'
                        : 'Mathanaickenpatti, Mettur Taluk,\nSalem District, Tamil Nadu 636453'}
                    </p>
                  </div>
                </div>
                <a
                  href="https://maps.app.goo.gl/placeholder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 text-saffron font-black uppercase tracking-[0.35em] text-[10px] border-b-2 border-saffron/25 pb-2 hover:border-saffron transition-all hover:gap-6 duration-400"
                >
                  View on Google Maps <span>↗</span>
                </a>
              </motion.div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, x: 40 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="lg:w-1/2 w-full aspect-video rounded-[60px] overflow-hidden shadow-temple border-[8px] border-ivory grayscale hover:grayscale-0 transition-all duration-[2000ms]"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15632.748123!2d78.1!3d11.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDMwJzAwLjAiTiA3OMKwMDYnMDAuMCJF!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            </div>
          </div>
        </section>

      </main>

      <Footer currentLanguage={language} />
    </>
  )
}
