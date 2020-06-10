const router = require("express").Router();
const Users = require("./users-model");
const restricted = require("../auth/res-middleware.js");

router.get("/", restricted, (req,res) => {
    Users.find()
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        res.status(500).json({ message: "Failed to GET users"}, err);
    });
});

module.exports = router;