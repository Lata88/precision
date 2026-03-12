import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSubmitContact } from "@workspace/api-client-react";
import { Button, Input, Textarea } from "@/components/ui";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(5, "Phone is required"),
  email: z.string().email("Valid email required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  const submitContact = useSubmitContact();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = (data: ContactFormData) => {
    submitContact.mutate({ data }, {
      onSuccess: () => {
        toast({ title: "Message Sent", description: "We will get back to you shortly." });
        reset();
      },
      onError: () => {
        toast({ variant: "destructive", title: "Error", description: "Failed to send message. Please try again." });
      }
    });
  };

  return (
    <div className="min-h-screen bg-background pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">Contact Us</h1>
          <p className="text-lg text-muted-foreground">
            Get in touch for quotes, service requests, or technical support. Our team of experts is ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-card p-8 rounded-lg border border-border">
              <h3 className="text-xl font-display font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mr-4">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground mb-1">Headquarters</h4>
                    <p className="text-muted-foreground text-sm">100 Industrial Parkway<br/>Detroit, MI 48201, USA</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mr-4">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground mb-1">Phone</h4>
                    <p className="text-muted-foreground text-sm">+1 (555) 123-4567<br/>+1 (555) 987-6543 (Support)</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mr-4">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground mb-1">Email</h4>
                    <p className="text-muted-foreground text-sm">info@cncsolutions.com<br/>service@cncsolutions.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mr-4">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground mb-1">Business Hours</h4>
                    <p className="text-muted-foreground text-sm">Mon - Fri: 8:00 AM - 6:00 PM<br/>24/7 Emergency Support Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-card p-8 md:p-12 rounded-lg border border-border">
              <h3 className="text-2xl font-display font-bold mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Full Name</label>
                    <Input {...register("name")} placeholder="John Doe" />
                    {errors.name && <span className="text-destructive text-xs mt-1 block">{errors.name.message}</span>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Phone Number</label>
                    <Input {...register("phone")} placeholder="+1 (555) 000-0000" />
                    {errors.phone && <span className="text-destructive text-xs mt-1 block">{errors.phone.message}</span>}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Email Address</label>
                  <Input type="email" {...register("email")} placeholder="john@company.com" />
                  {errors.email && <span className="text-destructive text-xs mt-1 block">{errors.email.message}</span>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Your Message</label>
                  <Textarea {...register("message")} placeholder="Please describe your requirements or issues..." />
                  {errors.message && <span className="text-destructive text-xs mt-1 block">{errors.message.message}</span>}
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={submitContact.isPending}>
                  {submitContact.isPending ? "Sending..." : "Submit Message"}
                </Button>
              </form>
            </div>
          </div>

        </div>

        {/* Map Placeholder */}
        <div className="mt-16 bg-muted rounded-lg h-96 border border-border overflow-hidden relative">
          {/* Replace with actual iframe in production */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1920&q=80')] bg-cover bg-center opacity-30 grayscale" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-background/90 backdrop-blur p-4 rounded-lg shadow-xl border border-primary/20 flex items-center text-primary font-bold">
              <MapPin className="w-5 h-5 mr-2" />
              Interactive Map Placeholder
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
