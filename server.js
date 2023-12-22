// Import Our Dependencies
/////////////////////////////////////////////

require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const path = require("path"); // built in node module we use to resolve paths more on this when we use it
const Log = require ( "./models/logs")// importing the model form logs.js file
const jsxViewEngine = require('jsx-view-engine');
const { lstat } = require("fs");

// Setup inputs for our connect function/ global configuration
const DATABASE_URL = process.env.DATABASE_URL;
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Establish Connection
mongoose.connect(DATABASE_URL, CONFIG);

// Events for when connection opens/disconnects/errors
mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error));



////create app object//////////////////////////
// Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////
const app = express()
// https://www.npmjs.com/package/jsx-view-engine Docs for jsx view engine
app.engine('jsx', jsxViewEngine());
app.set('view engine', 'jsx')
app.set('views', __dirname + '/views')

//============Register our Middleware ================

app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically

 //Our initial route also called root route
app.get('/', (req, res) => {
  res.send("your server is running... better catch it."); 
});


// all others routes================================

//--------- Logs index ------------->GET
// I - INDEX - dsiplays a list of all logs
app.get('/logs/', async (req, res) => {
  // res.send(fruits);
  try {
      const foundLogs = await Log.find({});
      res.status(200).render('Index', {logs: foundLogs});
  } catch (err) {
      res.status(400).send(err);
  }
  
});

// //-----------------------------------
// app.get('/logs', async (req, res) => {
//   let logs = await Log.find({})
//   res.render('Index', {logs})
// })

//-------  New --------------------------------------GET
/*
    Middleware function
      (req, res) => {}
*/


app.get('/logs/new', (req, res)=>{
  res.render("New");
})// this is our new route


//-------- Destroy --------------------- delete
// D - DELETE - PERMANENTLY removes logs from the database-----DELETE
app.delete('/logs/:id', async (req, res) => {
  // res.send('deleting...');
  try {
      const deleteLog = await Log.findByIdAndDelete(req.params.id);
      console.log(deleteLog);
      res.status(200).redirect('/logs');
  } catch (err) {
      res.status(400).send(err);
  }
})


// U - UPDATE - makes the actual changes to the database based on the EDIT form---------------->UPDATE
app.post('/logs/:id', async (req, res) => {
  if (req.body.shipIsBroken === 'on') {
      req.body.shipIsBroken = true;
  } else {
      req.body.shipIsBroken = false;
  }

  try {
      const updatedLog = await Log.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true },
      );
      console.log(updatedLog);
      res.status(200).redirect(`/logs/${req.params.id}`);
  } catch (err) {
      res.status(400).send(err);
  }
})



// C - CREATE - update our data store---------CREATE
app.post('/logs', async (req, res) => {
  if(req.body.shipIsBroken === 'on') { //if checked, req.body.shipIsBroken is set to 'on'
      req.body.shipIsBroken = true;
  } else {  //if not checked, req.body.shipIsBroken is undefined
      req.body.shipIsBroken = false;
  }

  try {
      const createdLog = await Log.create(req.body);
      res.status(200).redirect('/logs');
  } catch (err) {
      res.status(400).send(err);
  }
});

// E - EDIT - allow the user to provide the inputs to change the log-----------UPDATE
app.get('/logs/:id/edit', async (req, res) => {
  try {
      const foundLog = await Log.findById(req.params.id);
      console.log('foundLog');
      console.log(foundLog)
      res.status(200).render('Edit', {log: foundLog});
  } catch (err) {
      res.status(400).send(err);
  }
})


// app.post('/logs/update', async (req, res) => {
//   if(req.body.shipIsBroken === 'on') { //if checked, req.body.shipIsBroken is set to 'on'
//       req.body.shipIsBroken = true;
//   } else {  //if not checked, req.body.shipIsBroken is undefined
//       req.body.shipIsBroken = false;
//   }

//   try {
//       const createdLog = await Log.(req.body);
//       res.status(200).redirect('/logs');
//   } catch (err) {
//       res.status(400).send(err);
//   }
// });

// S - SHOW - show route displays details of an individual fruit
app.get('/logs/:id', async (req, res) => {
  // res.send(fruits[req.params.indexOfFruitsArray]);
  try {
      const foundLog = await Log.findById(req.params.id);
      res.render('Show', {log: foundLog});
  } catch (err) {
      res.status(400).send(err);
  }

})


// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));