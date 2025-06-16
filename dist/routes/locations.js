import express from "express";
import { prisma } from "../utils/prismaClient.js";
const router = express.Router();
router.get("/", async (req, res) => {
    const locations = await prisma.locations.findMany();
    res.send(locations);
});
router.post("/", async (req, res) => {
    const { location, code } = req.body;
    if (typeof location != "string" && typeof code != "number") {
        res.status(404).send("location must be  string and code must be number");
        return;
    }
    const newLocation = await prisma.locations.create({
        data: {
            code,
            location,
        },
    });
    res.send(newLocation);
});
export default router;
