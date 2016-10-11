var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://linoy:a12345@ds053166.mlab.com:53166/searchappdb');

var schema = new mongoose.Schema({
    id: String,
    name: String,
    phone: String,
    avatar_origin: String,
    birthday: Number,
    address: Object
    }, {collection: 'people' });

var People = mongoose.model('people', schema);

module.exports.People = People;