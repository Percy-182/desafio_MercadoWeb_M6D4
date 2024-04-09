const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const path = require("path"); // Importa el módulo 'path' para manejar rutas

// Se indica la ruta a seguir de las imágenes de frutas
app.use(express.static(path.join(__dirname, "assets", "img")));
//

// Indicamos la ruta a seguir de Bootstrap
app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "node_modules", "bootstrap", "dist"))
);

// Se indica la ruta a seguir de JQuery
app.use(
  "/jquery",
  express.static(path.join(__dirname, "node_modules", "jquery", "dist"))
);
app.set("view engine", "handlebars");

app.engine(
  "handlebars",
  exphbs.engine({
    layoutsDir: __dirname + "/views",
    partialsDir: __dirname + "/views/componentes/",
  })
);

const frutas = ["banana", "cebollas", "pimenton", "papas", "lechuga", "tomate"];

app.get("/inicio", function (req, res) {
  res.render("inicio", {
    layout: "inicio",
    frutas: frutas,
  });
});

app.get("/dashboard", function (req, res) {
  res.render("dashboard", {
    layout: "dashboard",
    frutas: { frutas },
  });
});

//Ruta generica con msj
app.get("*", (req, res) => {
  //
  res.send("Esta página no existe");
});

//***************************************************************** */
//http://localhost:3000/

app.listen(3000, () => {
  //para informar visualmente por consola el inicio del server
  console.log("El servidor está inicializado en el puerto 3000");
});
