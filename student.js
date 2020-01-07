/**
 * 数据操作文件模块
 * 负责对文件中的数据进行操作
 */
let fs = require('fs')
let dbPath = './db.json'

/**
 * 获取所有学生列表
 */
exports.find = function (callback) {
  fs.readFile(dbPath, function (err, data) {
    if (err) {
      return callback(err)
    }
    callback(null, JSON.parse(data).students)
  })
}

/**
 * 添加保存学生
 */
exports.save = function (student, callback) {
  fs.readFile(dbPath, 'utf-8', function (err, data) {
    if (err) {
      return callback(err)
    }
    let students = JSON.parse(data).students

    student.id = students[students.length - 1].id + 1

    students.push(student)
    let ret = JSON.stringify({
      students: students
    })
    fs.writeFile(dbPath, ret, function (err) {
      if (err) {
        return callback(err)
      }
      //成功就没有错误,所以错误对象是null
      callback(null)
    })
  })
}

/**
 * 更新学生
 */
exports.updateById = function (student, callback) {
  fs.readFile(dbPath, 'utf-8', function (err, data) {
    if (err) {
      return callback(err)
    }
    let students = JSON.parse(data).student
    //当某个遍历项符合条件的时候(item.id == student.id),find会终止并且返回这个遍历项
    stu = students.find(function (item) {
      return item.id == student.id
    })
    for (let key in student) {
      stu[key] = student[key]
    }
    fs.writeFile(dbPath, JSON.stringify(students))
  })
}

/**
 * 删除学生
 */