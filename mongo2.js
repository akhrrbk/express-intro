const mongoose = require('mongoose')

if (process.argv.length < 3){
    console.log('please provide as password as an argument: node mongo.js <password>');
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://jalap:${password}@cluster0.jn9rt.mongodb.net/phonebook-database?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    name: String,
    number: String,
    date: Date,
})

const Note = mongoose.model('firstDatabase', noteSchema)

const note = new Note({
    name: name,
    number: number,
    date: new Date(),
})

if(process.argv.length === 5){
    // saving changes
    note.save().then(result => {
        console.log(`added ${name} ${number} to database`);
        mongoose.connection.close()
    })
} else if(process.argv.length === 3){
    Note.find({}).then(result => {
        console.log('here is the database');
        result.forEach(note => {
          console.log(`${note.name} ${note.number}`)
        })
        mongoose.connection.close()
      })
} else if(process.argv.length === 4){
    console.log(`phone number is missing to ${name}`)
    process.exit(1)
}