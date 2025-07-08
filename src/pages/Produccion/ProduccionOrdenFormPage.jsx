import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PreguntasProduccionOrdenData } from "../../data/PreguntasProduccion/PreguntasProduccionOrdenData";
import AuditoriaContext from "../../context/AuditoriaContext";

const ProduccionOrdenFormPage = () => {
    const { respuestasSecciones, setRespuestasSecciones } = useContext(AuditoriaContext);

    const [respuestas, setRespuestas] = useState(respuestasSecciones.orden || {});

    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleChange = (pregunta, valor) => {
        setRespuestas((prev) => ({
            ...prev,
            [pregunta]: valor
        }));
    };

    const hanldeSave = () => {
        const nuevasRespuestas = {
            ...respuestasSecciones,
            orden: respuestas
        };
    
        setRespuestasSecciones(nuevasRespuestas);
        localStorage.setItem("auditoriaRespuestas", JSON.stringify(nuevasRespuestas));

        handleNavigate("/categorias-auditoria-produccion-limpieza");
    };
    
    

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-primary to-secondary rounded-xl px-6 py-4 shadow-md">
                        <h1 className="text-2xl font-bold text-white text-center">
                            Auditoría de producción - Categoría Orden
                        </h1>
                        <p className="text-white text-center mt-1">
                            Califique cada aspecto del 1 al 5
                        </p>
                    </div>

                    <form className="bg-white shadow-xl rounded-b-xl overflow-hidden">
                        <div className="p-6 sm:p-8 space-y-8">
                            {
                                PreguntasProduccionOrdenData.map((pregunta, index) =>(
                                    <div key={ pregunta.id } className="space-y-4">
                                        <div className="flex items-start">
                                            <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full
                                            bg-primary text-white font-medium mr-3 mt-0.5">
                                                { index + 1 }
                                            </span>
                                            <label className="block text-sm font-medium text-gray-700">
                                                { pregunta.texto }
                                            </label>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {[1, 2, 3, 4, 5].map(valor => (
                                                <label
                                                    key={ valor }
                                                    className={`flex items-center justify-center h-10 w-10 rounded-full border-2 cursor-pointer transition-all
                                                        ${respuestas[pregunta.id] === valor
                                                            ? "bg-blue-600 text-white border-blue-700 shadow-inner"
                                                            : "bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-300"
                                                        }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        id={`${pregunta.id}-${valor}`}
                                                        name={ pregunta.id }
                                                        value={ valor }
                                                        checked={ respuestas[pregunta.id] === valor }
                                                        onChange={() => handleChange(pregunta.id, valor)}
                                                        className="sr-only"
                                                        required
                                                    />
                                                    { valor }
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => handleNavigate("/categorias-auditoria-produccion-seleccion")}
                                className="inline-flex items-center px-4 py-2 border border-gray-300
                                shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white
                                hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2
                                focus:ring-blue-500 hover:cursor-pointer"
                            >
                                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Volver
                            </button>
                            <button
                                onClick={ hanldeSave }
                                className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium
                                rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none
                                focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200
                                hover:cursor-pointer"
                            >
                                Guardar respuestas
                                <svg className="h-5 w-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>                           
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ProduccionOrdenFormPage