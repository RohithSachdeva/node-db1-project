const express = require("express");
const knex = require("../data/dbConfig.js");
const router = express.Router();


// - Write CRUD endpoints for the `accounts` resource. Use the `db` object imported from `data/dbConfig.js` for database access via `knex`.
// - Manually test your endpoints with a REST client like `Insomnia` or `Postman` to check they are working as expected.

// #### Accounts Schema

// | field  | data type        | metadata                                            |
// | ------ | ---------------- | --------------------------------------------------- |
// | id     | unsigned integer | primary key, auto-increments, generated by database |
// | name   | string           | required, unique                                    |
// | budget | numeric          | required                                            |

router.get("/", (req, res) => {
    knex
    .select("*")
    .from("accounts")
    .then(accounts => {
        res.status(200).json({accounts: accounts});
    })
    .catch(error => {
        console.log("Get error", error);
        res.status(500).json({ message: error.message });
    });
});

router.post("/", (req, res) => {
    const {name, budget} = req.body;
    if (!name || !budget) {
        res.status(400).json({ message: "Error, need Name and Budget" })
    }
    knex
    .insert(req.body)
    .into("accounts")
    .then(account => res.status(200).json(account))
    .catch(err => res.status(500).json({ message: "error creating account"}));
})

router.put("/:id", (req,res) => {
    if(req.body) {
        knex("accounts")
        .where({ id: req.params.id })
        .update({ name: req.body.name, budget: req.body.budget })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({error: err}))
    }
});

router.delete("/:id", (req,res) => {
    knex("accounts")
    .where({ id: req.params.id })
    .del()
    .then(account => res.status(200).json(account))
    .catch(err => res.status(500).json({ error: err}))
});





module.exports = router;