import { useEffect, useRef } from 'react'
import { Box, Flex, Text, HStack, Grid } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { playerData } from '../../data/playerData'

gsap.registerPlugin(ScrollTrigger)

const EASE = 'cubic-bezier(0.23,1,0.32,1)'
const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Tarjeta roja dibujada (glifo), sin imágenes
function RedCard({ w = 12, h = 17, rotate = -10, muted = false, ...rest }) {
  return (
    <Box
      aria-hidden="true"
      w={`${w}px`}
      h={`${h}px`}
      flexShrink={0}
      borderRadius="2px"
      bg={muted ? 'brand.brown3' : 'brand.brownLight'}
      border="1px solid"
      borderColor={muted ? 'brand.brown' : 'brand.brownLight'}
      transform={`rotate(${rotate}deg)`}
      boxShadow={muted ? 'none' : '0 4px 10px rgba(80,25,25,0.25)'}
      {...rest}
    />
  )
}

/* ─────────────────────────────────────────────────────────────
   Opción A · Tile destacado dentro de "Temporada 2026"
   Ocupa las 2 columnas debajo de los 6 tiles. Entra con la
   misma animación de la columna (clase radar-side-row).
   ───────────────────────────────────────────────────────────── */
export function FairPlayTile() {
  const { redCards, matches, season } = playerData.fairPlay
  return (
    <Box
      className="radar-side-row"
      gridColumn="1 / -1"
      position="relative"
      border="1px solid"
      borderColor="brand.brown"
      borderRadius="10px"
      bg="brand.brown3"
      p={{ base: 4, lg: 4 }}
      overflow="hidden"
      transition={`background 0.3s ${EASE}`}
      sx={{ '@media (hover: hover) and (pointer: fine)': { '&:hover': { bg: '#f0dcc828' } } }}
      _before={{
        content: '""', position: 'absolute', top: 0, left: 2,
        w: '36px', h: '2px', bg: 'brand.amber',
      }}
    >
      <Flex align="center" gap={4}>
        <Flex align="flex-end" gap={2.5} flexShrink={0}>
          <Text fontFamily="heading" fontSize={{ base: '44px', lg: '52px' }}
            color="white" lineHeight="0.85">
            {redCards}
          </Text>
          <RedCard w={14} h={20} rotate={-12} mb="4px" />
        </Flex>
        <Box borderLeft="1px solid" borderColor="brand.brown2" pl={4} minW={0}>
          <Text fontFamily="mono" fontSize="9px" fontWeight="700"
            letterSpacing="0.22em" textTransform="uppercase" color="brand.bone">
            Fair play · {season}
          </Text>
          <Text fontFamily="mono" fontSize={{ base: '13px', lg: '14px' }} fontWeight="600"
            color="white" lineHeight="1.25" mt={1}>
            Ninguna tarjeta roja en {matches} partidos
          </Text>
        </Box>
      </Flex>
    </Box>
  )
}

/* ─────────────────────────────────────────────────────────────
   Opción B · Franja "fair play" al pie del panel
   Una fila de 32 tarjetas (una por partido), todas limpias.
   ───────────────────────────────────────────────────────────── */
export function FairPlayStrip() {
  const { redCards, matches, season } = playerData.fairPlay
  const ref = useRef(null)

  useEffect(() => {
    if (reduced()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: 'top 92%', end: 'top 60%', scrub: 1.2 },
      })
      tl.fromTo('.fp-head', { opacity: 0, y: 16 }, { opacity: 1, y: 0 })
        .fromTo('.fp-match', { opacity: 0, y: 8 }, { opacity: 1, y: 0, stagger: 0.02 }, '<0.1')
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <Box
      ref={ref}
      mt={{ base: 8, lg: 10 }}
      pt={{ base: 6, lg: 8 }}
      borderTop="1px solid"
      borderColor="brand.brown2"
    >
      <Grid
        templateColumns={{ base: '1fr', lg: 'auto 1fr auto' }}
        gap={{ base: 5, lg: 10 }}
        alignItems="center"
      >
        <Flex className="fp-head" align="center" gap={4}>
          <Flex align="flex-end" gap={2.5}>
            <Text fontFamily="heading" fontSize={{ base: '64px', lg: '76px' }}
              color="brand.brown" lineHeight="0.85">
              {redCards}
            </Text>
            <RedCard w={16} h={23} rotate={-12} mb="6px" />
          </Flex>
          <Box>
            <Text fontFamily="mono" fontSize="10px" fontWeight="700"
              letterSpacing="0.28em" textTransform="uppercase" color="brand.bone">
              Tarjetas rojas
            </Text>
            <Text fontFamily="mono" fontSize={{ base: '14px', lg: '15px' }} fontWeight="600"
              color="white" mt={1}>
              Toda la temporada {season} sin expulsiones
            </Text>
          </Box>
        </Flex>

        <Box minW={0}>
          <Grid
            templateColumns={{ base: 'repeat(16, max-content)', lg: 'repeat(32, max-content)' }}
            gap={{ base: '6px', lg: '7px' }}
            justifyContent={{ base: 'flex-start', lg: 'center' }}
            role="img"
            aria-label={`${matches} partidos jugados, ninguno con tarjeta roja`}
          >
            {Array.from({ length: matches }).map((_, i) => (
              <RedCard key={i} className="fp-match" w={9} h={13} rotate={0} muted />
            ))}
          </Grid>
        </Box>

        <Box className="fp-head" textAlign={{ base: 'left', lg: 'right' }}>
          <Text fontFamily="heading" fontSize={{ base: '34px', lg: '40px' }}
            color="white" lineHeight="1">
            {matches}/{matches}
          </Text>
          <Text fontFamily="mono" fontSize="9px" fontWeight="700"
            letterSpacing="0.18em" textTransform="uppercase" color="brand.brown" mt={1}>
            Partidos limpios
          </Text>
        </Box>
      </Grid>
    </Box>
  )
}

/* ─────────────────────────────────────────────────────────────
   Opción C · Sello circular junto a la Valoración
   Anillo con texto que gira apenas al entrar en pantalla.
   ───────────────────────────────────────────────────────────── */
export function FairPlaySeal({ size = 118 }) {
  const { redCards, matches, season } = playerData.fairPlay
  const ref = useRef(null)
  const ring = `FAIR PLAY · TEMPORADA ${season} · ${matches} PARTIDOS · `

  useEffect(() => {
    if (reduced()) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.fp-ring',
        { rotate: -90, opacity: 0, svgOrigin: '60 60' },
        {
          rotate: 0, opacity: 1,
          scrollTrigger: { trigger: ref.current, start: 'top 92%', end: 'top 55%', scrub: 1.2 },
        })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <Box ref={ref} textAlign="center">
      <Box position="relative" w={`${size}px`} h={`${size}px`} mx="auto"
        role="img"
        aria-label={`${redCards} tarjetas rojas en ${matches} partidos de la temporada ${season}`}
      >
        <Box as="svg" viewBox="0 0 120 120" position="absolute" inset={0} w="100%" h="100%">
          <defs>
            <path id="fp-circle" d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" />
          </defs>
          <circle cx="60" cy="60" r="58" fill="none" stroke="#50191963" />
          <circle cx="60" cy="60" r="37" fill="none" stroke="#50191963" />
          <g className="fp-ring">
            <text fontFamily="'Barlow Condensed', sans-serif" fontSize="9.6"
              fontWeight="700" fill="#FAF5EB">
              <textPath href="#fp-circle" textLength="292" lengthAdjust="spacing">{ring}</textPath>
            </text>
          </g>
        </Box>
        <Flex position="absolute" inset={0} align="center" justify="center" gap={1.5}>
          <Text fontFamily="heading" fontSize="44px" color="brand.brown" lineHeight="1" mt="4px">
            {redCards}
          </Text>
          <RedCard w={11} h={16} rotate={-12} />
        </Flex>
      </Box>
      <Text fontFamily="mono" fontSize="10px" fontWeight="700"
        letterSpacing="0.3em" textTransform="uppercase" color="brand.bone" mt={2}>
        Rojas
      </Text>
    </Box>
  )
}

// Fila Valoración + Sello (opción C)
export function RatingWithSeal({ rating }) {
  return (
    <HStack justify="center" align="center" spacing={{ base: 8, md: 10 }} mt={6}>
      {rating}
      <Box w="1px" h="90px" bg="brand.brown2" />
      <FairPlaySeal />
    </HStack>
  )
}
