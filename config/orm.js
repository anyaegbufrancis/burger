// Import MySQL & controller connections.
var connection = require("../config/connection.js");
const router = require("../controllers/burgers_Controller.js");
const e = require("express");
const { deleteAvail } = require("../models/burger.js");

// Template object for all our SQL statement functions.
var orm = {
  //Home page render function
  selectAll: async (cb) => {
    var query = "SELECT * FROM burgers ";
    //Database query
    connection.query(query, async (err, result) => {
      if (err) throw err
       await cb(result);
    });
  },
  
  //Call to database to add new Burger
  insertOne: async (burgerName, burgerState, cb) => {
    let query = "INSERT INTO burgers  (burger_name, devoured) "
        query += "VALUES ( '" + burgerName + "' , " + burgerState + " )";
    //Database query
    await connection.query(query, async (err, result) => {
      if (err) throw err
      await cb(result);
    })
  },
  
  //Call to database to update existing burger 'devoured' state based on burger ID 
  updateOne: async (burgerID, burgerState, cb) => {
    var query = "UPDATE burgers SET devoured = " + burgerState + " WHERE id =" + burgerID;
    //Database query
    console.log(query);
    await connection.query(query, async (err, result) => {
      if (err) throw err
      await cb(result);
    });
  } 
 
}


//Exports ORM to MODELS for consumption by burgers
module.exports = orm;

 


