const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

console.log('connecting to', url);
mongoose.connect(url)
  .then(result => {
    console.log('connected to mongoDB')
  })
  .catch((error) => {
    console.log('error connectign to MongoDB', error.message)
  })

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      // delete returnedObject.date
  }
  })

module.exports = mongoose.model('firstDatabase', noteSchema)

