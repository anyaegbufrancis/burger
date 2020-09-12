// Require ORM for interaction with DB.
const orm = require("../config/orm.js");

//Declare global object of functions to house the individual call functions
const  burgers = {
  
  //Function that renders the home & default page
  all: async (cb) => {
    orm.selectAll(async (res) => {
      await cb(res);
    });
  },
  
  // Function that adds a new burger.
  create: async (burgerName, burgerState, cb) => {
    await orm.insertOne(burgerName, burgerState, async (res) => {
     await cb(res);
    });
  },
  
  //Function that updates the burger state
  update: function(burgerID, burgerState, cb) {
    orm.updateOne(burgerID, burgerState, function(res) {
      cb(res);
    });
  },  
};

// Exports the database functions for consumption by the controller.
module.exports = burgers;
