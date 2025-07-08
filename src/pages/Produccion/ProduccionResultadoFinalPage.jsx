import { useContext, useEffect } from "react";
import AuditoriaContext from "../../context/AuditoriaContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import config from "../../../config";

const ProduccionResultadoFinalPage = () => {
    const { auditorData, respuestasSecciones, setRespuestasSecciones } = useContext(AuditoriaContext);
    const navigate = useNavigate();

    const calcularCalificacion = (respuestas) => {
        return Object.values(respuestas).reduce((sum, val) => sum + val * 0.2, 0);
    };

    const califSeleccion = calcularCalificacion(respuestasSecciones.seleccion);
    const califOrden = calcularCalificacion(respuestasSecciones.orden);
    const califLimpieza = calcularCalificacion(respuestasSecciones.limpieza);
    const califEstandar = calcularCalificacion(respuestasSecciones.estandar);
    const califSostender = calcularCalificacion(respuestasSecciones.sostener);

    const resultadoFinal = (califSeleccion + califOrden + califLimpieza + califEstandar + califSostender) * 0.2;

    const getColorClass = (score) => {
        if(score >= 5) return "bg-green-100 text-green-800";
        if(score >= 4) return "bg-blue-100 text-blue-800";
        if(score >= 2) return "bg-yellow-100 text-yellow-800";

        return "bg-red-100 text-red-800";
    };

    const getIcon = (score) => {
        if(score >= 5) return "👍";
        if(score >= 4) return "👌";
        if(score >= 2) return "⚠️";

        return "❌";
    };

    const handleNavigate = (path) => {
        navigate(path);
    };

    const getResponsesToSend = () => {
        const answers = [];
    
        const processSection = (section, startId) => {
            return Object.entries(section).map(([_, score], i) => ({
                idQuestion: startId + i,
                score
            }));
        };
    
        answers.push(...processSection(respuestasSecciones.seleccion, 1));
        answers.push(...processSection(respuestasSecciones.orden, 6));
        answers.push(...processSection(respuestasSecciones.limpieza, 12));
        answers.push(...processSection(respuestasSecciones.estandar, 16));
        answers.push(...processSection(respuestasSecciones.sostener, 19));
    
        return answers;
    };
    

    const validateAllAnswered = (answers) => {
        const maxIdQuestion = 22;
        const preguntasFaltantes = [];
    
        for (let i = 1; i <= maxIdQuestion; i++) {
            const found = answers.find(a => a.idQuestion === i && typeof a.score === "number" && a.score >= 1 && a.score <= 5);
            if (!found) {
                preguntasFaltantes.push(i);
            }
        }
    
        if (preguntasFaltantes.length > 0) {
            Swal.fire({
                icon: "warning",
                title: "Faltan respuestas",
                html: `Estas preguntas no fueron contestadas correctamente: <b>${preguntasFaltantes.join(", ")}</b>`
            });
    
            return false;
        }
    
        return true;
    };    
    

    const sendDataToBackend = async () => {
        const answers = getResponsesToSend();
    
        if (!validateAllAnswered(answers)) {
            return;
        };        
    
        const payload = {
            responsible: auditorData.responsible,
            area: auditorData.area,
            description: "",
            idForm: 1,
            answers: answers
        };
    
        try {
            const response = await fetch(`${config}/Audits/Register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
    
            if (response.ok) {
                localStorage.removeItem("auditoriaRespuestas");
                Swal.fire({
                    icon: "success",
                    title: "Auditoría guardada",
                    text: "Los resultados han sido registrados exitosamente.",
                    timer: 2000,
                    showConfirmButton: false
                });
                navigate("/");
            } else {
                const errorData = await response.json();
                console.error("Error del servidor:", errorData);
                Swal.fire({
                    icon: "error",
                    title: "Hubo un error",
                    text: "No se pudo guardar la auditoría."
                });
            }
        } catch (error) {
            console.error("Error al enviar datos:", error);
            Swal.fire({
                icon: "error",
                title: "Error de conexión",
                text: "Hubo un problema al enviar los datos."
            });
        }
    };

    useEffect(() => {
        const saved = localStorage.getItem("auditoriaRespuestas");
    
        if (saved && Object.values(respuestasSecciones).every(section => Object.keys(section).length === 0)) {
            try {
                const parsed = JSON.parse(saved);
                setRespuestasSecciones(parsed);
            } catch (error) {
                console.error("Error al parsear localStorage:", error);
            }
        }
    }, []);

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-primary to-secondary rounded-t-xl px-6 py-5 shadow-lg">
                        <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
                            Resultado final de adutoría
                        </h1>
                        <p className="text-blue-100 text-center mt-1">
                            Resumen de calificaciones por categoría
                        </p>                        
                    </div>

                    <div className="bg-white shadow-xl rounded-b-xl overflow-hidden divide-y divide-gray-200">
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Tarjeta de selección */}
                                <div className={`p-4 rounded-lg ${getColorClass(califSeleccion)} border-l-4 ${califSeleccion >= 5 ? "border-green-500": 
                                    califSeleccion >= 4 ? "border-blue-500" : califSeleccion >= 2 ? "border-yellow-500" : "border-red-500"}`}
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold">
                                            Selección
                                        </h3>
                                        <span className="text-2xl">{ getIcon(califSeleccion) }</span>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between">
                                        <span className="text-3xl font-bold">
                                            { califSeleccion.toFixed(1) }
                                        </span>
                                        <div className="w-full max-w-xs ml-4">
                                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${califSeleccion >= 5 ? "bg-green-500" : califSeleccion >= 4 ? "bg-blue-500" : 
                                                        califSeleccion >= 2 ? "bg-yellow-500" : "bg-red-500"}`}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Tarjeta de orden */}
                                <div className={`p-4 rounded-lg ${getColorClass(califOrden)} border-l-4 ${califOrden >= 5 ? "border-green-500" : 
                                    califOrden >= 4 ? "border-blue-500" : califOrden >= 2 ? "border-yellow-500" : "border-red-500"}`}>
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold">Orden</h3>
                                        <span className="text-2xl">{ getIcon(califOrden) }</span>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between">
                                        <span className="text-3xl font-bold">
                                            { califOrden.toFixed(1) }
                                        </span>
                                        <div className="w-full max-w-xs ml-4">
                                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${califOrden >= 5 ? "bg-green-500" : 
                                                        califOrden  >= 4 ? "bg-blue-500" : califOrden >= 2 ? "bg-yellow-500" : "bg-red-500"}`}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={`p-4 rounded-lg ${getColorClass(califLimpieza)} border-l-4 ${califLimpieza >= 5 ? "border-green-500" : 
                                    califLimpieza >= 4 ? "border-blue-500" : califLimpieza >= 2 ? "border-yellow-500" : "border-red-500"}`}>
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold">Limpieza</h3>
                                        <span className="text-2xl">{ getIcon(califLimpieza) }</span>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between">
                                        <span className="text-3xl font-bold">
                                            { califLimpieza.toFixed(1) }
                                        </span>
                                        <div className="w-full max-w-xs ml-4">
                                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${califLimpieza >= 5 ? "bg-green-500" : 
                                                        califLimpieza  >= 4 ? "bg-blue-500" : califLimpieza >= 2 ? "bg-yellow-500" : "bg-red-500"}`}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={`p-4 rounded-lg ${getColorClass(califEstandar)} border-l-4 ${califEstandar >= 5 ? "border-green-500" : 
                                    califEstandar >= 4 ? "border-blue-500" : califEstandar >= 2 ? "border-yellow-500" : "border-red-500"}`}>
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold">Estandar</h3>
                                        <span className="text-2xl">{ getIcon(califEstandar) }</span>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between">
                                        <span className="text-3xl font-bold">
                                            { califEstandar.toFixed(1) }
                                        </span>
                                        <div className="w-full max-w-xs ml-4">
                                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${califEstandar >= 5 ? "bg-green-500" : 
                                                        califEstandar  >= 4 ? "bg-blue-500" : califEstandar >= 2 ? "bg-yellow-500" : "bg-red-500"}`}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={`p-4 rounded-lg ${getColorClass(califSostender)} border-l-4 ${califSostender >= 5 ? "border-green-500" : 
                                    califSostender >= 4? "border-blue-500" : califSostender >= 2 ? "border-yellow-500" : "border-red-500"}`}>
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold">Sostener</h3>
                                        <span className="text-2xl">{ getIcon(califSostender) }</span>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between">
                                        <span className="text-3xl font-bold">
                                            { califSostender.toFixed(1) }
                                        </span>
                                        <div className="w-full max-w-xs ml-4">
                                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${califSostender >= 5 ? "bg-green-500" : 
                                                        califSostender  >= 4 ? "bg-blue-500" : califSostender >= 2 ? "bg-yellow-500" : "bg-red-500"}`}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="p-6 bg-gray-50">
                                    <div className="flex flex-col items-center">
                                        <h3 className="text-lg font-medium text-gray-500 mb-2">
                                            Calificación final
                                        </h3>
                                        <div className={`text-5xl font-bold rounded-full h-32 w-32 flex items-center justify-center shadow-inner 
                                            ${resultadoFinal >= 5 ? 'bg-green-500 text-white' : 
                                                resultadoFinal >= 4 ? 'bg-blue-500 text-white' : 
                                                resultadoFinal >= 2 ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'}`}>
                                            { resultadoFinal.toFixed(1) }
                                        </div>
                                        <p className="mt-4 text-lg font-medium text-gray-700">
                                            {resultadoFinal >= 5 ? 'Excelente - Cumple con todos los estándares' :
                                                resultadoFinal >= 4 ? 'Bueno - Cumple con la mayoría de estándares' :
                                                resultadoFinal >= 2 ? 'Regular - Necesita mejoras' : 'Deficiente - Requiere acción inmediata'}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex justify-between gap-">                                
                                    <div className="bg-gray-50 px-6 py-4 flex justify-center border-t border-gray-200">
                                        <button
                                            onClick={() => handleNavigate("/categorias-auditoria-produccion-sostener")}
                                            className="items-center px-3 py-1 border border-transparent text-base
                                                font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700
                                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:cursor-pointer
                                                me-2
                                            "
                                        >
                                            Volver
                                        </button>
                                        
                                        <button
                                            onClick={ sendDataToBackend }
                                            className="items-center px-3 py-1 border border-transparent text-base
                                                font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700
                                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:cursor-pointer
                                            "
                                        >                                            
                                            Guardar los resultados
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProduccionResultadoFinalPage