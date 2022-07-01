import React, { useEffect, useRef, useState } from 'react'

export const useWindowMobile = (maxWidthMobile: number = 400) => {

  const [isMobile, setIsMobile] = useState(window.innerWidth <= maxWidthMobile)
  const [width, setWidth] = useState(window.innerWidth || 0)
  const [height, setHeight] = useState(window.innerHeight || 0)

  const isMounted = useRef(true)

  const handleResize = () => {
    if (!isMounted.current) return;

    setIsMobile(window.innerWidth <= maxWidthMobile)
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }

  // run on first render
  // useEffect(handleResize, [])
  
  // Ensures not to modify the state to an unmounted component
  useEffect(() => {
    return () => { isMounted.current = false }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return {
    width,
    height,
    isMobile   
  }
}
