import { Link, useLocation } from "wouter";
import { Wrench, Phone, Mail, MapPin, Menu, X, MessageCircle, ChevronRight, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isMobileProductsDropdownOpen, setIsMobileProductsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLogoAnimated, setIsLogoAnimated] = useState(false);
  const productsDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        productsDropdownRef.current &&
        !productsDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProductsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Trigger logo animation on initial page load
    const timer = setTimeout(() => {
      setIsLogoAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    // { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ];

  const productsDropdown = [
    { href: "/machines", label: "CNC Machines" },
    { href: "/tools", label: "CNC Cutting Tools" },
    { href: "/services", label: "CNC Services & Maintenance" },
    { href: "/turnkey-solutions", label: "Turnkey Solutions" },
  ];

  return (
    <div className="min-h-screen flex flex-col relative">

      <header className="fixed inset-x-0 top-0 z-50">
        {/* Top Info Bar — Deep Navy like gmtgulf.com */}
        <div className="bg-navy text-white hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center text-xs">
            <div className="flex items-center gap-6">
              <a href="tel:++971 50 852 7021" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-3 h-3" /> +971 50 852 7021
              </a>
              <a href="mailto:sales@pmtgulf.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-3 h-3" /> sales@pmtgulf.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3" /> Sharjah Media City, Sharjah,UAE
            </div>
          </div>
        </div>

        {/* Main Navigation — Enhanced with gradient background */}
        <nav className={cn(
          "bg-gradient-to-r from-white via-white to-white/95 backdrop-blur-sm transition-all duration-300 border-b border-gray-100/50",
          isScrolled ? "shadow-lg border-gray-200/70" : "shadow-sm border-gray-100/30"
        )}>
          <div className="max-w-screen-2xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-[80px]">

              {/* Logo */}
              <Link href="/" className="flex items-center gap-1 sm:gap-2 group cursor-pointer shrink-0">
                <img
                  src="/logo.png"
                  alt="Precision Machine Tools LLC"
                  className={cn(
                    "w-10 h-10 sm:w-20 sm:h-16 md:w-28 md:h-20 object-contain transition-all duration-300",
                    isLogoAnimated ? "logo-load-animation logo-glow" : ""
                  )}
                />
                <div className={cn("flex flex-col justify-center", isLogoAnimated ? "logo-text-animation" : "")}>
                  <span className="font-display font-bold text-[10px] xs:text-xs sm:text-sm md:text-xl tracking-wide text-navy block leading-tight">
                    PRECISION<span className="text-primary"> MACHINE</span> <span className="text-primary">TOOLS</span> LLC
                  </span>
                  <span className="hidden md:block text-[10px] font-bold uppercase tracking-widest">Advanced Machining Solutions</span>
                </div>
              </Link>

              {/* Desktop Nav */}
              <div className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-4 py-2.5 text-sm font-semibold uppercase tracking-wide transition-all duration-300 relative group rounded-lg mx-1",
                      location === link.href
                        ? "text-primary bg-primary/5 after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-primary shadow-sm"
                        : "text-navy hover:text-primary hover:bg-gray-50/50 hover:shadow-sm"
                    )}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {location !== link.href && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                  </Link>
                ))}

                {/* Products Dropdown */}
                <div
                  className="relative"
                  ref={productsDropdownRef}
                  onMouseEnter={() => setIsProductsDropdownOpen(true)}
                  onMouseLeave={() => setIsProductsDropdownOpen(false)}
                >
                  <button
                    onClick={() => setIsProductsDropdownOpen((open) => !open)}
                    type="button"
                    className={cn(
                      "px-4 py-2.5 text-sm font-semibold uppercase tracking-wide transition-all duration-300 relative flex items-center gap-2 rounded-lg mx-1 group",
                      location === "/machines" || location === "/tools" || location === "/services" || location === "/turnkey-solutions"
                        ? "text-primary bg-primary/5 after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-primary shadow-sm"
                        : "text-navy hover:text-primary hover:bg-gray-50/50 hover:shadow-sm"
                    )}
                  >
                    <span className="relative z-10">Products</span>
                    <ChevronDown className={cn(
                      "w-4 h-4 transition-all duration-300 relative z-10",
                      isProductsDropdownOpen ? "rotate-180 text-primary" : "group-hover:text-primary"
                    )} />
                    {location !== "/machines" && location !== "/tools" && location !== "/services" && location !== "/turnkey-solutions" && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                  </button>

                  {isProductsDropdownOpen && (
                    <div
                      className="absolute top-full left-0 mt-2 w-72 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-100/70 z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200"
                      style={{ marginTop: '-8px', paddingTop: '8px' }}
                    >
                      <div className="p-2">
                        {productsDropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsProductsDropdownOpen(false)}
                            className={cn(
                              "flex items-center px-4 py-3.5 rounded-lg transition-all duration-300 group mx-1 my-1",
                              location === item.href
                                ? "bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg transform scale-105"
                                : "text-gray-700 hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 hover:text-primary hover:shadow-md hover:translate-x-1"
                            )}
                          >
                            <div className="flex-1">
                              <div className="font-medium text-sm">{item.label}</div>
                              <div className="text-xs opacity-75">
                                {item.label === "CNC Machines" && "Advanced CNC machinery"}
                                {item.label === "CNC Cutting Tools" && "Precision cutting tools"}
                                {item.label === "CNC Services & Maintenance" && "Expert support & maintenance"}
                                {item.label === "Turnkey Solutions" && "Complete manufacturing solutions"}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  href="/contact"
                  className="ml-6 px-6 py-3 bg-gradient-to-r from-primary to-primary/90 text-white text-sm font-bold uppercase tracking-wide hover:from-primary/90 hover:to-primary transition-all duration-300 rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transform"
                >
                  Get a Quote <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>

              {/* Mobile Toggle */}
              <button
                className="lg:hidden p-3 text-navy bg-gray-50/50 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:shadow-md group"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <div className="relative">
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6 transition-transform duration-300 rotate-90" />
                  ) : (
                    <Menu className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                  )}
                  <div className="absolute inset-0 bg-primary/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10" />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden max-h-[calc(100vh-80px)] overflow-y-auto border-t border-gray-100 bg-white/95 backdrop-blur-sm animate-in slide-in-from-top-2 duration-200">
              <div className="flex flex-col">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "px-6 py-4 text-sm font-semibold uppercase tracking-wide border-b border-gray-50 transition-all duration-300 group",
                      location === link.href
                        ? "text-primary bg-gradient-to-r from-primary/5 to-primary/10 border-l-4 border-primary"
                        : "text-navy hover:text-primary hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:border-l-4 hover:border-primary/30"
                    )}
                  >
                    <span className="flex items-center justify-between">
                      {link.label}
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </span>
                  </Link>
                ))}

                {/* Mobile Products Dropdown */}
                <div className="border-b border-gray-50">
                  <button
                    onClick={() => setIsMobileProductsDropdownOpen(!isMobileProductsDropdownOpen)}
                    className={cn(
                      "w-full px-6 py-4 text-sm font-semibold uppercase tracking-wide flex items-center justify-between transition-all duration-300 group",
                      location === "/machines" || location === "/tools" || location === "/services" || location === "/turnkey-solutions"
                        ? "text-primary bg-gradient-to-r from-primary/5 to-primary/10 border-l-4 border-primary"
                        : "text-navy hover:text-primary hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:border-l-4 hover:border-primary/30"
                    )}
                  >
                    <span>Products</span>
                    <ChevronDown className={cn(
                      "w-4 h-4 transition-all duration-300",
                      isMobileProductsDropdownOpen ? "rotate-180 text-primary" : "group-hover:text-primary"
                    )} />
                  </button>

                  {isMobileProductsDropdownOpen && (
                    <div className="bg-gradient-to-b from-gray-50 to-white animate-in slide-in-from-top-1 duration-200">
                      {productsDropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsMobileProductsDropdownOpen(false);
                          }}
                          className={cn(
                            "flex items-center px-10 py-3.5 transition-all duration-300 border-b border-gray-100 last:border-b-0 group hover:translate-x-2",
                            location === item.href
                              ? "text-primary bg-gradient-to-r from-primary/5 to-primary/10 border-l-4 border-primary"
                              : "text-navy hover:text-primary hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:border-l-4 hover:border-primary/30"
                          )}
                        >
                          <div className={cn(
                            "w-6 h-6 rounded flex items-center justify-center mr-3 text-xs",
                            location === item.href
                              ? "bg-primary text-white"
                              : "bg-primary/10 group-hover:bg-primary/20"
                          )}>
                            {item.label === "CNC Machines" && <span>🔧</span>}
                            {item.label === "CNC Cutting Tools" && <span>⚙️</span>}
                            {item.label === "CNC Services & Maintenance" && <span>🛠️</span>}
                            {item.label === "Turnkey Solutions" && <span>🎯</span>}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{item.label}</div>
                            <div className="text-xs opacity-75">
                              {item.label === "CNC Machines" && "Advanced CNC machinery"}
                              {item.label === "CNC Cutting Tools" && "Precision cutting tools"}
                              {item.label === "CNC Services & Maintenance" && "Expert support & maintenance"}
                              {item.label === "Turnkey Solutions" && "Complete manufacturing solutions"}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mx-4 my-4 px-6 py-3.5 bg-gradient-to-r from-primary to-primary/90 text-white text-sm font-bold uppercase tracking-wide text-center rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Get a Quote <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Page Content */}
      <main className="flex-grow pt-[80px] md:pt-[112px]">
        {children}
      </main>

      {/* Footer — Deep Navy like gmtgulf.com */}
      <footer className="bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

            {/* Brand */}
            <div>
              <Link href="/" className="flex items-center gap-2 mb-5 flex-wrap">
                <img
                  src="/logo.png"
                  alt="Precision Machine Tools LLC"
                  className={cn(
                    "w-12 h-12 object-contain transition-all duration-300",
                    isLogoAnimated ? "logo-glow" : ""
                  )}
                />
                <span className="font-display font-bold text-base tracking-wide text-white">
                  PRECISION<span className="text-primary"> MACHINE</span> <span className="text-primary">TOOLS</span> LLC
                </span>
              </Link>
              <p className="text-white/60 text-sm leading-relaxed">
                Providing industry-leading CNC machines, machine tools, and comprehensive maintenance services.
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
                {["CNC Mchine Sales", "CNC Cutting Tools", "Rectrofitting services", "Turnkey Solutions with fixtures", "Preventive Maintenance", "Spindle Repair", "Laser Calibration", "CNC Installation", "Software Upgrades"].map((s) => (
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
                  <span>PO Box-124267,<br />Sharjah Media City,<br />Sharjah, UAE</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <a href="tel:++971 50 852 7021" className="hover:text-primary transition-colors">+971 50 852 7021 <br />+971 56 246 9049 </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <a href="mailto:sales@pmtgulf.com" className="hover:text-primary transition-colors">sales@pmtgulf.com</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/40">
            <p>&copy; {new Date().getFullYear()} Precision Machine Tools LLC | All rights reserved.</p>
            {/* <Link href="/admin" className="hover:text-primary transition-colors">Admin Panel</Link> */}
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/+971508527021"
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
