import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { STUDIOS } from "@/lib/constants";
import Link from "next/link";

export const metadata = { title: "معرض الأعمال | سعوديو" };

// Placeholder grid items
const GRID_ITEMS = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  studio: STUDIOS[i % STUDIOS.length],
  pattern: ["ناعم", "كلاسيك", "إبداعي", "واقعي", "فاخر"][i % 5],
}));

export default function GalleryPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary-50/40 to-white">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-primary-50 text-primary-700 border border-primary-100 mb-4">معرض إبداعات سعوديو</span>
              <h1 className="text-4xl md:text-5xl font-black text-neutral-900 mb-4">معرض الأعمال</h1>
              <p className="text-neutral-500 text-lg leading-relaxed">إبداعات من مختلف استوديوهاتنا الذكية .. من خلال الصور يمكنك الوصول المباشر إلى الاستوديو المطلوب.</p>
            </div>
          </Container>
        </section>

        <Section>
          <Container>
            {/* Studio filter */}
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              <button className="px-4 py-2 rounded-full text-sm font-semibold bg-primary-600 text-white">الكل</button>
              {STUDIOS.map((s) => (
                <button key={s.id} className="px-4 py-2 rounded-full text-sm font-semibold bg-white border border-neutral-200 text-neutral-600 hover:border-primary-300 hover:text-primary-700 transition-all">
                  {s.name}
                </button>
              ))}
            </div>

            {/* Masonry-style grid */}
            <div className="columns-2 md:columns-3 lg:columns-5 gap-4 space-y-4">
              {GRID_ITEMS.map(({ id, studio, pattern }) => (
                <Link key={id} href={`/studios/${studio.id}`} className="block break-inside-avoid">
                  <div className="group relative rounded-xl overflow-hidden bg-neutral-100 border border-neutral-100 shadow-sm hover:shadow-md transition-all cursor-pointer">
                    {/* Placeholder image area */}
                    <div
                      className={`w-full ${id % 3 === 0 ? "aspect-square" : id % 3 === 1 ? "aspect-[3/4]" : "aspect-[4/3]"} flex items-center justify-center text-4xl`}
                      style={{ backgroundColor: `${studio.color}12` }}
                    >
                      {studio.emoji}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <div>
                        <p className="text-white text-xs font-semibold">{pattern}</p>
                        <p className="text-white/70 text-xs">{studio.name}</p>
                      </div>
                    </div>
                    {/* Label */}
                    <div className="px-3 py-2 flex items-center justify-between bg-white">
                      <span className="text-xs font-semibold text-neutral-600">{pattern}</span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ backgroundColor: studio.color }}>{studio.name}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
