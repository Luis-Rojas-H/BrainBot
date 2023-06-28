const { Configuration, OpenAIApi } = require("openai");

require("dotenv").config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const Chatgpt = {
    generarExamen: async function (curso, nivel, nropreguntas) {
        let consulta = `Genera ${nropreguntas} preguntas de nivel ${nivel} del curso de ${curso}, esas preguntas son objetos en este formato {
            "Pregunta": "",
            "Opciones": [],
            "Respuesta": ""
        } los cuales estan guardados en un array generando un array de objetos`;

        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: consulta,
            max_tokens: 3000,
        });

        return completion.data.choices[0].text;
    },

    recomendarMaterial: async function (tema) {
        let consulta = `Recomiendame los mejores sobre ${tema}, maximo 3, desde el año 1950 en adelante, esos libros son objetos en este formato {
            "titulo": "",
            "autor": "",
            "editorial": "",
            "anio"
        } los cuales estan guardados en un array generando un array de objetos`;

        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: consulta,
            max_tokens: 3000,
        });

        return completion.data.choices[0].text;
    },

    explicarConcepto: async function (concepto) {
        let consulta = `${concepto}.  Explicame en maximo 20 palabras, esa respuesta es un objeto en este formato {
            "respuesta": ""
        } el cual esta guardado en un array generando un array de objetos`;

        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: consulta,
            max_tokens: 3000,
        });

        return completion.data.choices[0].text;
    },
};

module.exports = Chatgpt;
