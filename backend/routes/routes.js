const express = require('express');
const router= express.Router();
const clientes= require('../models/clientes.model');
const plans= require('../models/plan.model');
const ejercicios= require('../models/ejercicios.model');
const bcrypt= require('bcryptjs');
const confirmarLogueo = (req, res, next) => {
  if (!req.cookies.email) {
    return res.redirect('/api/v1/login'); // Redirigir al inicio de sesión si no hay cookie de sesión
  }
  next(); // Continuar con la solicitud si el usuario está autenticado
};

const cliente = {
    cedula:clientes.cedula,
    nombre: clientes.nombre,
    apellido: clientes.apellido,
    email: clientes.email,
};


//controllers
const clientesController = require('../controller/usecases/clientes.controller');
const ejerciciosController= require('../controller/usecases/ejercicios.controller');
const planesController= require('../controller/usecases/plan.controller');


//clientes
router.get('/obtenercliente', clientesController.obtenerCliente);
router.get('/obtenerclientes', clientesController.obtenerClientes);
router.post('/crearcliente', clientesController.crearCliente);
router.put('/actualizarcliente', clientesController.actualizarCliente);
router.delete('/eliminarcliente', clientesController.eliminarCliente);

//ejercicios
router.get('/obtenerejercicio', ejerciciosController.obtenerEjercicio);
router.get('/obtenerejercicios', ejerciciosController.obtenerEjercicios);
router.post('/crearjercicio', ejerciciosController.crearEjercicio);
router.put('/actualizarejercicio', ejerciciosController.actualizarEjercicio);
router.delete('/eliminarejercicio', ejerciciosController.eliminarEjercicio);

//planes
router.get('/obtenerplan', planesController.obtenerPlan);
router.get('/obtenerplanes', planesController.obtenerPlanes);
router.post('/crearplan', planesController.crearPlan);
router.put('/actualizarplan', planesController.actualizarPlan);
router.delete('/eliminarplan', planesController.eliminarPlan);

//pages
//inicio
router.get('/inicio', (req,res)=>{
    res.render('pages/inicio')
    });
router.get('/sobrenosotros', (req,res)=>{
    res.render('pages/sobrenosotros')
    });
router.get("/recuperar", function (req, res) {
    res.render("pages/recuperar");
    })
router.get("/ejercicios", async (req, res) => {
    const listaejercicios = await ejercicios.find();
    res.render("pages/ejercicios", { listaejercicios });
    });
router.get("/planes", async (req, res) => {
    const listaplanes = await plans.find();
    res.render("pages/planes", { listaplanes });
    });

//Iniciar sesion ruta
router.get('/login', (req,res)=>{
    res.render('pages/login')
    });
router.get("/recuperar", (req, res) =>{
    res.render("pages/recuperar");
    })

//Registrar ruta
router.get('/signup', (req,res)=>{
    res.render('pages/signup')
    });
router.post('/signup', clientesController.crearCliente)

//Perfiles
router.get('/admindashboard',confirmarLogueo, (req,res)=>{
    res.render('pages/admindashboard',{cliente})
    });
router.get('/perfilcliente',confirmarLogueo, (req,res)=>{
    res.render('pages/perfilcliente', {cliente})
    });

//Listas
router.get("/listaclientes",confirmarLogueo, async (req, res) => {
    const listaclientes = await clientes.find();
    res.render("pages/listas/listaclientes", { listaclientes });
    });
router.get("/listaplanes",confirmarLogueo, async (req, res) => {
    const listaplanes = await plans.find();
    res.render("pages/listas/listaplanes", { listaplanes });
    });
router.get("/listaejercicios",confirmarLogueo, async (req, res) => {
    const listaejercicios = await ejercicios.find();
    res.render("pages/listas/listaejercicios", { listaejercicios });
    });

//Controlador ejercicio
router.get("/registroejercicio", (req, res)=>{
    res.render("pages/registroejercicios");
    })
router.get("/registrousuarioadmin", (req, res)=>{
    res.render("pages/registrousuarioadmin");
    })

router.get("/ejercicios", async (req, res) => {
    const listaejercicios = await ejercicios.find();
    res.render("pages/ejercicios", { listaejercicios });
    });
router.get("/planes", async (req, res) => {
    const listaplanes = await plans.find();
    res.render("pages/planes", { listaplanes });
    });





//post
router.post("/registroejercicio", async (req, res) => {
    try {
        const nuevoEjercicio = new ejercicios({
            nombre: req.body.nombre,
            dificultad: req.body.dificultad,
            descripcion: req.body.descripcion,
            musculo_principal: req.body.musculo_principal
        });
    await nuevoEjercicio.save();
        res.redirect("/api/v1/admindashboard");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al registrar el ejercicio");
        }
      });


router.post('/signup', clientesController.crearCliente)



router.get('/registroplan',(req, res)=>{
    res.render("pages/registroplanes");
    })
router.post("/registroplan", async (req, res) => {
    try {
        const nuevoPlan = new plans({
            nombre: req.body.nombre,
            dificultad: req.body.dificultad,
            objetivo: req.body.objetivo,
            });
    await nuevoPlan.save();
        console.log('Registro exitoso');
        res.redirect('/api/v1/admindashboard');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al registrar el plan");
                    }
    });


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Verificar si el usuario existe en la base de datos
      const cliente = await clientes.findOne({ email });
  
      if (!cliente) {
        return res.status(404).send('Usuario no existe');
      }
  
      // Verificar las credenciales
      if (cliente.password !== password) {
        return res.status(401).send('Credenciales incorrectas');
  
      }
  
      // Establecer una cookie de sesión con el nombre de usuario
      res.cookie('email', email, { maxAge: 900000, httpOnly: true });
  
      // Verificar el rol del usuario y redireccionar según el rol
      if (cliente.rol === 'admin') {
        return res.redirect('/api/v1/admindashboard');
      } else if (cliente.rol === 'cliente') {
        return res.redirect('/api/v1/perfilcliente');
      } else {
        return res.status(403).send('Acceso no autorizado');
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send('Error interno del servidor');
    }
  });


  //cerrar sesión
  router.get('/api/v1/logout', (req, res) => {
    res.clearCookie('email');
    res.redirect('/login');
  });
  
  module.exports = router;


  router.post('/recuperar', async (req, res) => {
    const { email } = req.body;

    try {
        const cliente = await clientes.findOne({ email });

        if (cliente) {
            const mensaje = `Tu contraseña es: ${cliente.password}`; // Aquí se obtiene la contraseña del usuario
            await enviarCorreo(email, 'Recuperación de Contraseña', mensaje);
            res.status(200).send('Correo enviado con la contraseña.');
        } else {
            res.status(404).send('El correo electrónico no está registrado.');
        }
    } catch (error) {
        res.status(500).send('Error al procesar la solicitud.');
    }
});

  


module.exports= router;