import { useEffect, useRef, useState, useCallback } from 'react'

// Hook for intersection observer animations
export const useIntersectionObserver = (options = {}) => {
  const [entries, setEntries] = useState([])
  const observer = useRef(null)

  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options
  }

  useEffect(() => {
    observer.current = new IntersectionObserver((observedEntries) => {
      setEntries(observedEntries)
    }, defaultOptions)

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [])

  const observe = (element) => {
    if (observer.current && element) {
      observer.current.observe(element)
    }
  }

  const unobserve = (element) => {
    if (observer.current && element) {
      observer.current.unobserve(element)
    }
  }

  return { entries, observe, unobserve }
}

// Hook for fade in up animation
export const useFadeInUp = () => {
  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const hasObserved = useRef(false)

  useEffect(() => {
    const element = elementRef.current
    if (element && !hasObserved.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true)
              hasObserved.current = true
              observer.disconnect()
            }
          })
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      )

      observer.observe(element)

      return () => {
        observer.disconnect()
      }
    }
  }, []) // Remove isVisible from dependencies to prevent re-creating observer

  return {
    ref: elementRef,
    className: isVisible ? 'fade-in-up' : ''
  }
}

// Hook for counter animation
export const useCounter = (target, duration = 2000) => {
  const [count, setCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const timerRef = useRef(null)

  // Use refs to track animation state to avoid dependency issues
  const isAnimatingRef = useRef(false)
  const hasStartedRef = useRef(false)
  
  const startAnimation = useCallback(() => {
    if (isAnimatingRef.current || hasStartedRef.current) return

    hasStartedRef.current = true
    isAnimatingRef.current = true
    setIsAnimating(true)
    
    const isPercentage = String(target).includes('%')
    const targetNumber = parseInt(String(target).replace(/[%+]/g, ''))
    const increment = targetNumber / (duration / 16) // 60 FPS
    let current = 0

    timerRef.current = setInterval(() => {
      current += increment
      if (current >= targetNumber) {
        current = targetNumber
        clearInterval(timerRef.current)
        isAnimatingRef.current = false
        setIsAnimating(false)
      }
      setCount(Math.floor(current))
    }, 16)
  }, [target, duration])
  
  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const displayValue = String(target).includes('%') ? `${count}%` : 
                     String(target).includes('+') ? `${count}+` : 
                     count.toString()

  return {
    count: displayValue,
    startAnimation,
    isAnimating
  }
}

// Hook for scroll effects
export const useScrollEffect = (callback, dependencies = []) => {
  // Use ref to track timeout to prevent closure issues
  const timeoutRef = useRef(null)
  
  // Memoize the debounced handler
  const debouncedHandler = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      callback()
    }, 10)
  }, [callback])

  useEffect(() => {
    window.addEventListener('scroll', debouncedHandler)
    
    return () => {
      window.removeEventListener('scroll', debouncedHandler)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [debouncedHandler, ...dependencies])
}

// Hook for mobile navigation
export const useMobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = useCallback(() => setIsOpen(prev => !prev), [])
  const close = useCallback(() => setIsOpen(false), [])
  const open = useCallback(() => setIsOpen(true), [])

  // Memoize escape handler
  const handleEscape = useCallback((e) => {
    if (e.key === 'Escape') {
      close()
    }
  }, [close])

  // Close on escape key
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, handleEscape])

  return {
    isOpen,
    toggle,
    close,
    open
  }
}
