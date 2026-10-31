import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { playerData } from '../../data/playerData'
import { GalleryAccordion } from './GalleryAccordion'
import { Lightbox } from './Lightbox'

// Adapta los datos de playerData.gallery a la API del acordeón
const photos = playerData.gallery.map((p) => ({
  id: p.id,
  src: p.src,
  alt: p.alt,
  tag: p.category,
  title: p.caption,
  date: p.date,
  author: p.author,
  focus: p.focus,
}))

// Sección Galería: acordeón con las primeras 7 fotos + lightbox con las 15
export default function GalleryAccordionSection() {
  const [lightbox, setLightbox] = useState(null)
  const total = photos.length

  return (
    <>
      <GalleryAccordion
        id="galeria"
        photos={photos}
        onExpand={(_photo, index) => setLightbox(index)}
        onViewAll={() => setLightbox(0)}
      />

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            photo={photos[lightbox]}
            onClose={() => setLightbox(null)}
            onPrev={() => setLightbox((l) => (l - 1 + total) % total)}
            onNext={() => setLightbox((l) => (l + 1) % total)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
