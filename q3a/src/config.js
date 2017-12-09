var config = {
  slidingWindow: process.env.WINDOW_SIZE,
  redisURL: process.env.REDIS_URL,
  redisKey: process.env.REDIS_KEY,
  candidates: [
    "u01",
    "u02",
    "u03",
    "u04"
  ]
}

module.exports = config;