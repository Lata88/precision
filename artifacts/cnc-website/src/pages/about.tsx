import { Button } from "@/components/ui";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen bg-background pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">About CNC Solutions</h1>
          <div className="w-20 h-1 bg-primary"></div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <img 
              src={`${import.meta.env.BASE_URL}images/workshop.png`} 
              alt="Engineers at work" 
              className="rounded-lg shadow-xl border border-white/10"
            />
          </div>
          <div>
            <h2 className="text-3xl font-display font-bold mb-6">Forged in Precision</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Founded in 1998, CNC Solutions began as a small independent repair shop catering to local tool and die makers. Through relentless dedication to quality and technical expertise, we have grown into a premier international supplier and service provider for industrial manufacturing equipment.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Our philosophy is simple: When your machines are running perfectly, so is your business. We partner with the world's top manufacturers to bring you equipment that redefines accuracy, speed, and reliability.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="border-l-2 border-primary pl-4">
                <div className="text-3xl font-bold text-foreground font-display">500+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Machines Installed</div>
              </div>
              <div className="border-l-2 border-primary pl-4">
                <div className="text-3xl font-bold text-foreground font-display">24/7</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Support Available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="bg-card p-10 rounded-lg border border-border">
            <h3 className="text-2xl font-display font-bold text-primary mb-4">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To empower manufacturers with the most advanced, reliable, and cost-effective CNC solutions, backed by expert technical support that guarantees maximum uptime and productivity.
            </p>
          </div>
          <div className="bg-card p-10 rounded-lg border border-border">
            <h3 className="text-2xl font-display font-bold text-primary mb-4">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              To be the globally recognized benchmark for excellence in the machine tool industry, driving innovation and fostering sustainable industrial growth worldwide.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h2 className="text-3xl font-display font-bold mb-12 text-center">Our Journey</h2>
          <div className="relative border-l-2 border-primary/30 ml-4 md:ml-1/2 md:translate-x-[-1px] space-y-12 pb-8">
            
            {[
              { year: "1998", title: "Foundation", desc: "Started as an independent spindle repair facility in Detroit." },
              { year: "2005", title: "Expansion", desc: "Became an authorized dealer for premium European CNC brands." },
              { year: "2012", title: "Advanced Tech", desc: "Opened our 50,000 sq ft laser calibration and testing center." },
              { year: "2023", title: "Global Reach", desc: "Expanded operations to serve clients across 15 countries." },
            ].map((item, i) => (
              <div key={i} className={`relative flex items-center justify-between md:justify-normal w-full ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                <div className="absolute left-[-9px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
                <div className="ml-8 md:ml-0 md:w-[45%] bg-card p-6 rounded-lg border border-border">
                  <div className="text-primary font-bold font-display text-xl mb-1">{item.year}</div>
                  <h4 className="text-lg font-bold text-foreground mb-2">{item.title}</h4>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}
