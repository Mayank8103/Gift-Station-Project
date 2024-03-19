var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')


router.post('/add_new_subcategory', upload.single('logo'), function (req, res, next) {
    // console.log(req.body)
    // console.log(req.file)
    pool.query("insert into subcategory(categoryid,subcategoryname,discription,subcategoryicon,createdat,updatedat,updateby,status)values(?,?,?,?,?,?,?,?)",
        [req.body.categoryid,req.body.subcategoryname,req.body.discription,req.file.originalname,req.body.createdat,req.body.updatedat,req.body.createdby, req.body.status,],
        function (error, result) {
            if (error) {
                // console.log("xxxx"+ error)
                res.status(500).json({ status: false, message: 'Server Error.....' })
            }
            else {
                res.status(200).json({ status: true, message: 'subcategory added Successfully....' })
            }
        })
});


router.get('/fetch_all_categories', function(req, res, next) {
    pool.query("select s.*,(select c.categoryname from company c where c.categoryid=s.categoryid) as category from subcategory s",function(error,result){
       if(error){
          res.status(500).json({status:false, message:'Server Error.....'})
       }
         else{
            // console.log(result)
          res.status(200).json({status:true,data:result})
         }
    } )
  });


  router.get('/fetch_all_subcategories', function(req, res, next) {
    pool.query("select s.*,(select c.categoryname from category c where c.categoryid=s.categoryid) as category from subcategory s",function(error,result){
       if(error){
        console.log(error)
          res.status(500).json({status:false, message:'Server Error.....'})
       }
         else{
            // console.log(result)
          res.status(200).json({status:true,data:result})
         }
    } )
  });



  router.post('/edit_subcategory', upload.single('logo'), function (req, res, next) {
    // console.log(req.body)
    // console.log(req.file)
    pool.query("update subcategory set categoryid=?,subcategoryname=?,discription=?,updatedat=?,updateby=?,status=? where subcategoryid=?",
        [req.body.categoryid,req.body.subcategoryname,req.body.discription,req.body.updatedat,req.body.createdby, req.body.status,req.body.subcategoryid],
        function (error, result) {
            if (error) {
                // console.log("xxxx"+ error)
                res.status(500).json({ status: false, message: 'Server Error.....' })
            }
            else {
                res.status(200).json({ status: true, message: 'subcategory added Successfully....' })
            }
        })
});


router.post('/edit_subcategory_logo',upload.single('logo'), function (req, res, next) {
  console.log(req.body)
  console.log(req.file)
 
  pool.query("update subcategory set subcategoryicon=? where subcategoryid=?",
      [req.file.originalname, req.body.subcategoryid],
      function (error, result) {
          if (error) {
              console.log( error)
              res.status(200).json({ status: false, message: 'Server Error.....' })
          }
          else {
              res.status(200).json({ status: true, message: 'SubCategory Logo Successfully....' })
          }
      })
});


router.post('/delete_subcategory_data', function (req, res, next) {
  console.log(req.body)
 
  pool.query("delete from subcategory  where subcategoryid=?",
      [ req.body.subcategoryid],
      function (error, result) {
          if (error) {
              console.log( error)
              res.status(200).json({ status: false, message: 'Server Error.....' })
          }
          else {
              res.status(200).json({ status: true, message: 'SubCategory Deleted Successfully....' })
          }
      })
});

module.exports = router;
