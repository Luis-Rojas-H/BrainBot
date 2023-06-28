import { useRef, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { HiMicrophone } from "react-icons/hi";

function Microfono() {

    const commands = [
        {
            command: "abrir examen",
            callback: (website) => {
                let page =
                    "http://localhost:3000/examen";
                console.log(page);
                window.location.replace(page);
            },
        },
        {
            command: "regresar a principal",
            callback: (website) => {
                let page =
                    "http://localhost:3000/";
                console.log(page);
                window.location.replace(page);
            },
        },
        {
            command: "generar examen",
            callback: (website) => {
                let page =
                    "http://localhost:3000/preguntas";
                console.log(page);
                window.location.replace(page);
            },
        },
    ];

    const { transcript, resetTranscript } = useSpeechRecognition({ commands });
    const [isListening, setIsListening] = useState(false);
    const microphoneRef = useRef(null);

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return (
            <div className="mircophone-container">
                Browser is not Support Speech Recognition.
            </div>
        );
    }

    const handleListing = () => {
        resetTranscript();
        setIsListening(true);
        microphoneRef.current.classList.add("listening");
        SpeechRecognition.startListening({
            continuous: true,
            language: "es-ES",
        });
    };
    const stopHandle = () => {
        setIsListening(false);
        microphoneRef.current.classList.remove("listening");
        SpeechRecognition.stopListening();
    };

    /*
    const handleReset = () => {
        stopHandle();
        resetTranscript();
    };
    */

    return (
        <div className="container__microfono__new">
            {console.log(transcript)}
            <div className="mircophone-container">
                <div
                    className="microphone-icon-container"
                    ref={microphoneRef}
                    onPointerDown={handleListing}
                    onPointerUp={stopHandle}
                >
                    <HiMicrophone/>
                </div>
            </div>
        </div>
    );
}
export default Microfono;
