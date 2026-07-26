'use client'

import { useState } from 'react'
import { Language } from '@/lib/translations'
import { useAuth } from '@/lib/useAuth'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, Lock, Play } from 'lucide-react'

const AMOUNTS = [101, 501, 1001, 5001]

export default function DonationForm({ language }: { language: Language }) {
  const { user } = useAuth()
  const [amount, setAmount] = useState<number>(1001)
  const [customAmount, setCustomAmount] = useState<string>('')
  const [isRecurring, setIsRecurring] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handlePresetSelect = (val: number) => {
    setAmount(val)
    setCustomAmount('')
  }

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value)
    if (e.target.value) setAmount(Number(e.target.value))
  }

  const handleDonateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    const finalAmount = customAmount ? Number(customAmount) : amount
    if (finalAmount < 1) {
      setError(language === 'ta' ? 'செல்லுபடியாகும் தொகையை உள்ளிடவும்' : 'Please enter a valid amount (Min ₹1)')
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(user ? { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` } : {})
        },
        body: JSON.stringify({
          amount: finalAmount,
          currency: 'INR',
          isRecurring,
          recurringFrequency: isRecurring ? 'monthly' : undefined
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to initialize payment')
      }

      if (data.url) {
        window.location.href = data.url
      } else {
        alert(language === 'ta' ? 'நன்கொடைக்கு நன்றி! (செயல்முறை முறை)' : 'Thank you for your divine contribution! (Mock Mode)')
      }

    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-10 md:p-14 rounded-[60px] shadow-golden-lg border border-gold/10 max-w-xl mx-auto"
    >
      <div className="text-center mb-12">
        <span className="text-gold-metallic font-black uppercase tracking-sacred text-[10px] mb-4 block">Sacred Offering</span>
        <h2 className="text-4xl font-serif font-bold text-gold-dark mb-4">
          {language === 'ta' ? 'உங்கள் பங்களிப்பைத் தேர்ந்தெடுக்கவும்' : 'Select Devotion'}
        </h2>
        <p className="text-gold-dark/50 font-sans font-medium">
          {language === 'ta' ? 'உங்கள் பங்களிப்பு கோவிலின் புனித பணிகளுக்கு உதவுகிறது.' : 'Every offering supports the daily rituals and temple community.'}
        </p>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-maroon/5 text-maroon p-5 rounded-3xl mb-8 text-sm font-bold border border-maroon/10 flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" /> {error}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleDonateSubmit} className="space-y-10">
        {/* Donation Type Toggle */}
        <div className="flex bg-gold/5 p-1.5 rounded-full border border-gold/10">
          <button
            type="button"
            onClick={() => setIsRecurring(false)}
            className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-full transition-all duration-500 ${!isRecurring ? 'bg-white shadow-md text-gold-dark' : 'text-gold-dark/40 hover:text-gold-dark'}`}
          >
            {language === 'ta' ? 'ஒரு முறை' : 'One-Time'}
          </button>
          <button
            type="button"
            onClick={() => setIsRecurring(true)}
            className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-full transition-all duration-500 ${isRecurring ? 'bg-white shadow-md text-gold-dark' : 'text-gold-dark/40 hover:text-gold-dark'}`}
          >
            {language === 'ta' ? 'மாதாந்திர' : 'Monthly'}
          </button>
        </div>

        {/* Preset Amounts */}
        <div className="grid grid-cols-2 gap-6">
          {AMOUNTS.map((amt) => (
            <motion.button
              key={amt}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => handlePresetSelect(amt)}
              className={`py-6 rounded-3xl font-serif font-bold text-2xl transition-all duration-500 border-2 ${
                amount === amt && !customAmount
                  ? 'bg-gold-metallic/5 border-gold-metallic text-gold-dark shadow-golden'
                  : 'bg-white border-gold/10 text-gold-dark/40 hover:border-gold/30'
              }`}
            >
              ₹{amt}
            </motion.button>
          ))}
        </div>

        {/* Custom Amount */}
        <div className="relative group">
          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gold-metallic font-bold text-2xl">₹</span>
          <input
            type="number"
            min="1"
            placeholder={language === 'ta' ? 'வேறொரு தொகை...' : 'Enter Custom Offering...'}
            value={customAmount}
            onChange={handleCustomChange}
            className="w-full pl-14 pr-8 py-6 bg-gold/5 border-2 border-gold/10 text-gold-dark rounded-3xl focus:outline-none focus:border-gold-metallic focus:bg-white font-serif font-bold text-2xl transition-all placeholder:text-gold-dark/20 placeholder:font-sans placeholder:text-sm placeholder:font-black placeholder:uppercase placeholder:tracking-[0.2em]"
          />
        </div>

        {/* Info Box */}
        <div className="bg-ivory-warm p-6 rounded-[30px] border border-gold/10 flex gap-4 text-[11px] text-sacred-ash/60 items-start shadow-inner">
          <Lock className="w-5 h-5 text-gold-dark/40 mt-0.5 flex-shrink-0" />
          <p className="font-sans font-medium leading-relaxed tracking-wide uppercase">
            {language === 'ta' 
              ? 'உங்கள் புனித பங்களிப்பு 256-பிட் குறியாக்கத்துடன் பாதுகாக்கப்பட்டுள்ளது.' 
              : 'Divine offerings are secured with temple-grade 256-bit encryption. Handled strictly by our spiritual financial partners.'}
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="btn-premium w-full shadow-golden py-6"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-3">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {language === 'ta' ? 'செயலாக்குகிறது...' : 'ALIGNING...'}
            </span>
          ) : (
            language === 'ta' ? `₹${amount} சமர்ப்பிக்கவும்` : `Submit ₹${amount}`
          )}
        </button>
      </form>
    </motion.div>
  )
}
