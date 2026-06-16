import { Router, type IRouter } from "express";
import { CreateGalleryImageBody, DeleteGalleryImageParams } from "@workspace/api-zod";
import { localDb } from "../../../../lib/db/src/local-db";

const router: IRouter = Router();

router.get("/", async (_req, res) => {
  try {
    const images = await localDb.getGallery();
    res.json(images);
  } catch (error) {
    console.error("Error fetching gallery:", error);
    res.status(500).json({ error: "Failed to fetch gallery" });
  }
});

router.post("/", async (req, res) => {
  try {
    const body = CreateGalleryImageBody.parse(req.body);
    const image = await localDb.createGalleryImage(body);
    res.status(201).json(image);
  } catch (error) {
    console.error("Error creating gallery image:", error);
    res.status(500).json({ error: "Failed to create gallery image" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = DeleteGalleryImageParams.parse({ id: Number(req.params.id) });
    await localDb.deleteGalleryImage(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting gallery image:", error);
    res.status(500).json({ error: "Failed to delete gallery image" });
  }
});

export default router;
