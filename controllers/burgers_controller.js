// Require express and set up routing 
const express = require("express");

const router = express.Router();

// Import the model (burger.js) to access its database functions.
const burgers = require("../models/burger.js");

// Create root page routing and set up the logic
router.get("/", async (req, res) => {
  await burgers.all(async (data) => {
    var presentBurgerList = {burgers: data };
    await res.render("index", presentBurgerList);
  });
});

// Create burger create routing and set up the logic
router.post("/api/burgers", async (req, res) => {
  const burgerName = req.body.name
  const burgerState = req.body.devoured
  await burgers.create(burgerName, burgerState,
                async () => {await res.end()})
});


// Create burger state change routing and set up the logic
router.put("/api/burgers/:id", async (req, res) => {
  const burgerID = req.params.id
  const burgerState = req.body.devoured
  await burgers.update(burgerID, burgerState, async (result) => {
    if (result.changedRows == 0) {return res.status(404).end()}
     else {res.status(200).end()}
  });
});

// Create burger DELETE routing and set up the logic
router.delete("/api/burgers/:id", async (req, res) =>  {
  const tableID =  await req.params.id;
 await burgers.delete(tableID, async (result) => {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else { await res.status(200).end()}
  });  
});

// Export routes for server.js use.
module.exports = router;

