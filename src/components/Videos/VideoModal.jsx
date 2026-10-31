import { useEffect } from 'react'
import { Box, AspectRatio } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'

const MotionBox = motion(Box)

// Modal fullscreen con el reproductor de TikTok (9:16)
export function VideoModal({ video, onClose }) {
  useEffect(() => {
    if (!video) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [video, onClose])

  return (
    <AnimatePresence>
      {video && (
        <MotionBox
          position="fixed"
          inset={0}
          zIndex={2000}
          bg="rgba(3,6,10,0.95)"
          backdropFilter="blur(12px)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={{ base: 4, md: 12 }}
          onClick={onClose}
        >
          <Box
            as="button"
            position="absolute"
            top={{ base: 16, md: 16 }}
            right={{ base: 1, md: 80 }}
            zIndex={2100}
            aria-label="Cerrar video"
            borderRadius="full"
            p={1}
            bg="rgba(10,5,5,0.4)"
            backdropFilter="blur(10px)"
            color="white"
            onClick={onClose}
            transition="color 0.3s ease, transform 0.3s ease"
            _hover={{ color: 'brand.brownLight', transform: 'rotate(90deg)' }}
          >
            <Box as={FiX} fontSize="32px" />
          </Box>
          <MotionBox
            w="100%"
            maxW={{ base: 'calc(85vh * 9 / 16)', md: 'calc(88vh * 9 / 16)' }}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            boxShadow="0 40px 120px rgba(0,0,0,0.7)"
          >
            <AspectRatio ratio={9 / 16}>
              <Box
                as="iframe"
                src={`https://www.tiktok.com/player/v1/${video.tiktokId}?autoplay=1&rel=0`}
                title={video.fullTitle}
                border="none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                w="100%"
                h="100%"
              />
            </AspectRatio>
          </MotionBox>
        </MotionBox>
      )}
    </AnimatePresence>
  )
}
