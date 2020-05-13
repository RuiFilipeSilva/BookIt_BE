const Router = require("express").Router;
var router = Router();
const multer = require("multer");
var upload = multer({dest: 'assets/menuImgs/'})


//Imports
const menuController = require("../controllers/menu/menuControllers");
const bookingController = require("../controllers/menu/bookingController");

router.post("/menus/add",upload.single('img'),menuController.addMenu)

router.post("/menus/type", menuController.addMenuType)

router.get("/menus/popular", menuController.orderByPopularity)

router.post("/menus/bookings/add", bookingController.newBooking)

router.put("/menus/bookings/app/:id", bookingController.approved)

router.put("/menus/bookings/ref/:id", bookingController.refuse)

router.delete("/menus/bookings/:id", bookingController.removeBooking)

router.get("/menus/", menuController.searchMenu)

router.get("/menus/bookings", bookingController.getBookings)

router.get("/menus/bookings/motive:id", bookingController.getMotive)


module.exports = router