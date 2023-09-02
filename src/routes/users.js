const express = require("express");
const router = express.Router();
const usersController = require("../controller/users");
const { protect } = require("../middlewares/auth");
const upload = require("../middlewares/upload");
router
  .post("/register", usersController.register)
  //   .post("/costomer/register", usersController.registerCostomer)
  .put("/seller/:id", upload, usersController.updateSeller)
  .put("/costomer/:id", upload, usersController.updateCostomer)
  .post("/login", usersController.login)
  .get("/profile", protect, usersController.profile)
  .post("/refersh-token", usersController.refreshToken);

module.exports = router;
