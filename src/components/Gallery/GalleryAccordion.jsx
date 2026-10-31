import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Box, Flex, VisuallyHidden } from '@chakra-ui/react'
import { useReducedMotion } from 'framer-motion'
import { EASE, MotionBox, dur } from './galleryShared'
import { GalleryHeader } from './GalleryHeader'
import { GalleryPanel } from './GalleryPanel'
import { GalleryControls } from './GalleryControls'

const KEY_STEP = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }

// Galería en acordeón horizontal: la foto activa se expande y el resto quedan como franjas
export function GalleryAccordion({
  id,
  photos = [],
  maxVisible = 7,
  initialIndex = 0,
  autoPlay = false,
  interval = 6000,
  eyebrow = 'Fotos destacadas',
  title = 'Galería',
  onExpand,
  onViewAll,
  viewAllHref,
}) {
  const items = photos.slice(0, maxVisible)
  const total = items.length
  const [active, setActive] = useState(() => Math.min(Math.max(initialIndex, 0), Math.max(total - 1, 0)))
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()
  const panelRefs = useRef([])
  const titleId = useId()

  const go = useCallback(
    (index, { focus = false } = {}) => {
      if (!total) return
      const next = (index + total) % total
      setActive(next)
      if (focus) panelRefs.current[next]?.focus()
    },
    [total],
  )

  // Si cambia la cantidad de fotos, no quedar apuntando fuera de rango
  useEffect(() => {
    if (total && active > total - 1) setActive(0)
  }, [active, total])

  useEffect(() => {
    if (!autoPlay || paused || reduce || total < 2) return undefined
    const timer = setInterval(() => setActive((a) => (a + 1) % total), interval)
    return () => clearInterval(timer)
  }, [autoPlay, paused, reduce, total, interval])

  if (!total) return null

  const current = items[active]

  // Roving tabindex: flechas cambian de foto y mueven el foco; Home/End a los extremos
  const onKeyDown = (e) => {
    const step = KEY_STEP[e.key]
    const target = step ? active + step : e.key === 'Home' ? 0 : e.key === 'End' ? total - 1 : null
    if (target === null) return
    e.preventDefault()
    go(target, { focus: true })
  }

  return (
    <Box
      as="section"
      id={id}
      aria-labelledby={titleId}
      bg="brand.ink"
      color="brand.bone"
      fontFamily="body"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false)
      }}
    >
      <Flex direction="column" gap={10} maxW="1280px" mx="auto" px={6} py={{ base: 14, md: 20 }}>
        <GalleryHeader eyebrow={eyebrow} title={title} titleId={titleId} active={active} total={total} />

        <VisuallyHidden aria-live="polite">
          
        </VisuallyHidden>

        <MotionBox
          initial={reduce ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: dur(reduce, 0.8), ease: EASE }}
        >
          <Flex
            onKeyDown={onKeyDown}
            direction={{ base: 'column', md: 'row' }}
            gap={{ base: 2, md: 2.5 }}
            h={{ base: '720px', md: '560px' }}
          >
            {items.map((photo, i) => (
              <GalleryPanel
                key={photo.id ?? photo.src ?? i}
                ref={(el) => {
                  panelRefs.current[i] = el
                }}
                photo={photo}
                index={i}
                total={total}
                isActive={i === active}
                canExpand={Boolean(onExpand)}
                onClick={() => (i === active ? onExpand?.(photo, i) : go(i))}
              />
            ))}
          </Flex>
        </MotionBox>

        <GalleryControls
          items={items}
          active={active}
          onPrev={() => go(active - 1)}
          onNext={() => go(active + 1)}
          totalPhotos={photos.length}
          onViewAll={onViewAll}
          viewAllHref={viewAllHref}
        />
      </Flex>
    </Box>
  )
}
