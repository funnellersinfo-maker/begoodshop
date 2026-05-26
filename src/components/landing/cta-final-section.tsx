'use client'

import { motion } from 'framer-motion'
import { CountdownTimer } from './countdown-timer'
import { useCartStore, getWhatsAppUrl } from '@/lib/store'

export function CtaFinalSection() {
  const store = useCartStore()

  const handleWhatsApp = () => {
    // If no selection made, default to generic message
    const state = store.gender ? store : {
      gender: null as const,
      size: null as const,
      sizeFemale: null as const,
      userType: 'detal' as const,
      setGender: store.setGender,
      setSize: store.setSize,
      setSizeFemale: store.setSizeFemale,
      setUserType: store.setUserType,
      reset: store.reset,
    }

    const url = getWhatsAppUrl(state)

    // Track Meta Pixel
    if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).fbq) {
      ((window as unknown as Record<string, unknown>).fbq as (event: string, name: string) => void)('track', 'Purchase')
    }

    window.open(url, '_blank')
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-cyber-card border border-tricolor-yellow/30 rounded-2xl p-8 text-center glow-yellow"
        >
          {/* Countdown */}
          <div className="mb-6">
            <p className="text-sm text-gray-400 mb-2">⏰ Esta oferta expira en:</p>
            <CountdownTimer totalSeconds={7200} className="justify-center" />
          </div>

          {/* Badge */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex items-center gap-2 bg-tricolor-yellow/10 border border-tricolor-yellow/40 rounded-full px-5 py-2 mb-6"
          >
            <span className="text-tricolor-yellow font-bold text-sm">🎁 BONO SORPRESA ACTIVADO</span>
          </motion.div>

          {/* WhatsApp CTA */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWhatsApp}
            className="w-full bg-tricolor-green text-white font-black text-xl py-5 rounded-xl glow-green animate-whatsapp-pulse hover:bg-green-500 transition-colors cursor-pointer"
          >
            🟢 PEDIR POR WHATSAPP AHORA
          </motion.button>

          <p className="text-sm text-gray-400 mt-4">
            Serás redirigido a WhatsApp para confirmar con Pipe 🤝
          </p>
        </motion.div>
      </div>
    </section>
  )
}
