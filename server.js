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

// Setup inputs for our connect function
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

//--------- Logs index -------------get

app.get('/logs', async (req, res) => {
  let logs = await Log.find({})
  res.render('Index', {logs})
})

//-------  New --------------------------------------get
/*
    Middleware function
      (req, res) => {}
*/


app.get('/logs/new', (req, res)=>{
  res.render("New");
})// this is our new route

// app.listen(PORT, () => {
//   console.log('listening');
// });
//make a 'form' with action="/logs"and method="POST" in new.jsx

// --------- Show --------- get

/*
    /logs/0
    /logs/1
*/
app.get('/log/:i', async (req, res) => {
  let logs = await Log.find({})
  let log  = logs[req.params.i]
  if (!log) {
    res.status(404).send("Log not found.")
  }
  res.render('Show', {log})
})


//-------- Create ---------------------post

app.post('/logs', async (req, res)=>{
  req.body.shipIsBroken = req.body.shipIsBroken === 'on'
  let newLog = new Log(req.body)
  await newLog.save()
  res.redirect('/logs')
})


//-------- Edit --------------------- get

app.get('/logs/edit/:i', async (req, res) => {
  let logs = await Log.find({})
  let log  = logs[req.params.i]
  if (!log) {
    res.status(404).send("Log not found.")
  }
  res.render('Edit', {log})
})

//-------- Update --------------------- put

app.post('/logs/update', async (req, res) => {
  req.body.shipIsBroken = req.body.shipIsBroken ? true : false
  try {
    let mongoRes = await Log.findOneAndUpdate({_id: req.body.id}, req.body)
    // console.log(mongoRes)
    res.redirect('/logs')
  } catch (err) {
    console.log(err)
    res.status(500).send("Error updating log")
  }
})

//-------- Destroy --------------------- delete

app.delete('/log/delete/:id', async (req, res) => {
    await findByIdAndDelete(req.params.id)
})

// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));