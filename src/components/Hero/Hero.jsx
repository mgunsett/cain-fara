import { useRef, useEffect, useCallback } from 'react'
import { Box, Text, Flex, VStack, HStack, Image, useBreakpointValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MatchBox from './MatchBox'
import { playerData } from '../../data/playerData'
import useMatches from '../../hooks/useMatches'
import '../../styles/globals.css'

gsap.registerPlugin(ScrollTrigger)

const MotionBox = motion(Box)

function PlayerPanel() {
  const currentClub = useBreakpointValue({ base: playerData.currentClubShort, md: playerData.currentClub })
  return (
    <Flex 
    direction='row' 
    justifyContent={'flex-start'} 
    alignItems={'flex-start'} 
    gap={{base:4,md:4}}
    >  
      <Text
        fontFamily="heading"
        fontSize={{ base: '30vw', md: '100px' }}
        lineHeight={0.9}
        color="transparent"
        sx={{ WebkitTextStroke: '2px #883c3c' }}
      >
        {playerData.number}
      </Text>
      <Box w='1px' h={{ base: '75px', md: '80px' }} bg="brand.brown" mt={{base: '6px', md:'none'}} />
      <Flex direction={'column'} justifyContent={'flex-start'} gap={1} mt={{base:'5px',md:'none'}}>
        <Flex gap={{base:0, md:1}} direction={{base:'column',md:'row'}}>
          <Text  fontFamily="mono" fontSize={{base:'9px',md:"12px"}} color="brand.boneWarm" fontWeight="700"
            textTransform="uppercase" letterSpacing="widest">
            Posición
          </Text>
          <Text fontFamily="mono" fontSize={{base:'9px',md:"12px"}} color="brand.brown"
            fontWeight="700" textTransform="uppercase" letterSpacing="widest">
            {playerData.position}
          </Text>
        </Flex>
        <Flex justifyContent='flex-start' alignItems='center' gap={{base:'8px',md:'12px'}}>
          <Image src={playerData.nationalityFlag} w={{ base: '15px', md: '20px' }} />
          <Text mb={'-5px'} fontFamily="mono" fontSize={{base:'xs',md:"md"}} color="brand.boneWarm" letterSpacing="wider">
            {playerData.nationality}
          </Text>
        </Flex>
        <Flex justifyContent='flex-start' alignItems={'flex-end'} gap={{base:'8px',md:'10px'}} spacing={1} mt={'3px'} ml={-1}>
          <Image src={playerData.logoCurrentClub} ml={{base:'2px',md:'none'}} w={{ base: '20px', md: '28px' }} h={{base:'20px',md:'28px'}} />
          <Text fontFamily="mono" fontSize={{base:'xs',md:"md"}} color="brand.boneWarm" letterSpacing="wider">
            {currentClub}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default function Hero() {
  const outerRef     = useRef(null)
  const containerRef = useRef(null)
  const bgGlowRef    = useRef(null)
  const midLayerRef  = useRef(null)
  const photoRef     = useRef(null)
  const line1Ref     = useRef(null)
  const line2Ref     = useRef(null)
  const vignetteRef  = useRef(null)
  const { matches }  = useMatches()

  const handleMouseMove = useCallback((e) => {
    const xn = (e.clientX / window.innerWidth  - 0.5) * 2
    const yn = (e.clientY / window.innerHeight - 0.5) * 2
    gsap.to(bgGlowRef.current,   { x: xn * 6,  y: yn * 3,  duration: 1.8, ease: 'power2.out' })
    gsap.to(midLayerRef.current, { x: xn * 14, y: yn * 7,  duration: 1.3, ease: 'power2.out' })
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo([line1Ref.current, line2Ref.current],
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.08, ease: 'expo.out', delay: 0.4 }
      )
      gsap.fromTo(photoRef.current,
        { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
        { clipPath: 'inset(0% 0 0 0)', opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.6 }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(vignetteRef.current,
        { opacity: 0.15 },
        {
          opacity: 0.75,
          ease: 'none',
          scrollTrigger: {
            trigger: outerRef.current,
            start: 'top top',
            end: '+=80vh',
            scrub: 1.2,
          },
        }
      )
    }, outerRef)
    return () => ctx.revert()
  }, [])

  return (
    <Box ref={outerRef} h="200vh" position="relative" zIndex={1} id= 'hero'>
      <Box
        ref={containerRef}
        position="sticky"
        top={0}
        h="100vh"
        overflow="hidden"
        bg="brand.gray"
        sx={{
          maskImage: 'linear-gradient(black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(black 90%, transparent)',
          // dvh evita el salto al colapsar la barra del navegador en mobile; vh queda de fallback
          '@supports (height: 100dvh)': { height: '100dvh' },
        }}
      >
        {/* Warm brown glow — BG layer */}
        <Box 
          ref={bgGlowRef}
          position="absolute"
          inset="-10%"
          zIndex={1}
          pointerEvents="none"
          background="radial-gradient(ellipse 70% 60% at 65% 50%, rgba(46, 122, 209, 0.14) 0%, transparent 70%)"
        />

        {/* Player photo */}
        <Box
          position="absolute"
          inset={0}
          zIndex={{base: 3, md: 5,  lg:'9999999 !important'}}
          display="flex"
          alignItems="flex-end"
          justifyContent={{ base: 'center', lg: 'center' }}
          pointerEvents="none"
        >
          <Box
            ref={photoRef}
            h={{ base: '88vh', lg: '94vh' }}
            sx={{
              // dvh evita el salto al colapsar la barra del navegador en mobile; vh queda de fallback
              '@supports (height: 100dvh)': {
                height: '88dvh',
                '@media (min-width: 62em)': { height: '94dvh' },
              },
            }}
            style={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
          >
            <Image
              className='player-image' 
              src={playerData.image}
              alt={`Ronaldo Martínez, delantero profesional de ${playerData.currentClub}`}
              h="100%"
              maxW={{ base: '100vw', lg: '50vw' }}
              objectFit="contain"
              objectPosition="bottom center"
              draggable={false}
            />
          </Box>
        </Box>

        {/* Visible name text */}
        <Box
          position="absolute"
          inset={0}
          zIndex={2}
          pointerEvents="none"
          display="flex"
          flexDir="column"
          alignItems={{ base: 'center', lg: 'center' }}
          justifyContent={{ base: 'flex-start', lg: 'flex-start' }}
          pt={{ base: '35%', lg: '6%' }}
        >
          <Flex 
          as="h1" 
          overflow="hidden" 
          flexDir={{ base: 'column', md: 'row' }}
          justifyContent={{ base: 'flex-end', lg: 'flex-start' }}
          alignItems={{ base: 'flex-start', lg: 'flex-start' }}
          >
            <Flex>
              <Text
                ref={line1Ref}
                as="span"
                display="block"
                fontFamily="heading"
                fontSize={{ base: '30vw', md: '16vw', lg: '20vw' }}
                color="brand.boneWarm"
                lineHeight={0.9}
                style={{ opacity: 0 }}
              >
                {playerData.name}
              </Text>
              {/* Player info — bottom left */}
              <Box
                display={{ base: 'block', lg: 'none' }}
                zIndex={15}
              >
                <PlayerPanel />
              </Box>
            </Flex>
            <Text
              ref={line2Ref}
              as="span"
              display="block"
              fontFamily="heading"
              fontSize={{ base: '60vw', md: '16vw', lg: '33vw' }}
              color="brand.brown"
              lineHeight={0.9}
              style={{ opacity: 0 }}
              mt={{ base: '-4vw', md: '0', lg: '-8px' }}
            >
              {playerData.fullName}
            </Text>
          </Flex>
        </Box>

        {/* Player info — bottom left */}
        <Box
          display={{ base: 'none', lg: 'block' }}
          position="absolute"
          bottom={{ base: '69%', lg: '40%' }}
          left={{ base: '50%', lg: '12%' }}
          zIndex={15}
        >
          <PlayerPanel />
        </Box>

        {/* MatchBox desktop */}
        <Box
          position="absolute"
          bottom="12%"
          right={0}
          zIndex={10}
          display={{ base: 'none', lg: 'block' }}
        >
          <MatchBox last={matches.last} next={matches.next} variant="card" />
        </Box>

        {/* MatchBox mobile */}
        <Box
          position="absolute"
          bottom={{base:"30px",md:"40px"}}
          left={0}
          right={0}
          zIndex={15}
          display={{ base: 'block', lg: 'none' }}
        >
          <MatchBox last={matches.last} next={matches.next} variant="strip" />
        </Box>


        {/* Vignette */}
        <Box
          ref={vignetteRef}
          position="absolute"
          inset={0}
          zIndex={20}
          background="radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.65) 100%)"
          pointerEvents="none"
          style={{ opacity: 0.15 }}
        />
      </Box>
    </Box>
  )
}
