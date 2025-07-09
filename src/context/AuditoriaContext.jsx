import { createContext, useState } from "react";
import { cleanupPhotos } from "../services/photoStorage";

const AuditoriaContext = createContext();

export const AuditoriaProvider = ({ children }) => {
    const [auditorData, setAuditorData] = useState(() => {
        const savedData = localStorage.getItem('auditoriaData');
        return savedData ? JSON.parse(savedData) : {
            responsible: "",
            area: "",
            description: "",
            photoRefs: []
        };
    });

    const [respuestasSecciones, setRespuestasSecciones] = useState(() => {
        const saved = localStorage.getItem("auditoriaRespuestas");
        return saved
            ? JSON.parse(saved)
            : {
                seleccion: {},
                orden: {},
                limpieza: {},
                estandar: {},
                sostener: {}
            };
    });

    const persistData = (newAuditorData, newRespuestas) => {
        localStorage.setItem("auditoriaData", JSON.stringify(newAuditorData));
        localStorage.setItem("auditoriaRespuestas", JSON.stringify(newRespuestas));
    };

    const clearAllData = async () => {
        if (auditorData.photoRefs?.length > 0) {
            await cleanupPhotos(auditorData.photoRefs);
        }
        localStorage.removeItem('auditoriaData');
        localStorage.removeItem('auditoriaRespuestas');
    };

    return(
        <AuditoriaContext.Provider 
            value={{
                auditorData,
                clearAllData,
                setAuditorData: (data) => {
                    setAuditorData(data);
                    localStorage.setItem("auditoriaData", JSON.stringify(data));
                },
                respuestasSecciones,
                setRespuestasSecciones: (respuestas) => {
                    setRespuestasSecciones(respuestas);
                    localStorage.setItem("auditoriaRespuestas", JSON.stringify(respuestas));
                },
                persistData
            }}
        >
            { children }
        </AuditoriaContext.Provider>
    )
}

export default AuditoriaContext;