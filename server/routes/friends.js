const router = require("express").Router();
const friendsController = require("../controllers").friendsController;

router.post('/addFriend', friendsController.addFriend);
router.get('/getAllFriends', friendsController.getAllFriends);
router.get('/getFriendsByUser/:userIdLocal', friendsController.getFriendsByUser);

module.exports=router;