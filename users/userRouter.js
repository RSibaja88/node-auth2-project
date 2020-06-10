const router = require("express").Router();
const Users = require("./users-model");

router.get("/", (req,res) => {
    Users.findUser()
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        res.status(500).json({ message: "Failed to GET users"}, err);
    });
});

module.exports = router;