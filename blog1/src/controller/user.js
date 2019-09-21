const { exec } = require('../db/mysql')

const loginCheck = async (username, password) => {
  const sql = `
    select username, realname from users where username='${username}' and password='${password}'
  `
  const [user = {}] = await exec(sql)
  return user
}

module.exports = {
  loginCheck,
}
