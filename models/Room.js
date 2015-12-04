/**
 * Created by nickjaremek on 4/12/15.
 */
'use strict';

const Room = function(sequelize, DataTypes) {

    let RoomSchema = sequelize.define('Room', {
        number: { type: DataTypes.INTEGER, allowNull: false },
        beds: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        toilets: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        balcony: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
    }, {
        tableName: 'rooms',
        underscored: true,
        classMethods: {
            associate: function(models) {
                RoomSchema.belongsTo(models.Guest, {
                    onDelete: 'NO ACTION',
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });

    return RoomSchema;
};

module.exports = Room;