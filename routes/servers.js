const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { publishMessage } = require("../services/RabbitMq");
const prismaDB = new PrismaClient();
const router = express.Router();

const emitChangeToClients = (action, serverData) => {
  const message = { action, data: serverData };
  publishMessage(message);
};

router.get("/", async (_, res) => {
  try {
    const servers = await prismaDB.server.findMany();
    res.status(200).json({ success: true, data: servers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to fetch servers" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const server = await prismaDB.server.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!server) {
      return res
        .status(404)
        .json({ success: false, error: "Server not found" });
    }
    res.status(200).json({ success: true, data: server });
  } catch (error) {
    console.error(error);
    return res
      .status(404)
      .json({ success: false, error: "Failed to fetch server" });
  }
});

router.post("/", async (req, res) => {
  try {
    const server = await prismaDB.server.create({
      data: req.body,
    });
    emitChangeToClients("create", server);
    res.status(200).json({ success: true, data: server });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to create server" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const server = await prismaDB.server.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!server) {
      return res
        .status(404)
        .json({ success: false, error: "Server not found" });
    }

    const updatedServer = await prismaDB.server.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });

    res.status(200).json({ success: true, data: updatedServer });
  } catch (error) {
    console.error(error);
    return res
      .status(404)
      .json({ success: false, error: "Failed to update server" });
  }
});

module.exports = router;
