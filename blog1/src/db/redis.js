const redis = require('redis')
const {
  REDIS_CONF: { host, port },
} = require('../conf/db')

// 创建客户端
const redisClient = redis.createClient(port, host)

redisClient.on('error', err => {
  console.error(err)
})

function set(key, val) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  return redisClient.set(key, val)
}

function get(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        return reject(val)
      }

      try {
        resolve(JSON.parse(val))
      } catch (error) {
        resolve(val)
      }
    })
  })
}

module.exports = {
  get,
  set,
}
