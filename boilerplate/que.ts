import dotenv from "dotenv";
import { Queue } from "bullmq";
import { Redis } from "ioredis";

dotenv.config();

const connection = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,
  tls: {},
});

export const placeholder = new Queue("placeholder", { connection }); //replace placeholder
