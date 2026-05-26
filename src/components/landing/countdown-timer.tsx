'use client'

import { useState, useEffect } from 'react'

interface CountdownTimerProps {
  totalSeconds: number
  className?: string
}

export function CountdownTimer({ totalSeconds, className = '' }: CountdownTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds)

  useEffect(() => {
    if (secondsLeft <= 0) return
    const interval = setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [secondsLeft])

  const hours = Math.floor(secondsLeft / 3600)
  const minutes = Math.floor((secondsLeft % 3600) / 60)
  const seconds = secondsLeft % 60

  const pad = (n: number) => n.toString().padStart(2, '0')

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-1">
        <span className="countdown-digit bg-cyber-card border border-cyber-border rounded-md px-2 py-1 text-tricolor-yellow font-bold text-lg min-w-[2.5rem] text-center">
          {pad(hours)}
        </span>
        <span className="text-tricolor-yellow font-bold text-lg">:</span>
        <span className="countdown-digit bg-cyber-card border border-cyber-border rounded-md px-2 py-1 text-tricolor-yellow font-bold text-lg min-w-[2.5rem] text-center">
          {pad(minutes)}
        </span>
        <span className="text-tricolor-yellow font-bold text-lg">:</span>
        <span className="countdown-digit bg-cyber-card border border-cyber-border rounded-md px-2 py-1 text-tricolor-yellow font-bold text-lg min-w-[2.5rem] text-center">
          {pad(seconds)}
        </span>
      </div>
    </div>
  )
}
