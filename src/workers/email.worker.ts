import { Redis } from "ioredis";
import { Worker } from "bullmq";
import dotenv from "dotenv";
import sendEmail from "../utils/email/sendEmail.js";

dotenv.config();

const connection = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,
  tls: {},
});

connection.on("error", (err: any) => {
  console.log(err);
});

const emailWorker = new Worker(
  "taharah_tracker_email",
  async (job) => {
    if (job.name === "send_otp") {
      const { address, OTP } = job.data;
      sendEmail(address, OTP);
    }
  },
  { connection, removeOnComplete: { age: 60 * 20, count: 5 } }
);

emailWorker.on("completed", (job) => {
  console.log(`job ${job.id} completed`);
});

emailWorker.on("failed", (job, err) => {
  console.log(`job ${job?.id} failed`, err.message);
});
