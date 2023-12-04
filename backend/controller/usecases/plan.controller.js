const planDataAccess = require('../data-access/plan.controller');

exports.validarPlan= async()=>{
    try {
      const plan = await planDataAccess.findOne({ dia: dia });
  
      if (!plan) {
        console.log('Plan no encontrado.');
        return false;
      }
  
      if (plan.nombre === nombre) {
        console.log('plan validado con éxito.');
        return true;
      } else {
        console.log('plan no encontrado.');
        return false;
      }
    } catch (error) {
      console.error('Error al validar el plan:', error);
      return false;
    }
  }
exports.crearPlan = async (req, res) => {
  try {
    const { nombre, frecuencia, dificultad, objetivo } = req.body;
    const { error, value } = validarPlan(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const nuevoPlan = await planDataAccess.save(nombre, frecuencia, dificultad, objetivo);
    return res.status(201).json({ plan: nuevoPlan });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.obtenerPlanes = async (req, res) => {
  try {
    const planes = await planDataAccess.find();
    return res.status(200).json({ planes });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.obtenerPlan = async (req, res) => {
  try {
    const { nombre } = req.params;
    const planEncontrado = await planDataAccess.findOne(nombre);
    if (!planEncontrado) {
      return res.status(404).json({ error: 'No se encontró ningún plan con ese nombre' });
    }
    return res.status(200).json({ plan: planEncontrado });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.actualizarPlan = async (req, res) => {
  try {

    const { nombre } = req.params;

    const { frecuencia, dificultad, objetivo } = req.body;

     const { error, value } = validarPlan(req.body);
     if (error) {
       return res.status(400).json({ error: error.message });
     }
    const nuevoPlan = await planDataAccess.findOneAndReplace(nombre, { nombre, frecuencia, dificultad, objetivo, rutinas });
     if (!nuevoPlan) {
       return res.status(404).json({ error: 'No se encontró ningún plan con ese nombre' });
     }
    return res.status(200).json({ plan: nuevoPlan });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.eliminarPlan = async (req, res) => {
  try {
    const { nombre } = req.params;
    const planEliminado = await planDataAccess.findOneAndDelete(nombre);
     if (!planEliminado) {
       return res.status(404).json({ error: 'No se encontró ningún plan con ese nombre' });
     }
    return res.status(200).json({ plan: planEliminado });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


/*exports.crearNuevoPlan= async (req, res)=> {
  try {
      const nuevoPlan = new plans({
          nombre: req.body.nombre,
          dificultad: req.body.dificultad,
          objetivo: req.body.objetivo,
      });

      await nuevoPlan.save();
      console.log('Registro exitoso');
      //window.alert('Registro exitoso: Inicie sesión');
      res.redirect('/api/v1/admindashboard');
  } catch (error) {
      console.error(error);
      res.status(500).send("Error al registrar el plan");
  }
};*/