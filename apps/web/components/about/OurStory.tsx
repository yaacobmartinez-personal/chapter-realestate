import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function OurStory() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-4/5 bg-gray-100 overflow-hidden">
            <Image
              fill
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
              alt="Chapter Office"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Our Story</p>
            <h2 data-reveal className="text-4xl md:text-5xl font-light text-black leading-tight mb-8">
              A New <span className="font-serif italic">Chapter</span><br />for Winnipeg
            </h2>
            <div data-reveal className="space-y-4 text-gray-500 font-light leading-relaxed text-sm">
              <p>
                Chapter was founded with a single belief: that real estate in Winnipeg deserved a better experience. Not just a better transaction — a better relationship between clients and their properties, from the first showing to long-term ownership.
              </p>
              <p>
                Our founders combined decades of brokerage experience with a modern, technology-forward approach to build a platform that handles every dimension of real estate — buying, selling, managing, and investing — under one roof.
              </p>
              <p>
                Today, Chapter is one of Winnipeg&apos;s fastest-growing real estate companies, with over 1,200 units under management, hundreds of successful transactions, and a team of dedicated professionals who put clients first.
              </p>
            </div>
            <Link href="/contact" className="inline-flex items-center gap-3 mt-10 text-sm font-light tracking-widest uppercase group">
              <span>Get In Touch</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
