import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      brown:      '#501919', // rojo carmesí (principal Universitario)
      brown2:     '#50191963',
      brown3:     '#50191936',
      brownDark:  '#5C0E0E', // rojo profundo
      brownLight: '#D44545', // rojo claro
      brownLight2:'#973333',
      amber:      '#D4A84B', // dorado para pequeños detalles
      dark:       '#0A0505', // oscuro con tono cálido (fondo)
      darkLight:  '#615d5dbb',
      grayDark2:  '#83634d88',
      grayDark:   '#a18775',
      gray:       '#aa8f7f', // gris cálido (texto secundario)
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
        bg: '#e0c9ab',
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
