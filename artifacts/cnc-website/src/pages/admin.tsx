import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { 
  useListMachines, useCreateMachine, useDeleteMachine,
  useListTools, useCreateTool, useDeleteTool,
  useListServices, useCreateService,
  useListGallery, useCreateGalleryImage, useDeleteGalleryImage,
  useListContacts,
  getListMachinesQueryKey, getListToolsQueryKey, getListServicesQueryKey, getListGalleryQueryKey
} from "@workspace/api-client-react";
import { Button, Input, Textarea, Card } from "@/components/ui";
import { useToast } from "@/hooks/use-toast";
import { Trash2, PlusCircle, Settings, ShieldAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const TABS = ["Machines", "Tools", "Services", "Gallery", "Contacts"] as const;

export default function Admin() {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>("Machines");
  
  return (
    <div className="min-h-screen bg-background pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center space-x-4 mb-8 border-b border-border pb-6">
          <ShieldAlert className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Admin Control Panel</h1>
            <p className="text-muted-foreground text-sm">Manage website content and view submissions</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-sm font-semibold uppercase tracking-wider text-sm transition-colors ${
                activeTab === tab 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-card text-muted-foreground border border-border hover:bg-white/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-card border border-border rounded-lg p-6 min-h-[500px]">
          {activeTab === "Machines" && <MachinesAdmin />}
          {activeTab === "Tools" && <ToolsAdmin />}
          {activeTab === "Services" && <ServicesAdmin />}
          {activeTab === "Gallery" && <GalleryAdmin />}
          {activeTab === "Contacts" && <ContactsAdmin />}
        </div>

      </div>
    </div>
  );
}

// --- MACHINES ADMIN ---
const machineSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  specifications: z.string().min(1),
  imageUrl: z.string().optional(),
  category: z.string().min(1),
  featured: z.boolean().default(false),
});

function MachinesAdmin() {
  const { data: machines } = useListMachines();
  const createMachine = useCreateMachine();
  const deleteMachine = useDeleteMachine();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof machineSchema>>({
    resolver: zodResolver(machineSchema),
    defaultValues: { featured: false }
  });

  const onSubmit = (data: z.infer<typeof machineSchema>) => {
    createMachine.mutate({ data: { ...data, imageUrl: data.imageUrl || null } }, {
      onSuccess: () => {
        toast({ title: "Machine Created" });
        queryClient.invalidateQueries({ queryKey: getListMachinesQueryKey() });
        form.reset();
      }
    });
  };

  const handleDelete = (id: number) => {
    if(!confirm("Are you sure?")) return;
    deleteMachine.mutate({ id }, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getListMachinesQueryKey() })
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <h3 className="text-xl font-bold mb-6">Add New Machine</h3>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Input {...form.register("name")} placeholder="Machine Name" />
          <Input {...form.register("category")} placeholder="Category (e.g. Milling)" />
          <Input {...form.register("imageUrl")} placeholder="Image URL (optional)" />
          <Input {...form.register("specifications")} placeholder="Specifications" />
          <Textarea {...form.register("description")} placeholder="Description" />
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="featured" {...form.register("featured")} className="w-4 h-4 rounded border-border" />
            <label htmlFor="featured" className="text-sm">Featured Machine</label>
          </div>
          <Button type="submit" disabled={createMachine.isPending}>Add Machine</Button>
        </form>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-6">Current Machines</h3>
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {machines?.map(m => (
            <div key={m.id} className="flex justify-between items-center p-4 bg-background border border-border rounded-sm">
              <div>
                <div className="font-bold">{m.name}</div>
                <div className="text-xs text-muted-foreground">{m.category}</div>
              </div>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(m.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- TOOLS ADMIN ---
const toolSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  specifications: z.string().min(1),
  imageUrl: z.string().optional(),
  category: z.string().min(1),
});

function ToolsAdmin() {
  const { data: tools } = useListTools();
  const createTool = useCreateTool();
  const deleteTool = useDeleteTool();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof toolSchema>>({ resolver: zodResolver(toolSchema) });

  const onSubmit = (data: z.infer<typeof toolSchema>) => {
    createTool.mutate({ data: { ...data, imageUrl: data.imageUrl || null } }, {
      onSuccess: () => {
        toast({ title: "Tool Created" });
        queryClient.invalidateQueries({ queryKey: getListToolsQueryKey() });
        form.reset();
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <h3 className="text-xl font-bold mb-6">Add New Tool</h3>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Input {...form.register("name")} placeholder="Tool Name" />
          <Input {...form.register("category")} placeholder="Category" />
          <Input {...form.register("imageUrl")} placeholder="Image URL (optional)" />
          <Input {...form.register("specifications")} placeholder="Specifications" />
          <Textarea {...form.register("description")} placeholder="Description" />
          <Button type="submit" disabled={createTool.isPending}>Add Tool</Button>
        </form>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-6">Current Tools</h3>
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {tools?.map(t => (
            <div key={t.id} className="flex justify-between items-center p-4 bg-background border border-border rounded-sm">
              <div>
                <div className="font-bold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.category}</div>
              </div>
              <Button variant="destructive" size="sm" onClick={() => {
                if(confirm("Are you sure?")) deleteTool.mutate({ id: t.id }, { onSuccess: () => queryClient.invalidateQueries({ queryKey: getListToolsQueryKey() }) })
              }}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- SERVICES ADMIN ---
const serviceSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1).default("Settings"),
  details: z.string().min(1),
});

function ServicesAdmin() {
  const { data: services } = useListServices();
  const createService = useCreateService();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof serviceSchema>>({ resolver: zodResolver(serviceSchema), defaultValues: { icon: "Settings" } });

  const onSubmit = (data: z.infer<typeof serviceSchema>) => {
    createService.mutate({ data }, {
      onSuccess: () => {
        toast({ title: "Service Created" });
        queryClient.invalidateQueries({ queryKey: getListServicesQueryKey() });
        form.reset();
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <h3 className="text-xl font-bold mb-6">Add New Service</h3>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Input {...form.register("title")} placeholder="Service Title" />
          <Input {...form.register("icon")} placeholder="Lucide Icon Name (e.g. Settings, Wrench)" />
          <Input {...form.register("details")} placeholder="Details (comma separated)" />
          <Textarea {...form.register("description")} placeholder="Description" />
          <Button type="submit" disabled={createService.isPending}>Add Service</Button>
        </form>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-6">Current Services</h3>
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {services?.map(s => (
            <div key={s.id} className="p-4 bg-background border border-border rounded-sm">
              <div className="font-bold flex items-center"><Settings className="w-4 h-4 mr-2 text-primary" /> {s.title}</div>
              <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{s.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- GALLERY ADMIN ---
const gallerySchema = z.object({
  title: z.string().min(1),
  imageUrl: z.string().min(1),
  category: z.string().min(1),
});

function GalleryAdmin() {
  const { data: images } = useListGallery();
  const createGallery = useCreateGalleryImage();
  const deleteGallery = useDeleteGalleryImage();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof gallerySchema>>({ resolver: zodResolver(gallerySchema) });

  const onSubmit = (data: z.infer<typeof gallerySchema>) => {
    createGallery.mutate({ data }, {
      onSuccess: () => {
        toast({ title: "Image Added" });
        queryClient.invalidateQueries({ queryKey: getListGalleryQueryKey() });
        form.reset();
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <h3 className="text-xl font-bold mb-6">Add Image</h3>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Input {...form.register("title")} placeholder="Image Title" />
          <Input {...form.register("category")} placeholder="Category" />
          <Input {...form.register("imageUrl")} placeholder="Image URL" />
          <Button type="submit" disabled={createGallery.isPending}>Upload Image</Button>
        </form>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-6">Current Images</h3>
        <div className="grid grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
          {images?.map(img => (
            <div key={img.id} className="relative group rounded-sm overflow-hidden border border-border aspect-square">
              <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover opacity-80" />
              <Button 
                variant="destructive" 
                size="sm" 
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => {
                  if(confirm("Delete image?")) deleteGallery.mutate({ id: img.id }, { onSuccess: () => queryClient.invalidateQueries({ queryKey: getListGalleryQueryKey() }) });
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <div className="absolute bottom-0 w-full bg-black/80 text-[10px] p-2 truncate">{img.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- CONTACTS ADMIN ---
function ContactsAdmin() {
  const { data: contacts } = useListContacts();

  return (
    <div>
      <h3 className="text-xl font-bold mb-6">Recent Contact Submissions</h3>
      <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2">
        {contacts?.length === 0 && <p className="text-muted-foreground">No submissions yet.</p>}
        {contacts?.map(c => (
          <Card key={c.id} className="p-6 bg-background border border-border">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-bold text-lg">{c.name}</h4>
                <div className="text-sm text-primary">{c.email} • {c.phone}</div>
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date(c.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="text-sm bg-card p-4 rounded-sm border border-white/5">
              {c.message}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
