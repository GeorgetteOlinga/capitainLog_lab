
// pull schema and model from mongoose using object destructuring
// const {Schema, model} = require('mongoose')

// make or create the logs schema
const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    title:{type: String, required: true},
    entry:{ type: String, required: true},
    shipIsBroken:{type: Boolean , default: true} //(bonus: set a default to true)
    
},{timeStamp: true});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;



