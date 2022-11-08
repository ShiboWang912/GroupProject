let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

// create a reference to the model
let Incident = require('../models/incident');

module.exports.displayIncidentList = (req, res, next) => {
    Incident.find((err, incidentList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(IncidentList);

            res.render('incident/list', 
            {title: 'Incidents', 
            IncidentList: incidentList, 
            displayName: req.user ? req.user.displayName : ''});      
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('incident/add', {title: 'Add Incident', 
    displayName: req.user ? req.user.displayName : ''})          
}

module.exports.processAddPage = (req, res, next) => {
    let newIncident = Incident({
        "incidentId": req.body.incidentId,
        "date": req.body.date,
        "priority": req.body.priority,
        "user": req.body.user,
        "narrative": req.body.narrative,
        "status": req.body.status
    });

    Incident.create(newIncident, (err, Incident) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the incident list
            res.redirect('/incident-list');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Incident.findById(id, (err, incidentToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('incident/edit', {title: 'Edit Incident', incident: incidentToEdit, 
            displayName: req.user ? req.user.displayName : ''})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedIncident = Incident({
        "_id": id,
        "incidentId": req.body.incidentId,
        "date": req.body.date,
        "priority": req.body.priority,
        "user": req.body.user,
        "narrative": req.body.narrative,
        "status": req.body.status
    });

    Incident.updateOne({_id: id}, updatedIncident, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the incident list
            res.redirect('/incident-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Incident.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the incident list
             res.redirect('/incident-list');
        }
    });
}