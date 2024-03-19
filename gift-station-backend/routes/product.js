var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

router.post('/add_new_product', upload.single('picture'), function (req, res, next) {
    // console.log(req.body)
    // console.log(req.file)
    pool.query("insert into product(categoryid, subcategoryid, productname, description, picture, status, trending, deals, price_type, createdat, updatedat, createdby)values(?,?,?,?,?,?,?,?,?,?,?,?)",
        [req.body.categoryid,
        req.body.subcategoryid,
        req.body.productname,
        req.body.description,
        req.file.originalname,
        req.body.status,
        req.body.trending,
        req.body.deals,
        req.body.price_type,
        req.body.createdat,
        req.body.updatedat,
        req.body.createdby,
    ],
        function (error, result) {
            if (error) {
                console.log(error)
                res.status(200).json({ status: false, message: 'Server Error.....' })
            }
            else {
                console.log(result)
                res.status(200).json({ status: true, message: 'product added Successfully....' })
            }
        })
});

router.post('/fetch_all_subcategories', function(req, res, next) {
    pool.query("select * from subcategory where categoryid=?",[req.body.categoryid],function(error,result){
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

router.get('/fetch_all_product', function (req, res, next) {
    // console.log(req.body)
    //  console.log(req.file)
    pool.query("select p.*,(select c.categoryname from category c where c.categoryid=p.categoryid) as category,(select sc.subcategoryname from subcategory sc where sc.subcategoryid=p.subcategoryid) as subcategory from product p", function (error, result) {
        if (error) {
            res.status(200).json({ status: false, message: 'Server Error.....' })
        }
        else {
            // console.log(result)
            res.status(200).json({ status: true, data: result })
        }
    })
});


router.post('/edit_product', function (req, res, next) {
    // console.log(req.body)
    // console.log(req.file)
    pool.query
    ("update product set categoryid=?,subcategoryid=?,productname=?,description=?,status=?,trending=?,deals=?,price_type=?,updatedat=?,createdby=? where productid=?",
        [req.body.categoryid,
        req.body.subcategoryid,
        req.body.productname,
        req.body.description,
        req.body.status,
        req.body.trending,
        req.body.deals,
        req.body.price_type,
        req.body.updatedat,
        req.body.createdby,
        req.body.productid,
    ],
        function (error, result) {
            if (error) {
                console.log(error)
                res.status(200).json({ status: false, message: 'Server Error.....' })
            }
            else {
                // console.log(result)
                res.status(200).json({ status: true, message: 'product Updated Successfully....' })
            }
        })
});

router.post('/delete_product', function (req, res, next) {
    // console.log(req.body)
   
    pool.query("delete from product  where productid=?",
        [ req.body.productid],
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

  router.post('/edit_product_logo',upload.single('picture'), function (req, res, next) {
    // console.log(req.body)
    // console.log(req.file)
   
    pool.query("update product set picture=? where productid=?",
        [req.file.originalname, req.body.productid],
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

  router.post('/fetch_all_products', function(req, res, next) {
    pool.query("select * from product where subcategoryid=?",[req.body.subcategoryid],function(error,result){
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
  

module.exports = router;
