var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer');



router.post('/add_new_category', upload.single('logo'), function (req, res, next) {
    // console.log(req.body)
    // console.log(req.file)
    pool.query("insert into category(categoryname,discription,categoryicon,status,created_at,created_by,updated_at)values(?,?,?,?,?,?,?)",
        [req.body.categoryname, req.body.discription, req.file.originalname, req.body.status, req.body.createdat, req.body.createdby, req.body.updatedat],
        function (error, result) {
            if (error) {
                // console.log("xxxx", error)
                res.status(200).json({ status: false, message: 'Server Error.....' })
            }
            else {
                res.status(200).json({ status: true, message: 'Category Added Successfully....' })
            }
        })
});


router.get('/fetch_all_category', function(req, res, next) {
    pool.query("select * from category",function(error,result){
       if(error){
          res.status(200).json({status:false, message:'Server Error.....'})
       }
         else{
          res.status(200).json({status:true,data:result})
         }
    } )
  });


  router.get('/fetch_Category', function(req, res, next) {
    pool.query("select * from category",function(error,result){
       if(error){
        console.log(error)
          res.status(200).json({status:false, message:'Server Error.....'})
       }
         else{
          res.status(200).json({status:true,data:result})
         }
    } )
  });

  router.post('/edit_category_data', function (req, res, next) {
    console.log(req.body)
   
    pool.query("update category set categoryname=?,discription=?,status=?,created_by=?,updated_at=? where categoryid=?",
        [req.body.categoryname, req.body.discription, req.body.status, req.body.createdby, req.body.updatedat, req.body.categoryid],
        function (error, result) {
            if (error) {
                console.log( error)
                res.status(200).json({ status: false, message: 'Server Error.....' })
            }
            else {
                res.status(200).json({ status: true, message: 'Category Updated Successfully....' })
            }
        })
});

router.post('/edit_category_logo',upload.single('logo'), function (req, res, next) {
    console.log(req.body)
   
    pool.query("update category set categoryicon=? where categoryid=?",
        [req.file.originalname, req.body.categoryid],
        function (error, result) {
            if (error) {
                console.log( error)
                res.status(200).json({ status: false, message: 'Server Error.....' })
            }
            else {
                res.status(200).json({ status: true, message: 'Category Updated Successfully....' })
            }
        })
});

router.post('/delete_category_data', function (req, res, next) {
    console.log(req.body)
   
    pool.query("delete from category  where categoryid=?",
        [ req.body.categoryid],
        function (error, result) {
            if (error) {
                console.log( error)
                res.status(200).json({ status: false, message: 'Server Error.....' })
            }
            else {
                res.status(200).json({ status: true, message: 'Category Deleted Successfully....' })
            }
        })
});

module.exports = router;