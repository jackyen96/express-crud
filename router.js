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
  fs.readFile('./db.json', 'utf-8', function (err, data) {
    //read的第二个参数是可选的,传入utf-8就是告诉它把读取到的文件直接按照utf-8编码转成我们认识的字符串
    //除此之外还可以使用data.toString()的方式
    Student.find(function(err,data){
      if(err){
        return res.status(500).send('Server error.')
      }
      console.log(data)
      res.render('index.html',{students:data})
    })
  })
})

router.get('/students/new', function (req,res) {
  //body...
  res.render('new.html')
})

router.post('/students/new',function(req,res){
  let student = req.body
  Student.save(student,function(err){
    if(err){
      return res.status(500).send('Server error')
    }
    res.redirect('/students')
  })
})

router.get('/students',function(req,res){
  res.redirect('/')
})

module.exports = router