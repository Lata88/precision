import { useState, useRef, useEffect } from "react";
import { useListGallery } from "@workspace/api-client-react";
import { Image as ImageIcon, Play } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

function GalleryCard({ img, onPlayVideo }: { img: any; onPlayVideo: (url: string, title: string) => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isHovered) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Hover auto-play prevented:", error);
        });
      }
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered]);

  const isVideo = !!img.videoUrl;

  return (
    <div
      className="break-inside-avoid group relative rounded-lg overflow-hidden border border-border bg-card cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => isVideo && onPlayVideo(img.videoUrl, img.title)}
    >
      <div className="relative w-full overflow-hidden aspect-[4/3] bg-black flex items-center justify-center">
        {isVideo ? (
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              src={img.videoUrl}
              poster={img.imageUrl || undefined}
              muted
              playsInline
              loop
              className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-700"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/10 transition-colors duration-300">
              <div className="p-3.5 rounded-full bg-primary/95 text-primary-foreground shadow-lg scale-90 group-hover:scale-100 transition-all duration-300 shadow-primary/30">
                <Play className="w-5 h-5 fill-current" />
              </div>
            </div>
          </div>
        ) : (
          <img
            src={img.imageUrl || ""}
            alt={img.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
        )}
      </div>

      {/* Info Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 pointer-events-none z-10">
        <span className="text-primary text-xs font-bold uppercase tracking-widest mb-1">{img.category}</span>
        <h4 className="text-white text-lg font-bold">{img.title}</h4>
        {isVideo && <span className="text-white/60 text-xs mt-1">Click to play video with audio</span>}
      </div>
      
      {/* Static Info for Mobile/No-Hover */}
      <div className="p-4 sm:hidden bg-card border-t border-border">
        <span className="text-primary text-[10px] font-bold uppercase tracking-widest block mb-1">{img.category}</span>
        <h4 className="text-foreground text-sm font-bold truncate">{img.title}</h4>
      </div>
    </div>
  );
}

export default function Gallery() {
  const { data: images, isLoading } = useListGallery();
  const [filter, setFilter] = useState("All");
  const [playingVideo, setPlayingVideo] = useState<{ url: string; title: string } | null>(null);

  const categories = ["All", "Machines", "Tools", "Workshop", "Servicing"];

  const filteredImages = images?.filter(img => filter === "All" || img.category.toLowerCase() === filter.toLowerCase());

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
            <h3 className="text-xl font-bold text-foreground mb-2">No Items Found</h3>
            <p className="text-muted-foreground">We haven't uploaded items for this category yet.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredImages?.map((img) => (
              <GalleryCard key={img.id} img={img} onPlayVideo={(url, title) => setPlayingVideo({ url, title })} />
            ))}
          </div>
        )}

      </div>

      {/* Video Lightbox Modal */}
      <Dialog open={!!playingVideo} onOpenChange={(open: boolean) => !open && setPlayingVideo(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-none rounded-lg aspect-video">
          {playingVideo && (
            <div className="relative w-full h-full flex flex-col justify-between">
              <video
                src={playingVideo.url}
                controls
                autoPlay
                className="w-full h-full max-h-[80vh] object-contain bg-black"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent pointer-events-none">
                <DialogTitle className="text-white text-lg font-bold">{playingVideo.title}</DialogTitle>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
