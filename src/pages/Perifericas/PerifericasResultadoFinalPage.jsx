import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPhoto } from "../../services/photoStorage";
import AuditoriaContext from "../../context/AuditoriaContext";
import Swal from "sweetalert2";
import config from "../../../config";
import ScoreCard from "../../components/ScoreCard/ScoreCard";
import FinalScore from "../../components/FinalScore/FinalScore";

const PerifericasResultadoFinalPage = () => {
    const { 
        auditState,
        AUDIT_TYPES,
        setAuditType,
        clearAllData
    } = useContext(AuditoriaContext);
    
    const { auditorData, respuestasSecciones } = auditState[AUDIT_TYPES.PERIFERICOS] || {
        auditorData: {},
        respuestasSecciones: {
            seleccion: {},
            orden: {},
            limpieza: {},
            estandar: {},
            sostener: {}
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        setAuditType(AUDIT_TYPES.PERIFERICOS);
        
        console.log("Datos completos:", auditState);
        console.log("Datos de periféricos:", auditState[AUDIT_TYPES.PERIFERICOS]);
    }, [setAuditType]);


    const calcularCalificacion = (respuestas) => {
        return Object.values(respuestas).reduce((sum, val) => sum + (val || 0) * 0.2, 0);
    };

    const califSeleccion = calcularCalificacion(respuestasSecciones.seleccion);
    const califOrden = calcularCalificacion(respuestasSecciones.orden);
    const califLimpieza = calcularCalificacion(respuestasSecciones.limpieza);
    const califEstandar = calcularCalificacion(respuestasSecciones.estandar);
    const califSostener = calcularCalificacion(respuestasSecciones.sostener);

    const resultadoFinal = (califSeleccion + califOrden + califLimpieza + califEstandar + califSostener) * 0.2;

    const getResponsesToSend = () => {
        const answers = [];

        const processSection = (section, startId) => {
            return Object.entries(section).map(([key, score], i) => ({
                IdQuestion: startId + i,
                score: parseInt(score)
            }));
        };

        answers.push(...processSection(respuestasSecciones.seleccion, 1));
        answers.push(...processSection(respuestasSecciones.orden, 4));
        answers.push(...processSection(respuestasSecciones.limpieza, 7));
        answers.push(...processSection(respuestasSecciones.estandar, 10));
        answers.push(...processSection(respuestasSecciones.sostener, 13));

        return answers;
    };


    const validateAllAnswered = (answers) => {
        if (!auditorData.responsible || !auditorData.area) {
            Swal.fire({
                icon: 'error',
                title: 'Datos incompletos',
                text: 'Nombre del auditor y área son campos obligatorios'
            });
            return false;
        }

        const invalidAnswers = answers.filter(a => a.score < 1 || a.score > 5);
        
        if (invalidAnswers.length > 0) {
            Swal.fire({
                icon: "error",
                title: "Puntuaciones inválidas",
                text: `Hay ${invalidAnswers.length} respuestas fuera del rango 1-5`
            });
            return false;
        }

        return true;
    };

    const sendDataToBackend = async () => {
        const answers = getResponsesToSend();

        // if(!validateAllAnswered(answers)) return;

        try {
            const swalInstance = Swal.fire({
                title: "Guardando...",
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading()
            });

            const formData = new FormData();
            formData.append('Responsible', auditorData.responsible);
            formData.append('Area', auditorData.area);
            formData.append('Description', auditorData.description || "");
            formData.append('IdForm', '2');
            
            formData.append('Answers', JSON.stringify(answers));

            if (auditorData.photoRefs?.length > 0) {
                const photo = await getPhoto(auditorData.photoRefs[0].id);
                formData.append('Photo', photo);
            }

            console.log("Answers a enviar:", answers);

            const response = await fetch(`${config.apiUrl}/Audits/Register`, {
                method: "POST",
                body: formData
            });

            if (!response.ok) throw new Error(await response.text());

            await clearAllData();
            await swalInstance.close();
            
            Swal.fire({
                icon: "success",
                title: "¡Auditoría guardada!",
                text: "Los resultados se registraron correctamente",
                timer: 2000,
                showConfirmButton: false
            }).then(() => navigate("/"));
            
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message || "Ocurrió un error al guardar"
            });
        }
    };

    const handleBack = () => {
        navigate("/categorias-auditoria-perifericas-sostener");
    };

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
                                <ScoreCard
                                    titulo="Selección"
                                    puntuacion={ califSeleccion }
                                />

                                <ScoreCard
                                    titulo="Orden"
                                    puntuacion={ califOrden }
                                />

                                <ScoreCard
                                    titulo="Limpieza"
                                    puntuacion={ califLimpieza }
                                />

                                <ScoreCard
                                    titulo="Estandar"
                                    puntuacion={ califEstandar }
                                />

                                <ScoreCard
                                    titulo="Sostener"
                                    puntuacion={ califSostener }
                                />

                                <FinalScore
                                    puntuacion={ resultadoFinal }
                                />
                            </div>
                        </div>
                        <div className="flex justify-between gap-">                                
                            <div className="bg-gray-50 px-6 py-4 flex justify-center border-t border-gray-200">
                                <button
                                    onClick={ handleBack }
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
        </>
    )
}

export default PerifericasResultadoFinalPage