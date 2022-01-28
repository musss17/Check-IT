const User = require('../models/user');
const Random = require('../utils/random');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UserController {
    static async register(req, res) {
        // check if user already exists
        const id = Random.randomStr(15);
        const saltRound = 10;
        const passwordHash = bcrypt.hashSync(req.body.password, saltRound);
        const user = new User({
            _id: id,
            name: req.body.name,
            gender: req.body.gender,
            email: req.body.email.toLowerCase(),
            age: req.body.age,
            phone: req.body.phone,
            password: passwordHash
        });
        await user.save();
        const token = jwt.sign({ userId: id, role: 'user' }, process.env.TOKEN, { expiresIn: '7 days' });
        return res.redirect('/user/registersuccess');
    }

    static async login(req, res) {
        let user = await User.findOne({ email: req.body.email.toLowerCase() });
        if (!user) return res.status(404).render('user/login', { emailError: 'User not found' });
        const samePassword = bcrypt.compareSync(req.body.password, user.password);
        if (!samePassword) return res.status(400).render('user/login', { passwordError: 'Wrong password' });
        const token = jwt.sign({ userId: user._id, role: 'user' }, process.env.TOKEN, { expiresIn: '7 days' });
        return res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 7 days
        }).redirect(req.query.redirectTo || '/course/MyCourse');
    }

    static logout(req, res) {
        return res.clearCookie('token').redirect('/');
    }

    static async view(req, res) {
        const user = await User.findOne({ _id: req.user.id });
        return res.render('user/profile', { user: user });
    }

    static async updateForm(req, res) {
        const user = await User.findOne({ _id: req.user.id });
        return res.render('user/edit', { user: user })
    }

    static async update(req, res) {
        const user = await User.updateOne(
            { _id: req.user.id },
            {
                $set: {
                    name: req.body.name,
                    gender: req.body.gender,
                    email: req.body.email.toLowerCase(),
                    age: req.body.age,
                    phone: req.body.phone
                }
            }
        );
        return res.redirect('/user/profile');
    }
}

module.exports = UserController;