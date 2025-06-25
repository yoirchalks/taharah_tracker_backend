import { Queue } from "bullmq";
import dotenv from "dotenv";

import { Redis } from "ioredis";
dotenv.config();

const connection = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,
  tls: {},
});

export const addEventQue = new Queue("taharah_tracker_events", { connection });
