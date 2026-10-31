import { forwardRef, useEffect, useRef } from 'react'
import { Box, Image } from '@chakra-ui/react'
import { gsap } from 'gsap'
import heroBack1 from '@assets/hero/heroBack1.webp'
import heroBack2 from '@assets/hero/heroBack2.webp'

// Fotos de fondo en escala de grises, desvanecidas hacia abajo
const FADE = 'linear-gradient(to bottom, black 55%, transparent 95%)'

const BACK_IMAGES = [
  {
    src: heroBack1,
    alt: '',
    side: { left: { base: '-20%', md: '-4%', lg: '4%' } },
    h: { base: '70vh', lg: '92vh' },
  },
  {
    src: heroBack2,
    alt: '',
    side: { right: { base: '-25%', md: '-6%', lg: '2%' } },
    h: { base: '62vh', lg: '84vh' },
  },
]

export const HeroBackdrop = forwardRef(function HeroBackdrop(_, ref) {
  const imgRefs = useRef([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(imgRefs.current, { opacity: 1 })
      return
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(imgRefs.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.6, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <Box
      ref={ref}
      position="absolute"
      inset={0}
      zIndex={1}
      pointerEvents="none"
      aria-hidden="true"
    >
      {BACK_IMAGES.map((img, i) => (
        <Box
          key={img.src}
          ref={(el) => (imgRefs.current[i] = el)}
          position="absolute"
          bottom={0}
          {...img.side}
          h={img.h}
          style={{ opacity: 0 }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            h="100%"
            objectFit="contain"
            objectPosition="bottom"
            draggable={false}
            filter="grayscale(1) contrast(1.05)"
            opacity={{ base: 0.12, lg: 0.18 }}
            sx={{ maskImage: FADE, WebkitMaskImage: FADE }}
          />
        </Box>
      ))}
    </Box>
  )
})
