var express = require('express')
var router = express.Router()

router.get('/', (req, res)=>{
    res.send('birds home page')
})

router.get('/about', (req, res)=>{
    res.send('about birds')
})

module.exports = router