const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

console.log('connecting to', url);
mongoose.connect(url).then(result => {console.log('connected to mongoDB')}).catch((error) => { console.log('error connectign to MongoDB', error.message)})

// const url =
//   'mongodb+srv://fullstack:sekred@cluster0-ostce.mongodb.net/note-app?retryWrites=true'

if (process.argv.length < 3){
  console.log('please provide as password as an argument: node mongo.js <password>');
  process.exit(1)
}

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
})

// this line deletes some of the lines in our json file. also executes JSON.stringify
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      // delete returnedObject.date
  }
  })

module.exports = mongoose.model('firstDatabase', noteSchema)


