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
    callback(null, JSON.parse(data))
  })
}

/**
 * 根据id查找学生
 */
exports.findStudentById = function(id,callback){
  fs.readFile(dbPath,'utf-8',function(err,data){
    if(err){
      return callback(err)
    }
    let students = JSON.parse(data).students
    let stu = students.find(function(item){
      return item.id == id
    })
    callback(null, stu)
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
    console.log(ret)
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
    let students = JSON.parse(data).students
    student.id = parseInt(student.id)
    //当某个遍历项符合条件的时候(item.id == student.id),find会终止并且返回这个遍历项
    let stu = students.find(function (item) {
      return item.id === student.id
    })
    console.log(stu)
    for (let key in student) {
      stu[key] = student[key]
    }
    fs.writeFile(dbPath, JSON.stringify({students}),function(err){
      if(err){
        return callback(err)
      }
      callback(null)
    })
  })
}

/**
 * 删除学生
 */
exports.delete = function(id,callback){
  fs.readFile(dbPath,'utf-8',function(err,data){
    if(err){
      return callback(err)
    }
    let students = JSON.parse(data).students
    students.map(function(item,index,arr){
      if(item.id == id){
        students.splice(index,1)
        return
      }
    })
    fs.writeFile(dbPath,JSON.stringify({students}),function(err){
      if(err){
        return callback(err)
      }
    })
    callback(null)
  })
}