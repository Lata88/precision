import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";

function findWorkspaceRoot(): string {
  let current = process.cwd();
  for (let i = 0; i < 20; i++) {
    if (existsSync(path.join(current, "pnpm-workspace.yaml"))) {
      return current;
    }
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
  return process.cwd();
}

const workspaceRoot = findWorkspaceRoot();
const dbPath = path.join(workspaceRoot, "local-db.json");

interface DbSchema {
  machines: any[];
  tools: any[];
  services: any[];
  gallery: any[];
  contacts: any[];
}

function readDb(): DbSchema {
  try {
    if (!existsSync(dbPath)) {
      const initial: DbSchema = {
        machines: [],
        tools: [],
        services: [],
        gallery: [],
        contacts: []
      };
      writeFileSync(dbPath, JSON.stringify(initial, null, 2), "utf-8");
      return initial;
    }
    const data = readFileSync(dbPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading local db:", error);
    return {
      machines: [],
      tools: [],
      services: [],
      gallery: [],
      contacts: []
    };
  }
}

function writeDb(data: DbSchema) {
  try {
    writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing to local db:", error);
  }
}

export const localDb = {
  // Machines
  async getMachines() {
    const db = readDb();
    return db.machines || [];
  },

  async getMachine(id: number) {
    const db = readDb();
    return (db.machines || []).find((m) => m.id === id) || null;
  },

  async createMachine(data: any) {
    const db = readDb();
    const newMachine = {
      ...data,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    if (!db.machines) db.machines = [];
    db.machines.push(newMachine);
    writeDb(db);
    return newMachine;
  },

  async deleteMachine(id: number) {
    const db = readDb();
    if (!db.machines) db.machines = [];
    db.machines = db.machines.filter((m) => m.id !== id);
    writeDb(db);
  },

  async updateMachine(id: number, data: any) {
    const db = readDb();
    if (!db.machines) db.machines = [];
    const index = db.machines.findIndex((m) => m.id === id);
    if (index === -1) throw new Error("Machine not found");
    db.machines[index] = {
      ...db.machines[index],
      ...data,
      id,
      updatedAt: new Date().toISOString()
    };
    writeDb(db);
    return db.machines[index];
  },

  // Tools
  async getTools() {
    const db = readDb();
    return db.tools || [];
  },

  async createTool(data: any) {
    const db = readDb();
    const newTool = {
      ...data,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    if (!db.tools) db.tools = [];
    db.tools.push(newTool);
    writeDb(db);
    return newTool;
  },

  async deleteTool(id: number) {
    const db = readDb();
    if (!db.tools) db.tools = [];
    db.tools = db.tools.filter((t) => t.id !== id);
    writeDb(db);
  },

  async updateTool(id: number, data: any) {
    const db = readDb();
    if (!db.tools) db.tools = [];
    const index = db.tools.findIndex((t) => t.id === id);
    if (index === -1) throw new Error("Tool not found");
    db.tools[index] = {
      ...db.tools[index],
      ...data,
      id,
      updatedAt: new Date().toISOString()
    };
    writeDb(db);
    return db.tools[index];
  },

  // Services
  async getServices() {
    const db = readDb();
    return db.services || [];
  },

  async createService(data: any) {
    const db = readDb();
    const newService = {
      ...data,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    if (!db.services) db.services = [];
    db.services.push(newService);
    writeDb(db);
    return newService;
  },

  async deleteService(id: number) {
    const db = readDb();
    if (!db.services) db.services = [];
    db.services = db.services.filter((s) => s.id !== id);
    writeDb(db);
  },

  async updateService(id: number, data: any) {
    const db = readDb();
    if (!db.services) db.services = [];
    const index = db.services.findIndex((s) => s.id === id);
    if (index === -1) throw new Error("Service not found");
    db.services[index] = {
      ...db.services[index],
      ...data,
      id,
      updatedAt: new Date().toISOString()
    };
    writeDb(db);
    return db.services[index];
  },

  // Gallery
  async getGallery() {
    const db = readDb();
    return db.gallery || [];
  },

  async createGalleryImage(data: any) {
    const db = readDb();
    const newImage = {
      ...data,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    if (!db.gallery) db.gallery = [];
    db.gallery.push(newImage);
    writeDb(db);
    return newImage;
  },

  async deleteGalleryImage(id: number) {
    const db = readDb();
    if (!db.gallery) db.gallery = [];
    db.gallery = db.gallery.filter((g) => g.id !== id);
    writeDb(db);
  },

  // Contacts
  async getContacts() {
    const db = readDb();
    return db.contacts || [];
  },

  async createContact(data: any) {
    const db = readDb();
    const newContact = {
      ...data,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    if (!db.contacts) db.contacts = [];
    db.contacts.push(newContact);
    writeDb(db);
    return newContact;
  }
};
