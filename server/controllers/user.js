const User = require("../models").User;

const userfieldsValidation = async (userBody) => {
    const errors = [];

    if (!userBody.email || !userBody.password) {
        errors.push("You must specify an email and a password for the user.");
    } else if (userBody.password.length <= 3 || !userBody.email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
        errors.push(
            "The password must have more than 3 characters and the email must use example@domain.net format."
        );
    } else {
        const result = await User.findOne({
            where: { email: userBody.email },
        });

        if (result) {
            errors.push(`The '${userBody.email}' email is already used.`);
        }
    }
    return errors;
};


const controller = {
    createUser: async (req, res) => {
        try {
            const userBody = {
                email: req.body.email,
                name:req.body.name,
                username:req.body.username,
                password: req.body.password
            };

            const errors = await userfieldsValidation(userBody);

            if (errors.length === 0) {
                const newUser = await User.create(userBody);
                res.status(201).json({
                    message: `User with '${userBody.email}' email created.`,
                    userId: newUser.id
                });
            } else {
                res.status(400).json({ message: errors });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    
    userLogin: async (req, res) => {
        try {
            const userBody = {
                email: req.body.email,
                password: req.body.password,
            };
            const errors = [];
            if (!userBody.email || !userBody.password) {
                errors.push("You must specify an email and a password to login.");
            }
            if (errors.length === 0) {
                const user = await User.findOne({
                    where: {
                        email: userBody.email,
                    },
                });

                if (user) {
                    if (user.password === userBody.password) {
                        res.status(200).json({ message: "Login succesful", data: user.id });
                    } else {
                        res.status(400).json({
                            message: "Credentials provided do not match with our records.",
                        });
                    }
                } else {
                    res.status(400).json({
                        message: "Credentials provided do not match with our records.",
                    });
                }
            } else {
                res.status(400).json({ message: errors });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
}

module.exports = controller;