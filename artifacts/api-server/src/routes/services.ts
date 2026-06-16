import { Router, type IRouter } from "express";
import { CreateServiceBody } from "@workspace/api-zod";
import { localDb } from "../../../../lib/db/src/local-db";

const router: IRouter = Router();

router.get("/", async (_req, res) => {
  try {
    const services = await localDb.getServices();
    res.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

router.post("/", async (req, res) => {
  try {
    // Parse the body manually to include imageUrl
    const body = {
      title: req.body.title,
      description: req.body.description,
      icon: req.body.icon,
      details: req.body.details,
      imageUrl: req.body.imageUrl || null
    };
    
    const service = await localDb.createService(body);
    res.status(201).json(service);
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ error: "Failed to create service" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await localDb.deleteService(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ error: "Failed to delete service" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const body = {
      title: req.body.title,
      description: req.body.description,
      icon: req.body.icon,
      details: req.body.details,
      imageUrl: req.body.imageUrl || null
    };
    const service = await localDb.updateService(id, body);
    res.json(service);
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ error: "Failed to update service" });
  }
});

export default router;
