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
          <h1 className="text-4xl md:text-5xl font-display font-bold text-navy mb-6">Contact Us</h1>
          <p className="text-lg text-muted-foreground">
            Get in touch for quotes, service requests, or technical support. Our team of experts is ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-card p-8 rounded-lg border border-border">
              <h3 className="text-xl font-display font-bold text-navy mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mr-4">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 mb-1">Headquarters</h4>
                    <p className="text-muted-foreground text-sm">Sharjah Media City,<br/>Sharjah, United Arab Emirates</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mr-4">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 mb-1">Phone</h4>
                    <p className="text-muted-foreground text-sm">+971 50 852 7021<br/>+971 56 246 9049</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mr-4">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 mb-1">Email</h4>
                    <p className="text-muted-foreground text-sm">sales@pmtgulf.com<br/>service@pmtgulf.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mr-4">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 mb-1">Business Hours</h4>
                    <p className="text-muted-foreground text-sm">Mon - Sat: 8:00 AM - 6:00 PM<br/>24/7 Emergency Support Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-card p-8 md:p-12 rounded-lg border border-border">
              <h3 className="text-2xl font-display font-bold text-navy mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-blue-900 mb-2">Full Name</label>
                    <Input {...register("name")} placeholder="Name" />
                    {errors.name && <span className="text-destructive text-xs mt-1 block">{errors.name.message}</span>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-blue-900 mb-2">Phone Number</label>
                    <Input {...register("phone")} placeholder="Phone Number" />
                    {errors.phone && <span className="text-destructive text-xs mt-1 block">{errors.phone.message}</span>}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-blue-900 mb-2">Email Address</label>
                  <Input type="email" {...register("email")} placeholder="Email" />
                  {errors.email && <span className="text-destructive text-xs mt-1 block">{errors.email.message}</span>}
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-blue-900 mb-2">Your Message</label>
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

        {/* Google Map */}
        <div className="mt-16 bg-muted rounded-lg h-96 border border-border overflow-hidden">
          <iframe
            src="https://www.google.com/maps?q=Precision+Machine+Tools+LLC+Sharjah&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Precision Machine Tools LLC - Sharjah Media City, Sharjah, United Arab Emirates"
            className="w-full h-full"
          />
        </div>

      </div>
    </div>
  );
}
