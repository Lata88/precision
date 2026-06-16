import { useState } from "react";
import { useListMachines } from "@workspace/api-client-react";
import { Card, Button } from "@/components/ui";
import { Link } from "wouter";
import { Settings, Gauge, Box } from "lucide-react";

export default function Machines() {
  const { data: machines, isLoading } = useListMachines();
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Milling", "Turning", "VTL & VTC", "Grinding", "EDM"];

  const filteredMachines = machines?.filter(m => filter === "All" || m.category === filter);

  return (
    <div className="min-h-screen bg-background pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">CNC Machines</h1>
            <div className="w-20 h-1 bg-primary mb-4"></div>
            <p className="text-muted-foreground max-w-2xl">
              Explore our comprehensive catalog of high-performance CNC machining centers. Designed for rigorous production environments.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-sm text-sm font-semibold uppercase tracking-wider transition-colors ${filter === cat ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-white/10"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="animate-pulse bg-card h-[450px] rounded-lg border border-border"></div>
            ))}
          </div>
        ) : filteredMachines?.length === 0 ? (
          <div className="text-center py-24 bg-card rounded-lg border border-border">
            <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-foreground mb-2">No Machines Found</h3>
            <p className="text-muted-foreground">Check back later or adjust your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMachines?.map(machine => (
              <Card key={machine.id} className="flex flex-col h-full bg-card hover:-translate-y-1 transition-transform duration-300">
                <div className="aspect-[4/3] bg-muted relative overflow-hidden border-b border-border">
                  {machine.imageUrl ? (
                    <img src={machine.imageUrl} alt={machine.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Settings className="w-16 h-16 text-white/10" />
                    </div>
                  )}
                  {machine.featured && (
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm shadow-lg">
                      Featured
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 bg-background/90 backdrop-blur text-xs font-bold uppercase tracking-widest px-3 py-1.5 text-muted-foreground border-t border-r border-border">
                    {machine.category}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">{machine.name}</h3>
                  <p className="text-muted-foreground text-sm mb-6 flex-grow">{machine.description}</p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-sm text-foreground">
                      <Gauge className="w-4 h-4 text-primary mr-3" />
                      <span className="truncate">{machine.specifications}</span>
                    </div>
                    <div className="flex items-center text-sm text-foreground">
                      <Box className="w-4 h-4 text-primary mr-3" />
                      <span>Industrial Grade Build</span>
                    </div>
                  </div>

                  <Link href="/contact">
                    <Button variant="outline" className="w-full group">
                      Request Quote <Settings className="ml-2 w-4 h-4 group-hover:rotate-90 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
