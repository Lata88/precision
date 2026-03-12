import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, Settings, Activity, ShieldCheck, ChevronRight } from "lucide-react";
import { Button, Card } from "@/components/ui";

const slides = [
  {
    image: `${import.meta.env.BASE_URL}images/hero-1.png`,
    title: "Precision Without Compromise",
    subtitle: "Advanced CNC Machinery for Modern Manufacturing",
  },
  {
    image: `${import.meta.env.BASE_URL}images/hero-2.png`,
    title: "Industrial Grade Tools",
    subtitle: "Engineered for Durability and Extreme Accuracy",
  },
  {
    image: `${import.meta.env.BASE_URL}images/hero-3.png`,
    title: "Expert Servicing & Maintenance",
    subtitle: "Minimizing Downtime, Maximizing Productivity",
  }
];

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

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
      {/* Hero Slider */}
      <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden bg-background">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        <div className="overflow-hidden h-full" ref={emblaRef}>
          <div className="flex h-full">
            {slides.map((slide, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0 relative h-full">
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className="absolute block w-full h-full object-cover object-center opacity-60" 
                />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl"
              >
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-12 h-1 bg-primary" />
                  <span className="text-primary font-bold uppercase tracking-widest text-sm">Industrial Excellence</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-[1.1] mb-6 drop-shadow-2xl">
                  {slides[selectedIndex].title}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8">
                  {slides[selectedIndex].subtitle}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/machines">
                    <Button size="lg" className="w-full sm:w-auto">
                      Explore Machines <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Request Consultation
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`w-16 h-1 transition-all duration-300 ${i === selectedIndex ? 'bg-primary' : 'bg-white/20 hover:bg-white/50'}`}
              onClick={() => emblaApi?.scrollTo(i)}
            />
          ))}
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 bg-card relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Empowering Manufacturing with Cutting-Edge Technology</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                For over two decades, CNC Solutions has been at the forefront of industrial machining. We provide state-of-the-art CNC equipment, precision tools, and unparalleled technical support to manufacturers globally.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Whether you are upgrading your facility or need urgent spindle repairs, our expert engineers ensure your production lines never stop.
              </p>
              <Link href="/about">
                <Button variant="outline" className="group">
                  Learn More About Us <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img src={`${import.meta.env.BASE_URL}images/workshop.png`} alt="Workshop" className="rounded-lg shadow-2xl box-glow" />
              <div className="absolute -bottom-8 -left-8 bg-background p-6 rounded-lg border border-border shadow-xl">
                <div className="text-5xl font-display font-bold text-primary mb-2">25+</div>
                <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Our Core Capabilities</h2>
            <p className="text-muted-foreground">Comprehensive solutions tailored to meet the rigorous demands of modern manufacturing facilities.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 group hover:-translate-y-2">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Settings className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Equipment Sales</h3>
              <p className="text-muted-foreground mb-6">Premium multi-axis CNC milling and turning centers sourced from world-class manufacturers.</p>
              <Link href="/machines" className="text-primary font-bold text-sm uppercase tracking-wider flex items-center hover:text-white transition-colors">
                View Catalog <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Card>

            <Card className="p-8 group hover:-translate-y-2">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Activity className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Precision Repair</h3>
              <p className="text-muted-foreground mb-6">Expert spindle rebuilding, ball screw repair, and electronics troubleshooting to minimize downtime.</p>
              <Link href="/services" className="text-primary font-bold text-sm uppercase tracking-wider flex items-center hover:text-white transition-colors">
                Explore Services <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Card>

            <Card className="p-8 group hover:-translate-y-2">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Preventive Maintenance</h3>
              <p className="text-muted-foreground mb-6">Scheduled calibration, laser alignment, and comprehensive diagnostics to extend machine life.</p>
              <Link href="/services" className="text-primary font-bold text-sm uppercase tracking-wider flex items-center hover:text-white transition-colors">
                Learn More <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-card relative overflow-hidden border-y border-border">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=1920&q=80')] opacity-5 mix-blend-overlay bg-cover bg-center" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Ready to Optimize Your Production?</h2>
          <p className="text-xl text-muted-foreground mb-10">
            Contact our engineering team today for a custom quote on machines, tooling, or servicing.
          </p>
          <Link href="/contact">
            <Button size="lg" className="w-full sm:w-auto">
              Contact Us Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
