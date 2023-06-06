const express = require("express");
const cors = require("cors");
const app = express();
const port = 3011;

app.use(cors());


app.get("/productos", (req, res) => {  
  const productos = [
    { nombre: "Pantalón", price: 10000 },
    { nombre: "Remera", price: 20000 },
    { nombre: "Zapatilla", price: 30000 }
  ];

  res.json(productos);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
