'use client'

export function Footer() {
  return (
    <footer className="mt-auto py-6 px-4 border-t border-cyber-border" role="contentinfo">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-sm text-gray-400 mb-2">
          ⚡ Central Tricolor — La Tricolor no se negocia 🇨🇴
        </p>
        <p className="text-xs text-gray-600">
          WhatsApp: <a href="https://wa.me/573003280350" className="hover:text-tricolor-green transition-colors" aria-label="Contactar por WhatsApp">+57 300 328 0350</a>
          {' · '}Envíos a toda Colombia
        </p>
        <p className="text-xs text-gray-700 mt-1">
          © {new Date().getFullYear()} Central Tricolor. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
