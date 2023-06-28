import '../css/MaterialEstudio.css';
import { HiMicrophone } from "react-icons/hi";
import {useState, useEffect} from 'react';
import {AiOutlineSend} from 'react-icons/ai'
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function MateriaesEstudio(){
    const [valorInput, setValorInput] = useState('');
    const [datos, setDatos] = useState([]);
    const [realizarPeticion, setRealizarPeticion] = useState(false);

    /*comando de voz*/
    const { transcript, listening,  resetTranscript } = useSpeechRecognition();
    //const [contenido, setContenido] = useState('');

    const handleStartListening = () => {
        SpeechRecognition.startListening({ continuous: true, language: 'es-ES' });
    };

    const handleStopListening = () => {
        SpeechRecognition.stopListening();
        
        if(transcript.includes(" ")){
            const ultimoEspacio = transcript.lastIndexOf(' ');
            const resultado = transcript.substring(ultimoEspacio + 1).trim();
            setValorInput(resultado)
        }else{
            setValorInput(transcript)
        }
        resetTranscript();
        setRealizarPeticion(true);
    };

    


    /* */
    const handleChange = (event) => {
        setValorInput(event.target.value);
        setRealizarPeticion(false);
    };

    const handleClick = () => {
        setRealizarPeticion(true);
    };

    /*
    const handleKeyDown = (event) => {
        if (event.keyCode === 13) { // Verificar si se presionó la tecla Enter
            handleClick();
            setRealizarPeticion(true);
        }
    };
    */

    useEffect(() => {
        if(realizarPeticion){
            setRealizarPeticion(false);
        const fetchData = async () => {
            const url = "http://localhost:8000/api/examen/recomendarMaterial";
            const requestData = {
                tema: valorInput,
            };

            try {
                const response = await axios.post(url, requestData);
                const responseData = response.data;
                setDatos(responseData);
                //console.log(responseData)
                setValorInput(requestData.tema);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }
    setRealizarPeticion(false);
    }, [valorInput, realizarPeticion]);

    return(
        <div className='container__material__estudio'>
            <div className='container__chat'>
                {
                    datos.map((d, index) => {
                        return(
                            <div className='container__materiales' key={index}>
                                <div><span>Año:</span> {d.anio}</div>
                                <div><span>Autor:</span> {d.autor}</div>
                                <div><span>Editorial:</span> {d.editorial}</div>
                                <div><span>Titulo:</span> {d.titulo}</div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='container__escribir'>
                <div className='container__micro__rc' onPointerDown={handleStartListening} onPointerUp={handleStopListening} disabled={listening}>
                    <HiMicrophone/>
                </div>
                <input type="text" value={valorInput} onChange={handleChange} placeholder='Escribir...'/>
                <div className='container__enviar' onClick={handleClick}><AiOutlineSend/></div>
            </div>
        </div>
    )
}