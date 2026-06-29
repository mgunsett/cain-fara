import { useState } from 'react'
import { Box, Flex, Text, Image, HStack, VStack } from '@chakra-ui/react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const MotionBox = motion(Box)

function Shield({ src, name, size = '36px' }) {
  if (src) return <Image src={src} alt={name} boxSize={size} objectFit="contain" />
  return (
    <Box
      boxSize={size}  
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontFamily="heading" fontSize="10px" color="brand.brownLight">
        {name?.slice(0, 3).toUpperCase()}
      </Text>
    </Box>
  )
}

function MatchSlot({ data, label, labelColor }) {
  const { home, away, homeScore, awayScore, date, stadium, competition } = data

  return (
    <Box>
      <Text fontFamily="mono" fontSize="9px" fontWeight="700" letterSpacing="widest"
            textTransform="uppercase" color={labelColor} mb={2}>
        {label}
      </Text>

      {/* Teams row */}
      <Flex align="center" justify="space-between" gap={2}>
        <VStack spacing={1} align="center" flex={1}>
          <Shield src={home.shield} name={home.name} />
          <Text fontFamily="mono" fontSize="9px" color="whiteAlpha.700" textTransform="uppercase"
                letterSpacing="wider" textAlign="center" noOfLines={1}>
            {home.name}
          </Text>
        </VStack>

        {/* Score */}
        <Box textAlign="center" px={2}>
          {homeScore !== null && awayScore !== null ? (
            <HStack spacing={1} justify="center">
              <Text fontFamily="heading" fontSize="2xl" color="white" lineHeight={1}>
                {homeScore}
              </Text>
              <Text fontFamily="heading" fontSize="lg" color="brand.brown" lineHeight={1}>
                —
              </Text>
              <Text fontFamily="heading" fontSize="2xl" color="white" lineHeight={1}>
                {awayScore}
              </Text>
            </HStack>
          ) : (
            <Text fontFamily="heading" fontSize="xl" color="brand.brownLight" letterSpacing="wider">
              VS
            </Text>
          )}
          {competition && (
            <Text fontFamily="mono" fontSize="8px" color="brand.gray" letterSpacing="wider"
                  textTransform="uppercase" mt={0.5} textAlign="center">
              {competition}
            </Text>
          )}
        </Box>

        <VStack spacing={1} align="center" flex={1}>
          <Shield src={away.shield} name={away.name} />
          <Text fontFamily="mono" fontSize="9px" color="whiteAlpha.700" textTransform="uppercase"
                letterSpacing="wider" textAlign="center" noOfLines={1}>
            {away.name}
          </Text>
        </VStack>
      </Flex>

      <Flex mt={{base: 2 ,md: 4}} justify="space-between" align="flex-end">
        <Text fontFamily="mono" fontSize="8px" color="brand.gray" letterSpacing="wider">
          {date}
        </Text>
        {stadium && (
          <Text fontFamily="mono" fontSize="8px" color="brand.gray" letterSpacing="wider"
                textAlign="right" noOfLines={1} maxW="100px">
            {stadium}
          </Text>
        )}
      </Flex>
    </Box>
  )
}

function CollapsedTab({ last, onClick }) {
  const hasScore = last?.homeScore !== null && last?.awayScore !== null
  const reduceMotion = useReducedMotion()

  return (
    <MotionBox
      as="button"
      type="button"
      onClick={onClick}
      aria-label="Ver partidos"
      key="tab"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      bg="whiteAlpha.10"
      backdropFilter="blur(12px)"
      border="1px solid"
      borderColor="brand.brown"
      borderRightWidth={0}
      borderTopLeftRadius="10px"
      borderBottomLeftRadius="10px"
      minH="250px"
      py={6}
      px={3}
      cursor="pointer"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      gap={4}
      transitionProperty="background, border-color"
      transitionDuration="0.3s"
      _hover={{ bg: 'whiteAlpha.200', borderColor: 'brand.brownLight' }}
      _before={{
        content: '""',
        position: 'absolute',
        top: 3, right: 0,
        w: '2px', h: '28px',
        bg: 'brand.brown',
      }}
      position="relative"
    >
      <Text
        fontFamily="heading"
        fontSize="md"
        letterSpacing="widest"
        color="brand.boneWarm"
        sx={{ writingMode: 'vertical-rl' }}
        lineHeight={1}
      >
        Partidos
      </Text>

      {hasScore && (
        <VStack spacing={1.5} align="center">
          <Shield src={last.home.shield} name={last.home.name} size="18px" />
          <Flex spacing={0.5} justify="center" direction="column" align="center">
            <Text fontFamily="heading" fontSize="md" color="white" lineHeight={1}>
              {last.homeScore}
            </Text>
            <Text fontFamily="heading" fontSize="xs" color="brand.brown" lineHeight={1}>
              —
            </Text>
            <Text fontFamily="heading" fontSize="md" color="white" lineHeight={1}>
              {last.awayScore}
            </Text>
          </Flex>
          <Shield src={last.away.shield} name={last.away.name} size="18px" />
        </VStack>
      )}

      <MotionBox
        as="span"
        display="block"
        color="brand.dark"
        fontSize="16px"
        fontFamily="heading"
        lineHeight={1}
        animate={reduceMotion ? { opacity: 1 } : { x: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
        transition={reduceMotion ? undefined : { duration: 1.6, ease: 'easeInOut', repeat: Infinity }}
        _hover={{ color: 'brand.bone' }}
      >
        ⟪
      </MotionBox>
    </MotionBox>
  )
}

export function MatchBox({ last, next, variant = 'card' }) {
  const isCard = variant === 'card'
  const [isOpen, setIsOpen] = useState(false)

  if (isCard) {
    return (
      <Flex justify="flex-end" align="flex-start">
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <MotionBox
              key="card"
              initial={{ opacity: 0, scaleX: 0.9, x: 20 }}
              animate={{ opacity: 1, scaleX: 1, x: 0 }}
              exit={{ opacity: 0, scaleX: 0.9, x: 20 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              transformOrigin="right center"
              w="280px"
              bg="whiteAlpha.10"
              backdropFilter="blur(12px)"
              border="1px solid"
              borderColor="brand.brown"
              borderRightWidth={0}
              borderTopLeftRadius="10px"
              borderBottomLeftRadius="10px"
              p={4}
              position="relative"
              _before={{
                content: '""',
                position: 'absolute',
                top: 0, left: 2,
                w: '28px', h: '2px',
                bg: 'brand.brown',
              }}
            >
              <Box
                as="button"
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar partidos"
                position="absolute"
                top={'130px'}
                right={3}
                zIndex={2}
                color="brand.dark"
                fontFamily="mono"
                fontSize="lg"
                lineHeight={1}
                cursor="pointer"
                transition="all 0.2s"
                _hover={{ color: 'brand.brownLight' }}
              >
                ⟫
              </Box>

              <VStack spacing={{ base: 4, md: 6 }} align="stretch">
                <MatchSlot data={last} label="Último Resultado" labelColor="brand.amber" />
                <Box h="1px" bg="rgba(255,255,255,0.07)" w="80%" alignSelf="center" />
                <MatchSlot data={next} label="Próximo Partido" labelColor="brand.brown" />
              </VStack>
            </MotionBox>
          ) : (
            <CollapsedTab last={last} onClick={() => setIsOpen(true)} />
          )}
        </AnimatePresence>
      </Flex>
    )
  }

  return (
    <Box
      bg="  "
      backdropFilter="blur(10px)"
      borderTop="1px solid"
      borderColor='brand.brown3'
      px={4}
      py={2}
      mb={-4}
    >
      <Flex gap={0} >
        <Box flex={1} pr={3}>
          <MatchSlot data={last} label="Último Resultado" labelColor="brand.amber" />
        </Box>
        <Box w="1px" bg="rgba(255,255,255,0.07)" mx={2} />
        <Box flex={1} pl={3}>
          <MatchSlot data={next} label="Próximo Partido" labelColor="brand.brown" />
        </Box>
      </Flex>
    </Box>
  )
}

export default MatchBox
