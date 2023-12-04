// Importamos el data access de ejercicios
const ejercicioDataAccess = require('../data-access/ejercicios.controller');
const ejercicios= require('../../models/ejercicios.model')
exports.validarEjercicio=async(req,res)=>{
  try {
    const ejercicio = await ejercicioDataAccess.findOne({ nombre: nombreEjercicio });

    if (!nombre) {
      console.log('Usuario no encontrado.');
      return false;
    }

    if (ejercicio.nombre === nombre) {
      console.log('ejercicio validado con éxito.');
      return true;
    } else {
      console.log('ejercicio no existe');
      return false;
    }
  } catch (error) {
    console.error('Error al validar el ejercicio', error);
    return false;
  }
}
exports.crearEjercicio = async (req, res) => {
  try {
    const nuevoEjercicio = new ejercicios({
        nombre: req.body.nombre,
        dificultad: req.body.dificultad,
        descripcion: req.body.descripcion,
        musculo_principal: req.body.musculo_principal
    });
await nuevoEjercicio.save();
    console.log('registro exitoso de ejercicio')
    res.redirect('/api/v1/admindashboard');
} catch (error) {
    console.error(error);
    res.status(500).send("Error al registrar el ejercicio");
      }
};


exports.obtenerEjercicios = async (req, res) => {
  try {
    const ejercicios = await ejercicioDataAccess.find();
    return res.status(200).json({ ejercicios });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


exports.obtenerEjercicio = async (req, res) => {
  try {
    const { nombre } = req.params;
    const ejercicioEncontrado = await ejercicioDataAccess.findOne(nombre);
    if (!ejercicioEncontrado) {
      return res.status(404).json({ error: 'No se encontró ningún ejercicio con ese nombre' });
    }
    return res.status(200).json({ ejercicio: ejercicioEncontrado });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


exports.actualizarEjercicio = async (req, res) => {
  try {
    const { nombre } = req.params;
    const { dificultad, descripcion, musculatura } = req.body;
     const { error, value } = validarEjercicio(req.body);
     if (error) {
       return res.status(400).json({ error: error.message });
     }
    const nuevoEjercicio = await ejercicioDataAccess.findOneAndReplace(nombre, { nombre, dificultad, descripcion, musculatura });
     if (!nuevoEjercicio) {
       return res.status(404).json({ error: 'No se encontró ningún ejercicio con ese nombre' });
     }
    return res.status(200).json({ ejercicio: nuevoEjercicio });
  } catch (err) {

    return res.status(500).json({ error: err.message });
  }
};


exports.eliminarEjercicio = async (req, res) => {
  try {
    const { nombre } = req.params;
    const ejercicioEliminado = await ejercicioDataAccess.findOneAndDelete(nombre);
     if (!ejercicioEliminado) {
       return res.status(404).json({ error: 'No se encontró ningún ejercicio con ese nombre' });
     }
    return res.status(200).json({ ejercicio: ejercicioEliminado });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
