const bcryptjs = require("bcryptjs");

const router = require("express").Router();

const Users = require("../users/users-model");
const { isValid } = require("../users/users-service");

router.post("/register", (req, res) => {
    const creds = req.body;

    if ( isValid(creds)) {
        const rounds = process.env.BCRYPT_ROUNDS || 8;
        const hash = bcryptjs.hashSync(creds.password, rounds);
        creds.password = hash;

    Users.add(creds)
    .then(user => {
        res.status(201).json({ data: user });
    })
    .catch(err => {
        res.status(500).json({ message: err.message });
    })
    } else {
        res.status(400).json({
            message: "please provide username and password"
        });
    }
});

router.post("/login", (req, res) => {
    const { username, password } = req.body;
  
    if (isValid(req.body)) {
      Users.findBy({ username: username })
        .then(([user]) => {
          if (user && bcryptjs.compareSync(password, user.password)) {
            res.status(200).json({ message: "Welcome to userDept" });
          } else {
            res.status(401).json({ message: "Invalid credentials" });
          }
        })
        .catch(error => {
          res.status(500).json({ message: error.message });
        });
    } else {
      res.status(400).json({
        message: "please provide username and password.",
      });
    }
  });
  
module.exports = router;