import { Queue } from "bullmq";
import dotenv from "dotenv";

import { Redis } from "ioredis";
dotenv.config();

const connection = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,
  tls: {},
});

export const addEventQue = new Queue("check_and_add_events", { connection });
