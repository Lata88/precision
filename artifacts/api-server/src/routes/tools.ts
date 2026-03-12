import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { toolsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { CreateToolBody, DeleteToolParams } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/", async (_req, res) => {
  const tools = await db.select().from(toolsTable).orderBy(toolsTable.createdAt);
  res.json(tools.map(t => ({ ...t, createdAt: t.createdAt.toISOString() })));
});

router.post("/", async (req, res) => {
  const body = CreateToolBody.parse(req.body);
  const [tool] = await db.insert(toolsTable).values(body).returning();
  res.status(201).json({ ...tool, createdAt: tool.createdAt.toISOString() });
});

router.delete("/:id", async (req, res) => {
  const { id } = DeleteToolParams.parse({ id: Number(req.params.id) });
  await db.delete(toolsTable).where(eq(toolsTable.id, id));
  res.status(204).send();
});

export default router;
