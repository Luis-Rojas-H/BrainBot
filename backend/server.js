const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
const PORT = 8000;
const nameIncial = "/api"

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(nameIncial+'/examen',require("./rutas/Examen"));

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
