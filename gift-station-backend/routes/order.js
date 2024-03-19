var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer');

router.post("/insert_order", function (req, res) {
    console.log(req.body)
    pool.query("insert into orders (productid, userid, order_date, order_time, payment_mode, transectionid, delivery_status, amount, quantity, order_status) values(?,?,?,?,?,?,?,?,?,?)",
        [req.body.productid,
        req.body.userid,
        req.body.order_date,
        req.body.order_time,
        req.body.paymentMode,
        req.body.transectionid,
        req.body.delivery_status, 
        req.body.totalAmount,
        req.body.quantity,
        req.body.order_status,
        ],
        function (error, result) {
            if (error) {
                console.log(error)
                res.status(500).json({ status: 0, message: "Server error....." })
            }
            else {
                res.status(200)
                    .json({ status: true, message: "order Submitted Successfully", data: result.insertId, })
            }
        }
    )
})

router.post("/show_order", function (req, res) {

    pool.query("select o.*,(select p.productname from product p where o.productid = p.productid) as product  from orders o where orderid=?",
        [req.body.orderid], function (error, result) {
            if (error) {
                res.status(500).json({ status: 0, message: 'Server Error' })
            }
            else {
                res.status(200).json({ status: true, data: result })
            }
        }
    )
})

module.exports = router;