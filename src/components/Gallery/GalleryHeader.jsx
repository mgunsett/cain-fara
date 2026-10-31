import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { AnimatePresence, useReducedMotion } from 'framer-motion'
import { CREAM_MUTED, EASE, LABEL, MotionSpan, dur, pad } from './galleryShared'

// Eyebrow + título a la izquierda, contador animado a la derecha
export function GalleryHeader({ eyebrow, title, titleId, active, total }) {
  const reduce = useReducedMotion()

  return (
    <Flex wrap="wrap" justify="space-between" align="flex-end" gap={6}>
      <Flex direction="column" gap={2}>
        <Text as="span" {...LABEL} color="brand.amber">
          {eyebrow}
        </Text>
        <Heading
          as="h2"
          id={titleId}
          m={0}
          fontFamily="heading"
          fontWeight={400}
          fontSize={{ base: '7xl', md: '112px' }}
          lineHeight={0.85}
          color="brand.bone"
        >
          {title}
        </Heading>
      </Flex>

      <Flex align="baseline" gap={2.5} fontFamily="heading" aria-hidden="true">
        <Box position="relative" overflow="hidden" fontSize={{ base: '80px', md: '120px' }} lineHeight={0.9}>
          {/* reserva el ancho del número */}
          <Box as="span" visibility="hidden">
            {pad(active + 1)}
          </Box>
          <AnimatePresence initial={false}>
            <MotionSpan
              key={active}
              position="absolute"
              left={0}
              top={0}
              initial={{ y: reduce ? 0 : '100%' }}
              animate={{ y: 0 }}
              exit={{ y: reduce ? 0 : '-100%' }}
              transition={{ duration: dur(reduce, 0.45), ease: EASE }}
            >
              {pad(active + 1)}
            </MotionSpan>
          </AnimatePresence>
        </Box>
        <Text as="span" fontSize={{ base: '28px', md: '4xl' }} color={CREAM_MUTED}>
          / {pad(total)}
        </Text>
      </Flex>
    </Flex>
  )
}
