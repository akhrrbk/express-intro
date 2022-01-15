const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

// processing the password from the terminal
const password = process.argv[2]

// assigning the url
const url =
  `mongodb+srv://jalap:${password}@cluster0.jn9rt.mongodb.net/notes-database?retryWrites=true&w=majority`
  
// connecting to the database
mongoose.connect(url)

// creating a new schema template
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

// jonim is a sub category insside notes-database which was defined at url!
const Note = mongoose.model('Jonim', noteSchema)

const note = new Note({
  content: 'HTML is Easy2',
  date: new Date(),
  important: true,
})

// saving changes
// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })