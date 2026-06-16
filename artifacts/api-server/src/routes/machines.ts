import { Router, type IRouter } from "express";
import { CreateMachineBody, GetMachineParams, DeleteMachineParams } from "@workspace/api-zod";
import { localDb } from "../../../../lib/db/src/local-db";

const router: IRouter = Router();

router.get("/", async (_req, res) => {
  try {
    const machines = await localDb.getMachines();
    res.json(machines);
  } catch (error) {
    console.error("Error fetching machines:", error);
    res.status(500).json({ error: "Failed to fetch machines" });
  }
});

router.post("/", async (req, res) => {
  try {
    const body = CreateMachineBody.parse(req.body);
    const machine = await localDb.createMachine(body);
    res.status(201).json(machine);
  } catch (error) {
    console.error("Error creating machine:", error);
    res.status(500).json({ error: "Failed to create machine" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = GetMachineParams.parse({ id: Number(req.params.id) });
    const machine = await localDb.getMachine(id);
    if (!machine) {
      res.status(404).json({ error: "Machine not found" });
      return;
    }
    res.json(machine);
  } catch (error) {
    console.error("Error fetching machine:", error);
    res.status(500).json({ error: "Failed to fetch machine" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = DeleteMachineParams.parse({ id: Number(req.params.id) });
    await localDb.deleteMachine(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting machine:", error);
    res.status(500).json({ error: "Failed to delete machine" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const body = CreateMachineBody.parse(req.body);
    const machine = await localDb.updateMachine(id, body);
    res.json(machine);
  } catch (error) {
    console.error("Error updating machine:", error);
    res.status(500).json({ error: "Failed to update machine" });
  }
});

export default router;
