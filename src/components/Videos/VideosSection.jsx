import { useRef, useEffect, useState } from 'react'
import { Box, Flex, Text, AspectRatio } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { playerData } from '../../data/playerData'
import useScrubReveal from '../../hooks/useScrubReveal'
import { VideoCard } from './VideoCard'

gsap.registerPlugin(ScrollTrigger)

const MotionBox = motion(Box)

export default function VideosSection() {
  const videos = playerData.videos

  const ghostRef = useRef(null)
  const wrapRef = useRef(null)
  const sliderRef = useRef(null)

  const [active, setActive] = useState(0)
  const [openVideo, setOpenVideo] = useState(null)

  const sectionRef = useRef(null)
  const headerRef = useRef(null)

  useScrubReveal(sectionRef, {
    elements: [{ ref: headerRef, fromVars: { y: 50, opacity: 0 }, vars: { y: 0, opacity: 1 } }],
    start: 'top 80%',
    end: 'top 40%',
  })

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true },
        }
      )

      const cards = gsap.utils.toArray('.video-card', wrapRef.current)
      if (reduced) {
        gsap.set(cards, { autoAlpha: 1, y: 0 })
      } else {
        gsap.fromTo(
          cards,
          { y: 55, autoAlpha: 0, rotateX: 6, transformPerspective: 1200 },
          {
            y: 0,
            autoAlpha: 1,
            rotateX: 0,
            duration: 1.1,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: { trigger: wrapRef.current, start: 'top 82%', once: true },
          }
        )
      }

      if (!reduced && ghostRef.current) {
        gsap.to(ghostRef.current, {
          yPercent: -18,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!openVideo) return
    const onKey = (e) => e.key === 'Escape' && setOpenVideo(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openVideo])

  // slider mobile: detectar card activa según el scroll
  const handleScroll = () => {
    const el = sliderRef.current
    if (!el || !el.children.length) return
    const style = getComputedStyle(el)
    const gap = parseFloat(style.columnGap || style.gap || '0') || 0
    const itemW = el.children[0].offsetWidth + gap
    if (!itemW) return
    setActive(Math.round(el.scrollLeft / itemW))
  }

  const goTo = (i) => {
    const el = sliderRef.current
    el?.children[i]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  if (!videos.length) return null

  return (
    <Box
      as="section"
      id="videos"
      ref={sectionRef}
      position="relative"
      minH="100vh"
      bg="brand.gray"
      px={{ base: 5, md: 12, lg: 40 }}
      pt={{ base: 20, md: '10%' }}
      pb={{ base: 12, md: '10%' }}
      overflow="hidden"
    >
      {/* glows ambientales */}
      <Box
        position="absolute"
        top={{ base: '10%', md: '-5%' }}
        right="-12%"
        w="55vw"
        h="55vw"
        background="radial-gradient(ellipse, rgba(80,25,25,0.16) 0%, transparent 70%)"
        pointerEvents="none"
      />

      {/* número fantasma gigante (dorsal) */}
      <Text
        ref={ghostRef}
        aria-hidden
        position="absolute"
        top={{ base: '10%', md: '12%' }}
        right={{ base: '-6%', md: '6%' }}
        fontFamily="heading"
        fontSize={{ base: '60vw', md: '30vw' }}
        lineHeight={0.8}
        color="transparent"
        pointerEvents="none"
        userSelect="none"
        zIndex={0}
        sx={{ WebkitTextStroke: '1.5px rgba(80,25,25,0.14)' }}
      >
        {playerData.number}
      </Text>

      <Box maxW="1240px" mx="auto" position="relative" zIndex={1}>
        {/* ── Header ── */}
        <Flex direction="column" align="flex-start" justify="flex-start" ref={headerRef} mb={{ base: 8, md: 12 }} ml={{ base: 0, md: '-30px', lg: '-90px' }}>
          <Text fontFamily="mono" fontSize="10px" color="white" textTransform="uppercase" letterSpacing="widest">
            HIGHLIGHTS
          </Text>
          <Text as="h2" fontFamily="heading" fontSize={{ base: '5xl', lg: '6xl' }} color="brand.brown" lineHeight={1}>
            Videos
          </Text>
        </Flex>

        {/* ── Cards ── */}
        <Box ref={wrapRef} position="relative">
          {/* Desktop: 3 en fila */}
          <Flex display={{ base: 'none', md: 'flex' }} justify="center" align="stretch" gap={{ md: 5, lg: 12 }}>
            {videos.map((v, i) => (
              <Box key={v.id} flex="1 1 0" maxW={{ md: '300px', lg: '340px' }}>
                <VideoCard video={v} index={i} onOpen={setOpenVideo} />
              </Box>
            ))}
          </Flex>

          {/* Mobile: slider con swipe */}
          <Box display={{ base: 'block', md: 'none' }}>
            <Flex
              ref={sliderRef}
              onScroll={handleScroll}
              overflowX="auto"
              scrollSnapType="x mandatory"
              bg='brand.gray'
              gap={4}
              px="9%"
              pb={1}
              sx={{
                scrollbarWidth: 'none',
                '::-webkit-scrollbar': { display: 'none' },
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {videos.map((v, i) => (
                <Box key={v.id} flex="0 0 82%" scrollSnapAlign="center">
                  <VideoCard video={v} index={i} onOpen={setOpenVideo} />
                </Box>
              ))}
            </Flex>

            {/* dots */}
            <Flex justify="center" align="center" gap={2} mt={6}>
              {videos.map((v, i) => (
                <Box
                  key={v.id}
                  as="button"
                  aria-label={`Ir al video ${i + 1}`}
                  onClick={() => goTo(i)}
                  h="7px"
                  w={i === active ? '24px' : '7px'}
                  borderRadius="full"
                  bg={i === active ? 'brand.brown' : 'whiteAlpha.500'}
                  transition="all 0.4s cubic-bezier(0.22,1,0.36,1)"
                />
              ))}
            </Flex>
          </Box>
        </Box>
      </Box>

      {/* ── Modal fullscreen ── */}
      <AnimatePresence>
        {openVideo && (
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
            onClick={() => setOpenVideo(null)}
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
              onClick={() => setOpenVideo(null)}
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
                  src={`https://www.tiktok.com/player/v1/${openVideo.tiktokId}?autoplay=1&rel=0`}
                  title={openVideo.fullTitle}
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
    </Box>
  )
}
