var express = require('express')
var router = express.Router()

router.get('/', (req, res)=>{
    res.send('birds home page')
})

router.post('/', (req,res)=> {
    res.send('this is a post method by birds directory1')
})

router.get('/about', (req, res)=>{
    res.send('about birds')
})

module.exports = router