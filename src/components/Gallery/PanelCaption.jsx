import { Flex, Text } from '@chakra-ui/react'
import { AnimatePresence, useReducedMotion } from 'framer-motion'
import { EASE, LABEL, MotionSpan, dur, pad } from './galleryShared'
import { GalleryIcon, ICONS } from './GalleryIcon'

// Contenido del panel activo: "FOTO 03", ícono de ampliar y pie con tag, título y meta
export function PanelCaption({ photo, index, show, canExpand }) {
  const reduce = useReducedMotion()
  const meta = [photo.date, photo.author && `Foto: ${photo.author}`].filter(Boolean).join(' · ')

  return (
    <AnimatePresence>
      {show && (
        <MotionSpan
          key="active-content"
          display="block"
          position="absolute"
          inset={0}
          pointerEvents="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: dur(reduce, 0.25) }}
        >
          

          {canExpand && (
            <Flex
              as="span"
              position="absolute"
              top={4}
              right={4}
              boxSize={11}
              borderRadius="full"
              bg="rgba(23,12,13,0.6)"
              align="center"
              justify="center"
            >
              <GalleryIcon paths={ICONS.expand} size={18} />
            </Flex>
          )}

          <MotionSpan
            position="absolute"
            left={0}
            right={0}
            bottom={0}
            p={{ base: 5, md: 8 }}
            display="flex"
            flexDirection="column"
            gap={2.5}
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur(reduce, 0.5), delay: dur(reduce, 0.3), ease: EASE }}
          >
           
            
            {meta && (
              <Text as="span" fontSize="sm" color="rgba(250,245,235,0.85)">
                {meta}
              </Text>
            )}
          </MotionSpan>
        </MotionSpan>
      )}
    </AnimatePresence>
  )
}
