import { Redis } from "ioredis";
import { Worker } from "bullmq";
import dotenv from "dotenv";

dotenv.config();

const connection = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,
  tls: {},
});

connection.on("error", (err: any) => {
  console.log(err);
});

const emailWorker = new Worker(
  "placeholder", //replave placeholder
  async (job) => {
    //add queue logic here
  },
  { connection, removeOnComplete: { age: 60 * 20, count: 5 } }
);

placeholder.on("completed", (job) => {
  //replace placeholder
  console.log(`job ${job.id} completed`);
});

placeholder.on("failed", (job, err) => {
  //replace placeholder
  console.log(`job ${job?.id} failed`, err.message);
});
