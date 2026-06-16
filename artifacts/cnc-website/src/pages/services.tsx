import { useListServices } from "@workspace/api-client-react";
import { Button } from "@/components/ui";
import { Link } from "wouter";
import { Wrench, CheckCircle2 } from "lucide-react";
import * as Icons from "lucide-react";

export default function Services() {
  const { data: services, isLoading } = useListServices();

  const IconComponent = ({ name, className }: { name: string, className?: string }) => {
    // @ts-ignore - Dynamic icon rendering
    const Icon = Icons[name] || Wrench;
    return <Icon className={className} />;
  };

  return (
    <div className="min-h-screen bg-background pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">Expert Industrial Services</h1>
          <p className="text-lg text-muted-foreground">
            Our certified engineers ensure your equipment operates at peak performance. We offer comprehensive repair, maintenance, and calibration services for all major CNC brands.
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-12">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse bg-card h-64 rounded-lg border border-border"></div>
            ))}
          </div>
        ) : services?.length === 0 ? (
          <div className="text-center py-24 bg-card rounded-lg border border-border">
            <Wrench className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-foreground mb-2">No Services Found</h3>
          </div>
        ) : (
          <div className="space-y-12">
            {services?.map((service, idx) => (
              <div 
                key={service.id} 
                className={`bg-card rounded-xl border border-border overflow-hidden flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                <div className="lg:w-1/3 bg-muted p-8 flex items-center justify-center relative overflow-hidden border-b lg:border-b-0 lg:border-r border-border">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-background to-background" />
                  {service.imageUrl ? (
                    <div className="w-full h-full flex items-center justify-center relative z-10">
                      <img 
                        src={service.imageUrl} 
                        alt={service.title} 
                        className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                      />
                    </div>
                  ) : (
                    <IconComponent name={service.icon} className="w-32 h-32 text-primary relative z-10 drop-shadow-2xl" />
                  )}
                </div>
                
                <div className="lg:w-2/3 p-8 md:p-12 flex flex-col justify-center">
                  <h2 className="text-3xl font-display font-bold text-foreground mb-4">{service.title}</h2>
                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed">{service.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {service.details.split(',').map((detail, i) => (
                      <div key={i} className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-primary mr-3 shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{detail.trim()}</span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <Link href={`/contact?service=${encodeURIComponent(service.title)}`}>
                      <Button>Schedule Service</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
