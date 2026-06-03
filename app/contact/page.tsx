"use client";
import PageHero from "@/components/ui/PageHero";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Link from "next/link";

function ContactSection() {
  const offices = [
    { name: "Main Office", address: "123 Portage Ave, Suite 400", city: "Winnipeg, MB R3B 2G5", phone: "(204) 555-0100", email: "hello@chapterrealestate.ca" },
    { name: "Property Management", address: "456 Corydon Ave", city: "Winnipeg, MB R3L 0N8", phone: "(204) 555-0200", email: "management@chapterrealestate.ca" },
  ];
  const hours = [
    { day: "Monday – Friday", hours: "9:00 AM – 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM – 4:00 PM" },
    { day: "Sunday", hours: "By Appointment" },
  ];
  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Info */}
          <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}>
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Contact Information</p>
            <h2 className="text-4xl font-light text-black mb-10">We&apos;re Here <span className="font-serif italic">to Help</span></h2>
            <div className="space-y-10">
              {offices.map(({ name, address, city, phone, email }, i) => (
                <motion.div key={name}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  <p className="text-xs tracking-widest uppercase font-light text-gray-400 mb-4">{name}</p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 text-sm text-gray-600 font-light">
                      <MapPin size={14} className="text-[#c8a96e] mt-0.5 shrink-0" />
                      <div><p>{address}</p><p>{city}</p></div>
                    </div>
                    <a href={`tel:${phone}`} className="flex items-center gap-3 text-sm text-gray-600 font-light hover:text-black transition-colors">
                      <Phone size={14} className="text-[#c8a96e] shrink-0" />{phone}
                    </a>
                    <a href={`mailto:${email}`} className="flex items-center gap-3 text-sm text-gray-600 font-light hover:text-black transition-colors">
                      <Mail size={14} className="text-[#c8a96e] shrink-0" />{email}
                    </a>
                  </div>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
                <p className="text-xs tracking-widest uppercase font-light text-gray-400 mb-4">Business Hours</p>
                <div className="space-y-2">
                  {hours.map(({ day, hours: h }, i) => (
                    <motion.div key={day} className="flex items-center gap-3 text-sm font-light"
                      initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                    >
                      <Clock size={14} className="text-[#c8a96e] shrink-0" />
                      <span className="text-gray-700 w-40">{day}</span>
                      <span className="text-gray-400">{h}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div id="book"
            initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">Send a Message</p>
            <h2 className="text-3xl font-light text-black mb-8">Book a <span className="font-serif italic">Consultation</span></h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-black transition-colors font-light" />
                <input type="text" placeholder="Last Name" className="border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-black transition-colors font-light" />
              </div>
              <input type="email" placeholder="Email Address" className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-black transition-colors font-light" />
              <input type="tel" placeholder="Phone Number" className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-black transition-colors font-light" />
              <select className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-600 outline-none focus:border-black transition-colors font-light bg-white">
                <option value="">I&apos;m interested in...</option>
                <option>Buying a Home</option><option>Selling a Home</option><option>Property Management</option>
                <option>Real Estate Investment</option><option>Joining Chapter as an Agent</option><option>Other</option>
              </select>
              <textarea placeholder="Tell us more about your needs..." rows={4} className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-black transition-colors font-light resize-none" />
              <motion.button type="submit" className="w-full bg-black text-white text-sm font-light tracking-widest uppercase py-4 hover:bg-[#c8a96e] transition-colors"
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              >
                Send Message
              </motion.button>
              <p className="text-xs text-gray-400 font-light text-center">We typically respond within 24 hours.</p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MapEmbed() {
  return (
    <motion.section className="h-96 bg-gray-100 relative overflow-hidden"
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=1800&q=80')" }} />
      <motion.div className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}
      >
        <div className="bg-white px-8 py-4 text-center">
          <p className="text-xs tracking-widest uppercase font-light text-gray-400 mb-1">Main Office</p>
          <p className="text-sm font-light text-black">123 Portage Ave, Suite 400, Winnipeg, MB</p>
        </div>
      </motion.div>
    </motion.section>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero label="Get In Touch" heading="Let's Start" headingAccent="a Conversation." image="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=80" />
      <ContactSection />
      <MapEmbed />
    </>
  );
}
