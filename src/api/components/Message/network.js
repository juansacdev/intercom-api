const {
	getMessages,
	createMessage,
	editMessageById,
    deleteMessageById,
} = require("./controller");
const router = require("express").Router();

router.get("/", getMessages);
router.post("/:chatId", createMessage);
router.put("/:messageId", editMessageById);
router.delete("/:messageId/:chatId", deleteMessageById);

module.exports = router;
