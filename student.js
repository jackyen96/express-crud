let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/cruddemo',{ useMongoClient: true})
let Schema = mongoose.Schema

let studentSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  gender:{
    type: Number,
    enum: [0,1],
    default: 0
  },
  age: {
    type: Number,
  },
  hobbies: {
    type: String
  }
})

module.exports = mongoose.model('Student', studentSchema)