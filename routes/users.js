var express = require('express');
var router = express.Router();

// /* GET users listing. */
// router.get('/a', function(req, res, next) {
//   console.log('this is from A');
//   // res.send('this is from a');
//   next()
// },
//   (req, res, next) => {
//     console.log('this is from b');
//     // res.send('this is from b using next()')
//     next()
//   },
//   (req, res) => {
//     console.log('this is from c');
//     res.send('this is from c using next() next()')
//   }
// );

router.get('/', (req, res)=>{
  res.send('this is GET method')
})



module.exports = router;