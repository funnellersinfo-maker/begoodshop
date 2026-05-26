'use client'

import { motion } from 'framer-motion'

const guarantees = [
  {
    icon: '🚚',
    title: 'Envío Gratis Contra Entrega',
    description: 'Solo pagas cuando tienes la camiseta en tus manos',
  },
  {
    icon: '🛡️',
    title: 'Garantía Exclusiva',
    description: 'Si no supera tus expectativas, te respaldamos',
  },
  {
    icon: '⭐',
    title: 'Calidad Premium',
    description: 'Escudo bordado HD · Dry-Fit · Costuras reforzadas',
  },
]

export function GuaranteesSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {guarantees.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-cyber-card border border-cyber-border rounded-2xl p-6 text-center card-hover-lift"
            >
              <span className="text-4xl mb-4 block">{item.icon}</span>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
