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
        let consulta = '';
        if (tema === 'vacio') {
            consulta = `vuelveme a enviar lo mismo que me enviaste ahora ultimo en el mismo formato`;
        }
        consulta = `Recomiendame los mejores sobre ${tema}, maximo 3, desde el año 1950 en adelante, esos libros son objetos en este formato [{
            "titulo": "",
            "autor": "",
            "editorial": "",
            "anio"
        } los cuales estan guardados en un array`;

        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: consulta,
            max_tokens: 3000,
        });

        return completion.data.choices[0].text;
    },

    explicarConcepto: async function (concepto) {
        let consulta = `Explicame esto '${concepto}' en maximo 20 palabras, esa respuesta es un objeto en este formato tal cual entre corchetes [{"respuesta": ""}] los cuales estan guardados en un array generando un array de objetos. ejemplo [{"respuesta":""}]`;

        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: consulta,
            max_tokens: 3000,
        });

        return completion.data.choices[0].text;
    },
};

module.exports = Chatgpt;
