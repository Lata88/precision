import { useState } from "react";
import { Button } from "@/components/ui";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CheckCircle2, ClipboardCheck, Gauge, Factory, ZoomIn } from "lucide-react";
import { Link } from "wouter";

const capabilities = [
  {
    title: "Fixture Design",
    description: "Custom workholding concepts for repeatable clamping, faster loading, and stable machining.",
    image: "/images/Fixture.png",
  },
  {
    title: "Tooling Selection",
    description: "Matched cutting tools, holders, inserts, and process parameters for the required application.",
    image: "/images/Tool.png",
  },
  {
    title: "Process Engineering",
    description: "Machining sequence planning, cycle-time review, and production-ready process validation.",
    image: "/images/process.png",
  },
  {
    title: "Installation Support",
    description: "Machine commissioning, operator orientation, and handover support for smooth production startup.",
    image: "/images/workshop.png",
  },
];

const processSteps = [
  "Application study and component review",
  "Machine, fixture, and tooling proposal",
  "Cycle-time and process feasibility planning",
  "Supply, installation, and commissioning support",
  "Trial production and final handover",
];

export default function TurnkeySolutions() {
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Header */}
      <div className="bg-navy pt-16 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-1.jpeg')] opacity-20 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent opacity-80"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center flex flex-col items-center">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-4">
            <Factory className="w-4 h-4" />
            Product Solutions
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-white mb-6 max-w-4xl">
            Turnkey Manufacturing Projects Built for Precision and Reliability
          </h1>
          <p className="text-white/80 max-w-2xl text-center leading-relaxed text-lg mb-8">
            We deliver fully integrated CNC solutions from concept to production, combining machines, fixturing, tooling, installation and process validation under one accountable partner.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto">
            <Link href="/contact?service=Turnkey%20Solutions">
              <Button className="w-full sm:w-auto px-8">Request a Turnkey Proposal</Button>
            </Link>
            <Link href="/machines">
              <Button variant="outline" className="w-full sm:w-auto px-8 border-primary text-primary hover:bg-primary/5">Explore Machines</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <section className="mb-14 max-w-4xl mx-auto rounded-2xl border border-border bg-card px-6 py-8 md:px-8 md:py-10 shadow-xl shadow-slate-200/50">
          <div className="flex items-center gap-3 mb-5">
            <div className="grid place-items-center w-11 h-11 rounded-2xl bg-primary/10 text-primary">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Turnkey Coverage</p>
              <h2 className="font-display font-bold text-2xl text-foreground mt-2">Complete delivery scope</h2>
            </div>
          </div>
          <div className="space-y-4 text-sm text-foreground">
            {[
              "Site assessment & layout planning",
              "CNC equipment, fixtures, tooling & software",
              "Installation, commissioning & operator training",
              "Process validation, trial runs & handover",
            ].map((item) => (
              <div key={item} className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Why this works</p>
            <p className="mt-2 leading-relaxed">
              Single-source accountability simplifies project execution and tightens delivery timelines for industrial applications.
            </p>
          </div>
        </section>

        {/* <section className="mb-14 rounded-2xl overflow-hidden border border-border shadow-2xl">
          <div className="relative h-80 md:h-[500px] w-full bg-slate-100">
            <img
              src="/images/workshop.png"
              alt="Turnkey CNC manufacturing solution installation"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
              <h2 className="font-display font-bold text-2xl md:text-3xl mb-3">
                Complete Manufacturing Solutions in Action
              </h2>
              <p className="text-sm md:text-base max-w-2xl leading-7 text-white/90">
                From site preparation through production handover, our turnkey approach ensures seamless integration and immediate operational capability.
              </p>
            </div>
          </div>
        </section> */}

        <section className="mb-10">
          <div className="flex flex-col gap-3 mb-6">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display font-bold text-2xl text-foreground">Solution Capabilities</h2>
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Click to preview</span>
            </div>
            <p className="max-w-2xl text-sm text-muted-foreground leading-7">
              These core capabilities are designed to reduce risk, accelerate time-to-production and ensure reliable long-term operation for your CNC installations.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {capabilities.map((capability) => (
              <div
                key={capability.title}
                className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/50 transition-all cursor-zoom-in group"
                onClick={() => setSelectedImage({ url: capability.image, title: capability.title })}
              >
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={capability.image}
                    alt={capability.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ZoomIn className="w-10 h-10 text-white drop-shadow-md animate-in fade-in zoom-in-75 duration-200" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">{capability.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{capability.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-5">
          <div className="bg-card border border-border rounded-2xl p-6 md:p-7">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary mb-4">
              <Gauge className="w-4 h-4" />
              Delivery Process
            </div>
            <h2 className="font-display font-bold text-2xl text-foreground mb-6">Structured Project Execution</h2>
            <div className="space-y-4">
              {processSteps.map((step, index) => (
                <div key={step} className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0 shadow-sm">
                    {index + 1}
                  </div>
                  <div className="text-sm text-foreground pt-1.5 leading-6">{step}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 md:p-7">
            <h2 className="font-display font-bold text-2xl text-foreground mb-5">Typical Applications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Automotive components",
                "Precision turned parts",
                "Batch production fixtures",
                "Custom machining cells",
                "Tooling package upgrades",
                "Productivity improvement projects",
              ].map((application) => (
                <div key={application} className="flex items-start gap-3 bg-background border border-border rounded-lg px-4 py-3 hover:border-primary/50 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1" />
                  <span className="text-sm text-foreground">{application}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
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
