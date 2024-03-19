var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer');



router.post('/add_new_productlist', upload.any(), function (req, res, next) {
    console.log(req.body)
    console.log(req.files)
    var file_str=""
    req.files.map((item)=>{
        file_str+=item.filename+","
    })

    pool.query("insert into productlist(categoryid, subcategoryid, productid, weight, price, offerprice, discription, createdby, updatedat, createdat,image)values(?,?,?,?,?,?,?,?,?,?,?)",
        [req.body.categoryid,req.body.subcategoryid,req.body.productid,req.body.weight,req.body.price,req.body.offerprice ,req.body.discription, req.body.createdby, req.body.updatedat,req.body.createdat,file_str],
        function (error, result) {
            if (error) {
                 console.log(error)
                res.status(200).json({ status: false, message: 'Server Error.....' })
            }
            else {
                res.status(200).json({ status: true, message: 'ProductList Added Successfully....' })
            }
        })
});


router.get('/fetch_all_productlist', function (req, res, next) {
    // console.log(req.body)
    //  console.log(req.file)
    pool.query("select PL.*,(select C.categoryname from category C where C.categoryid=PL.categoryid) as category,(select s.subcategoryname from subcategory s where s.subcategoryid=PL.subcategoryid) as subcategory,(select p.productname from product p where p.productid= PL.productid) as product from gift_e_bazar.productlist PL; ",
   function (error, result) {
        if (error) {
            res.status(200).json({ status: false, message: 'Server Error.....' })
        }
        else {
            // console.log(result)
            res.status(200).json({ status: true, data: result })
        }
    })
});


module.exports = router;