import { createContext, useState } from "react";
import { cleanupPhotos } from "../services/photoStorage";

const AuditoriaContext = createContext();

const AUDIT_TYPES = {
    PRODUCCION: 'produccion',
    PERIFERICOS: 'perifericos',
    OFICINAS: 'oficinas'
};

const getDefaultState = () => ({
    [AUDIT_TYPES.PRODUCCION]: {
        auditorData: {
            responsible: "",
            selectedAreaId: null,
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
            selectedAreaId: null,
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
    [AUDIT_TYPES.OFICINAS]: {
        auditorData: {
            responsible: "",
            selectedAreaId: null,
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
});

export const AuditoriaProvider = ({ children }) => {
    const [auditType, setAuditType] = useState(AUDIT_TYPES.PRODUCCION);

    const [auditState, setAuditState] = useState(() => {
        let savedState;
        try {
            savedState = JSON.parse(localStorage.getItem('auditoriaState'));
        } catch {
            savedState = null;
        }

        const defaultState = getDefaultState();

        if (!savedState ||
            !savedState[AUDIT_TYPES.PRODUCCION] ||
            !savedState[AUDIT_TYPES.PERIFERICOS] ||
            !savedState[AUDIT_TYPES.OFICINAS]
        ) {
            return defaultState;
        }

        return savedState;
    });

    const auditEntry = auditState[auditType] || getDefaultState()[auditType];

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
        const photos = auditState[type]?.auditorData?.photoRefs || [];

        if (photos.length > 0) {
            await cleanupPhotos(photos);
        }

        setAuditState(prev => {
            const updated = {
                ...prev,
                [type]: getDefaultState()[type]
            };
            localStorage.setItem('auditoriaState', JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <AuditoriaContext.Provider
            value={{
                auditorData: auditEntry.auditorData,
                respuestasSecciones: auditEntry.respuestasSecciones,

                auditState,
                auditType,
                AUDIT_TYPES,

                setAuditType,
                setAuditorData: (data) => updateAuditState(auditType, { auditorData: data }),
                setRespuestasSecciones: (respuestas) => updateAuditState(auditType, { respuestasSecciones: respuestas }),

                clearAllData: () => clearAuditData(auditType),

                getAuditDataByType: (type) => auditState[type] || getDefaultState()[type]
            }}
        >
            {children}
        </AuditoriaContext.Provider>
    );
};

export { AUDIT_TYPES };
export default AuditoriaContext;