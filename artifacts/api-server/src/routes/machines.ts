import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { machinesTable, insertMachineSchema } from "@workspace/db";
import { eq } from "drizzle-orm";
import { CreateMachineBody, GetMachineParams, DeleteMachineParams } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/", async (_req, res) => {
  const machines = await db.select().from(machinesTable).orderBy(machinesTable.createdAt);
  res.json(machines.map(m => ({ ...m, createdAt: m.createdAt.toISOString() })));
});

router.post("/", async (req, res) => {
  const body = CreateMachineBody.parse(req.body);
  const [machine] = await db.insert(machinesTable).values(body).returning();
  res.status(201).json({ ...machine, createdAt: machine.createdAt.toISOString() });
});

router.get("/:id", async (req, res) => {
  const { id } = GetMachineParams.parse({ id: Number(req.params.id) });
  const [machine] = await db.select().from(machinesTable).where(eq(machinesTable.id, id));
  if (!machine) {
    res.status(404).json({ error: "Machine not found" });
    return;
  }
  res.json({ ...machine, createdAt: machine.createdAt.toISOString() });
});

router.delete("/:id", async (req, res) => {
  const { id } = DeleteMachineParams.parse({ id: Number(req.params.id) });
  await db.delete(machinesTable).where(eq(machinesTable.id, id));
  res.status(204).send();
});

export default router;
