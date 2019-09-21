const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`

  // 返回promise
  return exec(sql)
}

const getDetail = async id => {
  const sql = `select * from blogs where id=${id}`
  // 查询返回的是数组
  const [detail] = await exec(sql)
  return detail
}

const newBlog = async (blogData = {}) => {
  const { title, content, author } = blogData
  const createTime = Date.now()
  const sql = `
    insert into blogs (title, content, createTime, author)
    values ('${title}', '${content}', ${createTime}, '${author}')
  `
  // 返回insertId
  const insertData = await exec(sql)
  return {
    id: insertData.insertId,
  }
}

const updateBlog = async (id, blogData = {}) => {
  const { title, content } = blogData
  const sql = `update blogs set title='${title}', content='${content}' where id = ${id}`
  const result = await exec(sql)
  return result.affectedRows === 1
}

const deleteBlog = async (id, author) => {
  const sql = `delete from blogs where id = ${id} and author='${author}'`
  const result = await exec(sql)
  return result.affectedRows === 1
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog,
}
