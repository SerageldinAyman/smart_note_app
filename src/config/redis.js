import redis from "redis";
import logger from "../utils/logger.js";

let client;

export const connectRedis = async () => {
  client = redis.createClient({
    url: process.env.REDIS_URL,
  });

  client.on("error", (err) => {
    logger.error(`Redis error: ${err}`);
  });

  await client.connect();
  logger.info("Redis connected successfully");
};

export const getRedisClient = () => client;
