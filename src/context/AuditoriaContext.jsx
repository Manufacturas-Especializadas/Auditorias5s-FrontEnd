import { createContext, useState } from "react";
import { cleanupPhotos } from "../services/photoStorage";

const AuditoriaContext = createContext();

const AUDIT_TYPES = {
    PRODUCCION: 'produccion',
    PERIFERICOS: 'perifericos'
};

export const AuditoriaProvider = ({ children }) => {
    const [auditType, setAuditType] = useState(AUDIT_TYPES.PRODUCCION); 

    const [auditState, setAuditState] = useState(() => {
    const savedState = localStorage.getItem('auditoriaState');
    return savedState ? JSON.parse(savedState) : {
    [AUDIT_TYPES.PRODUCCION]: {
        auditorData: {
            responsible: "",
            area: "",
            description: "",
            photoRefs: []
        },
        respuestasSecciones: {
            seleccion: {},
            orden: {},
            limpieza: {},
            estandar: {},
            sostener: {}
        }
    },
    [AUDIT_TYPES.PERIFERICOS]: {
            auditorData: {
                responsible: "",
                area: "",
                description: "",
                photoRefs: []
            },
            respuestasSecciones: {
                seleccion: {},
                orden: {},
                limpieza: {},
                estandar: {},
                sostener: {}
            }
        }
    };
});

    const currentData = (type = auditType) => ({
        uditorData: auditState[type].auditorData,
        respuestasSecciones: auditState[type].respuestasSecciones
    });

    const updateAuditState = (type, newData) => {
        setAuditState(prev => {
            const updated = {
                ...prev,
                [type]: {
                ...prev[type],
                ...newData
                }
            };
            localStorage.setItem('auditoriaState', JSON.stringify(updated));
            return updated;
        });
    };

    const clearAuditData = async (type) => {
            const photos = auditState[type].auditorData.photoRefs;
            if (photos?.length > 0) {
                await cleanupPhotos(photos);
            }
            
            setAuditState(prev => {
                const updated = {
                    ...prev,
                    [type]: {
                        auditorData: {
                            responsible: "",
                            area: "",
                            description: "",
                            photoRefs: []
                        },
                    respuestasSecciones: {
                            seleccion: {},
                            orden: {},
                            limpieza: {},
                            estandar: {},
                            sostener: {}
                        }
                    }
            };
                localStorage.setItem('auditoriaState', JSON.stringify(updated));
                return updated;
            });
        };

    return (
        <AuditoriaContext.Provider 
            value={{            
                auditorData: auditState[auditType].auditorData,
                respuestasSecciones: auditState[auditType].respuestasSecciones,
                
                auditState,
                auditType,
                AUDIT_TYPES,
                
                setAuditorData: (data) => updateAuditState(auditType, { auditorData: data }),
                setRespuestasSecciones: (respuestas) => 
                    updateAuditState(auditType, { respuestasSecciones: respuestas }),
                
                clearAllData: () => clearAuditData(auditType),
                setAuditType,
                
                getAuditDataByType: (type) => auditState[type]
            }}
        >
            { children }
        </AuditoriaContext.Provider>
    );
};

export { AUDIT_TYPES };
export default AuditoriaContext;