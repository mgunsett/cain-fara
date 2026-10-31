import { useEffect, useRef } from 'react'
import { Box, Text, Image } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)
const MotionImage = motion(Image)

// Visor a pantalla completa: Escape cierra, flechas y swipe navegan
export function Lightbox({ photo, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft')  onPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onPrev, onNext])

  const touchStart = useRef(0)

  return (
    <MotionBox
      position="fixed" inset={0} zIndex={900}
      bg="rgba(0,0,0,0.93)"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      display="flex" alignItems="center" justifyContent="center"
      onClick={onClose}
      onTouchStart={(e) => { touchStart.current = e.touches[0].clientX }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchStart.current
        if (dx > 50) onPrev()
        if (dx < -50) onNext()
      }}
    >
      <MotionImage
        key={photo.src}
        src={photo.src} alt={photo.alt}
        maxH="78vh" maxW="90vw"
        objectFit="contain"
        borderRadius="12px"
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        draggable={false}
      />

      {/* Navigation wings */}
      <Box position="absolute" left={{ base: 50, lg: 80 }} top={0} bottom={0} w="15%"
           display={{ base: 'none', lg: 'flex' }} alignItems="center" justifyContent="center"
           onClick={(e) => { e.stopPropagation(); onPrev() }}
           cursor="pointer" opacity={0.4} _hover={{ opacity: 1 }} transition="opacity 0.2s">
        <Text fontFamily="heading" fontSize="4xl" color="white">‹</Text>
      </Box>
      <Box position="absolute" right={{ base: 50, lg: 80 }} top={0} bottom={0} w="15%"
           display={{ base: 'none', lg: 'flex' }} alignItems="center" justifyContent="center"
           onClick={(e) => { e.stopPropagation(); onNext() }}
           cursor="pointer" opacity={0.4} _hover={{ opacity: 1 }} transition="opacity 0.2s">
        <Text fontFamily="heading" fontSize="4xl" color="white">›</Text>
      </Box>
      {/* Close */}
      <Box
        as="button" aria-label="Cerrar foto"
        position="absolute" top={16} right={40}
        cursor="pointer" opacity={0.5} transition="opacity 0.2s"
        onClick={onClose}
      >
        <Text fontFamily="heading" fontSize="2xl" color="white" _hover={{ opacity: 1, color: '#ec8496' }}>✕</Text>
      </Box>
    </MotionBox>
  )
}
