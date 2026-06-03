"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { text: "Chapter made selling our home effortless. Their marketing strategy was unlike anything we'd seen — we had multiple offers within days.", author: "David & Karen T.", context: "Sellers, River Heights" },
  { text: "As a landlord with multiple properties, I can't imagine managing them without Chapter. The owner portal alone saves me hours every month.", author: "Michael R.", context: "Property Owner, 4 Units" },
  { text: "The investment team at Chapter helped me identify a multifamily opportunity I never would have found on my own. Exceptional guidance.", author: "Linda H.", context: "Investor" },
];

export default function Testimonials() {
  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-light text-black leading-tight">What Our Clients Say</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(({ text, author, context }, i) => (
            <motion.div
              key={author}
              className="p-8 bg-[#f7f7f7] flex flex-col gap-6 relative overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              {/* Decorative quote */}
              <motion.span
                className="absolute -top-4 -right-2 text-[120px] font-serif text-gray-100 leading-none select-none pointer-events-none"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 + 0.2 }}
              >
                &ldquo;
              </motion.span>
              <div className="flex gap-0.5">
                {Array(5).fill(0).map((_, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.15 + j * 0.06 + 0.3 }}
                  >
                    <Star size={13} className="fill-[#c8a96e] text-[#c8a96e]" />
                  </motion.div>
                ))}
              </div>
              <p className="text-gray-600 font-light text-sm leading-relaxed flex-1 relative z-10">&ldquo;{text}&rdquo;</p>
              <div>
                <p className="text-sm font-light text-black">{author}</p>
                <p className="text-xs text-gray-400 font-light mt-0.5">{context}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
