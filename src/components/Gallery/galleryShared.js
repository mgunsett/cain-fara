import { chakra, shouldForwardProp } from '@chakra-ui/react'
import { isValidMotionProp, motion } from 'framer-motion'

// Componentes de Framer Motion que aceptan style props de Chakra
const forward = {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
}
export const MotionBox = chakra(motion.div, forward)
export const MotionSpan = chakra(motion.span, forward)
export const MotionButton = chakra(motion.button, forward)
export const MotionImg = chakra(motion.img, forward)

export const EASE = [0.2, 0.8, 0.2, 1]

export const LABEL = {
  fontFamily: 'mono',
  fontWeight: 600,
  fontSize: '13px',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
}

export const CREAM_MUTED = 'rgba(250,245,235,0.6)'

export const pad = (n) => String(n).padStart(2, '0')

// Con prefers-reduced-motion todas las duraciones van a 0
export const dur = (reduce, s) => (reduce ? 0 : s)
