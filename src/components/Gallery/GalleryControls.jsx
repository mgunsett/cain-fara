import { Flex, chakra } from '@chakra-ui/react'
import { useReducedMotion } from 'framer-motion'
import { EASE, LABEL, MotionSpan, dur } from './galleryShared'
import { GalleryIcon, ICONS } from './GalleryIcon'

function RoundButton(props) {
  return (
    <chakra.button
      type="button"
      boxSize={12}
      borderRadius="full"
      border="1.5px solid"
      borderColor="rgba(250,245,235,0.45)"
      bg="transparent"
      color="brand.bone"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      transition="background-color .2s, border-color .2s"
      _hover={{ bg: 'rgba(250,245,235,0.1)', borderColor: 'brand.bone' }}
      _focusVisible={{ outline: '3px solid', outlineColor: 'brand.amber', outlineOffset: '2px' }}
      {...props}
    />
  )
}

// Flechas anterior/siguiente, barra de segmentos y link "Ver las N fotos"
export function GalleryControls({ items, active, onPrev, onNext, totalPhotos, onViewAll, viewAllHref }) {
  const reduce = useReducedMotion()
  const showViewAll = Boolean(onViewAll || viewAllHref)

  return (
    <Flex wrap="wrap" align="center" justify="space-between" gap={6}>
      <Flex align="center" gap={3}>
        <RoundButton aria-label="Foto anterior" onClick={onPrev}>
          <GalleryIcon paths={ICONS.prev} />
        </RoundButton>
        <RoundButton aria-label="Foto siguiente" onClick={onNext}>
          <GalleryIcon paths={ICONS.next} />
        </RoundButton>
        <Flex aria-hidden="true" align="center" gap={1.5} ml={3}>
          {items.map((photo, i) => (
            <MotionSpan
              key={photo.id ?? photo.src ?? i}
              display="block"
              h={1}
              borderRadius="2px"
              initial={false}
              animate={{
                width: i === active ? 40 : 16,
                backgroundColor: i === active ? '#D4A84B' : 'rgba(250,245,235,0.25)',
              }}
              transition={{ duration: dur(reduce, 0.5), ease: EASE }}
            />
          ))}
        </Flex>
      </Flex>

      {showViewAll && (
        <chakra.a
          as={viewAllHref ? 'a' : 'button'}
          type={viewAllHref ? undefined : 'button'}
          href={viewAllHref}
          onClick={(e) => {
            if (!onViewAll) return
            e.preventDefault()
            onViewAll()
          }}
          minH={11}
          display="inline-flex"
          alignItems="center"
          gap={2.5}
          bg="transparent"
          {...LABEL}
          fontSize="15px"
          letterSpacing="0.12em"
          color="brand.amber"
          textDecoration="none"
          cursor="pointer"
          _hover={{ color: 'brand.bone' }}
          _focusVisible={{ outline: '3px solid', outlineColor: 'brand.amber', outlineOffset: '4px' }}
        >
          Ver las {totalPhotos} fotos
          <GalleryIcon paths={ICONS.arrow} size={18} />
        </chakra.a>
      )}
    </Flex>
  )
}
