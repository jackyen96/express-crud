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

//Express提供了一种更好的方式,专门用来包装路由
router.get('/', function (req, res) {

  Student.find(function (err, data) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.render('index.html', { students: data.students })
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
  let student = req.body
  Student.save(student, function (err) {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.redirect('/students')
  })
})

/**
 * 查看所有学生
 */
router.get('/students', function (req, res) {
  res.redirect('/')
})

/**
 * 编辑学生页面
 */
router.get('/student/edit',function(req,res){
  Student.findStudentById(parseInt(req.query.id),function(err,student){
    if(err){
      return res.status(500).send('server error')
    }
    res.render('edit.html',{student})
  })
})

/**
 * 处理编辑学生post请求
 */
router.post('/student/edit',function(req,res){
  Student.updateById(req.body,function(err){
    if(err){
      //console.log(req.body) ----> print an object and id is a int
      return res.status(500).send('Server error')
    }
    res.redirect('/')
  })
})

router.get('/student/delete',function(req,res){
  Student.delete(req.query.id,function(err){
    if(err){
      return res.status(500).send('server error')
    }
    res.redirect('/')
  })
})
module.exports = router