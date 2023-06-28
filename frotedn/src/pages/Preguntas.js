import "../css/Preguntas.css";
import { AiFillHome } from "react-icons/ai";
import Pregunta from "../components/Pregunta";
import { useState, useContext, useEffect } from "react";
import { GrNext } from "react-icons/gr";
import { AppContext } from "../AppContext";
import axios from "axios";
import Generando from "../components/Generando";
import Microfono from "../components/Microfono";

function obtener(iterador, data) {
    if (data.length === 0) {
        return <Generando />;
    } else if (iterador < data.length) {
        return (
            <Pregunta
                pregunta={data[iterador].Pregunta}
                opciones={data[iterador].Opciones}
                iterador={iterador}
                longitud={data.length}
                respuesta={data[iterador].Respuesta}
            />
        );
    } else if (iterador === data.length) {
        return <Pregunta longitud={data.length} iterador={iterador} />;
    }
}

function obtener2(iterador, data, curso) {
    if (data.length === 0) {
        return "Esperando ...";
    } else if (iterador < data.length) {
        return `Examen de ${curso}`;
    } else if (data.length === iterador) {
        return "Nota Final";
    }else{
        return "Solucionario"
    }
}

export default function Preguntas() {
    const [iterador, setIterador] = useState(0);
    const { state } = useContext(AppContext);
    const [data, setData] = useState([]);

    const handleIterador = () => {
        setIterador(iterador + 1);
    };

    useEffect(() => {
        const fetchData = async () => {
            const url = "http://localhost:8000/api/examen/generarExamen";
            const requestData = {
                nropreguntas: state.preguntas,
                nivel: state.nivel,
                curso: state.curso,
            };

            try {
                const response = await axios.post(url, requestData);
                const responseData = response.data;
                setData(responseData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [state.preguntas, state.nivel, state.curso]);

    return (
        <div className="container__main">
            <div className="container__titulo">
                {obtener2(iterador, data, state.curso)}
            </div>
            <div className="container__main__2">
                {obtener(iterador, data)}
                {iterador < data.length ? (
                    <div onClick={handleIterador} className="container__siguiente">
                        {data.length === iterador ? "Ver Solucionario" : "Siguiente"} <GrNext />
                    </div>
                ) : (
                    ""
                )}
            </div>
            <div className="container__microfono">
                {iterador < data.length ? 
                    ""
                : <>
                    <div className="container__icono">
                        <Microfono/>
                    </div>
                    <div className="container__icono icono__home">
                        <a href="/">
                            <AiFillHome />
                        </a>
                    </div>
                    </>
                }
            </div>
        </div>
    );
}
