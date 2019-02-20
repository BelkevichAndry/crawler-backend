'use strict';

export default function (sequelize, DataTypes) {

    let Technologies = sequelize.define("Technologies", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 'technologies',
        timestamps: true,
        paranoid: true
    });


    Technologies.associate = (models) => {
        Technologies.hasMany(models.ScriptHistory, {as: 'technology'});
    };


    return Technologies;
};

