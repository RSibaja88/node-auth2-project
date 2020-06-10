const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");


const userRouter = require("../users/userRouter");
const authRouter = require("../auth/authRouter");

const server = express();

server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/user', userRouter );

module.exports = server;