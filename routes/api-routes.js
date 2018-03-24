var db = require("../models");

module.exports = function(app){

    app.get("/", function(req, res) {
        db.Viz.findAll({
            order: ['viz_name']
        }).then(function(){
                res.render("../html/index");
        });
    });

    app.post("/api/vizs", function(req, res) {
        db.Viz.create({
            viz_creator: req.body.viz_creator,
            viz_name: req.body.viz_name,
            viz_type: req.body.viz_type,
            viz_data: req.body.viz_data
        }).then(function() {
            res.render("../html/index");
        }).catch(function(err) {
            res.json(err);
        });
    });

};