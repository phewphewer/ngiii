const User = require("../models/userModel");

// login user
const loginUser = async (req, res) => {
    res.json({ mssg: "Log in User" });
};
// create_account user
const create_account_user = async function (req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.create_account(email, password);
        res.status(200).json({ email, user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { create_account_user, loginUser };
