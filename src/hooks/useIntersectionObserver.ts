import { useEffect, useRef, useState, useMemo } from 'react'

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean
  initialIsIntersecting?: boolean
}

export function useIntersectionObserver({
  threshold = 0.1,
  root = null,
  rootMargin = '0px',
  freezeOnceVisible = false,
  initialIsIntersecting = false,
}: UseIntersectionObserverOptions = {}): [
  React.RefObject<HTMLElement>,
  boolean,
  IntersectionObserverEntry | undefined
] {
  const elementRef = useRef<HTMLElement>(null)
  const [isIntersecting, setIsIntersecting] = useState(initialIsIntersecting)
  const [entry, setEntry] = useState<IntersectionObserverEntry>()

  const observer = useMemo(() => {
    if (typeof window === 'undefined') return null
    
    return new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting
        setEntry(entry)

        if (!freezeOnceVisible || !isElementIntersecting) {
          setIsIntersecting(isElementIntersecting)
        }
      },
      { threshold, root, rootMargin }
    )
  }, [threshold, root, rootMargin, freezeOnceVisible])

  useEffect(() => {
    const element = elementRef.current
    if (!element || !observer) return

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [observer])

  return [elementRef, isIntersecting, entry]
}

export default useIntersectionObserver