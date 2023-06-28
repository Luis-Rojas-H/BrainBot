import {RiFileListLine} from 'react-icons/ri'; 
import {GiBookshelf} from 'react-icons/gi'; 
import {HiLightBulb} from 'react-icons/hi';

const opciones = [
    {
        titulo: "Generador de Examen",
        ruta: "/examen",
        icono: <RiFileListLine/>,
    },
    {
        titulo: "Recomendador de Materiales",
        ruta: "/materiales-estudio",
        icono: <GiBookshelf/>,
    },
    {
        titulo: "Explicación de Conceptos",
        ruta: "/conceptos",
        icono: <HiLightBulb/>,
    }
]

export default opciones;