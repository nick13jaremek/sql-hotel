/**
 * Created by nickjaremek on 4/12/15.
 */
'use strict';

const Guest = function(sequelize, DataTypes) {

    let GuestSchema = sequelize.define('Guest', {
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, validate: { isEmail: true } }
    }, {
        tableName: 'guests',
        underscored: true
    });

    return GuestSchema;
};

module.exports = Guest;