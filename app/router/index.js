const router = require("express").Router();
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
} = require("../controller/userController");
const authController = require("../controller/authController");
const {
  getAllServices,
  getServiceById,
} = require("../controller/serviceController");

// router.get("/", (req, res) => {
//   res.send("welcome to our Motor Servicing App");
// });
router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:token", resetPassword);

router.route("/motorify/services/").get(getAllServices);
router.route("/motorify/services/:id").get(getServiceById);

module.exports = {
  router,
};
