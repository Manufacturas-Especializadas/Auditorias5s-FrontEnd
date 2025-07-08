import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PreguntasProduccionSostenerData } from "../../data/PreguntasProduccion/PreguntasProduccionSostenerData";
import AuditoriaContext from "../../context/AuditoriaContext";

const ProduccionSostenerFormPage = () => {
    const { respuestasSecciones, setRespuestasSecciones }  = useContext(AuditoriaContext);

    const [respuestas, setRespuestas] = useState(respuestasSecciones.sostener || {});

    const[mostrarHallazgos, setMostrarHallazgos] = useState(false);
    const[hallazgos, setHallazgos] = useState("");
    const[fotos, setFotos] = useState([]);

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

    const handleFileChange = (e) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setFotos(prev => [...prev, ...filesArray]);
        }
    };

    const removeFoto = (index) => {
        setFotos(prev => prev.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        const nuevasRespuestas = {
            ...respuestasSecciones,
            sostener: respuestas
        };
    
        setRespuestasSecciones(nuevasRespuestas);
        localStorage.setItem("auditoriaRespuestas", JSON.stringify(nuevasRespuestas));

        handleNavigate("/categorias-auditoria-produccion-resultado");
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-primary to-secondary rounded-xl px-6 py-4 shadow-md">
                        <h1 className="text-2xl font-bold text-white text-center">
                            Auditoría de producción - Categoría Sostener
                        </h1>
                        <p className="text-white text-center mt-1">
                            Califique cada aspecto del 1 al 5
                        </p>
                    </div>

                    <form className="bg-white shadow-xl rounded-b-xl overflow-hidden">
                        <div className="p-6 sm:p-8 space-y-8">
                            {
                                PreguntasProduccionSostenerData.map((pregunta, index) =>(
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
                        
                        <div className="space-y-4 pt-4 border-t border-gray-200 m-2">
                            <button
                                type="button"
                                onClick={() => setMostrarHallazgos(!mostrarHallazgos)}
                                className="flex items-center text-sm font-medium text-gray-700
                                hover:text-primary focus:outline-none hover:cursor-pointer"
                            >
                                <svg 
                                    className={`h-5 w-5 mr-2 transform transition-transform ${mostrarHallazgos ? "rotate-90" : ""}`} 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                { mostrarHallazgos ? "Ocultar hallazgos" : "Agregar hallazgos (opcional)" }
                            </button>
                            
                            {
                                mostrarHallazgos && (
                                    <>
                                        <div>
                                            <label htmlFor="hallazgos" className="block text-sm font-medium text-gray-700 mb-1">
                                                Descripción de hallazgos
                                            </label>
                                            <textarea
                                                id="hallazgos"
                                                rows={ 3 }
                                                value={ hallazgos }
                                                onChange={(e) => setHallazgos(e.target.value)}
                                                className="block w-full px-3 py-2 border border-gray-300
                                                rounded-md shadow-sm focus:outline-none focus:ring-primary
                                                focus:border-primary"
                                                placeholder="Describa el hallazgo encontrado"
                                            />
                                        </div>
                                    
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Evidencia fotográfica
                                            </label>

                                            {
                                                fotos.length > 0 && (
                                                    <div className="grid grid-cols-3 gap-2 mb-3">
                                                        {
                                                            fotos.map((foto, index) => (
                                                                <div
                                                                    key={ index }
                                                                    className="relative group"
                                                                >
                                                                    <img 
                                                                        src={URL.createObjectURL(foto)} 
                                                                        alt={`Evidencia ${index + 1}`}
                                                                        className="h-24 w-full object-cover rounded border border-gray-200"
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => removeFoto(index)}
                                                                        className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1
                                                                        opacity-0 group-hover:opacity-100 transition-opacity"
                                                                    >
                                                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                )
                                            }
                                            <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-gray-300
                                                rounded-lg cursor-pointer hover:border-primary hover:bg-gray-50 transition">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-400">
                                                        <span className="font-semibold">Haz clic para subir</span> o arrastra las fotos
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        PNG, JPG, o JPEG
                                                    </p>
                                                </div>
                                                <input 
                                                    id="fotos"
                                                    type="file"
                                                    multiple
                                                    accept="image/"
                                                    onChange={ handleFileChange }
                                                    className="hidden" 
                                                />
                                            </label>
                                        </div>
                                    </>
                                )
                            }
                        </div>

                        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => handleNavigate("/categorias-auditoria-produccion-estandar")}
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
                                onClick={ handleSave }
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

export default ProduccionSostenerFormPage