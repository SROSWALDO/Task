const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    const Task = sequelize.define('Task', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true, 
        },
        
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    });
    return Task;
}