import { Router, type IRouter } from "express";
import { CreateToolBody, DeleteToolParams } from "@workspace/api-zod";
import { localDb } from "../../../../lib/db/src/local-db";

const router: IRouter = Router();

router.get("/", async (_req, res) => {
  try {
    const tools = await localDb.getTools();
    res.json(tools);
  } catch (error) {
    console.error("Error fetching tools:", error);
    res.status(500).json({ error: "Failed to fetch tools" });
  }
});

router.post("/", async (req, res) => {
  try {
    const body = CreateToolBody.parse(req.body);
    const tool = await localDb.createTool(body);
    res.status(201).json(tool);
  } catch (error) {
    console.error("Error creating tool:", error);
    res.status(500).json({ error: "Failed to create tool" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = DeleteToolParams.parse({ id: Number(req.params.id) });
    await localDb.deleteTool(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting tool:", error);
    res.status(500).json({ error: "Failed to delete tool" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const body = CreateToolBody.parse(req.body);
    const tool = await localDb.updateTool(id, body);
    res.json(tool);
  } catch (error) {
    console.error("Error updating tool:", error);
    res.status(500).json({ error: "Failed to update tool" });
  }
});

export default router;
