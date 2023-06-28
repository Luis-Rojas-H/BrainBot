import '../css/MaterialEstudio.css';
import '../css/Conceptos.css';
import { HiMicrophone } from "react-icons/hi";
import {useState, useEffect} from 'react';
import {AiOutlineSend} from 'react-icons/ai';
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function Conceptos(){
    const [valorInput, setValorInput] = useState('');
    const [datos, setDatos] = useState([]);
    const [realizarPeticion, setRealizarPeticion] = useState(false);


    //Comando de voz
    const { transcript, listening,  resetTranscript } = useSpeechRecognition();

    const handleStartListening = () => {
        SpeechRecognition.startListening({ continuous: true, language: 'es-ES' });
    };

    const handleStopListening = () => {
        SpeechRecognition.stopListening();
        if(transcript.includes(" ")){
            const ultimoEspacio = transcript.lastIndexOf(' ');
            const resultado = transcript.substring(ultimoEspacio + 1).trim();
            setValorInput(resultado);
        }else{
            setValorInput(transcript);
        }
        resetTranscript();
        setRealizarPeticion(true);
    };

    //-----------------------

  const handleChange = (event) => {
    setValorInput(event.target.value);
  };

  const handleClick = () => {
        setRealizarPeticion(true);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) { // Verificar si se presionó la tecla Enter
      handleClick();
      setRealizarPeticion(true);
    }
  };

  useEffect(() => {
    if(realizarPeticion){
        const fetchData = async () => {
            const url = "http://localhost:8000/api/examen/explicarConceptoTest";
        

            const requestData = {
                concepto: valorInput,
            };

            try {
                const response = await axios.post(url, requestData);
                const responseData = response.data;
                const nuevoDato = {
                    preg: valorInput,
                    res: responseData[0].respuesta
                };
                setDatos([...datos, nuevoDato]);
                setValorInput("");
            } catch (error) {
                console.error(error);
            }
        };
        setRealizarPeticion(false);
        fetchData();
    }
  }, [valorInput, datos, realizarPeticion]);

    return(
        <div className='container__material__estudio'>
            <div className='container__chat'>
                { 
                    datos.map((d, index) => {
                        return(
                            <div key={index}>
                                <div className='container__rc'>
                                    <div className='container__pregunta__concep'>
                                        {d.preg}
                                    </div>
                                </div>
                                <div className='container__respuesta__concep'>
                                    {d.res}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='container__escribir'>
                <div className='container__micro__rc' onPointerDown={handleStartListening} onPointerUp={handleStopListening} disabled={listening}>
                    <HiMicrophone/>
                </div>
                <input type="text" value={valorInput} onChange={handleChange} onKeyDown={handleKeyDown} placeholder='Escribir...'/>
                <div className='container__enviar' onClick={handleClick}><AiOutlineSend/></div>
            </div>
        </div>
    )
}