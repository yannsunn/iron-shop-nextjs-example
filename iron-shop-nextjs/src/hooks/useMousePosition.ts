import { useState, useEffect, RefObject } from 'react'

interface MousePosition {
  x: number
  y: number
  elementX: number
  elementY: number
  elementPositionX: number
  elementPositionY: number
}

export function useMousePosition(elementRef?: RefObject<HTMLElement>): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    elementX: 0,
    elementY: 0,
    elementPositionX: 0,
    elementPositionY: 0,
  })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      let elementX = 0
      let elementY = 0
      let elementPositionX = 0
      let elementPositionY = 0

      if (elementRef?.current) {
        const rect = elementRef.current.getBoundingClientRect()
        elementX = e.clientX - rect.left
        elementY = e.clientY - rect.top
        elementPositionX = rect.left
        elementPositionY = rect.top
      }

      setMousePosition({
        x: e.clientX,
        y: e.clientY,
        elementX,
        elementY,
        elementPositionX,
        elementPositionY,
      })
    }

    document.addEventListener('mousemove', updateMousePosition)

    return () => {
      document.removeEventListener('mousemove', updateMousePosition)
    }
  }, [elementRef])

  return mousePosition
}

export default useMousePosition