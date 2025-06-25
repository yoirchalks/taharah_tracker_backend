import { Redis } from "ioredis";
import { Worker } from "bullmq";
import dotenv from "dotenv";
import { prisma } from "../startup/prismaClient.js";

dotenv.config();

const connection = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,
  tls: {},
});

connection.on("error", (err: any) => {
  console.log(err);
});

const eventWorker = new Worker(
  "taharah_tracker_events",
  async (job) => {
    if (job.name === "add_event") {
    }
  },
  { connection, removeOnComplete: { age: 60 * 20, count: 5 } }
);

eventWorker.on("completed", (job) => {
  console.log(`job ${job.id} completed`);
});

eventWorker.on("failed", (job, err) => {
  console.log(`job ${job?.id} failed`, err.message);
});
