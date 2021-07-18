const express = require("express");
const router = express.Router();
const { getUser, createUser, getUsers, updateUser, DeleteUser } = require('../Controller/user.controller');

router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(getUser).put(updateUser).delete(DeleteUser);

module.exports = router;