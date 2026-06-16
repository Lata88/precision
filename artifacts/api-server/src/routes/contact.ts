import { Router, type IRouter } from "express";
import { SubmitContactBody } from "@workspace/api-zod";
import { localDb } from "../../../../lib/db/src/local-db";

const router: IRouter = Router();

router.get("/", async (_req, res) => {
  try {
    const contacts = await localDb.getContacts();
    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

router.post("/", async (req, res) => {
  try {
    const body = SubmitContactBody.parse(req.body);
    const contact = await localDb.createContact(body);
    res.status(201).json(contact);
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ error: "Failed to create contact" });
  }
});

export default router;
