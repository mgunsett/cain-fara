import { useEffect, useRef } from 'react'
import { Box, Grid, Text, VStack, Flex } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { playerData } from '../../data/playerData'
import { RadarChart, OverallRating } from './RadarChart'

gsap.registerPlugin(ScrollTrigger)

// Contenedor de columna (título + animación de entrada)
function ColumnShell({ title, side = 'left', children }) {
  const colRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo('.radar-side-row',
        { opacity: 0, x: side === 'left' ? -16 : 16 },
        {
          opacity: 1, x: 0, stagger: 0.07,
          scrollTrigger: {
            trigger: colRef.current,
            start: 'top 88%',
            end: 'top 50%',
            scrub: 1.2,
          },
        }
      )
    }, colRef)
    return () => ctx.revert()
  }, [side])

  return (
    <Box ref={colRef} w="100%">
      <Text
        fontFamily="mono"
        fontSize="12px" fontWeight="700"
        letterSpacing="0.28em" textTransform="uppercase"
        color="brand.brown"
        mb={{ base: 4, lg: 5 }}
        pb={2}
      >
        {title}
      </Text>
      {children}
    </Box>
  )
}

// Ficha label / valor a todo el ancho
function ProfileColumn({ items }) {
  return (
    <VStack spacing={0} align="stretch">
      {items.map((item, i) => (
        <Flex
          key={item.label}
          className="radar-side-row"
          justify="space-between"
          align="center"
          gap={4}
          py={2.5}
          borderBottom={i === items.length - 1 ? 'none' : '1px solid'}
          borderColor="brand.brown2"
          transition="border-color 0.3s"
          _hover={{ borderColor: 'brand.brown' }}
        >
          <Text
            fontFamily="mono"
            fontSize="10px" fontWeight="700"
            letterSpacing="0.16em" textTransform="uppercase"
            color="brand.bone"
            flexShrink={0}
          >
            {item.label}
          </Text>
          <Text
            fontFamily="mono"
            fontSize={{ base: 'sm', lg: '15px' }} fontWeight="600"
            color="white"
            textAlign="right"
            noOfLines={1}
            minW={0}
          >
            {item.value}
          </Text>
        </Flex>
      ))}
    </VStack>
  )
}

// Temporada actual (grilla de tiles)
function SeasonColumn({ items }) {
  return (
    <Grid
      templateColumns={{ base: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', lg: 'repeat(2, 1fr)' }}
      gap={{ base: 2.5, lg: 3 }}
    >
      {items.map((item) => (
        <Box
          key={item.label}
          className="radar-side-row"
          border="1px solid"
          borderColor="brand.brown2"
          borderRadius="10px"
          p={{ base: 4, lg: 3.5 }}
          transition="border-color 0.3s, background 0.3s, transform 0.3s"
          _hover={{
            borderColor: 'brand.brown',
            bg: '#f0dcc828',
            transform: 'translateY(-2px)',
          }}
        >
          <Text
            fontFamily="heading"
            fontSize={{ base: '28px', lg: '34px' }}
            color="white"
            lineHeight="1"
          >
            {item.value}
          </Text>
          <Text
            fontFamily="mono"
            fontSize="9px" fontWeight="700"
            letterSpacing="0.1em" textTransform="uppercase"
            color="brand.brown"
            mt={1.5}
            lineHeight="1.2"
          >
            {item.label}
          </Text>
        </Box>
      ))}
    </Grid>
  )
}

export function RadarStats() {
  const overall = Math.round(
    playerData.stats.reduce((sum, s) => sum + s.value, 0) / playerData.stats.length
  )

  const bioItems = [
    { label: 'Posición',    value: playerData.position },
    { label: 'Pie hábil',   value: playerData.foot },
    { label: 'Edad',        value: `${playerData.age} años` },
    { label: 'Altura',      value: playerData.height },
    { label: 'Peso',        value: playerData.weight },
    { label: 'Origen',      value: playerData.birthPlace },
    { label: 'Club actual', value: playerData.currentClub },
  ]

  return (
    <Box
      border="1px solid"
      borderColor="brand.brown2"
      borderRadius="14px"
      p={{ base: 6, md: 10, lg: 12 }}
    >
      <Grid
        templateColumns={{ base: '1fr', md: '1fr 1fr', lg: '1fr 1.05fr 1fr' }}
        gap={{ base: 8, md: 10, lg: 12 }}
        alignItems="stretch"
      >
        <Box
          order={{ base: 2, md: 1, lg: 1 }}
          borderRight={{ lg: '1px solid' }}
          borderRightColor="brand.brown2"
          pr={{ base: 0, lg: 10 }}
        >
          <ColumnShell title="Perfil" side="left">
            <ProfileColumn items={bioItems} />
          </ColumnShell>
        </Box>

        <Box
          order={{ base: 1, md: 3, lg: 2 }}
          gridColumn={{ md: '1 / -1', lg: 'auto' }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <RadarChart stats={playerData.stats} />
          <OverallRating value={overall} />
        </Box>

        <Box
          order={{ base: 3, md: 2, lg: 3 }}
          borderLeft={{ lg: '1px solid' }}
          borderLeftColor="brand.brown2"
          pl={{ base: 0, lg: 10 }}
        >
          <ColumnShell title="Temporada 2025 / 2026" side="right">
            <SeasonColumn items={playerData.seasonStats} />
          </ColumnShell>
        </Box>
      </Grid>
    </Box>
  )
}
