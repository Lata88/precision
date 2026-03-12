import { useState } from "react";
import { useListTools } from "@workspace/api-client-react";
import { Card, Button } from "@/components/ui";
import { Link } from "wouter";
import { PenTool, ArrowRight } from "lucide-react";

export default function Tools() {
  const { data: tools, isLoading } = useListTools();
  const [filter, setFilter] = useState("All");

  const categories = ["All", "End Mills", "Drills", "Inserts", "Holders"];

  const filteredTools = tools?.filter(t => filter === "All" || t.category === filter);

  return (
    <div className="min-h-screen bg-background pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">Machine Tools</h1>
            <div className="w-20 h-1 bg-primary mb-4"></div>
            <p className="text-muted-foreground max-w-2xl">
              Precision cutting tools and tool holders engineered for maximum material removal rates and extended tool life.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-sm text-sm font-semibold uppercase tracking-wider transition-colors ${
                  filter === cat ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTools?.map(tool => (
              <Card key={tool.id} className="flex flex-col h-full bg-card hover:border-primary/50">
                <div className="aspect-square bg-muted relative overflow-hidden border-b border-border p-4">
                  {tool.imageUrl ? (
                    <img src={tool.imageUrl} alt={tool.name} className="w-full h-full object-contain mix-blend-screen" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PenTool className="w-12 h-12 text-white/10" />
                    </div>
                  )}
                  <div className="absolute top-2 left-2 bg-background/90 text-[10px] font-bold uppercase tracking-widest px-2 py-1 text-muted-foreground rounded-sm border border-border">
                    {tool.category}
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-foreground mb-2 leading-tight">{tool.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">{tool.description}</p>
                  
                  <div className="text-xs text-primary mb-4 font-mono bg-primary/10 p-2 rounded-sm border border-primary/20">
                    Specs: {tool.specifications}
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
        )}

      </div>
    </div>
  );
}
