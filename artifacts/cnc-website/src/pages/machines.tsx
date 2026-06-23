import { useState } from "react";
import { useListMachines } from "@workspace/api-client-react";
import { Card, Button } from "@/components/ui";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Link } from "wouter";
import { Settings, Gauge, Box, ZoomIn, Layers3 } from "lucide-react";

export default function Machines() {
  const { data: machines, isLoading } = useListMachines();
  const [filter, setFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);

  const categories = ["All", "Milling", "Turning", "VTL & VTC", "Grinding", "EDM"];

  const filteredMachines = machines?.filter(m => filter === "All" || m.category === filter);
  const visibleMachineCount = filteredMachines?.length ?? 0;
  const totalMachineCount = machines?.length ?? 0;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Header */}
      <div className="bg-navy pt-16 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-1.jpeg')] opacity-20 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent opacity-80"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center flex flex-col items-center">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-4">
            <Layers3 className="w-4 h-4" />
            Machine Catalog
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-white mb-6">CNC Machines</h1>
          <p className="text-white/80 max-w-2xl text-center leading-relaxed text-lg">
            Explore high-performance CNC machining centers, turning solutions, grinding machines, and EDM systems designed for demanding production environments.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="mb-10 rounded-xl border border-border bg-card px-5 py-4 shadow-lg shadow-black/5 flex items-center">
          <div className="flex overflow-x-auto gap-3 pb-2 md:pb-1 md:flex-wrap scrollbar-none justify-start md:justify-center w-full items-center">
            {categories.map(cat => {
              const isSelected = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2.5 text-sm font-bold uppercase tracking-wider rounded-lg border-2 transition-all duration-300 shadow-sm flex items-center gap-2 whitespace-nowrap shrink-0 ${isSelected ? "border-primary bg-primary/10 text-primary scale-[1.02]" : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground hover:bg-muted/50 hover:-translate-y-0.5"}`}
                >
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="animate-pulse bg-card h-[450px] rounded-lg border border-border"></div>
            ))}
          </div>
        ) : filteredMachines?.length === 0 ? (
          <div className="text-center py-24 bg-card rounded-md border border-border">
            <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-foreground mb-2">No Machines Found</h3>
            <p className="text-muted-foreground">Check back later or adjust your filters.</p>
          </div>
        ) : (
          <div>
            <div className="flex items-end justify-between gap-4 mb-3">
              <h2 className="font-display font-bold text-xl text-foreground">Available Machines</h2>
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{visibleMachineCount} Results</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredMachines?.map(machine => (
                <Card key={machine.id} className="flex flex-col h-full bg-card border-border overflow-hidden hover:border-primary/50 hover:shadow-md transition-all">
                  <div
                    className="aspect-[4/3] bg-muted relative overflow-hidden border-b border-border cursor-zoom-in group"
                    onClick={() => machine.imageUrl && setSelectedImage({ url: machine.imageUrl, title: machine.name })}
                  >
                    {machine.imageUrl ? (
                      <>
                        <img src={machine.imageUrl} alt={machine.name} className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <ZoomIn className="w-10 h-10 text-white drop-shadow-md animate-in fade-in zoom-in-75 duration-200" />
                        </div>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Settings className="w-16 h-16 text-muted-foreground opacity-30" />
                      </div>
                    )}
                    {machine.featured && (
                      <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-sm z-10">
                        Featured
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-background/95 backdrop-blur text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 text-muted-foreground border border-border rounded-sm shadow-sm z-10">
                      {machine.category}
                    </div>
                  </div>

                  <div className="p-4 md:p-5 flex flex-col flex-grow">
                    <h3 className="text-xl font-display font-bold text-foreground mb-2 leading-tight">{machine.name}</h3>
                    <p className="text-muted-foreground text-sm mb-5 flex-grow line-clamp-3">{machine.description}</p>

                    <div className="space-y-2.5 mb-6">
                      <div className="flex items-center text-sm text-foreground bg-background border border-border rounded-sm px-3 py-2">
                        <Gauge className="w-4 h-4 text-primary mr-3 shrink-0" />
                        <span className="truncate">{machine.specifications}</span>
                      </div>
                      {/* <div className="flex items-center text-sm text-foreground bg-background border border-border rounded-sm px-3 py-2">
                        <Box className="w-4 h-4 text-primary mr-3 shrink-0" />
                        <span>Industrial Grade Build</span>
                      </div> */}
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
          </div>
        )}

      </div>

      {/* Image Preview Dialog */}
      <Dialog open={selectedImage !== null} onOpenChange={(open: boolean) => { if (!open) setSelectedImage(null); }}>
        <DialogContent className="w-[95vw] max-w-4xl p-0 overflow-hidden bg-black/95 border border-white/10 rounded-lg shadow-2xl">
          <DialogTitle className="sr-only">Image Preview</DialogTitle>
          <DialogDescription className="sr-only">Visual preview of {selectedImage?.title}</DialogDescription>
          <div className="relative w-full flex flex-col items-center justify-center bg-black/90 p-1">
            <img src={selectedImage?.url} alt={selectedImage?.title} className="max-w-full max-h-[60vh] md:max-h-[75vh] object-contain rounded-md" />
            {selectedImage?.title && (
              <div className="w-full bg-black/80 text-white text-center py-3 px-4 border-t border-white/10 font-display font-bold text-sm md:text-lg">
                {selectedImage.title}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
