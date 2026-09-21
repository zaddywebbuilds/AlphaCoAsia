import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-[#05090F] flex items-center overflow-hidden tex-grain">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,#12263D_0%,#05090F_72%)]" />
        <div className="absolute inset-0 tex-grid-fine opacity-40" />
        <div className="container-xl py-32 text-center relative z-10">
          <div className="type-index text-white/10 mb-6" style={{ fontSize: "clamp(5rem, 14vw, 10rem)" }}>404</div>
          <h1 className="font-display text-2xl font-semibold text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-400 max-w-sm mx-auto mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/" className="btn-magnetic inline-flex items-center gap-2 px-6 py-3 bg-[#C9A040] text-[#0A1628] text-sm font-semibold rounded-lg hover:bg-[#D4AF60]">
              <Home size={14} /> Return Home
            </Link>
            <Link href="/expertise" className="btn-magnetic inline-flex items-center gap-2 px-6 py-3 border border-white/18 text-white text-sm font-medium rounded-lg hover:border-[#C9A040]/50 hover:bg-white/[0.04]">
              Explore Expertise <ArrowRight size={14} className="btn-arrow" />
            </Link>
            <Link href="/contact" className="btn-magnetic inline-flex items-center gap-2 px-6 py-3 border border-white/18 text-white text-sm font-medium rounded-lg hover:border-[#C9A040]/50 hover:bg-white/[0.04]">
              Contact Alpha <ArrowRight size={14} className="btn-arrow" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
