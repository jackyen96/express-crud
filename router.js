let fs = require('fs')

let express = require('express')

let Student = require('./student')

//1.创建一个路由容器
let router = express.Router()

//这样也不够好,
// module.exports = function (app) {

//   app.get('/', function (req, res) {
//     fs.readFile('./db.json', 'utf-8', function (err, data) {
//       //read的第二个参数是可选的,传入utf-8就是告诉它把读取到的文件直接按照utf-8编码转成我们认识的字符串
//       //除此之外还可以使用data.toString()的方式
//       if (err) {
//         return res.status(500).send('Server error.')
//       }
//       let students = JSON.parse(data)
//       res.render('index.html', students)
//     })
//   })

//   app.get('/students/new', function (argument) {
//     //body...
//   })

// }


router.get('/', function (req, res) {

  let query = Student.find(null, { id: 1, name: 1, gender: 1, age: 1, hobbies: 1 })
  query.lean()
  query.exec(function (err, data) {
    if (err) {
      return console.log(err)
    }
    res.render('index.html', { students: data })
  })
})

/**
 * 新建学生页面
 */
router.get('/students/new', function (req, res) {
  //body...
  res.render('new.html')
})

/**
 * 处理新建学生post请求
 */
router.post('/students/new', function (req, res) {

  new Student(req.body).save(function (err) {
    if (err)
      return res.status(500).send('server error')
    res.redirect('/')
  })
})

/**
 * 查看所有学生
 */
router.get('/students', function (req, res) {
  res.redirect('/')
})

/**
 * 渲染编辑学生页面
 */
router.get('/student/edit', function (req, res) {
  let reg = new RegExp('"', 'g')
  let query = Student.find({ _id: req.query.id.replace(reg, '') })
  console.log(req.query.id.replace(reg, ''))
  query.lean()
  query.exec(function (err, data) {
    if (err) {
      return res.status(500).semd('server error')
    }
    res.render('edit.html', { student: data[0] })
  })
})

/**
 * 处理编辑学生post请求
 */
router.post('/student/edit', function (req, res) {
  let reg = new RegExp('"', 'g')
  Student.findByIdAndUpdate( req.body.id.replace(reg, ''),req.body,function(err){
    if(err)
    return res.status(500).send('server error')
    res.redirect('/')
  })
})

router.get('/student/delete', function (req, res) {
  Student.findByIdAndRemove( req.query.id.replace(new RegExp('"','g'),''),function(err){
    if(err)
    return res.status(500).send('server error')
    res.redirect('/')
  })
})
module.exports = router