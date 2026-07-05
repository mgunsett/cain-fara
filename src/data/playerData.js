import { FaInstagram, FaEnvelope } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { IoMdStats } from 'react-icons/io'

//Hero
import ronald1 from '@assets/ronald1.png'
import argentina from '@assets/argentina.webp'
import universitario from '@assets/universitario.webp'
//Escudos trayectoria
import escudoCentral from '@assets/escudos/escudo_central.webp'
import escudoJuventud from '@assets/escudos/escudo_juventud.webp'
import escudoEstudiantes from '@assets/escudos/escudo_cae.webp'
import escudoFerro from '@assets/escudos/escudo_ferro.webp'
import escudoAldosivi from '@assets/escudos/escudo_aldosivi.webp'
import escudoSol from '@assets/escudos/escudo_solamerica.webp'
import escudoTigre from '@assets/escudos/escudo_tigre.webp'
import escudoAucas from '@assets/escudos/escudo_aucas.webp'
import escudoEmelec from '@assets/escudos/escudo_emelec.webp'
import escudoAtlanta from '@assets/escudos/escudo_atlanta.webp'
import escudoUniv from '@assets/escudos/escudo_univ.webp'
//Gallery
import image1 from '@assets/gallery/image1.webp'
import image2 from '@assets/gallery/image2.webp'
import image3 from '@assets/gallery/image3.webp'
import image4 from '@assets/gallery/image4.webp'
import image5 from '@assets/gallery/image5.webp'
import image6 from '@assets/gallery/image6.webp'
import image7 from '@assets/gallery/image7.webp'
import image8 from '@assets/gallery/image8.webp'
//Video
import photoGraph from '@assets/photoGraph.webp'
import photoGraph2 from '@assets/photoGraph2.webp'
import photoGraph3 from '@assets/photoGraph3.webp'
//Prensa
import logo1 from '@assets/logos/logo1.webp'
import logo2 from '@assets/logos/logo2.webp'
import logo3 from '@assets/logos/logo3.webp'
//Redes
import transfermkt from '@assets/contact2.svg'
import ledsports from '@assets/contact3.webp'
import moon from '@assets/contact4.webp'


export const playerData = {
  name: 'CAIN',
  fullName: 'FARA',
  number: 2,
  position: 'Defensor Central',
  positionShort: 'DFC',
  nationality: 'Argentino',
  nationalityFlag: argentina,
  age: 31,
  height: '1.84m',
  weight: '82 kg',
  foot: 'Derecho',
  birthDate: '06 / 03 / 1994',
  birthPlace: 'Rosario, Argentina',
  currentClub: 'Universitario de Deportes',
  currentClubShort: 'Universitario',
  logoCurrentClub: universitario,
  image: ronald1,

  stats: [
    { label: 'Velocidad',      value: 87 },
    { label: 'Recuperación',     value: 88 },
    { label: 'Anticipación',         value: 84 },
    { label: 'Juego Aéreo',    value: 78 },
    { label: 'Presión Alta',   value: 82 },
    { label: 'Visión de Juego',value: 79 },
  ],

  seasonStats: [
    { label: 'Partidos',    value: 22 },
    { label: 'Goles',       value: 3 },
    { label: 'Juego aéreo', value: 34 },
    { label: 'Quites', value: 58 },
    { label: 'Min / Part.', value: "1,935'" },
    { label: 'Valoración', value: 7.32  },

  ],

  clubs: [
    {
      name:    'Universitario',
      country: 'Peru',
      years:   '2025 — Actualidad',
      logo:    escudoUniv,
      titles:  [],
      info:    '',
    },
    {
      name:    'Atlánta',
      country: 'Argentina',
      years:   '2024 — 2025',
      logo:    escudoAtlanta,
      titles:  [],
      info:    '',
    },
    {
      name:    'C.S Emelec',
      country: 'Ecuador',
      years:   '2023 — 2024',
      logo:    escudoEmelec,
      titles:  [],
      info:    '',
    },
    {
      name:    'SD Aucas',
      country: 'Ecuador',
      years:   '2022',
      logo:    escudoAucas,
      titles:  ['Serie A de Ecuador 2022'],
      info:    '',
    },
    {
      name:    'Tigre',
      country: 'Argentina',
      years:   '2021',
      logo:    escudoTigre,
      titles:  ['Primera Nacional 2021'],
      info:    '',
    },
    {
      name:    'Sol de América',
      country: 'Paraguay',
      years:   '2020',
      logo:    escudoSol,
      titles:  [],
      info:    'Préstamo',
    },
    {
      name:    'Aldosivi',
      country: 'Argentina',
      years:   '2019 - 2020',
      logo:    escudoAldosivi,
      titles:  [],
      info:    '',
    },
    {
      name:    'Ferro Carril Oeste',
      country: 'Argentina',
      years:   '2018 — 2019',
      logo:    escudoFerro,
      titles:  [],
      info:    'Debut Primera Nacional',
    },
    {
      name:    'Estudiantes de Caseros',
      country: 'Argentina',
      years:   '2017 — 2018',
      logo:    escudoEstudiantes,
      titles:  [],
      info:    '',
    },
    {
      name:    'Juventud Antoniana',
      country: 'Argentina',
      years:   '2016 — 2017',
      logo:    escudoJuventud,
      titles:  [],
      info:    'Préstamo',
    },
    {
      name:    'Rosario Central',
      country: 'Argentina',
      years:   '2016 — 2017',
      logo:    escudoCentral,
      titles:  [],
      info:    'Inferior y Reserva',
    },
  ],

  videos: [
    {
      id: 'v1',
      title: 'Clásico vs Alianza Lima',
      fullTitle: 'Cain Fara | Clásico vs Alianza Lima [Highlights]',
      tiktokId: '7626945711040449809',
      season: 'Clásico',
      category: 'Highlights',
      cover: photoGraph,
    },
    {
      id: 'v2',
      title: "Atlanta '25",
      fullTitle: 'Cain Fara | Atlanta 2025 [Highlights]',
      tiktokId: '7504079891466390790',
      season: 'Atlanta',
      category: 'Resumen',
      cover: photoGraph2,
    },
    {
      id: 'v3',
      title: 'Libertadores 2026',
      fullTitle: 'Cain Fara | Libertadores 2026 [Highlights]',
      tiktokId: '7635149813025099025',
      season: 'Gol vs Nacional',
      category: 'Highlights',
      cover: photoGraph3,
    },
  ],

  press: [
    {
      media: 'CONMEBOL Libertadores',
      logo:  logo1,
      title: 'El 11 ideal de la Jornada 3. El defensor de “la Crema” aportó en defensa y ataque, anotando el primero en la victoria 4-2 sobre Nacional en Perú.',
      date:  'Abril 2026',
      url:   'https://gol.conmebol.com/libertadores/es/news/los-11-mejores-el-equipo-ideal-de-la-jornada-3-de-la-conmebol-libertadores',
    },
    {
      media: 'Liga1 TeApuesto',
      logo:  logo3,
      title: 'Cain Fara cerró su primer semestre en Universitario integrando el XI Ideal de la #Liga1TeApuesto. 🛡️⚽',
      date:  'Junio 2026',
      url:   'https://www.instagram.com/p/DZs3E9lJe_w/',
    },
    {
      media: 'Infobae',
      logo:  logo2,
      title: '“Caín Fara será convocado a la selección de Palestina, que desde hace mucho tiempo viene trabajando para sumar al defensa de Universitario.”',
      date:  'Mayo 2026',
      url:   'https://www.lavoz.com.ar/deportes/futbol/ronaldo-martinez-figura-de-talleres-como-esta-de-la-lesion-y-por-que-festejo-a-lo-cristiano/',
    },
  ],

  gallery: [
    { id: 1, src: image1, alt: 'Cain Fara disputando la pelota en la Liga Profesional 2024', caption: 'Liga Profesional 2024', category: 'Partido', aspect: 'wide' },
    { id: 2, src: image2, alt: 'Cain Fara celebrando un gol ante Racing',                   caption: 'Festejo ante Racing',    category: 'Festejo', aspect: 'tall' },
    { id: 3, src: image3, alt: 'Cain Fara durante el entrenamiento de pretemporada 2025',    caption: 'Pretemporada 2025',       category: 'Entrenamiento', aspect: 'square' },
    { id: 4, src: image4, alt: 'Cain Fara en partido de Copa Argentina 2024',                caption: 'Copa Argentina 2024',     category: 'Partido', aspect: 'wide' },
    { id: 5, src: image5, alt: 'Cain Fara junto al plantel de Talleres 2024',                caption: 'Plantel Talleres 2024',   category: 'Equipo',  aspect: 'wide' },
    { id: 6, src: image6, alt: 'Cain Fara en sesión fotográfica oficial 2024',               caption: 'Foto oficial 2024',       category: 'Retrato', aspect: 'tall' },
    { id: 7, src: image7, alt: 'Cain Fara en acción durante un partido de la Liga Profesional 2024', caption: 'Acción en Liga Profesional 2024', category: 'Partido', aspect: 'wide' },
    { id: 8, src: image8, alt: 'Cain Fara celebrando un gol en la Copa Argentina 2024', caption: 'Celebración en Copa Argentina 2024', category: 'Festejo', aspect: 'tall' },
  ],

  socialMedia: [
    {
      label: 'Instagram',
      icon: FaInstagram,
      iconBg: FaInstagram,
      handle: '@caiinfara',
      url: 'https://www.instagram.com/caiinfara/',
      hoverColor: '#E1306C',
      hoverGradient: 'insta-gradient',
    },
    {
      label: 'TransferMarkt',
      image: transfermkt,
      iconBg: IoMdStats,
      handle: '@cain-fara',
      url: 'https://www.transfermarkt.com.ar/cain-fara/profil/spieler/619072',
      hoverColor: '#1c4a91',
    },
  ],

  contact: [
    {
      title:      'Representante Deportivo',
      label:      'Moon Sports Group',
      image: moon,
      handle:     '@moonsportsgroup_',
      url:        'https://www.instagram.com/moonsportsgroup_/',
      hoverColor: 'rgba(139,69,19,0.18)',
    },
    {
      title:      'Contacto Marketing',
      label:      'LED Sports Marketing',
      image: ledsports,
      handle:     '@_ledsports',
      url:        'https://www.instagram.com/_ledsports/',
      hoverColor: 'rgba(212,168,75,0.18)',
    },
  ],
}
