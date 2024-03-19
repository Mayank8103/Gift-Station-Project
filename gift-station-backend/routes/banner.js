var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

router.post('/add_new_banner', upload.any(), function (req, res, next){
    // console.log(req.body)
    // console.log(req.file)
    var file_str=""
    req.files.map((item)=>{
        file_str+=item.filename+","
    })
    
    pool.query("insert into banner(image, status) values(?,?)", [file_str,req.body.status], 
   
    function(error,result){
          if(error){
            console.log(error)
            res.status(500).json({ status: false, message: 'Server Error.....' })
          }
         else{
           
            res.status(200).json({ status: true, message: 'banner added Successfully....' })
         }
     }
    
    )
})

router.get('/fetch_banner_images', function (req, res, next){
    pool.query("select * from banner",  function(error,result){
          if(error){
            console.log(error)
            res.status(500).json({ status: false, data:[] })
          }
         else{
           
            res.status(200).json({ status: true, data:result })
         }
     }
    
    )
})





module.exports = router;