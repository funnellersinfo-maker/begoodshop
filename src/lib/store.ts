import { create } from 'zustand'

interface CartState {
  gender: 'hombre' | 'mujer' | 'pareja' | null
  size: 'S' | 'M' | 'L' | 'XL' | null
  sizeFemale: 'S' | 'M' | 'L' | 'XL' | null
  userType: 'detal' | 'mayorista' | null
  setGender: (g: CartState['gender']) => void
  setSize: (s: CartState['size']) => void
  setSizeFemale: (s: CartState['sizeFemale']) => void
  setUserType: (t: CartState['userType']) => void
  reset: () => void
}

const initialState = {
  gender: null as CartState['gender'],
  size: null as CartState['size'],
  sizeFemale: null as CartState['sizeFemale'],
  userType: null as CartState['userType'],
}

export const useCartStore = create<CartState>()((set) => ({
  ...initialState,
  setGender: (g) => set({ gender: g }),
  setSize: (s) => set({ size: s }),
  setSizeFemale: (s) => set({ sizeFemale: s }),
  setUserType: (t) => set({ userType: t }),
  reset: () => set(initialState),
}))

export function getWhatsAppMessage(state: CartState): string {
  const { gender, size, sizeFemale, userType } = state

  if (userType === 'mayorista') {
    return 'Hola Pipe! Vi la landing de Central Tricolor y quiero congelar la tarifa al por mayor. Me interesa arrancar ya. 🦈'
  }

  if (gender === 'pareja') {
    return `Hola Pipe! Vi la landing de Central Tricolor y quiero asegurar mi Combo Pareja Caballero Talla ${size} + Dama Talla ${sizeFemale} — activar mi BONO SORPRESA con envío gratis contra entrega. 🇨🇴`
  }

  const modelo = gender === 'hombre' ? 'Caballero' : 'Dama'
  return `Hola Pipe! Vi la landing de Central Tricolor y quiero asegurar mi camiseta ${modelo} Talla ${size} — activar mi BONO SORPRESA de $60.000 con envío gratis contra entrega. 🇨🇴`
}

export function getWhatsAppUrl(state: CartState): string {
  const message = getWhatsAppMessage(state)
  return `https://wa.me/573003280350?text=${encodeURIComponent(message)}`
}
