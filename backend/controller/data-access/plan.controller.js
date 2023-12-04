const Plan = require('../../models/plan.model');

exports.save = async (nombre, frecuencia, dificultad, objetivo) => {
  const nuevoPlan = new Plan({ nombre, frecuencia, dificultad, objetivo });
  return await nuevoPlan.save();
};

exports.insertMany = async (planes) => {
  return await Plan.insertMany(planes);
};

exports.find = async () => {
  return await Plan.find();
};

exports.findOne = async (nombre) => {
  return await Plan.findOne({ nombre });
};

exports.findOneAndReplace = async (nombre, nuevoPlan) => {
  return await Plan.findOneAndReplace({ nombre }, nuevoPlan);
};
//filtro, parametro
exports.updateMany = async (frecuencia) => {
  return await Plan.updateMany(frecuencia);
};

exports.deleteOne = async (nombre) => {
  return await Plan.deleteOne({ nombre });
};

exports.findOneAndDelete = async (nombre) => {
  return await Plan.findOneAndDelete({ nombre });
};


