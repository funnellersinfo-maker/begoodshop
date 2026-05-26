'use client'

import { useEffect, useRef, useState } from 'react'

export function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [activated, setActivated] = useState(false)

  useEffect(() => {
    if (activated) return

    const activate = () => {
      if (activated) return
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setActivated(true)
        }).catch(() => {
          // Autoplay still blocked, will retry on next interaction
        })
      }
    }

    // Listen for first user interaction: click, touch, scroll, keydown
    const events = ['click', 'touchstart', 'keydown', 'scroll'] as const
    const handlers = events.map((event) => {
      const handler = () => {
        activate()
        // Remove all listeners after first activation
        events.forEach((e) => document.removeEventListener(e, handler))
      }
      document.addEventListener(event, handler, { once: false, passive: true })
      return { event, handler }
    })

    return () => {
      handlers.forEach(({ event, handler }) => {
        document.removeEventListener(event, handler)
      })
    }
  }, [activated])

  return (
    <audio
      ref={audioRef}
      src="/song-modo-tricolor.mp3"
      loop
      preload="auto"
      style={{ display: 'none' }}
    />
  )
}
