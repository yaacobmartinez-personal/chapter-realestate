import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import { ownerPortalFeatures, tenantPortalFeatures } from "@/lib/data/property-management";

export default function OwnerTenantPortals() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div data-stagger className="grid md:grid-cols-2 gap-6">
          <div id="owners" className="bg-black text-white p-12">
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">For Owners</p>
            <h3 data-reveal className="text-3xl font-light mb-4">Owner Portal</h3>
            <p className="text-gray-400 font-light text-sm leading-relaxed mb-8">
              Access monthly statements, maintenance logs, inspection reports, and financial summaries — anytime, anywhere.
            </p>
            <ul className="space-y-3 mb-10">
              {ownerPortalFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-gray-300 font-light">
                  <CheckCircle size={14} className="text-[#c8a96e] mt-0.5 shrink-0" />{f}
                </li>
              ))}
            </ul>
            <Link href="#" className="inline-flex items-center gap-2 text-sm font-light tracking-widest uppercase text-[#c8a96e] hover:text-white transition-colors group">
              Access Owner Portal <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div id="tenants" className="bg-[#f7f7f7] p-12">
            <p className="text-xs tracking-[0.25em] uppercase text-[#c8a96e] mb-4 font-light">For Tenants</p>
            <h3 data-reveal className="text-3xl font-light mb-4 text-black">Tenant Portal</h3>
            <p className="text-gray-500 font-light text-sm leading-relaxed mb-8">
              Pay rent online, submit maintenance requests, and manage your lease documents — all in one easy portal.
            </p>
            <ul className="space-y-3 mb-10">
              {tenantPortalFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-gray-600 font-light">
                  <CheckCircle size={14} className="text-[#c8a96e] mt-0.5 shrink-0" />{f}
                </li>
              ))}
            </ul>
            <Link href="#" className="inline-flex items-center gap-2 text-sm font-light tracking-widest uppercase text-black hover:text-[#c8a96e] transition-colors group">
              Access Tenant Portal <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
