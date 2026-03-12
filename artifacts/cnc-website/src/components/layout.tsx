import { Link, useLocation } from "wouter";
import { Wrench, Phone, Mail, MapPin, Menu, X, MessageCircle, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/machines", label: "CNC Machines" },
    { href: "/tools", label: "Machine Tools" },
    { href: "/services", label: "Services" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col relative">

      {/* Top Info Bar — Deep Navy like gmtgulf.com */}
      <div className="bg-navy text-white hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center text-xs">
          <div className="flex items-center gap-6">
            <a href="tel:+15551234567" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="w-3 h-3" /> +1 (555) 123-4567
            </a>
            <a href="mailto:info@cncsolutions.com" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="w-3 h-3" /> info@cncsolutions.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3" /> 100 Industrial Parkway, Detroit MI 48201
          </div>
        </div>
      </div>

      {/* Main Navigation — White background, navy text */}
      <nav className={cn(
        "sticky top-0 z-50 bg-white transition-shadow duration-300",
        isScrolled ? "shadow-md" : "shadow-sm"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[72px]">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group cursor-pointer shrink-0">
              <div className="bg-navy p-2 rounded group-hover:bg-primary transition-colors duration-300">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-display font-bold text-xl tracking-wide text-navy block leading-tight">
                  CNC<span className="text-primary">SOLUTIONS</span>
                </span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Precision Machining</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 text-sm font-semibold uppercase tracking-wide transition-colors duration-200 relative",
                    location === link.href
                      ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                      : "text-navy hover:text-primary"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="ml-4 px-5 py-2.5 bg-primary text-white text-sm font-bold uppercase tracking-wide hover:bg-primary/90 transition-colors rounded-sm flex items-center gap-2"
              >
                Get a Quote <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2 text-navy"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-white">
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "px-6 py-4 text-sm font-semibold uppercase tracking-wide border-b border-border",
                    location === link.href ? "text-primary bg-muted" : "text-navy hover:text-primary hover:bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mx-4 my-4 px-5 py-3 bg-primary text-white text-sm font-bold uppercase tracking-wide text-center rounded-sm"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer — Deep Navy like gmtgulf.com */}
      <footer className="bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

            {/* Brand */}
            <div>
              <Link href="/" className="flex items-center gap-3 mb-5">
                <div className="bg-primary p-2 rounded">
                  <Wrench className="w-5 h-5 text-white" />
                </div>
                <span className="font-display font-bold text-xl tracking-wide text-white">
                  CNC<span className="text-primary">SOLUTIONS</span>
                </span>
              </Link>
              <p className="text-white/60 text-sm leading-relaxed">
                Leading provider of industrial CNC machines, precision tools, and expert maintenance services worldwide.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-bold text-base uppercase tracking-wider text-white mb-5 pb-2 border-b border-white/10">Quick Links</h4>
              <ul className="space-y-2.5 text-sm">
                {[
                  { href: "/about", label: "About Us" },
                  { href: "/machines", label: "CNC Machines" },
                  { href: "/tools", label: "Machine Tools" },
                  { href: "/services", label: "Our Services" },
                  { href: "/gallery", label: "Gallery" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-white/60 hover:text-primary transition-colors flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 shrink-0" /> {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-display font-bold text-base uppercase tracking-wider text-white mb-5 pb-2 border-b border-white/10">Our Services</h4>
              <ul className="space-y-2.5 text-sm text-white/60">
                {["Preventive Maintenance", "Spindle Repair", "Laser Calibration", "CNC Installation", "Software Upgrades"].map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <ChevronRight className="w-3 h-3 shrink-0 text-primary" /> {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display font-bold text-base uppercase tracking-wider text-white mb-5 pb-2 border-b border-white/10">Contact Us</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>100 Industrial Parkway,<br />Detroit, MI 48201</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <a href="tel:+15551234567" className="hover:text-primary transition-colors">+1 (555) 123-4567</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <a href="mailto:info@cncsolutions.com" className="hover:text-primary transition-colors">info@cncsolutions.com</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/40">
            <p>&copy; {new Date().getFullYear()} CNC Solutions Inc. All rights reserved.</p>
            <Link href="/admin" className="hover:text-primary transition-colors">Admin Panel</Link>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/15551234567"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform duration-300 group"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-navy text-white text-xs font-semibold px-3 py-1.5 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
