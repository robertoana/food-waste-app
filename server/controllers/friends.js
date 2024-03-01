const Friends= require("../models").Friends;
const Users = require("../models").User;

const controller={
  addFriend: async (req, res) => {
    try {
        const { username, eticheta } = req.body;
        const user = await Users.findOne({ where: { username: username } });
        if (!user) {
          return res.status(404).json({ message: 'Utilizatorul nu a fost găsit.' });
        }
        const friend = await Friends.create({ userId: user.id, eticheta });
        res.status(201).json(friend);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },
    getFriendsByUser: async (req, res) => {
        try {
            const userId = req.params.userId;
            if (!userId) {
                return res.status(400).json({
                    message: "User ID is required as a path parameter.",
                });
            }
    
            const friends = await Friends.findAll({
                where: { userId: userId },
                include: [{
                    model: Users,
                    as: 'user',
                    attributes: ['name']
                }]
            });
    

            const friendsWithUserNames = friends.map(friend => {
                return {
                    ...friend.dataValues,
                    nume: friend.User ? friend.User.name: 'Nume indisponibil'
                };
            });
    
            res.status(200).json(friendsWithUserNames);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getAllFriends: async (req, res) => {
        try {
            const users = await Friends.findAll();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports=controller;
