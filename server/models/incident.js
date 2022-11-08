let mongoose = require('mongoose');

// create a model class
let incidentModel = mongoose.Schema({
    incidentId: String,
    date: String,
    priority: String,
    user: String,
    narrative: String,
    status: String,
},
{
    collection: "incidents"
});

module.exports = mongoose.model('Incident', incidentModel);