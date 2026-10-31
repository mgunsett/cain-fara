import { useState } from 'react'
import { Box } from '@chakra-ui/react'

const PREVIEW_PARAMS =
  'autoplay=1&muted=1&loop=1&controls=0&progress_bar=0&play_button=0&volume_control=0&fullscreen_button=0&timestamp=0&rel=0&native_context_menu=0&closed_caption=0'

// Preview TikTok muteado: entra con fade cuando el player terminó de cargar (la portada queda debajo mientras tanto)
export function ClipPreview({ video }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <Box
      as="iframe"
      src={`https://www.tiktok.com/player/v1/${video.tiktokId}?${PREVIEW_PARAMS}`}
      title={`Preview ${video.title}`}
      allow="autoplay; encrypted-media"
      tabIndex={-1}
      onLoad={() => setLoaded(true)}
      position="absolute"
      top="50%"
      left="50%"
      border="none"
      pointerEvents="none"
      opacity={loaded ? 1 : 0}
      transition="opacity 0.6s ease"
      sx={{
        transform: 'translate(-50%, -50%)',
        minWidth: '100%',
        minHeight: '100%',
        aspectRatio: '9 / 16',
      }}
    />
  )
}
