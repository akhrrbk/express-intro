if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
const express = require('express')
const app = express()
const Note = require('./models/note')
const cors = require('cors')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  
    next(error)
  }

const requestLogger = (request, response, next) => {
console.log('Method:', request.method)
console.log('Path:  ', request.path)
console.log('Body:  ', request.body)
console.log('---')
next()
}

app.use(requestLogger)
  
app.get('/home', (req, res) => {
    res.send('home page')
})
app.get('/api/persons', (req, res) => {
    Note.find({}).then(notes => {
      res.json(notes)
    })
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if(Object.keys(body).length < 2){
        return res.status(400).json({error: 'content missing'})
    }
    
    const note = new Note({
        name: body.name,
        number: body.number,
        date: new Date(),
    })
    
    note.save().then(savedNote => {
        res.json(savedNote)
    })
    
})

app.get('/api/persons/:id', (req, res) => {
    Note.findById(req.params.id)
        .then(note => {
            if(note){
                res.json(note)
            } else {
                res.status(404).end()
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(400).end()
        })
})

app.delete('/api/persons/:id', (req, res, next) => {
    Note.findByIdAndRemove(req.params.id)
      .then(res => {
        res.status(204).end()
      })
      .catch(error => next(error))
  })

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const note = {
        name: body.name,
        number: body.number,
    }
    Note.findByIdAndUpdate(req.params.id)
        .then(updatedNote => {
            res.json(updatedNote)
        })
        .catch(error => next(error))
    console.log('but updated the number');
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
  } 
  
app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})