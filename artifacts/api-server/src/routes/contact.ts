import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { contactsTable } from "@workspace/db";
import { SubmitContactBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/", async (_req, res) => {
  const contacts = await db.select().from(contactsTable).orderBy(contactsTable.createdAt);
  res.json(contacts.map(c => ({ ...c, createdAt: c.createdAt.toISOString() })));
});

router.post("/", async (req, res) => {
  const body = SubmitContactBody.parse(req.body);
  const [contact] = await db.insert(contactsTable).values(body).returning();
  res.status(201).json({ ...contact, createdAt: contact.createdAt.toISOString() });
});

export default router;
