import { Redis } from "ioredis";
import { Worker } from "bullmq";
import dotenv from "dotenv";
import { prisma } from "../startup/prismaClient.js";
import updateUserStatus from "../utils/updateUserStatus.js";

dotenv.config();

const connection = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,
  tls: {},
});

connection.on("error", (err: any) => {
  console.log(err);
});

const eventWorker = new Worker(
  "taharah_tracker_periods",
  async (job) => {
    if (job.name === "set_user_status") {
      const { usersId, requiredStatus } = job.data;
      updateUserStatus(usersId, requiredStatus);
    }
  },
  { connection, removeOnComplete: { age: 60 * 20, count: 5 } }
);

eventWorker.on("completed", (job) => {
  console.log(`job ${job.name} completed`);
});

eventWorker.on("failed", (job, err) => {
  console.log(`job ${job?.name} failed`, err.message);
});
