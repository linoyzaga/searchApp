var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://linoy:a12345@ds139725.mlab.com:39725/searchappdb');

var people = mongoose.model('people', {
    _id: mongoose.Schema.ObjectId,
    name: String,
    image: String,
    rating: String,
    address: String,
    activityHours: String,
    history: String,
    publicTransport: String,
    price: String,
    tips: String,
    locationID: String,
    latitude: String,
    longitude: String
});

module.exports.people = people;