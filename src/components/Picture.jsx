import manifest from '../assets/images.manifest.json'

// Розміри, які зображення займає в макеті: два стовпці на широких екранах,
// один стовпець на вузьких. Браузер за ними обирає потрібну ширину зі srcset.
export const PHOTO_SIZES =
  '(min-width: 1248px) 552px, (min-width: 761px) calc((100vw - 96px) / 2), calc(100vw - 48px)'

const BASE = import.meta.env.BASE_URL

// Зображення з AVIF/WebP, srcset, width/height (без зсуву макета) та lazy loading.
// priority — для головного зображення першого екрана: воно вантажиться одразу й з високим пріоритетом.
function Picture({ name, alt, priority = false }) {
  const meta = manifest[name]
  const srcSet = (ext) =>
    meta.widths.map((width) => `${BASE}images/${name}-${width}.${ext} ${width}w`).join(', ')

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet('avif')} sizes={PHOTO_SIZES} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={PHOTO_SIZES} />
      <img
        className="photo"
        src={`${BASE}images/${name}-${meta.width}.webp`}
        alt={alt}
        width={meta.width}
        height={meta.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'auto' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </picture>
  )
}

export default Picture
