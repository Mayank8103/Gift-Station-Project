var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')


router.post('/add_new_address', function (req, res, next) {
    // console.log(req.body)
    // console.log(req.file)
    pool.query("insert into useraddress (userid,fullname, mobile_number, address, apartment, state, city, zipcode, country) values(?,?,?,?,?,?,?,?,?) ",
    [req.body.userid,req.body.fullname, req.body.mobilenumber, req.body.address,req.body.apartment, req.body.state, req.body.city, req.body.zipcode, req.body.country],
    function(error,result){
        if(error){
            res.status(500).json({ status:0, message: 'Server Error.....' })
        }
        else{
            res.status(200).json({ status:true, message: 'Address Added Successfully' })
        }
    })
})



router.post('/check_user_address', function (req, res, next) {
    // console.log(req.body)
    // console.log(req.file)
    pool.query("select * from useraddress where mobile_number=?",
        [req.body.mobilenumber],
        function (error, result) {
            if (error) {
                console.log("xxxx", error)
                res.status(500).json({ status:0, message: 'Server Error.....' })
            }
            else{
                if(result.length==0){
                    console.log("yyyy", result)
                    res.status(200).json({ status:0, message: 'Server Error.....' })
                }
                else{
                    console.log("yyyy", result)
                    res.status(200).json({ status:1,data:result })
                }
            }
        })
    })



router.post('/add_new_user', function (req, res, next) {
    // console.log(req.body)
    // console.log(req.file)
    pool.query("select * from userdata where mobile_number=?",
        [req.body.mobilenumber],
        function (error, result) {
            if (error) {
                // console.log("xxxx", error)
                res.status(500).json({ status:0, message: 'Server Error.....' })
            }
            else {
                if(result.length ==1)
                {
                    res.status(200).json({ status:1, message: 'User Added Successfully..',data:result })
                }
                else{

                    pool.query("insert into userdata (name,mobile_number) value(?,?)", [req.body.name,req.body.mobilenumber],function(err,reslt){
                        if(err){
                            console.log("xxxx", err)
                            res.status(200).json({ status:0, message: 'Server Error.....' })
                        }
                        else{
                            console.log("Result", reslt)
                            res.status(200).json({ status:2, message: 'User Added Successfully..',data:[{userid:reslt.insertId,mobilenumber:req.body.mobilenumber}] })
                        }
                    }    
                    )
                }     
            }
        })
});



router.get('/fetch_category_data', function (req, res, next) {
    pool.query("select * from category",
        function (error, result) {
            if (error) {
                console.log(error)
                res.status(500).json({ status: false, data: [] })
            }
            else {

                res.status(200).json({ status: true, data: result })
            }
        }

    )
})

router.get('/fetch_subcategory_data', function (req, res, next) {
    pool.query("select * from subcategory",
        function (error, result) {
            if (error) {
                console.log(error)
                res.status(500).json({ status: false, data: [] })
            }
            else {

                res.status(200).json({ status: true, data: result })
            }
        }

    )
})
router.get('/fetch_trending_product_data', function (req, res, next) {
    pool.query("select * from product where trending='yes' ",
    function (error, result) {
            // console.log(req.query.file)
            // console.log(req.query.data)
            if (error) {
                console.log(error)
                res.status(500).json({ status: false, data: [] })
            }
            else {

                res.status(200).json({ status: true, data: result })
            }
        }

    )
})

router.get('/fetch_deals_product_data', function (req, res, next) {
    pool.query("select * from product where deals='yes' ",
    function (error, result) {
            // console.log(req.query.file)
            // console.log(req.query.data)
            if (error) {
                console.log(error)
                res.status(500).json({ status: false, data: [] })
            }
            else {

                res.status(200).json({ status: true, data: result })
            }
        }

    )
})


router.get('/fetch_ourspecial_data', function (req, res, next) {
    pool.query("select * from subcategory where categoryid=20 ",
    function (error, result) {
            // console.log(req.query.file)
            // console.log(req.query.data)
            if (error) {
                console.log(error)
                res.status(500).json({ status: false, data: [] })
            }
            else {

                res.status(200).json({ status: true, data: result })
            }
        }

    )
})

router.post('/fetch_subcategory_data', function (req, res, next) {
    console.log(req.body)
    pool.query("select s.*,(select c.categoryname from category c where c.categoryid= s.categoryid) as category from subcategory s where categoryid=? ",
    [req.body.categoryid],
    function (error, result) {
            // console.log(req.query.file)
            // console.log(req.query.data)
            if (error) {
                console.log(error)
                res.status(500).json({ status: false, data: [] })
            }
            else {

                res.status(200).json({ status: true, data: result })
            }
        }

    )
})

router.post('/fetch_product_data', function (req, res, next) {
    // pool.query("select pl.*,(select p.picture from product p where p.productid=pl.productid) as picture,(select p.productname from product p where p.productid=pl.productid) as productname,(select p.price_type from product p where p.productid=pl.productid) as pricetype from productlist pl where subcategoryid=?",
    pool.query("select  * from product p where subcategoryid=? ",
    [req.body.subcategoryid],
    function (error, result) {
            
            if (error) {
                console.log(error)
                res.status(500).json({ status: false, data: [] })
            }
            else {

                res.status(200).json({ status: true, data: result })
            }
        }
    )
})


router.post('/fetch_all_product_data', function (req, res, next) {
    pool.query("select pl.*,(select p.picture from product p where p.productid=pl.productid) as picture,(select p.productname from product p where p.productid=pl.productid) as productname,(select p.price_type from product p where p.productid=pl.productid) as pricetype from productlist pl where productid=?",
    // pool.query("select  * from product p where subcategoryid=? ",
    [req.body.productid],
    function (error, result) {
            
            if (error) {
                console.log(error)
                res.status(500).json({ status: false, data: [] })
            }
            else {

                res.status(200).json({ status: true, data: result })
            }
        }
    )
})

router.post('/fetch_productlist_data', function (req, res, next) {
    query="select pl.*,(select p.picture from product p where p.productid=pl.productid) as picture,(select p.productname from product p where p.productid=pl.productid) as productname,(select p.description from product p where p.productid=pl.productid) as dis,(select p.price_type from product p where p.productid=pl.productid) as pricetype from productlist pl where productid=?"
    pool.query(query,
    
    [req.body.productid],
    
    function (error, result) {
            if (error) {
                console.log(error)
                res.status(500).json({ status: false, data: [] })
            }
             else {
               console.log(result)
                res.status(200).json({ status: true, data: result })
            }
        }
    )
})






module.exports = router;