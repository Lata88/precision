import { useState } from "react";
import { useListGallery } from "@workspace/api-client-react";
import { Image as ImageIcon } from "lucide-react";

export default function Gallery() {
  const { data: images, isLoading } = useListGallery();
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Machines", "Tools", "Workshop", "Servicing"];

  const filteredImages = images?.filter(img => filter === "All" || img.category === filter);

  return (
    <div className="min-h-screen bg-background pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">Our Work in Action</h1>
            <div className="w-20 h-1 bg-primary"></div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                  filter === cat 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : "bg-card text-muted-foreground border border-border hover:border-primary/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="animate-pulse bg-card rounded-lg border border-border w-full" style={{ height: `${Math.random() * 200 + 200}px` }}></div>
            ))}
          </div>
        ) : filteredImages?.length === 0 ? (
          <div className="text-center py-24 bg-card rounded-lg border border-border">
            <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-foreground mb-2">No Images Found</h3>
            <p className="text-muted-foreground">We haven't uploaded images for this category yet.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredImages?.map((img) => (
              <div key={img.id} className="break-inside-avoid group relative rounded-lg overflow-hidden border border-border bg-card">
                <img 
                  src={img.imageUrl} 
                  alt={img.title} 
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-primary text-xs font-bold uppercase tracking-widest mb-1">{img.category}</span>
                  <h4 className="text-white text-lg font-bold">{img.title}</h4>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
