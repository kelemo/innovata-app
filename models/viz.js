module.exports = function(sequelize, DataTypes) {

    var Viz = sequelize.define("Viz", {
        viz_creator: {type: DataTypes.STRING},
        viz_name: {type: DataTypes.STRING},
        viz_type: {type: DataTypes.STRING},
        viz_data: {type: DataTypes.STRING(2500)}
    });

    return Viz;
};