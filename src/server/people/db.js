var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://linoy:a12345@ds053166.mlab.com:53166/searchappdb');

var people = mongoose.model('people', {
    id : String,
    name: String,
    avatar_origin: String,
    birthday: Number,
    phone: String,
    address: Object
});

module.exports.people = people;