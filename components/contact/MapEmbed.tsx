"use client";
import { motion } from "framer-motion";

export default function MapEmbed() {
  return (
    <motion.section
      className="h-96 bg-gray-100 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=1800&q=80')",
        }}
      />
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <div className="bg-white px-8 py-4 text-center">
          <p className="text-xs tracking-widest uppercase font-light text-gray-400 mb-1">
            Main Office
          </p>
          <p className="text-sm font-light text-black">
            123 Portage Ave, Suite 400, Winnipeg, MB
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
}
