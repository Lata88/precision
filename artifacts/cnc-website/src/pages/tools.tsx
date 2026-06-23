import { useState } from "react";
import { useListTools } from "@workspace/api-client-react";
import { Card, Button } from "@/components/ui";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Link } from "wouter";
import { PenTool, ArrowRight, ZoomIn, Layers3 } from "lucide-react";

export default function Tools() {
  const { data: tools, isLoading } = useListTools();
  const [filter, setFilter] = useState("All");
  const [subdivisionFilter, setSubdivisionFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);

  const toolDivisions = [
    {
      name: "Milling",
      subdivisions: ["Inserts", "End Mill", "Face Mill", "Shoulder Mill", "Slot Milling Cutter"],
    },
    {
      name: "Turning",
      subdivisions: ["Inserts", "External Turning", "Internal Boring", "Grooving"],
    },
    {
      name: "Hole Making",
      subdivisions: ["Drills", "Reamers", "Boring Tools"],
    },
    {
      name: "Threading",
      subdivisions: ["Inserts", "Taps", "Thread Mills", "Threading Holders", "Die and Gauges"],
    },
    {
      name: "Tooling Systems",
      subdivisions: ["Tool Holders", "Collets", "Pull Studs"],
    },
  ];

  const categories = ["All", ...toolDivisions.map((division) => division.name)];

  const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");
  const selectedDivision = toolDivisions.find((division) => division.name === filter);
  const matchesSubdivision = (tool: NonNullable<typeof tools>[number], subdivision: string) => {
    const searchableText = normalize(`${tool.name} ${tool.category} ${tool.description} ${tool.specifications}`);
    const subdivisionText = normalize(subdivision);
    const subdivisionWords = subdivision.split(" ").map(normalize).filter(Boolean);

    return searchableText.includes(subdivisionText) || subdivisionWords.every((word) => searchableText.includes(word));
  };
  const getDivisionTools = (divisionName: string) => tools?.filter((tool) => tool.category === divisionName) ?? [];
  const getDivisionImage = (divisionName: string) => getDivisionTools(divisionName).find((tool) => tool.imageUrl)?.imageUrl ?? undefined;
  const getSubdivisionTool = (divisionName: string, subdivision: string) =>
    getDivisionTools(divisionName).find((tool) => matchesSubdivision(tool, subdivision) && tool.imageUrl);

  const filteredTools = tools?.filter((tool) => {
    const matchesDivision = filter === "All" || tool.category === filter;
    const matchesSub = subdivisionFilter === "All" || matchesSubdivision(tool, subdivisionFilter);
    return matchesDivision && matchesSub;
  });
  const visibleToolCount = filteredTools?.length ?? 0;
  const totalToolCount = tools?.length ?? 0;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Header */}
      <div className="bg-navy pt-16 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-2.jpeg')] opacity-20 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent opacity-80"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center flex flex-col items-center">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-4">
            <Layers3 className="w-4 h-4" />
            Cutting Tools Catalog
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-white mb-6">CNC Toolings And Accessories</h1>
          <p className="text-white/80 max-w-2xl text-center leading-relaxed text-lg">
            Precision cutting tools, holders, inserts, and tooling systems selected for stable machining, repeatable accuracy, and longer tool life.
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
                  onClick={() => {
                    setFilter(cat);
                    setSubdivisionFilter("All");
                  }}
                  className={`px-5 py-2.5 text-sm font-bold uppercase tracking-wider rounded-lg border-2 transition-all duration-300 shadow-sm flex items-center gap-2 whitespace-nowrap shrink-0 ${isSelected ? "border-primary bg-primary/10 text-primary scale-[1.02]" : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground hover:bg-muted/50 hover:-translate-y-0.5"}`}
                >
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {filter !== "All" && selectedDivision && (
          <div className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <h2 className="font-display font-bold text-xl text-foreground">{selectedDivision.name} Categories</h2>
                <p className="text-sm text-muted-foreground">{selectedDivision.subdivisions.length} subdivisions available</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFilter("All");
                  setSubdivisionFilter("All");
                }}
                className="text-xs font-bold uppercase tracking-wider text-primary hover:text-primary/80 self-start sm:self-auto"
              >
                Clear Filter
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {["All", ...selectedDivision.subdivisions].map((subdivision) => {
                const isSelected = subdivisionFilter === subdivision;
                return (
                  <button
                    key={subdivision}
                    type="button"
                    onClick={() => setSubdivisionFilter(subdivision)}
                    className={`px-5 py-2.5 text-sm font-bold uppercase tracking-wider rounded-lg border-2 transition-all duration-300 shadow-sm flex items-center gap-2 ${isSelected ? "border-primary bg-primary/10 text-primary scale-[1.02]" : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground hover:bg-muted/50 hover:-translate-y-0.5"}`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                    {subdivision === "All" ? `All ${selectedDivision.name}` : subdivision}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="animate-pulse bg-card h-[350px] rounded-lg border border-border"></div>
            ))}
          </div>
        ) : filteredTools?.length === 0 ? (
          <div className="text-center py-24 bg-card rounded-lg border border-border">
            <PenTool className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-foreground mb-2">No Tools Found</h3>
            <p className="text-muted-foreground">Check back later or adjust your filters.</p>
          </div>
        ) : (
          <div>
            <div className="flex items-end justify-between gap-4 mb-3">
              <h2 className="font-display font-bold text-xl text-foreground">Available Tools</h2>
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{visibleToolCount} Results</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {filteredTools?.map(tool => (
                <Card key={tool.id} className="flex flex-col h-full bg-card border-border overflow-hidden hover:border-primary/50 hover:shadow-md transition-all">
                  <div
                    className="h-48 relative overflow-hidden border-b border-border bg-muted cursor-zoom-in group"
                    onClick={() => tool.imageUrl && setSelectedImage({ url: tool.imageUrl, title: tool.name })}
                  >
                    {tool.imageUrl ? (
                      <>
                        <img src={tool.imageUrl} alt={tool.name} className="w-full h-full object-contain p-3 hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <ZoomIn className="w-8 h-8 text-white drop-shadow-md animate-in fade-in zoom-in-75 duration-200" />
                        </div>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-muted">
                        <PenTool className="w-12 h-12 text-muted-foreground opacity-30" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm z-10 shadow-sm">
                      {tool.category}
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-foreground mb-2 leading-tight">{tool.name}</h3>
                    {tool.description ? (
                      <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">{tool.description}</p>
                    ) : (
                      <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">Precision tooling for industrial CNC applications.</p>
                    )}

                    <div className="text-xs text-foreground mb-4 bg-background p-2.5 rounded-sm border border-border">
                      <span className="font-bold text-primary">Specs:</span> {tool.specifications}
                    </div>

                    <Link href="/contact">
                      <Button variant="ghost" size="sm" className="w-full border border-border hover:border-primary">
                        Inquire <ArrowRight className="ml-2 w-4 h-4" />
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
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black/95 border border-white/10 rounded-lg shadow-2xl">
          <DialogTitle className="sr-only">Image Preview</DialogTitle>
          <DialogDescription className="sr-only">Visual preview of {selectedImage?.title}</DialogDescription>
          <div className="relative w-full flex flex-col items-center justify-center bg-black/90 p-1">
            <img src={selectedImage?.url} alt={selectedImage?.title} className="max-w-full max-h-[75vh] object-contain rounded-md" />
            {selectedImage?.title && (
              <div className="w-full bg-black/80 text-white text-center py-4 px-6 border-t border-white/10 font-display font-bold text-lg">
                {selectedImage.title}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
