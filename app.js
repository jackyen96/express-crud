let express = require('express')
let app = express()
let router = require('./router.js')
let bodyParser = require('body-parser')

app.engine('html', require('express-art-template'))
//开放静态资源
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))


app.use(bodyParser.urlencoded({ extended: false}))
//parse application/json
app.use(bodyParser.json())

//把路由容器挂载到app上
app.use(router)

app.use(function(req,res){
  //所有未处理的请求路径都会到这里来
  //404
})

app.listen(3000, function () {
  console.log('running at port 3000')
})