const express = require("express");
const knex = require("../data/dbConfig.js");
const server = express();
const AccountsRouter = require("../accounts/accountsRouter.js");
server.use(express.json());

server.use("/api/accounts", AccountsRouter);
server.get("/", (req,res) => {
    res.status(200).json({api: 'up'});
});

module.exports = server;
