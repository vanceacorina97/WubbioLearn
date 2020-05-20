const UserService = require("../user/UserService");
const UserHelper = require("../user/UserHelper");
const bcrypt = require('bcrypt');
const saltRounds = 10;


class UserController {

    async register(req, res) {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const validateEmail = await UserHelper.validateEmail(email);
        const existEmail = await UserHelper.checkIfEmailExist(email);
        const validatePassword = await UserHelper.validatePassword(password);
        if (validateEmail) {
            if (!existEmail) {
                if (validatePassword) {
                    const hashPassword = await bcrypt.hash(password, saltRounds).then(function (hash) {
                        return hash;
                    });
                    const registeredUser = await UserService.register(name, email, hashPassword);
                    return res.status(200).send(registeredUser);
                } else {
                    res.status(400).json({ error: "Invalid Password!" });
                }
            } else {
                res.status(400).json({ error: "This email already exist!" });
            }
        } else {
            res.status(400).json({ error: "You have entered an invalid email address!" });
        }
    }

    async getAllUsers(req, res){
        const users = await UserService.getAllUsers(req.user.id);
        return res.send(users);

    }

}

module.exports = UserController;