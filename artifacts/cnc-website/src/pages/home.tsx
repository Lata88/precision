import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, Settings, Activity, ShieldCheck, ChevronRight, CheckCircle, Phone } from "lucide-react";
import { useListMachines } from "@workspace/api-client-react";

const slides = [
  {
    image: `${import.meta.env.BASE_URL}images/hero-1.jpeg`,
    title: "Precision Without Compromise",
    subtitle: "Next-Gen CNC Solutions for High-Performance Production",
    tag: "Industry Leaders",
    actionText: "Explore Machines",
    actionLink: "/machines",
  },
  {
    image: `${import.meta.env.BASE_URL}images/hero-4.png`,
    title: "Machine Tools and Accessories",
    subtitle: "Precision Solutions for Modern Manufacturing",
    tag: "Industry Leaders",
    actionText: "View Machine Tools",
    actionLink: "/tools",
  },
  {
    image: `${import.meta.env.BASE_URL}images/hero-2.jpeg`,
    title: "Cutting Tools and Accessories",
    subtitle: "Advanced Cutting Tools for Modern Machining",
    tag: "Premium Tooling",
    actionText: "View Cutting Tools",
    actionLink: "/tools",
  },
  {
    image: `${import.meta.env.BASE_URL}images/hero-3.jpeg`,
    title: "Expert Servicing & Maintenance",
    subtitle: "Expert Care. Reliable Performance.",
    tag: "Certified Service",
    actionText: "Our Services",
    actionLink: "/services",
  },
];

const features = [
  "5+ Years of Industry Experience",
  "Certified CNC Engineers",
  "24/7 Emergency Support",
  "Global Parts Sourcing",
];

const services = [
  {
    image: `${import.meta.env.BASE_URL}images/machine.jpeg`,
    title: "CNC Machines Sales",
    desc: "PMT offers a diverse portfolio of high-performance CNC machinery, providing reliable and cutting-edge technology tailored to elevate your production capabilities, efficiency, and precision.",
    href: "/machines",
    cta: "View Catalog",
  },
  {
    image: `${import.meta.env.BASE_URL}images/cnc-tools.png`,
    title: "CNC Cutting Tools and Accessories",
    desc: "Maximize your machining precision and tool life with our high-performance cutting tools, engineered for superior material removal rates and exceptional surface finishes across diverse industrial applications.",
    href: "/tools",
    cta: "View Our Tools",
  },
  {
    image: `${import.meta.env.BASE_URL}images/repair.jpeg`,
    title: "CNC Machines Repair and Maintenance",
    desc: "Expert CNC repair and maintenance solutions. We specialize in spindle restoration, electronic diagnostics, and mechanical precision checks to reduce downtime and optimize your manufacturing efficiency.",
    href: "/services",
    cta: "Our Services",
  },
  {
    image: `${import.meta.env.BASE_URL}images/turnkey.png`,
    title: "Turnkey Solutions for CNC Machining",
    desc: "Maximize your production throughput with our ready-to-run manufacturing systems. We provide seamless integration of advanced machinery, automated workholding, and optimized processes for B2B efficiency.",
    href: "/turnkey-solutions",
    cta: "Our Services",
  },
  {
    image: `${import.meta.env.BASE_URL}images/rectrofitting.png`,
    title: "CNC Machine Retrofitting",
    desc: "Comprehensive retrofitting services including modern CNC control system upgrades, mechanical rebuilds, and electrical system enhanced precision and extended machine life.",
    href: "/services",
    cta: "Our Services",
  }
];

const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "25+", label: "Machines Installed" },
  { value: "25+", label: "Happy Customers" },
  { value: "7h", label: "Response Time" },
];

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { data: machines } = useListMachines();
  const featuredMachines = Array.isArray(machines) ? machines.filter((m) => m.featured).slice(0, 3) : [];

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <div>
      {/* ── Hero Slider ── */}
      <section className="relative h-[70vh] sm:h-[80vh] md:h-[88vh] min-h-[480px] w-full overflow-hidden">
        <div className="overflow-hidden h-full" ref={emblaRef}>
          <div className="flex h-full">
            {slides.map((slide, i) => (
              <div key={i} className="flex-[0_0_100%] min-w-0 relative h-full">
                <img src={slide.image} alt={slide.title} className="absolute w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-navy/40" />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 flex items-center z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl"
              >
                <span className="inline-block bg-primary text-white text-xs font-bold uppercase tracking-widest px-3 py-1 mb-5">
                  {slides[selectedIndex].tag}
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-4 sm:mb-5">
                  {slides[selectedIndex].title}
                </h1>
                <p className="text-sm sm:text-lg text-white/75 mb-6 sm:mb-8 leading-relaxed">
                  {slides[selectedIndex].subtitle}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href={slides[selectedIndex].actionLink}>
                    <button className="btn-orange rounded-sm flex items-center gap-2 text-sm uppercase tracking-wide font-bold">
                      {slides[selectedIndex].actionText} <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <Link href="/contact">
                    <button className="px-6 py-3 border-2 border-white text-white text-sm font-bold uppercase tracking-wide hover:bg-white hover:text-navy transition-colors rounded-sm">
                      Get a Quote
                    </button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`transition-all duration-300 rounded-full ${i === selectedIndex ? "w-8 h-2 bg-primary" : "w-2 h-2 bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {stats.map((s) => (
              <div key={s.label} className="py-2">
                <div className="text-3xl font-display font-bold">{s.value}</div>
                <div className="text-xs font-semibold uppercase tracking-wider mt-1 text-white/75">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About / Intro ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-bold text-sm uppercase tracking-widest">Who We Are</span>
              <h2 className="font-display font-bold text-4xl text-navy mt-2 mb-5 leading-snug">
                Empowering Manufacturing with Cutting-Edge Technology
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Precision Machine Tools LLC, based in Sharjah, is a team of experienced professionals dedicated to delivering reliable industrial and automation solutions. With over a decade of expertise, we provide innovative, practical, and customer-focused services to help businesses improve performance and productivity.              </p>
              {/* <p className="text-muted-foreground leading-relaxed mb-8">
                Whether you are upgrading your facility or need urgent spindle repairs, our expert engineers ensure your production lines never stop.
              </p> */}
              <ul className="space-y-3 mb-8">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm font-medium text-navy">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/about">
                <button className="btn-navy rounded-sm flex items-center gap-2 text-sm uppercase tracking-wide font-bold">
                  About Us <ChevronRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
            <div className="relative mt-8 lg:mt-0">
              <img
                src={`${import.meta.env.BASE_URL}images/workshop.png`}
                alt="Workshop"
                className="rounded-sm shadow-xl w-full object-cover"
              />
              <div className="absolute -bottom-4 left-0 sm:-bottom-6 sm:-left-6 bg-navy text-white p-4 sm:p-5 rounded-sm shadow-xl">
                <div className="text-3xl sm:text-4xl font-display font-bold text-primary">5+</div>
                <div className="text-xs font-bold uppercase tracking-wider text-white/70 mt-1">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-primary font-bold text-sm uppercase tracking-widest">What We Do</span>
            <h2 className="font-display font-bold text-4xl text-navy mt-2">Our Core Capabilities</h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s) => (
              <div key={s.title} className="bg-white rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-border card-hover group">
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-xl text-navy mb-3">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{s.desc}</p>
                  <Link href={s.href} className="text-primary font-bold text-sm uppercase tracking-wide flex items-center gap-2 hover:gap-3 transition-all">
                    {s.cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Machines ── */}
      {featuredMachines.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <span className="text-primary font-bold text-sm uppercase tracking-widest">Products</span>
                <h2 className="font-display font-bold text-4xl text-navy mt-2">Featured Machines</h2>
                <div className="w-16 h-1 bg-primary mt-4" />
              </div>
              <Link href="/machines">
                <button className="btn-navy rounded-sm flex items-center gap-2 text-sm uppercase tracking-wide font-bold hidden md:flex">
                  View All <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredMachines.map((m) => (
                <div key={m.id} className="bg-white rounded-sm border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow card-hover">
                  <div className="h-52 overflow-hidden bg-muted">
                    {m.imageUrl ? (
                      <img src={m.imageUrl} alt={m.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <Settings className="w-12 h-12 opacity-30" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">{m.category}</span>
                    <h3 className="font-display font-bold text-lg text-navy mt-3 mb-2">{m.name}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{m.description}</p>
                    <Link href="/machines" className="mt-4 flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all">
                      View Details <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Banner ── */}
      <section className="bg-navy py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white leading-snug">
              Ready to Optimize Your Production?
            </h2>
            <p className="text-white/60 mt-2">Contact our engineering team for a custom quote.</p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Link href="/contact">
              <button className="btn-orange rounded-sm flex items-center gap-2 text-sm uppercase tracking-wide font-bold">
                Get a Quote <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <a href="tel:+971 50 852 7021">
              <button className="px-6 py-3 border-2 border-white text-white text-sm font-bold uppercase tracking-wide hover:bg-white hover:text-navy transition-colors rounded-sm flex items-center gap-2">
                <Phone className="w-4 h-4" /> Call Us Now
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
