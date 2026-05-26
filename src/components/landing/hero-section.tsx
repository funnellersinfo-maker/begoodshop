'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { CountdownTimer } from './countdown-timer'
import confetti from 'canvas-confetti'

export function HeroSection() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [viewers, setViewers] = useState(() => Math.floor(Math.random() * 20) + 30)

  useEffect(() => {
    // Tricolor confetti on load
    const duration = 3000
    const end = Date.now() + duration

    const colors = ['#FACC15', '#003893', '#CE1126']

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    frame()

    // Simulate viewers count fluctuation
    const interval = setInterval(() => {
      setViewers((prev) => prev + (Math.random() > 0.5 ? 1 : -1))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleCTAClick = () => {
    // Play audio
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Autoplay blocked, that's ok
      })
    }

    // Track Meta Pixel event
    if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).fbq) {
      ((window as unknown as Record<string, unknown>).fbq as (event: string, name: string) => void)('track', 'ViewContent')
    }

    // Scroll to catalog
    const catalog = document.getElementById('catalogo')
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Hero - Camisetas Selección Colombia">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/jersey-caballero.jpg')" }}
        role="img"
        aria-label="Camiseta Selección Colombia amarilla"
      />

      {/* Dark overlay */}
      <div className="hero-overlay absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Badge countdown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/40 rounded-full px-4 py-2 mb-6"
          >
            <span className="text-red-400 font-semibold text-sm">⏰ Oferta activa por 2 horas</span>
            <CountdownTimer totalSeconds={7200} />
          </motion.div>

          {/* Title */}
          <h1 className="text-5xl sm:text-7xl font-black mb-4 leading-tight">
            <span className="text-tricolor-yellow">Central</span>{' '}
            <span className="text-white">Tricolor</span>{' '}
            <span className="text-2xl sm:text-4xl">🇨🇴</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-gray-300 mb-4 font-medium">
            Camisetas Premium Selección Colombia
          </p>

          {/* Price */}
          <p className="text-lg sm:text-xl text-tricolor-yellow font-bold mb-8 glow-yellow inline-block px-4 py-2 rounded-lg bg-tricolor-yellow/10">
            Desde $60.000 · Envío Gratis Contra Entrega
          </p>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCTAClick}
            aria-label="Ver catálogo de camisetas"
            className="block w-full sm:w-auto mx-auto bg-tricolor-yellow text-cyber-dark font-black text-xl px-10 py-5 rounded-xl glow-yellow hover:bg-yellow-300 transition-colors cursor-pointer"
          >
            ⚡ VER CATÁLOGO
          </motion.button>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-6 animate-pulse-glow inline-flex items-center gap-2 bg-cyber-card/80 border border-cyber-border rounded-full px-4 py-2"
          >
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-300">
              🔥 {viewers} personas viendo esto ahora
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Audio element */}
      <audio ref={audioRef} src="/song-1-tricolor.mp3" preload="none" />
    </section>
  )
}
