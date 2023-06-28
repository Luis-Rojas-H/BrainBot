import "../css/Examen.css";
import { AiFillHome } from "react-icons/ai";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../AppContext";
import { useState } from "react";
import Microfono from "../components/Microfono";

export default function Examen() {
    const { state, dispatch } = useContext(AppContext);
    const [inputValue, setInputValue] = useState("");
    const [completo, setCompleto] =useState(true);

    const handleChangenp = (event) => {
        dispatch({ type: "SELECT_PREGUNTAS", payload: event.target.value });
    };
    const handleChangenivel = (event) => {
        dispatch({ type: "SELECT_NIVEL", payload: event.target.value });
    };
    const handleChangecurso = (event) => {
        setInputValue(event.target.value);
        dispatch({ type: "SELECT_CURSO", payload: event.target.value });
    };

    const handleGenerarExamen = (event) => {
        if (state.preguntas !== '' && state.nivel !== '' && inputValue.trim() !== '') {
            console.log('Generando examen...');
        } else {
          event.preventDefault(); // Evita la redirección
            console.log(state.preguntas, state.nivel, state.inputValue);
            setCompleto(false);

        }
    };

    return (
        <div className="container__main">
            <div className="container__titulo">Examen</div>
            <div className="container__main__">
                <div className="container__selects">
                    <div className="container__titulo__reto">
                        Elije tu Examen
                    </div>
                    <div className="container__select">
                        <div className="container__pnc">N° de preguntas:</div>
                        <select
                            value={state.preguntas}
                            onChange={handleChangenp}
                        >
                            <option value="">Seleccionar opción</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className="container__select">
                        <div className="container__pnc">Nivel:</div>
                        <select
                            value={state.nivel}
                            onChange={handleChangenivel}
                        >
                            <option value="">Seleccionar opción</option>
                            <option value="Básico">Básico (Escolar)</option>
                            <option value="Intermedio">Intermedio (pre-universitario)</option>
                            <option value="Avanzado">Avanzado (universitario)</option>
                        </select>
                    </div>
                    <div className="container__select">
                        <div className="container__pnc">Curso y/o Tema:</div>
                        <input
                            type="text"
                            value={inputValue}
                            placeholder="Escribir curso o tema sin espacios"
                            onChange={handleChangecurso}
                        />
                    </div>
                    <div className="container__boton_generar">
                        <div className="boton__generar">
                        {state.preguntas !== '' && state.nivel !== '' && inputValue.trim() !== '' ? (
                            <Link to="/preguntas">Generar Examen</Link>
                            ) : (
                            <div className="container__noselec" onClick={handleGenerarExamen}>Generar Examen</div>
                        )}
                        </div>
                    </div>
                    <div className="container__completar">
                        {completo ? "" : "Completar todos los espacios para generar el examen"}
                    </div>
                </div>
                <div className="container__aviso">
                    <div className="container__texto">
                        Para evaluar tus conocimientos, puedes seleccionar la
                        cantidad de preguntas que consideres apropiada, teniendo
                        en cuenta la extensión del examen y el tiempo
                        disponible. Además, puedes establecer el nivel de
                        dificultad de las preguntas según tus objetivos y el
                        nivel de dominio del tema que deseas evaluar. Por
                        último, elige el curso o materia específica sobre la
                        cual deseas enfocar el examen, asegurándote de que las
                        preguntas estén alineadas con los contenidos y objetivos
                        de ese curso.
                    </div>
                    <div className="container__importante">
                        También puede usar el microfono para generar el examen.
                    </div>
                </div>
            </div>
            <div className="container__microfono">
                <div className="container__icono">
                    <Microfono />
                </div>
                <div className="container__icono icono__home">
                    <a href="/">
                        <AiFillHome />
                    </a>
                </div>
            </div>
        </div>
    );
}
