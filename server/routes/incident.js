let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

let passport = require('passport');

let incidentController = require('../controllers/incident');

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/* GET Route for the Incident List page - READ Operation */
router.get('/', incidentController.displayIncidentList);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', requireAuth, incidentController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', requireAuth, incidentController.processAddPage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id', requireAuth, incidentController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id', requireAuth, incidentController.processEditPage);

/* GET to perform  Deletion - DELETE Operation */
router.get('/delete/:id', requireAuth, incidentController.performDelete);

module.exports = router;