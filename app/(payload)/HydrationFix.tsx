'use client'

import { useEffect } from 'react'

export function HydrationFix() {
  useEffect(() => {
    // Remove Grammarly attributes that cause hydration warnings
    const body = document.body
    if (body) {
      body.removeAttribute('data-new-gr-c-s-check-loaded')
      body.removeAttribute('data-gr-ext-installed')
      body.removeAttribute('data-gr-ext-disabled')
    }
  }, [])

  return null
}

