// Importamos el modelo de ejercicio
const Ejercicio = require('../../models/ejercicios.model');

exports.save = async (nombre, dificultad, descripcion, musculo_principal) => {
  const nuevoEjercicio = new Ejercicio({ nombre, dificultad, descripcion, musculo_principal});
  return await nuevoEjercicio.save();
};

exports.insertMany = async (ejercicios) => {
  return await Ejercicio.insertMany(ejercicios);
};

exports.find = async () => {
  return await Ejercicio.find();
};

exports.findOne = async (nombre) => {
  return await Ejercicio.findOne({ nombre });
};

exports.findOneAndReplace = async (nombre, nuevoEjercicio) => {
  return await Ejercicio.findOneAndReplace({ nombre }, nuevoEjercicio);
};

exports.updateMany = async (nombre, descripcion) => {
  return await Ejercicio.updateMany(nombre, descripcion);
};

exports.deleteOne = async (nombre) => {
  return await Ejercicio.deleteOne({ nombre });
};

exports.findOneAndDelete = async (nombre) => {
  return await Ejercicio.findOneAndDelete({ nombre });
};


