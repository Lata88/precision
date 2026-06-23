import { Link } from "wouter";
import { Button } from "@/components/ui";
import { Truck } from "lucide-react";

export default function TurnKeySolutions() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">Turn Key Solutions</h1>
          <p className="text-lg text-muted-foreground">
            We deliver end-to-end project execution — from design and equipment supply to installation, commissioning, and staff training.
            Our turnkey offerings reduce complexity and accelerate time-to-production.
          </p>
        </div>

        <div className="bg-card rounded-xl border border-border overflow-hidden grid grid-cols-1 lg:grid-cols-3 gap-0">
          <div className="lg:col-span-1 bg-muted p-8 flex items-center justify-center relative overflow-hidden border-b lg:border-b-0 lg:border-r border-border">
            <img src="/public/images/turnkey.jpg" alt="Turn Key Solutions" className="w-full h-64 object-cover rounded-lg shadow-lg" />
          </div>

          <div className="lg:col-span-2 p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">Comprehensive Project Delivery</h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Our team manages the entire lifecycle of your manufacturing projects — layout planning, machine procurement, integration, and handover.
            </p>

            <ul className="mb-8 space-y-3">
              <li className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-primary mt-1" />
                <span className="text-foreground">Single-vendor responsibility for smoother delivery</span>
              </li>
              <li className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-primary mt-1" />
                <span className="text-foreground">On-site installation and commissioning</span>
              </li>
              <li className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-primary mt-1" />
                <span className="text-foreground">Operator training and documentation</span>
              </li>
            </ul>

            <div>
              <Link href="/contact?service=Turn%20Key%20Solutions">
                <Button>Request Turn Key Proposal</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
