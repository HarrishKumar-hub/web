'use client'

import { useState } from 'react'
import { Language } from '@/lib/translations'
import { useAuth } from '@/lib/useAuth'

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
    setAmount(Number(e.target.value))
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
          ...(user ? { 'Authorization': \`Bearer \${localStorage.getItem('auth_token')}\` } : {})
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

      // If Stripe returns a URL, redirect to checkout
      if (data.url) {
        window.location.href = data.url
      } else {
        // Fallback for mock environments without active Stripe keys
        alert(language === 'ta' ? 'நன்கொடைக்கு நன்றி! (செயல்முறை முறை)' : 'Thank you for your donation Request! (Mock Mode)')
      }

    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl border border-orange-50 max-w-lg mx-auto transform transition-all hover:shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
          {language === 'ta' ? 'உங்கள் நன்கொடையைத் தேர்ந்தெடுக்கவும்' : 'Select Your Contribution'}
        </h2>
        <p className="text-slate-500 font-medium">
          {language === 'ta' ? 'ஒவ்வொரு சிறு தொகையும் சமூகத்திற்கு உதவுகிறது.' : 'Every contribution supports the temple events and daily annadhanam.'}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 text-sm font-bold border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleDonateSubmit} className="space-y-6">
        {/* Donation Type Toggle */}
        <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
          <button
            type="button"
            onClick={() => setIsRecurring(false)}
            className={\`flex-1 py-3 text-sm font-bold rounded-lg transition-all \${!isRecurring ? 'bg-white shadow text-orange-700' : 'text-slate-500 hover:text-slate-700'}\`}
          >
            {language === 'ta' ? 'ஒரு முறை' : 'One-Time'}
          </button>
          <button
            type="button"
            onClick={() => setIsRecurring(true)}
            className={\`flex-1 py-3 text-sm font-bold rounded-lg transition-all \${isRecurring ? 'bg-white shadow text-orange-700' : 'text-slate-500 hover:text-slate-700'}\`}
          >
            {language === 'ta' ? 'மாதாந்திர' : 'Monthly'}
          </button>
        </div>

        {/* Preset Amounts */}
        <div className="grid grid-cols-2 gap-4">
          {AMOUNTS.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => handlePresetSelect(amt)}
              className={\`py-4 rounded-xl font-black text-lg transition-all border-2 \${
                amount === amt && !customAmount
                  ? 'bg-orange-50 border-orange-500 text-orange-700 ring-4 ring-orange-500/20'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-orange-300'
              }\`}
            >
              ₹{amt}
            </button>
          ))}
        </div>

        {/* Custom Amount */}
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">₹</span>
          <input
            type="number"
            min="1"
            placeholder={language === 'ta' ? 'வேறொரு தொகை...' : 'Custom Amount...'}
            value={customAmount}
            onChange={handleCustomChange}
            className="w-full pl-10 pr-4 py-4 bg-slate-50 border-2 border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-0 focus:border-orange-500 focus:bg-white font-bold text-lg transition-all placeholder:text-slate-400 placeholder:font-medium"
          />
        </div>

        {/* Info Box */}
        <div className="bg-orange-50 p-4 rounded-xl flex gap-3 text-sm text-orange-800">
          <span className="text-xl">🔒</span>
          <p className="font-medium">
            {language === 'ta' 
              ? 'பணம் செலுத்துதல் 256-பிட் குறியாக்கத்துடன் பாதுகாக்கப்பட்டுள்ளது.' 
              : 'Payments are secured with 256-bit encryption. Handled strictly by our payment partners.'}
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-extrabold text-lg shadow-lg hover:shadow-orange-200 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {language === 'ta' ? 'செயலாக்குகிறது...' : 'Processing...'}
            </span>
          ) : (
            language === 'ta' ? \`₹\${amount} நன்கொடை அளியுங்கள்\` : \`Donate ₹\${amount}\`
          )}
        </button>
      </form>
    </div>
  )
}
