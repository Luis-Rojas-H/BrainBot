import { useState } from "react";
import "../css/Pregunta.css";
import NotaFinal from "./NotaFinal";
import { HiMicrophone } from "react-icons/hi";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function Pregunta({pregunta, opciones, longitud, iterador, respuesta}){
    const [selectedOption, setSelectedOption] = useState(null);
    const [aux, setAux] = useState(-1);
    const [correctas, setCorrectas] = useState(0);
    const [datos, setDatos] = useState([]);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);

        let acerto= false;
        if(opciones[event.target.value] === respuesta){
            setCorrectas(correctas + 1);
            acerto = true;
        }
        const nuevoObjeto = {
            preg: pregunta,
            opc: opciones,
            resp: respuesta,
            marco: event.target.value,
            acert: acerto,
        }
        setDatos((prevDatos) => prevDatos.concat(nuevoObjeto));
    };

    if(aux < iterador){
        setAux(iterador);
        setSelectedOption(null);
    }

    /*---------------------------------- */
    const { transcript, listening,  resetTranscript } = useSpeechRecognition();

    const handleStartListening = () => {
        SpeechRecognition.startListening({ continuous: true, language: 'es-ES' });
    };

    const handleStopListening = () => {
        SpeechRecognition.stopListening();

        if(transcript.includes(" ")){
            const ultimoEspacio = transcript.lastIndexOf(' ');
            const resultado = transcript.substring(ultimoEspacio + 1).trim();
            if(resultado==="1") setSelectedOption("0");
            else if(resultado==="2") setSelectedOption("1");
            else if(resultado==="3") setSelectedOption("2");
            else if(resultado==="4") setSelectedOption("3");

            let acerto= false;
        if(opciones[resultado - 1] === respuesta){
            setCorrectas(correctas + 1);
            acerto = true;
        }
        const nuevoObjeto = {
            preg: pregunta,
            opc: opciones,
            resp: respuesta,
            marco: resultado - "1",
            acert: acerto,
        }
        setDatos((prevDatos) => prevDatos.concat(nuevoObjeto));
        }
        resetTranscript();
    };
    /*---------------------------------------------- */

    return(
        <div className="container__esctructura__pregunta">
            <div className="container__numero__pregunta">
                {longitud === iterador ? "" : `Pregunta ${iterador + 1}`}
            </div>
            <div className="container__pregunta__">{longitud === iterador ? "" : pregunta}</div>
            <div className="container__opciones__">
                <div className="container__seleccione">{longitud === iterador ? "" : "Seleccione la respuesta Correcta:"}</div>
                {longitud === iterador ? <NotaFinal cantidad={longitud} correctas={correctas} datos={datos}/> : opciones.map((opc, index) => {
                    return(
                            <label key={index}>
                                <input
                                type="radio"
                                value={index}
                                checked={selectedOption === `${index}`}
                                onChange={handleOptionChange}
                                />
                                {opc}
                            </label>
                    )
                })
            }
            {longitud === iterador ? "" : <div className='container__micro__rcp' onPointerDown={handleStartListening} onPointerUp={handleStopListening} disabled={listening}>
                <HiMicrophone/>
            </div>}
            </div>
        </div>
    )
}