import type { Metadata } from 'next'
import Link from 'next/link'
import { Section, Container, SectionHeader } from '@/components/ui'

export const metadata: Metadata = { title: 'معرض الأعمال' }

// Placeholder gallery items (will be replaced with real images)
const galleryItems = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  studio: ['استوديو سعود', 'استوديو نور', 'استوديو خالد', 'استوديو وليد', 'استوديو فيصل'][i % 5],
  style: ['نمط ناعم', 'نمط كلاسيك', 'نمط إبداعي', 'نمط فاخر', 'نمط واقعي'][i % 5],
  studioId: ['saud', 'noor', 'khaled', 'waleed', 'faisal'][i % 5],
  size: i % 3 === 0 ? 'tall' : i % 5 === 0 ? 'wide' : 'normal',
}))

const studios = ['الكل', 'استوديو سعود', 'استوديو نور', 'استوديو خالد', 'استوديو وليد', 'استوديو فيصل']

export default function GalleryPage() {
  return (
    <>
      <section className="bg-white pt-28 pb-12">
        <Container>
          <div className="text-center mb-10">
            <span className="section-tag mb-4 inline-block">معرض إبداعات سعوديو</span>
            <h1 className="text-4xl sm:text-5xl font-black text-neutral-900 mb-4">
              معرض الأعمال
            </h1>
            <p className="text-neutral-500 text-lg max-w-xl mx-auto">
              إبداعات من مختلف استوديوهاتنا الذكية .. من خلال الصور يمكنك الوصول المباشر إلى الاستوديو المطلوب.
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {studios.map((s, i) => (
              <button
                key={s}
                className={`text-sm font-medium px-4 py-2 rounded-full border transition-all ${
                  i === 0
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-primary-300 hover:text-primary-600'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </Container>
      </section>

      <Section bg="subtle">
        <Container>
          {/* Masonry grid */}
          <div className="columns-2 sm:columns-3 lg:columns-5 gap-4 space-y-4">
            {galleryItems.map((item) => (
              <Link
                key={item.id}
                href={`/studios#${item.studioId}`}
                className="break-inside-avoid block group cursor-pointer"
              >
                <div className={`bg-neutral-200 rounded-2xl overflow-hidden relative ${
                  item.size === 'tall' ? 'aspect-[3/4]' : item.size === 'wide' ? 'aspect-[4/3]' : 'aspect-square'
                }`}>
                  {/* Placeholder gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300 group-hover:from-primary-100 group-hover:to-primary-200 transition-all duration-300" />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                </div>
                <div className="flex items-center justify-between mt-2 px-1">
                  <span className="text-xs font-semibold text-neutral-600">{item.style}</span>
                  <span className="text-xs bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded-full">{item.studio}</span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
