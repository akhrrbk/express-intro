const express = require('express')
const app = express()
app.use(express.static('build'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
app.use(express.json())

const generateid = () => {
    const maxid = persons.length > 0 ? Math.max(...persons.map(p=>p.id)) : 0
    return maxid + 1
}

app.get('/', (req, res)=>{
    res.send('home page :)')
})

app.get('/api/persons/', (req, res)=>{
    res.json(persons)
})

app.get('/info/', (req, res)=>{
    const note = {
        length: persons.length,
        date: new Date(),
    }
    const data = `<div> <p>Phonebook has info of ${note.length}</p> <p>${note.date}</p> </div>`
    res.send(data)
})

// access a spefici note with id
app.get('/api/persons/:userid', (req, res)=>{
    const id = Number(req.params.userid) // lol it was passed as string first, so i kept getting an error
    // console.log(id);
    const person = persons.find(person => person.id === id)
    // console.log(person); // checking if we assigned data
    if(person){
        res.json(person)
    } else {
        res.send('data does not exist')
    }
})

// delete a specific note with id
app.delete('/api/persons/:userid', (req, res)=>{
    const id = Number(req.params.userid) // string to int
    persons = persons.filter(p=>p.id !== id)
    res.status(204).end()
})

// add new entires
app.post('/api/persons/', (req, res) =>{
    const body = req.body
    const myname = body.name
    // console.log(myname);
    const nameexist = persons.find(person => person.name === myname)
    // console.log(nameexist);
    if(nameexist){
        return res.status(400).json({error: 'name already exists :('})
    }
    if(!body.name || !body.number){
        return res.status(400).json({error: 'name missing :('})
    }
    const newperson = {
        id: generateid(),
        name: body.name,
        number: body.number,
    }
    persons = persons.concat(newperson)
    res.json(newperson)
})

// port
const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})