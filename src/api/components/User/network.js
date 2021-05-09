const {
	getUsers,
	getUserById,
	editUserById,
} = require("./controller");
const router = require("express").Router();

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.put("/:userId", editUserById);

module.exports = router;
