import "../css/Main.css";
import fondo from "../images/fondo.PNG";
import opciones from "../assets/opciones";
import { useState } from "react";
import { AiFillCloseCircle, AiFillHome } from "react-icons/ai";
import MaterialesEstudio from "./MaterialesEstudio";
import Conceptos from "./Conceptos";
import Microfono from "../components/Microfono";

function seleccionado(i) {
    if (i === 1) return <MaterialesEstudio />;
    else return <Conceptos />;
}

export default function Main() {
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);

    const handleVisible = (i) => {
        setSelected(i);
        if (i === 1 || i === 2) setVisible(true);
        else setVisible(false);
    };

    return (
        <div className="container__main">
            <div className="container__titulo">Bienvenido a BrainBot</div>
            <div className="container__main__">
                <div className="container__imagen">
                    <img src={fondo} alt="imagen" />
                </div>
                <div className="container__opciones">
                    {opciones.map((opc, index) => {
                        return (
                            <div className="container__opcion" key={index}>
                                {index === 0 ? (
                                    <a href={opc.ruta}>
                                        <div className="container__it">
                                            <div>{opc.icono}</div>
                                            <div>{opc.titulo}</div>
                                        </div>
                                    </a>
                                ) : (
                                    <div
                                        className={selected === index ? 'container__it2' : 'container__it'}
                                        onClick={() => handleVisible(index)}
                                    >
                                        <div>{opc.icono}</div>
                                        <div>{opc.titulo}</div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                <div
                    className={
                        visible ? "container__rec__con" : "container__rec__con2"
                    }
                >
                    <div className="container__close">
                        <div className="container__titulo">
                            {selected === 1
                                ? "Materiales de Estudio"
                                : "Explicación de Conceptos y Textos"}
                        </div>
                        <AiFillCloseCircle
                            className="icono"
                            onClick={() => handleVisible(3)}
                        />
                    </div>
                    {seleccionado(selected)}
                </div>
            </div>
            
            <div className="container__microfono">
                <div className="container__icono">
                    <Microfono className='icono'/>
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
