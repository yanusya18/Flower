// Створює іконки застосунку (PWA) з одного SVG: npm run icons
import { mkdir } from 'node:fs/promises'
import sharp from 'sharp'

const OUT = 'public/icons'

// Квітка з favicon.svg на лавандовому фоні. scale — наскільки квітка заповнює іконку:
// для maskable-іконки вміст має вміщатися в центральне «безпечне» коло, тому масштаб менший.
const svg = (scale) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#EAE0FB"/>
  <g transform="translate(256 256) scale(${scale}) translate(-32 -32)">
    <path d="M32 12c6 7 10 13 10 19a10 10 0 0 1-20 0c0-6 4-12 10-19z" fill="#6E3DD9"/>
    <circle cx="32" cy="28" r="2.6" fill="#FDFF70"/>
    <path d="M32 34v18M32 46c-6 0-10-3-12-8 6 0 10 3 12 8zM32 44c5 0 9-3 11-8-6 0-9 3-11 8z"
      fill="none" stroke="#195900" stroke-width="3" stroke-linecap="round"/>
  </g>
</svg>`

await mkdir(OUT, { recursive: true })
const render = (scale, size, file) =>
  sharp(Buffer.from(svg(scale))).resize(size, size).png({ compressionLevel: 9 }).toFile(`${OUT}/${file}`)

await render(9, 192, 'icon-192.png')
await render(9, 512, 'icon-512.png')
await render(7.5, 512, 'icon-maskable-512.png')
await render(9, 180, 'apple-touch-icon.png')
console.log('Іконки створено в', OUT)
