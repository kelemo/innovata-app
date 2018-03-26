var db = require("../models");
var path = require("path");

module.exports = function(app){

    var vizDisplay;

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/assets/html/index.html"));
    });

    app.get("/api/gallery", function(req, res) {
        db.Viz.findAll({}).then(function(results) {
            res.json(results);
        });
    });

    app.get("/api/display", function(req, res) {
        res.json(vizDisplay);
    });

    app.post("/api/display", function(req, res) {
        var currentDisplay = {
            creator: req.body.creator,
            name: req.body.name,
            type: req.body.type,
            data: req.body.data
        };
        vizDisplay = currentDisplay;
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