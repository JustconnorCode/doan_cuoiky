'use strict';
const {
    Model
} = require('sequelize');
const dataTypes = require('sequelize/lib/data-types');
module.exports = (sequelize, DataTypes) => {
    class Doctor_Clinic_Speciallty extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Doctor_Clinic_Speciallty.init({
        doctorId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Doctor_Clinic_Speciallty',
    });
    return Doctor_Clinic_Speciallty;
};