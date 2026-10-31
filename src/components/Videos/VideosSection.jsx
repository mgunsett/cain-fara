import { useRef, useEffect, useState } from 'react'
import { Box, Flex, Text, useBreakpointValue } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiPlay, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { playerData } from '../../data/playerData'
import { FeaturedVideo } from './FeaturedVideo'
import { VideoModal } from './VideoModal'

gsap.registerPlugin(ScrollTrigger)

const EASE = 'cubic-bezier(0.22,1,0.36,1)'
const MotionBox = motion(Box)

// El panel activo siempre respeta 9:16 (formato TikTok) para no perder nitidez.
// Desktop: alto fijo → ancho activo = 560 * 9/16 = 315px. Mobile: el activo ocupa el resto del ancho.
const PANEL_H = { base: 'calc((100vw - 40px - 128px) * 16 / 9)', md: '560px' }
const ACTIVE_W = 315
const COLLAPSED_W = { base: 56, md: 110 }

// Sección Videos: portada panorámica 21:9 + acordeón de clips que se expanden
export default function VideosSection() {
  const videos = playerData.videos
  const featured = playerData.featuredVideo

  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const panelsRef = useRef(null)
  const [active, setActive] = useState(0)
  const [openVideo, setOpenVideo] = useState(null)
  const isDesktop = useBreakpointValue({ base: false, md: true })

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.acc-panel', panelsRef.current)
      if (reduced) {
        gsap.set([headerRef.current, ...panels], { autoAlpha: 1, y: 0 })
        return
      }
      gsap.fromTo(
        headerRef.current,
        { y: 40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true } }
      )
      gsap.fromTo(
        panels,
        { y: 60, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: panelsRef.current, start: 'top 82%', once: true } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  if (!videos.length) return null

  return (
    <Box
      as="section"
      id="videos"
      ref={sectionRef}
      position="relative"
      bg="brand.gray"
      px={{ base: 5, md: 12, lg: 20 }}
      py={{ base: 20, md: 28 }}
      overflow="hidden"
    >
      <Box maxW="1320px" mx="auto" position="relative" zIndex={1}>
        {/* ── Header centrado ── */}
        <Flex ref={headerRef} direction="column" align="center" textAlign="center" mb={{ base: 8, md: 12 }}>
          <Text fontFamily="mono" fontSize="10px" color="white" textTransform="uppercase" letterSpacing="widest">
            Highlights
          </Text>
          <Text as="h2" fontFamily="heading" fontSize={{ base: '5xl', lg: '7xl' }} color="brand.brown" lineHeight={0.9}>
            Videos
          </Text>
        </Flex>

        {/* ── Video principal en formato panorámico ── */}
        {featured && <FeaturedVideo video={featured} ratio={isDesktop ? 21 / 9 : 16 / 9} mb={{ base: 8, md: 16 }} />}

        {/* ── Clips: info del activo + acordeón vertical ── */}
        <Flex align="stretch" gap={{ base: 0, md: 10, lg: 16 }}>
          <ActiveInfo
            videos={videos}
            active={active}
            setActive={setActive}
            onOpen={() => setOpenVideo(videos[active])}
          />

          <Flex
            ref={panelsRef}
            gap={{ base: 2, md: 4 }}
            h={PANEL_H}
            flexShrink={0}
            w={{ base: '100%', md: 'auto' }}
          >
            {videos.map((v, i) => (
              <AccordionPanel
                key={v.id}
                video={v}
                index={i}
                isActive={active === i}
                onActivate={() => setActive(i)}
                onOpen={() => setOpenVideo(v)}
              />
            ))}
          </Flex>
        </Flex>
      </Box>

      <VideoModal video={openVideo} onClose={() => setOpenVideo(null)} />
    </Box>
  )
}

function AccordionPanel({ video, index, isActive, onActivate, onOpen }) {
  return (
    <Box
      className="acc-panel"
      position="relative"
      overflow="hidden"
      borderRadius="16px"
      bg="brand.dark"
      cursor="pointer"
      flex={{
        base: isActive ? '1 1 0' : `0 0 ${COLLAPSED_W.base}px`,
        md: `0 0 ${isActive ? ACTIVE_W : COLLAPSED_W.md}px`,
      }}
      minW={0}
      transition={`flex 0.8s ${EASE}`}
      boxShadow="0 24px 60px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.06)"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={() => (isActive ? onOpen() : onActivate())}
      role="button"
      tabIndex={0}
      aria-label={isActive ? `Reproducir ${video.title}` : `Ver ${video.title}`}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), isActive ? onOpen() : onActivate())}
    >
      <Box
        as="img"
        src={video.cover}
        alt=""
        position="absolute"
        inset={0}
        w="100%"
        h="100%"
        objectFit="cover"
        objectPosition="center 35%"
        filter={isActive ? 'grayscale(0)' : 'grayscale(0.85) brightness(0.7)'}
        transform={isActive ? 'scale(1)' : 'scale(1.12)'}
        transition={`filter 0.7s ease, transform 1s ${EASE}`}
      />
      <Box
        position="absolute"
        inset={0}
        bg={isActive
          ? 'linear-gradient(180deg, rgba(10,5,5,0.05) 30%, rgba(10,5,5,0.9) 100%)'
          : 'linear-gradient(180deg, rgba(80,25,25,0.35) 0%, rgba(10,5,5,0.85) 100%)'}
        transition="background 0.6s ease"
      />

      {/* estado colapsado: número + título vertical (desktop) / horizontal (mobile) */}
      <Flex
        position="absolute"
        inset={0}
        direction="column"
        align="center"
        justify="space-between"
        gap={4}
        py={{ base: 4, md: 6 }}
        opacity={isActive ? 0 : 1}
        transition="opacity 0.35s ease"
        pointerEvents="none"
      >
        <Text fontFamily="mono" fontSize="12px" letterSpacing="0.2em" color="brand.brownLight">
          {`0${index + 1}`}
        </Text>
        <Text
          fontFamily="heading"
          fontSize={{ base: 'xl', md: '3xl' }}
          color="white"
          whiteSpace="nowrap"
          sx={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          {video.title}
        </Text>
      </Flex>

      {/* estado activo */}
      <Flex
        position="absolute"
        inset={0}
        direction="column"
        justify="space-between"
        p={{ base: 4, md: 5 }}
        opacity={isActive ? 1 : 0}
        transform={isActive ? 'translateY(0)' : 'translateY(16px)'}
        transition={`opacity 0.5s ease ${isActive ? '0.25s' : '0s'}, transform 0.6s ${EASE} ${isActive ? '0.25s' : '0s'}`}
        pointerEvents="none"
      >
        <Flex justify="space-between" align="center">
          <Flex align="center" gap="6px" bg="rgba(10,5,5,0.55)" backdropFilter="blur(6px)" border="1px solid" borderColor="rgba(80,25,25,0.55)" px="8px" py="4px" borderRadius="5px">
            <Box w="6px" h="6px" borderRadius="full" bg="#E5484D" />
            <Text fontFamily="mono" fontSize="9px" letterSpacing="0.24em" textTransform="uppercase" color="white">
              {video.category}
            </Text>
          </Flex>
          <Text fontFamily="mono" fontSize="12px" letterSpacing="0.2em" color="whiteAlpha.800">
            {`0${index + 1}`}
          </Text>
        </Flex>

        <Flex align="flex-end" justify="space-between" gap={4}>
          <Box minW={0}>
            <Text fontFamily="mono" fontSize="10px" letterSpacing="0.26em" textTransform="uppercase" color="brand.brownLight" mb={1}>
              {video.season}
            </Text>
            <Text fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} lineHeight={0.95} color="white" noOfLines={2}>
              {video.title}
            </Text>
          </Box>
          <Flex
            flexShrink={0}
            boxSize={{ base: '44px', md: '52px' }}
            align="center"
            justify="center"
            borderRadius="full"
            border="1px solid"
            borderColor="whiteAlpha.800"
            bg="rgba(80,25,25,0.6)"
            backdropFilter="blur(10px)"
          >
            <Box as={FiPlay} fontSize={{ base: '18px', md: '20px' }} ml="3px" color="white" />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

// Bloque lateral (desktop) con los datos del clip activo y navegación
function ActiveInfo({ videos, active, setActive, onOpen }) {
  const video = videos[active]
  const navBtn = (dir) => {
    const next = active + dir
    const disabled = next < 0 || next >= videos.length
    return (
      <Flex
        as="button"
        aria-label={dir < 0 ? 'Clip anterior' : 'Clip siguiente'}
        onClick={() => !disabled && setActive(next)}
        boxSize="44px"
        align="center"
        justify="center"
        borderRadius="full"
        border="1px solid"
        borderColor={disabled ? 'rgba(80,25,25,0.2)' : 'brand.brown'}
        color={disabled ? 'rgba(80,25,25,0.3)' : 'brand.brown'}
        cursor={disabled ? 'default' : 'pointer'}
        transition="all 0.4s ease"
        _hover={disabled ? {} : { bg: 'brand.brown', color: 'white' }}
      >
        <Box as={dir < 0 ? FiChevronLeft : FiChevronRight} fontSize="20px" />
      </Flex>
    )
  }

  return (
    <Flex display={{ base: 'none', md: 'flex' }} direction="column" justify="space-between" flex={1} minW={0} py={2}>
      <Box>
        <Flex align="center" gap={3} mb={8}>
          <Text fontFamily="mono" fontSize="10px" letterSpacing="0.26em" textTransform="uppercase" color="brand.dark">
            Clips
          </Text>
          <Box flex={1} h="1px" bg="rgba(80,25,25,0.35)" />
        </Flex>

        <AnimatePresence mode="wait">
          <MotionBox
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Text fontFamily="mono" fontSize="11px" letterSpacing="0.26em" textTransform="uppercase" color="brand.brown" mb={2}>
              {video.category} · {video.season}
            </Text>
            <Text fontFamily="heading" fontSize={{ md: '5xl', lg: '7xl' }} lineHeight={0.9} color="brand.dark">
              {video.title}
            </Text>
          </MotionBox>
        </AnimatePresence>

        <Flex
          as="button"
          onClick={onOpen}
          mt={8}
          align="center"
          gap={3}
          px={5}
          py={3}
          borderRadius="full"
          bg="brand.brown"
          color="white"
          fontFamily="mono"
          fontSize="12px"
          letterSpacing="0.22em"
          textTransform="uppercase"
          transition="background 0.4s ease, transform 0.4s ease"
          _hover={{ bg: 'brand.brownDark', transform: 'translateY(-2px)' }}
        >
          <Box as={FiPlay} fontSize="14px" />
          Reproducir clip
        </Flex>
      </Box>

      <Flex align="center" justify="space-between">
        <Text fontFamily="heading" fontSize="4xl" lineHeight={1} color="brand.dark">
          {String(active + 1).padStart(2, '0')}
          <Text as="span" fontSize="xl" color="rgba(80,25,25,0.6)"> / {String(videos.length).padStart(2, '0')}</Text>
        </Text>
        <Flex gap={3}>
          {navBtn(-1)}
          {navBtn(1)}
        </Flex>
      </Flex>
    </Flex>
  )
}
