import { createContext, useState } from "react";

const AuditoriaContext = createContext();

export const AuditoriaProvider = ({ children }) => {
    const [auditorData, setAuditorData] = useState({
        responsible: "",
        area: "",
        description: "",
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

    return(
        <AuditoriaContext.Provider value={{ auditorData, setAuditorData, respuestasSecciones, setRespuestasSecciones }}>
            { children }
        </AuditoriaContext.Provider>
    )
}

export default AuditoriaContext;