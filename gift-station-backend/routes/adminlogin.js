var express = require('express');
var router = express.Router();
var pool = require("./pool")

var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

router.get("/adminlogin", function (req, res, next) {
  res.render("adminlogin", { message: "" })
}); 

router.get("/adminlogout", function (req, res, next) {
  localStorage.clear()
  res.render("adminlogin", { message: "" })
});
router.post("/checkpassword", function (req, res, next) {
    console.log(req.body)
  pool.query(
    "select * from gift_e_bazar.admin where (emailaddress=? or mobilenumber=?) and password=? ",
    [req.body.emailaddress, req.body.emailaddress, req.body.password],
    function (error, result) {
        console.log(result)
      if (error) {
        console.log(error)
        res.status(200).json({ status: true, message: "Server Error" })
      }
      else {
        if (result.length == 1) {
          console.log(result)
          localStorage.setItem("ADMIN",JSON.stringify(result[0]))
          res.status(200).json({data:result[0], status: true, message: 'Login SuccessFully...'})
        }
        else {
            res.status(200).json({ status:false, message: 'Invalid EmailAddress And Password...'})
        
        }
      }
    })
});
module.exports = router;
