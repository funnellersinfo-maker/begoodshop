'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore, getWhatsAppUrl } from '@/lib/store'

type SizeOption = 'S' | 'M' | 'L' | 'XL'

interface ProductCardProps {
  image: string
  title: string
  subtitle: string
  price: string
  badge?: string
  badgeColor?: string
  isCombo?: boolean
  isMayorista?: boolean
  accentColor?: string
  glowClass?: string
}

const SIZES: SizeOption[] = ['S', 'M', 'L', 'XL']

function ProductCard({
  image,
  title,
  subtitle,
  price,
  badge,
  badgeColor = 'bg-tricolor-yellow/20 text-tricolor-yellow border-tricolor-yellow/40',
  isCombo = false,
  isMayorista = false,
  accentColor = 'border-tricolor-yellow/30',
  glowClass = 'hover:shadow-[0_12px_40px_rgba(250,204,21,0.15)]',
}: ProductCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [selectedSize, setSelectedSize] = useState<SizeOption | null>(null)
  const [selectedSizeFemale, setSelectedSizeFemale] = useState<SizeOption | null>(null)
  const [showFemaleSize, setShowFemaleSize] = useState(false)

  const { setGender, setSize, setSizeFemale, setUserType } = useCartStore()

  const handleChoose = () => {
    if (isMayorista) {
      // Direct WhatsApp for mayorista
      setUserType('mayorista')
      const url = getWhatsAppUrl({
        gender: null,
        size: null,
        sizeFemale: null,
        userType: 'mayorista',
        setGender: () => {},
        setSize: () => {},
        setSizeFemale: () => {},
        setUserType: () => {},
        reset: () => {},
      })
      // Track Meta Pixel
      if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).fbq) {
        ((window as unknown as Record<string, unknown>).fbq as (event: string, name: string) => void)('track', 'InitiateCheckout')
      }
      window.open(url, '_blank')
      return
    }
    setExpanded(!expanded)
  }

  const handleSizeSelect = (size: SizeOption) => {
    setSelectedSize(size)
    if (isCombo) {
      setShowFemaleSize(true)
    }
  }

  const handleWhatsApp = () => {
    const gender = isCombo ? 'pareja' : (title.includes('Caballero') ? 'hombre' : 'mujer')
    setGender(gender)
    setSize(selectedSize)
    setSizeFemale(isCombo ? selectedSizeFemale : null)
    setUserType('detal')

    const url = getWhatsAppUrl({
      gender,
      size: selectedSize,
      sizeFemale: isCombo ? selectedSizeFemale : null,
      userType: 'detal',
      setGender: () => {},
      setSize: () => {},
      setSizeFemale: () => {},
      setUserType: () => {},
      reset: () => {},
    })

    // Track Meta Pixel
    if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).fbq) {
      ((window as unknown as Record<string, unknown>).fbq as (event: string, name: string) => void)('track', 'Purchase')
    }

    window.open(url, '_blank')
  }

  const canOrder = isCombo
    ? selectedSize !== null && selectedSizeFemale !== null
    : selectedSize !== null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={`relative bg-cyber-card border ${accentColor} rounded-2xl overflow-hidden card-hover-lift ${glowClass} transition-all duration-300`}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute top-3 left-3 z-10">
          <span className={`${badgeColor} border rounded-full px-3 py-1 text-xs font-bold badge-shimmer`}>
            {badge}
          </span>
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-card via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
        <p className="text-sm text-gray-400 mb-3">{subtitle}</p>
        <p className="text-2xl font-black text-tricolor-yellow mb-4">{price}</p>

        {/* ELEGIR button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleChoose}
          className={`w-full font-bold py-3 rounded-xl transition-all cursor-pointer ${
            isMayorista
              ? 'bg-tricolor-cyan text-cyber-dark hover:bg-cyan-400 glow-cyan'
              : expanded
              ? 'bg-cyber-border text-gray-400'
              : 'bg-tricolor-yellow text-cyber-dark hover:bg-yellow-300 glow-yellow'
          }`}
        >
          {isMayorista ? '🦈 COTIZAR MAYORISTA' : expanded ? 'CERRAR' : '⚡ ELEGIR'}
        </motion.button>

        {/* Size selector */}
        <AnimatePresence>
          {expanded && !isMayorista && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {/* Male / Main size */}
              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-2">
                  {isCombo ? 'Talla Él:' : 'Selecciona tu talla:'}
                </p>
                <div className="flex gap-2">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSizeSelect(s)}
                      className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all cursor-pointer ${
                        selectedSize === s
                          ? 'size-btn-active'
                          : 'bg-cyber-border text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Female size for combo */}
              <AnimatePresence>
                {isCombo && showFemaleSize && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3">
                      <p className="text-sm text-gray-400 mb-2">Talla Ella:</p>
                      <div className="flex gap-2">
                        {SIZES.map((s) => (
                          <button
                            key={`f-${s}`}
                            onClick={() => setSelectedSizeFemale(s)}
                            className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all cursor-pointer ${
                              selectedSizeFemale === s
                                ? 'size-btn-active'
                                : 'bg-cyber-border text-gray-300 hover:bg-gray-600'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* WhatsApp button */}
              <AnimatePresence>
                {canOrder && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleWhatsApp}
                    className="w-full mt-4 bg-tricolor-green text-white font-black py-4 rounded-xl glow-green animate-whatsapp-pulse hover:bg-green-500 transition-colors text-lg cursor-pointer"
                  >
                    🟢 PEDIR POR WHATSAPP
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export function CatalogSection() {
  return (
    <section id="catalogo" className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-black text-center text-white mb-2"
        >
          Elige Tu Camiseta
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-400 mb-10"
        >
          Selecciona · Elige talla · Pide por WhatsApp
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Caballero */}
          <ProductCard
            image="/jersey-caballero.webp"
            title="Modelo Caballero"
            subtitle="Corte clásico · Horma perfecta"
            price="$60.000 COP"
            badge="🚚 Envío GRATIS"
          />

          {/* Dama */}
          <ProductCard
            image="/jersey-dama.webp"
            title="Modelo Dama"
            subtitle="Corte femenino · Diseñada para ti"
            price="$60.000 COP"
            badge="🚚 Envío GRATIS"
          />

          {/* Combo Pareja */}
          <ProductCard
            image="/jersey-combo.webp"
            title="Combo Pareja 🔥"
            subtitle="Caballero + Dama · Precio especial"
            price="Precio especial combo"
            badge="MÁS VENDIDO 🔥"
            badgeColor="bg-red-600/20 text-red-400 border-red-500/40"
            isCombo
          />

          {/* Mayorista */}
          <ProductCard
            image="/jersey-bg.webp"
            title="Al por Mayor 🦈"
            subtitle="Desde 12 unidades · $35.000 COP c/u"
            price="$35.000 COP c/u"
            badge="🤝 Contra entrega"
            badgeColor="bg-tricolor-cyan/20 text-tricolor-cyan border-tricolor-cyan/40"
            isMayorista
            accentColor="border-tricolor-cyan/30"
            glowClass="hover:shadow-[0_12px_40px_rgba(6,182,212,0.15)]"
          />
        </div>
      </div>
    </section>
  )
}
