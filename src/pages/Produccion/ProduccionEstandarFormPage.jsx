import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PreguntasProduccionEstandarData } from "../../data/PreguntasProduccion/PreguntasProduccionEstandarData";
import AuditoriaContext, { AUDIT_TYPES } from "../../context/AuditoriaContext";
import QuestionItem from "../../components/QuestionItem/QuestionItem";
import BackButton from "../../components/Buttons/BackButton/BackButton";
import SaveButton from "../../components/Buttons/SaveButton/SaveButton";

const ProduccionEstandarFormPage = () => {
    const {
        respuestasSecciones,
        setRespuestasSecciones,
        setAuditType
    } = useContext(AuditoriaContext);

    const [respuestas, setRespuestas] = useState({});

    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    useEffect(() => {
        setAuditType(AUDIT_TYPES.PRODUCCION);
        setRespuestas(respuestasSecciones.estandar || {});
    }, []);

    const handleChange = (idPregunta, valor) => {
        setRespuestas((prev) => ({
            ...prev,
            [idPregunta]: valor
        }));
    };

    const handleSave = () => {
        const nuevasRespuestas = {
            ...respuestasSecciones,
            estandar: respuestas
        };

        setRespuestasSecciones(nuevasRespuestas);
        navigate("/categorias-auditoria-produccion-sostener");
    };

    const handleBack = () => {
        navigate("/categorias-auditoria-produccion-limpieza");
    };


    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-primary to-secondary rounded-xl px-6 py-4 shadow-md">
                        <h1 className="text-2xl font-bold text-white text-center">
                            Auditoría de producción - Categoría Estándar
                        </h1>
                        <p className="text-white text-center mt-1">
                            Califique cada aspecto del 1 al 5
                        </p>
                    </div>

                    <form className="bg-white shadow-xl rounded-b-xl overflow-hidden">
                        <div className="p-6 sm:p-8 space-y-8">
                            {
                                PreguntasProduccionEstandarData.map((pregunta, index) =>(
                                    <QuestionItem
                                        key={ pregunta.id }
                                        index={ index }
                                        pregunta={ pregunta }
                                        value={ respuestas[pregunta.id] }
                                        onChange={(valor) => handleChange(pregunta.id, valor)}
                                    />
                                ))
                            }
                        </div>

                        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t border-gray-200">
                            <BackButton onClick={ handleBack }/>
                            <SaveButton onClick={ handleSave }/>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ProduccionEstandarFormPage