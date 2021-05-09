const {
	getChats,
	createChat,
	getChatById,
    deleteChatById,
} = require("./controller");
const router = require("express").Router();

router.get("/",  getChats);
router.get("/:chatId",  getChatById);
router.post("/:toUserId",   createChat);
router.delete("/:chatId", deleteChatById);

module.exports = router;
