var db = require("../models");
var path = require("path");
//var setViz = require("../public/assets/js/app.js"); //doesnt like this line

module.exports = function(app){

    app.get("/", function(req, res) {
        db.Viz.findAll({
            order: ['viz_name']
        }).then(function(dbViz){
            //TODO: create viz-cards for each Viz in our db and send to index
            //setViz(dbViz);
            res.sendFile(path.join(__dirname, "../public/assets/html/index.html"));
        });
    });

    app.get("/create", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/assets/html/add.html"));
    });

    app.get("/display", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/assets/html/display.html"));
    });

    app.post("/api/new", function(req, res) {
        db.Viz.create({
            viz_creator: req.body.viz_creator,
            viz_name: req.body.viz_name,
            viz_type: req.body.viz_type,
            viz_data: req.body.viz_data
        });
    });

};