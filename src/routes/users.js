const express = require("express");
const router = express.Router();
const usersController = require("../controller/urers");

router.get("/", usersController.getAllUsers)
.get("/search/", usersController.getSearchUsers)
.get("/:id", usersController.getDetailUsers)
.post("/", usersController.createUsers)
.put("/:id", usersController.updateUsers)
.delete("/:id", usersController.deleteUsers);

module.exports = router;
