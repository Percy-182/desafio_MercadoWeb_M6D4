//Importa el módulo Express.js que crea y configura web services.
const express = require("express");
//Crea una instancia de app Express
const app = express();
//Importa módulo Handlebars
const exphbs = require("express-handlebars");
const handlebars = require("handlebars");
// Importa el módulo 'path' para manejar rutas
const path = require("path");

// Define un helper para el mensaje de bienvenida llamado msjBienvenida que devuelve un mensaje de bienvenida formateado como una cadena HTML segura para la interpolación en las plantillas.
const msjBienvenida = () => {
  //Define una función de flecha llamada msjBienvenida que no toma ningún parámetro.
  return new handlebars.SafeString( //Crea una nueva instancia de SafeString
    `<!--Bienvenida-->
<section class="pt-2 container-fluid text-center">
  <div class="card">
    <h2 class="card-header"><strong>Bienvenidos a Mini Market🏪</strong></h2>
    <div class="card-body">
      <h5 class="card-title">Categoría <strong>Frutas</strong> </h5>
      <p class="card-text">Acontinuación podrá elegir alguno de nuestros productos en stock.</p>
      <a href="/" class="btn btn-primary">Ir al Inicio y ver los productos disponibles</a>
    </div>
  </div>
</section>`
  );
};

// Se indica la ruta a seguir de las imágenes de frutas
app.use(express.static(path.join(__dirname, "assets", "img")));

// Se indica la ruta a seguir de Bootstrap y especificada en HTML
app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "node_modules", "bootstrap", "dist"))
);

// Se indica la ruta a seguir de JQuery y especificada en HTML
app.use(
  "/jquery",
  express.static(path.join(__dirname, "node_modules", "jquery", "dist"))
);

//Esto setea a Handlebars como motor de plantillas que es...
app.set("view engine", "handlebars");

//Configura a Handlebars, especificando la ubicación
app.engine(
  "handlebars",
  exphbs.engine({
    // Ruta completa para los layouts (vistas completas)
    layoutsDir: path.join(__dirname, "views"),
    // Ruta completa para los parciales
    partialsDir: path.join(__dirname, "views", "componentes"),
    helpers: {
      msjBienvenida: msjBienvenida,
    },
  })
);

//Areglo que contiene nombre de los productos
const productos = [
  "banana",
  "cebollas",
  "pimenton",
  "papas",
  "lechuga",
  "tomate",
];

//Renderiza la vista productos
app.get("/", function (req, res) {
  res.render("inicio", {
    layout: "inicio",
    productos: productos,
  });
});

// // Ruta para la página de bienvenida y redirección al inicio
// app.get("/bienvenida", function (req, res) {
//   res.render("bienvenida");
// });

// //Renderiza la vista dashboard mostrando el arreglo
// app.get("/dashboard", function (req, res) {
//   //Punto 1
//   res.render("dashboard", {
//     layout: "dashboard",
//     productos: { productos },
//   });
// });

//Ruta generica con msj
app.get("*", (req, res) => {
  //
  res.send("Esta página no existe");
});

//***************************************************************** */
//http://localhost:3000/

//Inicia el server en el puerto especificado
app.listen(3000, () => {
  //para informar visualmente por consola el inicio del server
  console.log("El servidor está inicializado en el puerto 3000");
});
