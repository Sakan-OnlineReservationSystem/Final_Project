// const Redis = require("redis");
// const { REDIS_Cached_ExpireIn } = process.env;

// const client = Redis.createClient({
//   password: "iwugvgf4syKDlTgBtS68SeqBBMKRmV8l",
//   socket: {
//     host: "redis-18863.c10.us-east-1-4.ec2.redns.redis-cloud.com",
//     port: 18863,
//   },
// });

// client.connect(console.log("Connected to redis")).catch(console.error);

// exports.getOrSetCache = async (key, func) => {
//   const cachedData = await client.get(key);
//   if (cachedData) {
//     console.log("Cached");
//     return JSON.parse(cachedData);
//   } else {
//     console.log("Not Cached");
//     const data = await func();
//     await client.setEx(key, REDIS_Cached_ExpireIn, JSON.stringify(data));
//     return data;
//   }
// };

// exports.deleteCache = async (key) => {
//   await client.del(key);
// };

// exports.setCache = async (key, value) => {
//   await client.setEx(key, REDIS_Cached_ExpireIn, JSON.stringify(value));
// };
