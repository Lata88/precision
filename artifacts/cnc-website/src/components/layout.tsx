import { Link, useLocation } from "wouter";
import { Wrench, Phone, Mail, MapPin, Menu, X, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
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
      {/* Top Header Bar */}
      <div className="hidden md:flex justify-between items-center px-8 py-2 bg-background border-b border-border text-xs text-muted-foreground font-medium">
        <div className="flex space-x-6">
          <span className="flex items-center"><Phone className="w-3 h-3 mr-2 text-primary" /> +1 (555) 123-4567</span>
          <span className="flex items-center"><Mail className="w-3 h-3 mr-2 text-primary" /> info@cncsolutions.com</span>
        </div>
        <div className="flex items-center">
          <MapPin className="w-3 h-3 mr-2 text-primary" /> 100 Industrial Parkway, Detroit MI
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={cn(
        "sticky top-0 z-50 transition-all duration-300 border-b",
        isScrolled ? "bg-background/90 backdrop-blur-lg border-border shadow-lg" : "bg-background border-transparent"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link href="/" className="flex items-center space-x-3 group cursor-pointer">
              <div className="bg-primary p-2 rounded-sm transform group-hover:rotate-12 transition-transform">
                <Wrench className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <span className="font-display font-bold text-2xl tracking-wider text-foreground block leading-none">CNC<span className="text-primary">SOLUTIONS</span></span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest block mt-1">Precision Machining</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-sm text-sm font-semibold uppercase tracking-wider transition-all duration-200",
                    location === link.href 
                      ? "text-primary bg-primary/10" 
                      : "text-foreground hover:text-primary hover:bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/contact" className="ml-4 px-6 py-2 bg-primary text-primary-foreground font-display font-bold uppercase tracking-wider text-sm rounded-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 hover:shadow-primary/40">
                Get a Quote
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-4">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "px-4 py-4 text-xl font-display font-bold uppercase tracking-wider border-b border-white/5",
                  location === link.href ? "text-primary" : "text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <Link href="/" className="flex items-center space-x-3 mb-6">
                <Wrench className="w-6 h-6 text-primary" />
                <span className="font-display font-bold text-2xl tracking-wider text-foreground block leading-none">CNC<span className="text-primary">SOLUTIONS</span></span>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Leading provider of industrial CNC machines, precision tools, and expert maintenance services worldwide.
              </p>
            </div>
            
            <div>
              <h4 className="font-display text-lg font-bold text-foreground mb-6">Quick Links</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/machines" className="hover:text-primary transition-colors">CNC Machines</Link></li>
                <li><Link href="/tools" className="hover:text-primary transition-colors">Machine Tools</Link></li>
                <li><Link href="/services" className="hover:text-primary transition-colors">Our Services</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-lg font-bold text-foreground mb-6">Our Services</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>Preventive Maintenance</li>
                <li>Spindle Repair</li>
                <li>Laser Calibration</li>
                <li>Software Upgrades</li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-lg font-bold text-foreground mb-6">Contact Us</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <MapPin className="w-4 h-4 text-primary mr-3 mt-1 shrink-0" />
                  <span>100 Industrial Parkway,<br />Detroit, MI 48201</span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-4 h-4 text-primary mr-3" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center">
                  <Mail className="w-4 h-4 text-primary mr-3" />
                  <span>info@cncsolutions.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} CNC Solutions Inc. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/admin" className="hover:text-primary">Admin Login</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/15551234567" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg shadow-green-900/50 hover:scale-110 transition-transform duration-300 animate-pulse-slow group"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-card text-foreground text-xs font-bold px-3 py-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border pointer-events-none">
          Chat with us
        </span>
      </a>
    </div>
  );
}
