// Importar las dependencias necesarias
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');  // Para manejar datos del formulario
const mongoose = require('mongoose'); // Si usas MongoDB para la base de datos

// Crear una instancia de la aplicación Express
const app = express();
const port = 3000;

// Configuración para que Express use archivos estáticos (CSS, imágenes, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Usar Body-parser para leer datos del formulario (por ejemplo, valoraciones)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Conectar a la base de datos (aquí se usa MongoDB, pero puedes usar cualquier otro)
mongoose.connect('mongodb://localhost:27017/jabones', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Conectado a la base de datos");
}).catch(err => {
  console.log("Error al conectar a la base de datos", err);
});

// Configuración de la vista (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.get('/', (req, res) => {
  // Definir un array de valoraciones de ejemplo o traerlo de la base de datos
  const valoraciones = [
    { nombre: 'Usuario 1', comentario: 'Me encantó el jabón de mandarina. Su aroma es relajante.', calificacion: 5 },
    { nombre: 'Usuario 2', comentario: 'El jabón de melón es muy refrescante.', calificacion: 4 },
  ];

  // Pasar el array de valoraciones al archivo EJS
  res.render('index', { valoraciones });
});

// Ruta para manejar las valoraciones (POST)
app.post('/agregar-valoracion', (req, res) => {
  const { calificacion, comentario } = req.body;

  // Aquí se puede agregar la lógica para guardar la valoración en la base de datos
  console.log(`Calificación: ${calificacion}, Comentario: ${comentario}`);

  // Redirige al index o renderiza una vista de éxito
  res.redirect('/');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});