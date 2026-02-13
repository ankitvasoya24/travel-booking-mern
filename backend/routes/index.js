const express = require('express');
const packagecontroller = require('../controller/packageController');
const destinations = require('../controller/Destinationcontroller');
const hotelcontroller = require('../controller/Hotelscontroller');
const flightController = require("../controller/Flightscontroller");
const userController = require('../controller/userController');
const adminController = require("../controller/admincontroller");
const router = express.Router();
const authMiddleware = require("../middleware/userMiddleware");
const verifyAdminToken = require('../middleware/adminMiddleware');
const bookingController = require("../controller/Bookingcon");

//admin
router.post("/admin/create", adminController.createAdmin);
router.post('/admin/adminlogin', adminController.adminLogin);
router.get('/admin/getadmin', verifyAdminToken, adminController.getadmin);
router.delete('/admin/delete/:id', verifyAdminToken, adminController.deleteAdmin);

//user
router.post('/user/signup', userController.signup);
router.post('/user/login', userController.login);
router.get('/user/getuser',authMiddleware, userController.getUsers);

router.get('/admin/getuser',verifyAdminToken, userController.getUsers);
router.get('/admin/getadmin', verifyAdminToken, userController.getUsers);

router.delete('/user/delete/:id', authMiddleware, userController.deleteUser);

//Package
router.post('/package/create', packagecontroller.createPackage);
router.get('/package/getall', packagecontroller.getAllPackages);
router.get('/package/:id', packagecontroller.getPackageById);
router.put('/package/update/:id', packagecontroller.updatePackage);
router.delete('/package/delete/:id', packagecontroller.deletePackage);

//Destination
router.post("/destination/create", destinations.createDestination);
router.get("/destination/getall", destinations.getAllDestination);
router.put("/destination/update/:id",destinations.updateDestination);
router.delete("/destination/delete/:id", destinations.deleteDestination);

//Hotels
router.post("/hotel/create", hotelcontroller.createHotel);
router.get("/hotel/getall", hotelcontroller.getAllHotels);
router.get("/hotel/:id", hotelcontroller.getHotelById);
router.put("/hotel/update/:id", hotelcontroller.updateHotel);
router.delete("/hotel/delete/:id", hotelcontroller.deleteHotel);

//Flights
router.get("/flight/getall", flightController.getAllFlights);
router.get("/flight/:id", flightController.getFlightById);
router.post("/flight/create", flightController.createFlight);
router.put("/flight/update/:id", flightController.updateFlight);
router.delete("/flight/delete/:id", flightController.deleteFlight);

//Booking :-
// USER
router.post("/booking/create", authMiddleware, bookingController.createBooking);
router.get("/booking/my-bookings", bookingController.getUserBookings);
// ADMIN
router.get("/booking/all", bookingController.getAllBookings);

module.exports = router;
