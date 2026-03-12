import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { servicesTable } from "@workspace/db";
import { CreateServiceBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/", async (_req, res) => {
  const services = await db.select().from(servicesTable).orderBy(servicesTable.createdAt);
  res.json(services.map(s => ({ ...s, createdAt: s.createdAt.toISOString() })));
});

router.post("/", async (req, res) => {
  const body = CreateServiceBody.parse(req.body);
  const [service] = await db.insert(servicesTable).values(body).returning();
  res.status(201).json({ ...service, createdAt: service.createdAt.toISOString() });
});

export default router;
