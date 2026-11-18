import { useEffect, useMemo, useRef } from 'react'
import { Box, Text, useToken } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Geometría del radar — viewBox con margen lateral para las etiquetas
const CX = 190
const CY = 150
const R = 100 // tamaño del polígono (radio)

export function RadarChart({ stats }) {
  const wrapRef = useRef(null)
  const N = stats.length
  const [brown, brown2, bone] = useToken('colors', [
    'brand.brown', 'brand.brown2', 'brand.bone',
  ])

  // Punto (x,y) para un valor 0-100 en el eje i
  const pointFor = (value, i) => {
    const ang = (-90 + (i * 360) / N) * (Math.PI / 180)
    return [
      CX + R * (value / 100) * Math.cos(ang),
      CY + R * (value / 100) * Math.sin(ang),
    ]
  }

  const gridRings = useMemo(
    () => [0.25, 0.5, 0.75, 1].map(f =>
      stats.map((_, i) => pointFor(f * 100, i).join(',')).join(' ')
    ),
    [stats]
  )

  const valuePoints = useMemo(
    () => stats.map((s, i) => pointFor(s.value, i)),
    [stats]
  )

  const labels = useMemo(
    () => stats.map((s, i) => {
      const ang = (-90 + (i * 360) / N) * (Math.PI / 180)
      const cos = Math.cos(ang)
      const sin = Math.sin(ang)
      return {
        ...s,
        x: CX + (R + 18) * cos,
        y: CY + (R + 18) * sin + (sin < -0.5 ? -2 : sin > 0.5 ? 12 : 4),
        anchor: Math.abs(cos) < 0.3 ? 'middle' : cos > 0 ? 'start' : 'end',
      }
    }),
    [stats]
  )

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top 85%',
          end: 'top 40%',
          scrub: 1.2,
        },
      })
      tl.fromTo('.radar-value',
        { scale: 0, opacity: 0, svgOrigin: `${CX} ${CY}` },
        { scale: 1, opacity: 1 }
      )
      tl.fromTo('.radar-dot', { opacity: 0 }, { opacity: 1, stagger: 0.06 }, '-=0.3')
      tl.fromTo('.radar-label', { opacity: 0 }, { opacity: 1, stagger: 0.06 }, '<')
    }, wrapRef)
    return () => ctx.revert()
  }, [])

  return (
    <Box ref={wrapRef} w="100%" maxW={{ base: '360px', md: '460px', lg: '500px' }} mx="auto">
      <Box as="svg" viewBox="-75 0 530 300" w="100%" role="img"
        aria-label="Radar de habilidades técnicas"
      >
        {gridRings.map((pts, i) => (
          <polygon key={i} points={pts} fill="none"
            stroke={i === 3 ? brown : brown2} strokeWidth={i === 3 ? '1.5' : '1'}
          />
        ))}
        {stats.map((_, i) => {
          const [x, y] = pointFor(100, i)
          return <line key={i} x1={CX} y1={CY} x2={x} y2={y} stroke={brown2} />
        })}
        <polygon
          className="radar-value"
          points={valuePoints.map(p => p.join(',')).join(' ')}
          fill={`${brown}66`} stroke={brown} strokeWidth="1.5"
        />
        {valuePoints.map(([x, y], i) => (
          <circle key={i} className="radar-dot" cx={x} cy={y} r="2.8" fill={brown} />
        ))}
        {labels.map(l => (
          <text key={l.label} className="radar-label"
            x={l.x} y={l.y} textAnchor={l.anchor}
            fontFamily="'Barlow Condensed', sans-serif"
            fontSize="16" letterSpacing="0.8" fill={bone}
            style={{ textTransform: 'uppercase' }}
          >
            {l.label} <tspan fill="white" fontWeight="700">{l.value} %</tspan>
          </text>
        ))}
      </Box>
    </Box>
  )
}

export function OverallRating({ value }) {
  const numRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(numRef.current,
        { textContent: 0 },
        {
          textContent: value,
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: numRef.current,
            start: 'top 90%',
            end: 'top 55%',
            scrub: 1.2,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [value])

  return (
    <Box textAlign="center" mt={6}>
      <Text ref={numRef}
        fontFamily="heading"
        fontSize={{ base: '80px', md: '70px' }}
        color="brand.brown" lineHeight="1"
      >
        {value}
      </Text>
      <Text
        fontFamily="mono"
        fontSize="10px" fontWeight="700"
        letterSpacing="0.3em" textTransform="uppercase"
        color="brand.bone"
      >
        Valoración
      </Text>
    </Box>
  )
}
