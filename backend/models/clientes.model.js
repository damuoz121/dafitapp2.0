const mongoose = require('../config/database');
const clienteSchema = new mongoose.Schema({
    rol: {
        type: String,
        required:[true, 'requiere su rol']
        },
    cedula :{
        type: String, 
        required:[true, 'requiere su cedula'],
        unique:[true, 'esta cedula ya se encuentra registrada'],
        minLength:[7, 'las cedulas tienen mas de 7 digitos'],
        maxLength:[10, 'las cedulas tienen maximo 10 digitos']},    
    nombre:{
        type: String,
        required: [true, 'requiere un nombre'],
        minLength:[2, 'los nombres tienen mas de 2 letras'],
        maxLength:[30, 'los nombres tienen maximo 30 letras']},
    apellido: {
        type: String,
        required: [true, 'requiere un apellido'],
        minLength:[2, 'los apellidos tienen mas de 2 letras'],
        maxLength:[30, 'los apellidos tienen maximo 30 letras']},
    fechadenacimiento: {
        type: Date, 
        required: [true, 'la fecha de nacimiento es obligatoria']},
    email: {
        type: String,
        required: [true, 'requiere su email'],
        unique:[true, 'esta email ya se encuentra registrado'],
        minLength:[6, 'los email tienen mas de 7 caracteres'],
        maxLength:[100, 'los email tienen maximo 100 caracteres']},
    password: {
        type: String,
        required: [true, 'se requiere el password'],
        minLength:[4, 'los usuarios tienen mas de 4 caracteres'],
        maxLength:[30, 'los password tienen maximo 30 caracteres']},
    telefono: {
        type: String,
        required: [true, 'requiere un numero de telefono'],
        unique:[true, 'este telefono ya se encuentra registrado'],
        minLength:[10, 'el telefono requiere 10 digitos'],
        maxLength:[10, 'el telefono requiere maximo 10 digitos']
    },
})

const Cliente = mongoose.model('cliente', clienteSchema);
module.exports = Cliente