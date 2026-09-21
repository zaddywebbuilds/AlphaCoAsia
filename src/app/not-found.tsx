import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white flex items-center">
        <div className="container-xl py-32 text-center">
          <div className="text-7xl font-display font-semibold text-[#E4E0D6] mb-6">404</div>
          <h1 className="font-display text-2xl font-semibold text-[#0D1B2A] mb-4">
            Page Not Found
          </h1>
          <p className="text-sm text-[#64748B] max-w-sm mx-auto mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0D1B2A] text-white text-sm font-medium rounded-lg hover:bg-[#1A3550] transition-colors">
              <Home size={14} /> Return Home
            </Link>
            <Link href="/expertise" className="inline-flex items-center gap-2 px-6 py-3 border border-[#E4E0D6] text-[#0D1B2A] text-sm font-medium rounded-lg hover:bg-[#F8F6F1] transition-colors">
              Explore Expertise <ArrowRight size={14} />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 border border-[#E4E0D6] text-[#0D1B2A] text-sm font-medium rounded-lg hover:bg-[#F8F6F1] transition-colors">
              Contact Alpha <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
