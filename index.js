const express = require('express')
const app = express()

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2019-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2019-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2019-05-30T19:20:14.298Z",
      important: true
    }
]

app.use(express.json())

const generateid = () => {
    const maxid = notes.lengh > 0 ? Math.max(...notes.map(n=>n.id)) : 0
    return maxid + 1
}

app.get('/', (req, res)=>{
    res.send(`<h1>this is the home page!!! ${data} <3</h1>`)
})

app.get('/api/notes', (req, res)=>{
    res.json(notes)
})

app.get('/api/notes/:userid', (req, res)=>{
    const id = Number(req.params.userid)
    // console.log(`this was requested '${data}'`);
    const note = notes.find(note => note.id === id)
    if(note){
        res.json(note) 
    } else {
        res.send('data does not exist')
    }
})

app.delete('/api/notes/:userid', (req, res)=>{
    const id = Number(req.params.userid)
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
})

app.post('/api/notes', (req, res)=>{
    const body = request.body
    // console.log(body);
    if(!body.content){
        return res.status(400).json({error: 'content missing :('})
    }
    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateid(),
    }

    notes = notes.concat(note)
    res.json(note)
})

const PORT = 3002
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})