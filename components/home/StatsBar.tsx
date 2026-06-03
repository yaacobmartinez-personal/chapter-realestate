"use client";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: 2000, bounce: 0 });
  useEffect(() => { if (inView) motionVal.set(value); }, [inView, motionVal, value]);
  useEffect(() => spring.on("change", (v) => {
    if (ref.current) ref.current.textContent = Math.round(v).toLocaleString() + suffix;
  }), [spring, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

const stats = [
  { display: "500", suffix: "+", label: "Properties Sold", value: 500 },
  { display: "1,200", suffix: "+", label: "Units Managed", value: 1200 },
  { display: "98", suffix: "%", label: "Client Satisfaction", value: 98 },
  { display: "15", suffix: "+", label: "Years of Experience", value: 15 },
];

export default function StatsBar() {
  return (
    <section className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/10">
          {stats.map(({ value, suffix, label }, i) => (
            <motion.div
              key={label}
              className="px-8 py-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <p className="text-4xl font-light text-[#c8a96e] mb-1">
                <AnimatedNumber value={value} suffix={suffix} />
              </p>
              <p className="text-xs text-gray-500 tracking-widest uppercase font-light">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
