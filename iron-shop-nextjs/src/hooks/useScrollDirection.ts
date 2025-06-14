import { useState, useEffect } from 'react'

type ScrollDirection = 'up' | 'down' | null

export function useScrollDirection(threshold = 10): {
  scrollDirection: ScrollDirection
  scrollY: number
} {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let lastScrollY = window.pageYOffset
    let ticking = false

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false
        return
      }

      setScrollDirection(scrollY > lastScrollY ? 'down' : 'up')
      setScrollY(scrollY)
      lastScrollY = scrollY > 0 ? scrollY : 0
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDirection)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return { scrollDirection, scrollY }
}

export default useScrollDirection