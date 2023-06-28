const Chatgpt = require("../controllers/controllerChatgpt");
const express = require("express");
const router = express.Router();

function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

router.post("/generarExamen", async (req, res) => {
    let text;
    let startChar;
    let endChar;
    let startIndex;
    let endIndex;
    let jsonString;

    // let nropreguntas = 5;
    // let nivel = "básico";
    // let curso = "Física";

    let peticion = req.body;

    console.log(peticion);

    text = await Chatgpt.generarExamen(
        peticion.curso,
        peticion.nivel,
        peticion.nropreguntas
    );

    console.log(text);

    startChar = "[";
    endChar = "]";

    startIndex = text.indexOf(startChar);
    endIndex = text.lastIndexOf(endChar);

    jsonString = text.substring(startIndex, endIndex + 1);

    json = JSON.parse(jsonString);

    res.send(json);
});

router.post("/recomendarMaterial", async (req, res) => {
    let text;
    let startChar;
    let endChar;
    let startIndex;
    let endIndex;
    let jsonString;

    // let nropreguntas = 5;
    // let nivel = "básico";
    // let curso = "Física";

    let peticion = req.body;

    console.log(peticion);

    text = await Chatgpt.recomendarMaterial(peticion.tema);

    console.log(text);

    startChar = "[";
    endChar = "]";

    startIndex = text.indexOf(startChar);
    endIndex = text.lastIndexOf(endChar);

    jsonString = text.substring(startIndex, endIndex + 1);

    json = JSON.parse(jsonString);

    res.send(json);
});

router.post("/explicarConcepto", async (req, res) => {
    let text;
    let startChar=0;
    let endChar=0;
    let startIndex;
    let endIndex;
    let jsonString;

    // let nropreguntas = 5;
    // let nivel = "básico";
    // let curso = "Física";
    let peticion = req.body;
    
    
    console.log(peticion);
    
    text = await Chatgpt.explicarConcepto(peticion.concepto);
    
    console.log(text);
    
    

    startChar = "[";
    endChar = "]";

    startIndex = text.indexOf(startChar);
    endIndex = text.lastIndexOf(endChar);
    

    jsonString = text.substring(startIndex, endIndex + 1);

    json = JSON.parse(jsonString);

    res.send(json);
});

router.post("/generarExamenTest", async (req, res) => {
    let data = req.body;

    console.log(data);

    await delay(2000);

    let json = [
        {
            Pregunta: "¿Cuál es el concepto principal de los números reales?",
            Opciones: ["Limite", "Racionalidad", "Continuidad", "Periodicidad"],
            Respuesta: "Continuidad",
        },
        {
            Pregunta:
                "¿Cómo se llama el conjunto de los números positivos y los números negativos incluyendo el 0?",
            Opciones: [
                "Conjunto Real",
                "Conjunto Completo",
                "Conjunto Númerico",
                "Conjunto Integral",
            ],
            Respuesta: "Conjunto Integral",
        },
    ];

    // json = JSON.parse(json);

    res.send(json);
});

router.post("/recomendarMaterialTest", async (req, res) => {
    let data = req.body;

    console.log(data);

    await delay(2000);

    let json = [
        {
            titulo: "Gödel, Escher, Bach: An Eternal Golden Braid",
            autor: "Douglas R. Hofstadter",
            editorial: "Basic Books",
            anio: 1979,
        },
        {
            titulo: "Principles of Mathematical Analysis",
            autor: "Walter Rudin",
            editorial: "McGraw-Hill Education",
            anio: 1976,
        },
        {
            titulo: "The Art of Computer Programming",
            autor: "Donald E. Knuth",
            editorial: "Addison-Wesley Professional",
            anio: 1968,
        },
    ];

    // json = JSON.parse(json);

    res.send(json);
});

router.post("/explicarConceptoTest", async (req, res) => {
    let data = req.body;

    console.log(data);

    await delay(2000);

    let json = [
        {
            respuesta:
                "La audición es el sentido que nos permite percibir y procesar los sonidos a través del oído y el cerebro.",
        },
    ];

    // json = JSON.parse(json);

    res.send(json);
});

module.exports = router;
