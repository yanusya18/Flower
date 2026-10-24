// Стискає зображення з src/assets/photos-src у WebP та AVIF кількох розмірів
// і записує розміри в src/assets/images.manifest.json (його читає компонент Picture).
// Запуск: npm run images
import { mkdir, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SRC = 'src/assets/photos-src'
const OUT = 'public/images'
const MANIFEST = 'src/assets/images.manifest.json'
const TARGET_WIDTHS = [320, 640, 960, 1280]
const MAX_WIDTH = 1280

await mkdir(OUT, { recursive: true })
const manifest = {}

for (const file of (await readdir(SRC)).filter((f) => /\.(png|jpe?g)$/i.test(f))) {
  const name = path.parse(file).name
  const image = sharp(path.join(SRC, file))
  const meta = await image.metadata()

  // Не збільшуємо оригінал: беремо лише ті ширини, що менші за нього
  const largest = Math.min(meta.width, MAX_WIDTH)
  const widths = [...TARGET_WIDTHS.filter((w) => w < largest), largest]

  for (const width of widths) {
    const resized = image.clone().resize({ width })
    await resized.clone().avif({ quality: 50 }).toFile(`${OUT}/${name}-${width}.avif`)
    await resized.clone().webp({ quality: 78 }).toFile(`${OUT}/${name}-${width}.webp`)
  }

  manifest[name] = {
    width: largest,
    height: Math.round((meta.height * largest) / meta.width),
    widths,
  }
  console.log(`${file}: ${meta.width}×${meta.height} → ${widths.join(', ')} px (webp + avif)`)
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
