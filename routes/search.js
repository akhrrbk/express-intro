var express = require('express')
var router = express.Router()

router.get('/', (req, res)=>{
    const {q, color} = req.query
    if(!q){
        res.send('nothing here')
    }
    res.send(`${q} ${color} was the search input `)
})

module.exports = router