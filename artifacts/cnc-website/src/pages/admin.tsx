import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { 
  useListMachines, useCreateMachine, useDeleteMachine,
  useListTools, useCreateTool, useDeleteTool,
  useListServices, useCreateService,
  useListGallery, useCreateGalleryImage, useDeleteGalleryImage,
  useListContacts,
  useUploadImage,
  getListMachinesQueryKey, getListToolsQueryKey, getListServicesQueryKey, getListGalleryQueryKey
} from "@workspace/api-client-react";
import { Button, Input, Textarea, Card } from "@/components/ui";
import { useToast } from "@/hooks/use-toast";
import { Trash2, PlusCircle, Settings, ShieldAlert, Upload, X, Loader2, Pencil } from "lucide-react";
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

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string | null) => void;
  bucket: string;
}

function ImageUpload({ value, onChange, bucket }: ImageUploadProps) {
  const uploadImage = useUploadImage();
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image size must be less than 5MB.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const response = await uploadImage.mutateAsync({
        data: {
          file,
          bucket,
        },
      });

      if (response.url) {
        onChange(response.url);
        toast({ title: "Image uploaded successfully" });
      } else {
        throw new Error("Failed to get image URL from response");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload image.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-foreground block">
        Image
      </label>
      {value ? (
        <div className="relative rounded-md border border-border overflow-hidden aspect-[16/9] max-w-sm group">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-black/95 text-white transition-opacity opacity-0 group-hover:opacity-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="relative max-w-sm">
          <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-md p-6 cursor-pointer transition-colors aspect-[16/9] ${
            isUploading 
              ? "border-muted bg-muted/20 cursor-not-allowed" 
              : "border-border hover:border-primary/50 hover:bg-white/5"
          }`}>
            {isUploading ? (
              <div className="flex flex-col items-center space-y-2 text-muted-foreground">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="text-xs">Uploading...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-2 text-muted-foreground text-center">
                <Upload className="w-8 h-8 text-primary/80" />
                <span className="text-sm font-medium text-foreground">Click to upload image</span>
                <span className="text-xs">PNG, JPG, WEBP up to 5MB</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </label>
        </div>
      )}
    </div>
  );
}

// --- MACHINES ADMIN ---
const machineSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
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
  const [editingId, setEditingId] = useState<number | null>(null);

  const form = useForm<z.infer<typeof machineSchema>>({
    resolver: zodResolver(machineSchema),
    defaultValues: { featured: false }
  });

  const updateMachine = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await fetch(`/api/machines/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update machine");
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Machine Updated" });
      queryClient.invalidateQueries({ queryKey: getListMachinesQueryKey() });
      form.reset({ name: "", category: "", specifications: "", description: "", imageUrl: undefined, featured: false });
      setEditingId(null);
    }
  });

  const onSubmit = (data: z.infer<typeof machineSchema>) => {
    const payload = { 
      ...data, 
      imageUrl: data.imageUrl || null,
      description: data.description || null
    };
    if (editingId !== null) {
      updateMachine.mutate({ id: editingId, data: payload });
    } else {
      createMachine.mutate({ data: payload }, {
        onSuccess: () => {
          toast({ title: "Machine Created" });
          queryClient.invalidateQueries({ queryKey: getListMachinesQueryKey() });
          form.reset();
        }
      });
    }
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
        <h3 className="text-xl font-bold mb-6">{editingId !== null ? "Edit Machine" : "Add New Machine"}</h3>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Input {...form.register("name")} placeholder="Machine Name" />
          <Input {...form.register("category")} placeholder="Category (e.g. Milling)" />
          <ImageUpload
            value={form.watch("imageUrl")}
            onChange={(url) => form.setValue("imageUrl", url || undefined)}
            bucket="machines"
          />
          <Input {...form.register("specifications")} placeholder="Specifications" />
          <Textarea {...form.register("description")} placeholder="Description" />
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="featured" {...form.register("featured")} className="w-4 h-4 rounded border-border" />
            <label htmlFor="featured" className="text-sm">Featured Machine</label>
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={createMachine.isPending || updateMachine.isPending}>
              {editingId !== null ? "Save Changes" : "Add Machine"}
            </Button>
            {editingId !== null && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingId(null);
                  form.reset({ name: "", category: "", specifications: "", description: "", imageUrl: undefined, featured: false });
                }}
              >
                Cancel
              </Button>
            )}
          </div>
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
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setEditingId(m.id);
                    form.reset({
                      name: m.name,
                      category: m.category,
                      specifications: m.specifications,
                      description: m.description || "",
                      imageUrl: m.imageUrl || undefined,
                      featured: m.featured,
                    });
                  }}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(m.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
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
  const [editingId, setEditingId] = useState<number | null>(null);
  const form = useForm<z.infer<typeof toolSchema>>({ resolver: zodResolver(toolSchema) });

  const updateTool = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await fetch(`/api/tools/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update tool");
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Tool Updated" });
      queryClient.invalidateQueries({ queryKey: getListToolsQueryKey() });
      form.reset({ name: "", category: "", specifications: "", description: "", imageUrl: undefined });
      setEditingId(null);
    }
  });

  const onSubmit = (data: z.infer<typeof toolSchema>) => {
    const payload = { ...data, imageUrl: data.imageUrl || null };
    if (editingId !== null) {
      updateTool.mutate({ id: editingId, data: payload });
    } else {
      createTool.mutate({ data: payload }, {
        onSuccess: () => {
          toast({ title: "Tool Created" });
          queryClient.invalidateQueries({ queryKey: getListToolsQueryKey() });
          form.reset();
        }
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <h3 className="text-xl font-bold mb-6">{editingId !== null ? "Edit Tool" : "Add New Tool"}</h3>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Input {...form.register("name")} placeholder="Tool Name" />
          <Input {...form.register("category")} placeholder="Category" />
          <ImageUpload
            value={form.watch("imageUrl")}
            onChange={(url) => form.setValue("imageUrl", url || undefined)}
            bucket="tools"
          />
          <Input {...form.register("specifications")} placeholder="Specifications" />
          <Textarea {...form.register("description")} placeholder="Description" />
          <div className="flex gap-2">
            <Button type="submit" disabled={createTool.isPending || updateTool.isPending}>
              {editingId !== null ? "Save Changes" : "Add Tool"}
            </Button>
            {editingId !== null && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingId(null);
                  form.reset({ name: "", category: "", specifications: "", description: "", imageUrl: undefined });
                }}
              >
                Cancel
              </Button>
            )}
          </div>
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
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setEditingId(t.id);
                    form.reset({
                      name: t.name,
                      category: t.category,
                      specifications: t.specifications,
                      description: t.description,
                      imageUrl: t.imageUrl || undefined,
                    });
                  }}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => {
                  if(confirm("Are you sure?")) deleteTool.mutate({ id: t.id }, { onSuccess: () => queryClient.invalidateQueries({ queryKey: getListToolsQueryKey() }) })
                }}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
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
  imageUrl: z.string().optional(),
});

function ServicesAdmin() {
  const { data: services } = useListServices();
  const createService = useCreateService();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<number | null>(null);
  const form = useForm<z.infer<typeof serviceSchema>>({ resolver: zodResolver(serviceSchema), defaultValues: { icon: "Settings" } });

  const deleteService = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/services/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete service");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getListServicesQueryKey() });
      toast({ title: "Service Deleted" });
    }
  });

  const updateService = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await fetch(`/api/services/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update service");
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Service Updated" });
      queryClient.invalidateQueries({ queryKey: getListServicesQueryKey() });
      form.reset({ title: "", description: "", icon: "Settings", details: "", imageUrl: undefined });
      setEditingId(null);
    }
  });

  const onSubmit = (data: z.infer<typeof serviceSchema>) => {
    const payload = { ...data, imageUrl: data.imageUrl || null };
    if (editingId !== null) {
      updateService.mutate({ id: editingId, data: payload });
    } else {
      createService.mutate({ data: payload }, {
        onSuccess: () => {
          toast({ title: "Service Created" });
          queryClient.invalidateQueries({ queryKey: getListServicesQueryKey() });
          form.reset();
        }
      });
    }
  };

  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    deleteService.mutate(id);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <h3 className="text-xl font-bold mb-6">{editingId !== null ? "Edit Service" : "Add New Service"}</h3>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Input {...form.register("title")} placeholder="Service Title" />
          <Input {...form.register("icon")} placeholder="Lucide Icon Name (e.g. Settings, Wrench)" />
          <Input {...form.register("details")} placeholder="Details (comma separated)" />
          <ImageUpload
            value={form.watch("imageUrl")}
            onChange={(url) => form.setValue("imageUrl", url || undefined)}
            bucket="services"
          />
          <Textarea {...form.register("description")} placeholder="Description" />
          <div className="flex gap-2">
            <Button type="submit" disabled={createService.isPending || updateService.isPending}>
              {editingId !== null ? "Save Changes" : "Add Service"}
            </Button>
            {editingId !== null && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingId(null);
                  form.reset({ title: "", description: "", icon: "Settings", details: "", imageUrl: undefined });
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-6">Current Services</h3>
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {services?.map(s => (
            <div key={s.id} className="flex justify-between items-center p-4 bg-background border border-border rounded-sm">
              <div>
                <div className="font-bold flex items-center">
                  <Settings className="w-4 h-4 mr-2 text-primary" /> {s.title}
                </div>
                <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{s.description}</div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setEditingId(s.id);
                    form.reset({
                      title: s.title,
                      description: s.description,
                      icon: s.icon,
                      details: s.details,
                      imageUrl: s.imageUrl || undefined,
                    });
                  }}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => handleDelete(s.id)}
                  disabled={deleteService.isPending}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
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
          <ImageUpload
            value={form.watch("imageUrl")}
            onChange={(url) => form.setValue("imageUrl", url || "")}
            bucket="gallery"
          />
          <Button type="submit" disabled={createGallery.isPending}>Add Image</Button>
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
