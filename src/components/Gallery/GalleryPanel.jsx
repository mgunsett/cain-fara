import { forwardRef } from 'react'
import { Box } from '@chakra-ui/react'
import { useReducedMotion } from 'framer-motion'
import { EASE, LABEL, MotionButton, MotionImg, MotionSpan, dur, pad } from './galleryShared'
import { PanelCaption } from './PanelCaption'

// Panel del acordeón: franja angosta inactiva que crece (flex-grow) al activarse
export const GalleryPanel = forwardRef(function GalleryPanel(
  { photo, index, total, isActive, canExpand, onClick },
  ref,
) {
  const reduce = useReducedMotion()
  const desc = photo.alt || photo.title

  return (
    <MotionButton
      ref={ref}
      type="button"
      data-group=""
      tabIndex={isActive ? 0 : -1}
      aria-label={`Foto ${index + 1} de ${total}${desc ? `: ${desc}` : ''}${
        isActive && canExpand ? '. Abrir en pantalla completa' : ''
      }`}
      aria-current={isActive ? 'true' : undefined}
      onClick={onClick}
      position="relative"
      overflow="hidden"
      flexBasis={0}
      minW={{ base: 0, md: 14 }}
      minH={{ base: 12, md: 0 }}
      p={0}
      m={0}
      border={0}
      borderRadius="lg"
      bg="brand.panel"
      color="brand.bone"
      textAlign="left"
      cursor={isActive ? (canExpand ? 'zoom-in' : 'default') : 'pointer'}
      _focusVisible={{ outline: '3px solid', outlineColor: 'brand.amber', outlineOffset: '3px' }}
      initial={false}
      animate={{ flexGrow: isActive ? 8 : 1 }}
      transition={{ duration: dur(reduce, 0.7), ease: EASE }}
    >
      <MotionImg
        src={photo.src}
        alt=""
        loading={index === 0 ? 'eager' : 'lazy'}
        decoding="async"
        draggable={false}
        position="absolute"
        inset={0}
        w="100%"
        h="100%"
        objectFit="cover"
        objectPosition={photo.focus ?? 'center'}
        initial={false}
        animate={{ scale: isActive ? 1 : 1.15 }}
        transition={{ duration: dur(reduce, 1.2), ease: EASE }}
      />

      {/* velo de los inactivos (se aclara en hover) */}
      <MotionSpan
        aria-hidden="true"
        position="absolute"
        inset={0}
        bg="rgba(23,12,13,0.45)"
        sx={{ transitionProperty: 'background-color', transitionDuration: '.3s' }}
        _groupHover={{ bg: 'rgba(23,12,13,0.2)' }}
        initial={false}
        animate={{ opacity: isActive ? 0 : 1 }}
        transition={{ duration: dur(reduce, 0.4) }}
      />

      {/* degradado del activo para legibilidad del pie */}
      <MotionSpan
        aria-hidden="true"
        position="absolute"
        inset={0}
        backgroundImage="linear-gradient(to top, rgba(23,12,13,0.9), rgba(23,12,13,0) 55%)"
        initial={false}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: dur(reduce, 0.5) }}
      />

      {/* rótulo de los inactivos: vertical en desktop, horizontal en mobile */}
      <Box
        as="span"
        aria-hidden="true"
        position="absolute"
        pointerEvents="none"
        left={{ base: 5, md: '50%' }}
        bottom={{ base: '50%', md: 5 }}
        transform={{ base: 'translateY(50%)', md: 'translateX(-50%) rotate(180deg)' }}
        sx={{ writingMode: { base: 'horizontal-tb', md: 'vertical-rl' } }}
      >
        <MotionSpan
          display="block"
          whiteSpace="nowrap"
          {...LABEL}
          initial={false}
          animate={{ opacity: isActive ? 0 : 1 }}
          transition={{ duration: dur(reduce, 0.3), delay: isActive ? 0 : dur(reduce, 0.35) }}
        >
         
        </MotionSpan>
      </Box>

      <PanelCaption photo={photo} index={index} show={isActive} canExpand={canExpand} />
    </MotionButton>
  )
})
