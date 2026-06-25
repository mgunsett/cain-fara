import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      brown:      '#501919', // rojo carmesí (principal Universitario)
      brownDark:  '#5C0E0E', // rojo profundo
      brownLight: '#D44545', // rojo claro
      amber:      '#D4A84B', // dorado para pequeños detalles
      dark:       '#0A0505', // oscuro con tono cálido (fondo)
      gray:       '#A3897A', // gris cálido (texto secundario)
      bone:       '#FAF5EB', // crema claro (texto principal)
      boneWarm:   '#F0DCC8', // crema cálido (detalles)
    },
  },
  fonts: {
    heading:   `'Bebas Neue', sans-serif`,
    body:      `'Barlow', sans-serif`,
    mono:      `'Barlow Condensed', sans-serif`,
  },
  styles: {
    global: {
      'html, body': {
        bg: '#0A0505',
        color: '#FAF5EB',
        overflowX: 'hidden',
      },
      '::-webkit-scrollbar': { width: '4px' },
      '::-webkit-scrollbar-track': { bg: '#0A0505' },
      '::-webkit-scrollbar-thumb': { bg: '#501919', borderRadius: '2px' },
    },
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
})

export default theme
