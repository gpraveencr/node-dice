

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var JobsSchema = new Schema({
    company : {type : String, required : true},
    jobtitle : {type : String, required : true},
    minyearsofexp : {type : Number, required : false, default : -1},
    maxyearsofexp : {type : Number, required : false, default : -1},
    location : {type : String, required : true},
    description : {type : Array, required : false},
    requirements : {type : Array, required : false},
    prefer : {type : Array, required : false},
    benefits : {type : Array, required : false},
    technologystack : {type : Array, required : false}
});

module.exports = mongoose.model('Jobs', JobsSchema);
