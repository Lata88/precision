import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { galleryTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { CreateGalleryImageBody, DeleteGalleryImageParams } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/", async (_req, res) => {
  const images = await db.select().from(galleryTable).orderBy(galleryTable.createdAt);
  res.json(images.map(i => ({ ...i, createdAt: i.createdAt.toISOString() })));
});

router.post("/", async (req, res) => {
  const body = CreateGalleryImageBody.parse(req.body);
  const [image] = await db.insert(galleryTable).values(body).returning();
  res.status(201).json({ ...image, createdAt: image.createdAt.toISOString() });
});

router.delete("/:id", async (req, res) => {
  const { id } = DeleteGalleryImageParams.parse({ id: Number(req.params.id) });
  await db.delete(galleryTable).where(eq(galleryTable.id, id));
  res.status(204).send();
});

export default router;
