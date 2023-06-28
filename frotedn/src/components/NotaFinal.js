import { useEffect, useState } from 'react';
import '../css/NotaFinal.css';
import feliz from '../images/feliz.gif';
import triste from '../images/triste.gif';

export default function NotaFinal({cantidad, correctas, datos}){
    const [nota, setNota] = useState(0);
    const [estado, setEstado] = useState('');
    const [selected, setSelected] = useState(true);

    useEffect(()=> {
        const aux = (20*correctas)/cantidad;
        if(aux >= 0 && aux < 10) setEstado(triste);
        else setEstado(feliz);
        setNota(aux);
        console.log(datos);
    },[cantidad, correctas, datos]);

    const handledSelected = () => {
        setSelected(false);
    }

    return(
        <div className="container__nota__final">
            { selected ? <div>
                <div className="container__texto">
                    La calificación que obtuviste es
                </div>
                <div className="container__nota">
                    <img src={estado} alt=''/>
                    <div>{nota}</div>
                </div>
                <div onClick={handledSelected} className='solucionario'>Ver Solucionario</div>
            </div>
        
            :

            <div className='container__solucionario'>
                <div className='container__titulo__solucionario'>Solucionario</div>
                <div className='nota__solucionario'>Nota: {nota}</div>
                {datos.map((d, index) => {
                    return(
                        <div key={index} className='container__preguntas__solucionario'>
                            <div className='container__preg'>{`${index + 1} ${d.preg}`}</div>
                            <div className='container__opc__solucionario'>
                                {d.opc.map((op,i) => {
                                    return(
                                        <label key={i}>
                                            <input
                                            type="radio"
                                            value={i}
                                            checked={d.marco === `${i}`}
                                            />
                                            {`${d.marco}` === `${i}` ? <span className={d.acert ? "verificar__solucionario1" : "verificar__solucionario2"}>{op}</span> : <span>{op}</span>}
                                        </label>
                                    )
                                })}
                            </div>
                            <div className='container__resp__solucionario'>{`Respuesta correcta: ${d.resp}`}</div>
                        </div>
                    )
                })}
            </div>}
        </div>
    )
}