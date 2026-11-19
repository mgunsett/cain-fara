import { Box, Flex, Text } from '@chakra-ui/react'
import { playerData } from '../../data/playerData'

const EASE = 'cubic-bezier(0.23,1,0.32,1)'

// Tarjeta roja dibujada (glifo), sin imágenes
function RedCard({ w = 12, h = 17, rotate = -10, ...rest }) {
  return (
    <Box
      aria-hidden="true"
      w={`${w}px`}
      h={`${h}px`}
      flexShrink={0}
      borderRadius="2px"
      bg="brand.brownLight"
      transform={`rotate(${rotate}deg)`}
      boxShadow="0 4px 10px rgba(80,25,25,0.25)"
      {...rest}
    />
  )
}

/* ─────────────────────────────────────────────────────────────
   Dato destacado · Fair play dentro de "Temporada 2026"
   Ocupa las 2 columnas debajo de los 6 tiles. Entra con la
   misma animación de la columna (clase radar-side-row).
   ───────────────────────────────────────────────────────────── */
// `data` llega de la API (temporada en curso); sin ella, playerData.fairPlay.
export function FairPlayTile({ data } = {}) {
  const { redCards, matches, season } = data || playerData.fairPlay
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
