'use strict';

export default function (sequelize, DataTypes) {

    let ScriptHistory = sequelize.define("ScriptHistory", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        start: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        finish: {
            type: DataTypes.BIGINT,
            // allowNull: false
        },
        executionTime :{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        tableName: 'script_history',
        timestamps: true,
        paranoid: true
    });

    return ScriptHistory;
};

