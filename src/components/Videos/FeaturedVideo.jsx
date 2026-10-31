import { useState } from 'react'
import { Box, Flex, Text, AspectRatio } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { motion, useReducedMotion } from 'framer-motion'
import { FiPlay } from 'react-icons/fi'

const MotionBox = motion(Box)

// Pulso del anillo del botón play
const pulse = keyframes`
  0%   { transform: scale(1);   opacity: 0.5; }
  70%  { transform: scale(1.6); opacity: 0; }
  100% { transform: scale(1.6); opacity: 0; }
`

const reveal = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
}

// Video principal: portada propia y el reproductor de Vimeo se carga recién al hacer clic
export function FeaturedVideo({ video, ratio = 16 / 9, mb = { base: 10, md: 14 } }) {
  const [playing, setPlaying] = useState(false)
  const [hovered, setHovered] = useState(false)
  const reduced = useReducedMotion()

  const src = `https://player.vimeo.com/video/${video.vimeoId}?h=${video.vimeoHash}&autoplay=1&title=0&byline=0&portrait=0`

  return (
    <MotionBox
      variants={reveal}
      initial={reduced ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      mb={mb}
    >
      {/* la portada puede usar otro formato; al reproducir vuelve a 16:9 */}
      <AspectRatio ratio={playing ? 16 / 9 : ratio}>
        <Box
          position="relative"
          overflow="hidden"
          bg="brand.dark"
          borderRadius="16px"
          boxShadow="0 30px 70px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.08)"
        >
          {playing ? (
            <Box
              as="iframe"
              src={src}
              title={video.fullTitle}
              border="none"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              w="100%"
              h="100%"
            />
          ) : (
            <Box
              as="button"
              aria-label={`Reproducir ${video.title}`}
              position="absolute"
              inset={0}
              w="100%"
              h="100%"
              cursor="pointer"
              textAlign="left"
              onClick={() => setPlaying(true)}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onFocus={() => setHovered(true)}
              onBlur={() => setHovered(false)}
            >
              {/* portada */}
              <Box
                as="img"
                src={video.cover}
                alt=""
                position="absolute"
                inset={0}
                w="100%"
                h="100%"
                objectFit="cover"
                objectPosition="center 20%"
                transformOrigin="center 20%"
                transition="transform 0.9s cubic-bezier(0.22,1,0.36,1)"
                transform={hovered ? 'scale(1.04)' : 'scale(1)'}
              />
              <Box
                position="absolute"
                inset={0}
                bg="linear-gradient(180deg, rgba(10,5,5,0.1) 0%, rgba(10,5,5,0.2) 45%, rgba(10,5,5,0.88) 100%)"
              />

              {/* badge */}
              <Flex
                position="absolute"
                top={{ base: 3, md: 5 }}
                left={{ base: 3, md: 5 }}
                align="center"
                gap={2}
                bg="rgba(10,5,5,0.55)"
                backdropFilter="blur(6px)"
                border="1px solid"
                borderColor="rgba(80,25,25,0.55)"
                px={2.5}
                py={1}
                borderRadius="5px"
              >
                <Box w="6px" h="6px" borderRadius="full" bg="brand.brownLight" />
                <Text fontFamily="mono" fontSize="9px" letterSpacing="0.24em" textTransform="uppercase" color="white">
                  Cain Fara
                </Text>
              </Flex>

              {/* play */}
              <Flex position="absolute" inset={0} align="center" justify="center">
                <Box
                  position="relative"
                  boxSize={{ base: '60px', md: '84px' }}
                  transition="transform 0.45s cubic-bezier(0.22,1,0.36,1)"
                  transform={hovered ? 'scale(1.1)' : 'scale(1)'}
                >
                  {!reduced && (
                    <Box position="absolute" inset={0} borderRadius="full" border="1px solid" borderColor="brand.brownLight" animation={`${pulse} 2.8s ease-out infinite`} />
                  )}
                  <Flex
                    position="absolute"
                    inset={0}
                    align="center"
                    justify="center"
                    borderRadius="full"
                    border="1px solid"
                    borderColor={hovered ? 'white' : 'whiteAlpha.700'}
                    bg={hovered ? 'rgba(80,25,25,0.6)' : 'rgba(10,5,5,0.4)'}
                    backdropFilter="blur(10px)"
                    transition="all 0.4s ease"
                  >
                    <Box as={FiPlay} fontSize={{ base: '22px', md: '30px' }} ml="4px" color="white" />
                  </Flex>
                </Box>
              </Flex>

              {/* título */}
              <Flex
                position="absolute"
                bottom={{ base: 3, md: 6 }}
                left={{ base: 4, md: 7 }}
                right={{ base: 4, md: 7 }}
                align="flex-end"
                justify="space-between"
                gap={4}
              >
                <Box>
                  <Text fontFamily="mono" fontSize={{ base: '9px', md: '11px' }} letterSpacing="0.26em" textTransform="uppercase" color="brand.brownLight" mb={1}>
                    {video.subtitle}
                  </Text>
                  <Text fontFamily="heading" fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }} lineHeight={0.95} color="white">
                    {video.title}
                  </Text>
                </Box>
                <Text fontFamily="mono" fontSize={{ base: '10px', md: '12px' }} letterSpacing="0.2em" color="whiteAlpha.800" flexShrink={0}>
                  {video.duration}
                </Text>
              </Flex>
            </Box>
          )}
        </Box>
      </AspectRatio>
    </MotionBox>
  )
}
