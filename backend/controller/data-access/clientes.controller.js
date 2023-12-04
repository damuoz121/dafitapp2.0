const Cliente=require('../../models/clientes.model');

exports.crearCliente = async (rol, cedula, nombre, apellido, fechadenacimiento, email, password, telefono) => {
  const nuevoCliente = new Cliente({rol, cedula, nombre, apellido, fechadenacimiento, email, password, telefono });
  return await nuevoCliente.save();
};

exports.crearClientes = async (clientes) => {
  return await Cliente.insertMany(clientes);
};

exports.buscarClientes = async () => {
  return await Cliente.find();
};

exports.buscarunCliente = async (cedula) => {
  return await Cliente.findOne({ cedula });
};

exports.reemplazar = async (cedula, nuevoCliente) => {
  return await Cliente.findOneAndReplace({ cedula }, nuevoCliente);
};


exports.actualizar = async (email, telefono, password ) => {
  return await Cliente.updateMany(email, telefono, password);
};

exports.eliminar = async (cedula) => {
  return await Cliente.deleteOne({ cedula });
};

exports.buscaryeliminar = async (cedula) => {
  return await Cliente.findOneAndDelete({ cedula });
};