const redis = require("../config/redis");

module.exports.getUserState = async (userId) => {
  const state = await redis.get(`user:${userId}:state`);
  return state || "offline";
};
