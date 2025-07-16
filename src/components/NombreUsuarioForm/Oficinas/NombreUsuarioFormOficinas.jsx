import { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuditoriaContext, { AUDIT_TYPES } from "../../../context/AuditoriaContext";
import config from "../../../../config";

const NombreUsuarioFormOficinas = () => {
    const {
        auditorData, 
        setAuditorData,
        setAuditType        
    } = useContext(AuditoriaContext);

    const [responsible, setResponsible] = useState(auditorData.responsible || "");
    const [selectedAreaId, setSelectedAreaId] = useState(auditorData.selectedAreaId || null);
    const [offices, setOffices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getListOffices = async() => {
            try{
                const response = await fetch(`${config.apiUrl}/Audits/GetListOffices`);

                if(!response.ok){
                    throw new Error("Error al obtener la lista");
                }

                const data = await response.json();
                setOffices(data);
            }catch(error){
                console.error("Error al a hacer fetching");
            }
        };

        getListOffices();
    }, []);

    useEffect(() => {
        setAuditType(AUDIT_TYPES.OFICINAS);
    }, [setAuditType]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (responsible.trim() && selectedAreaId) {
            setAuditorData({
                ...auditorData,
                responsible,
                selectedAreaId
            });

            navigate("/categorias-auditoria-oficinas-seleccion");
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 md:p-8">
                <div className="w-full max-w-md md:max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden">

                    <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
                        <h2 className="text-2xl font-bold">Nueva auditoría para oficinas</h2>
                        <p className="text-white opacity-90">Completa los detalles requeridos</p>
                    </div>

                    <form className="p-6 md:p-8 space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Nombre auditor <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input 
                                    required
                                    type="text"
                                    value={ responsible }
                                    onChange={(e) => setResponsible(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 
                                    rounded-md shadow-md py-2 px-3 focus:outline-none
                                    focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Ingrese su nombre completo"
                                />                                
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Área a auditar <span className="text-red-500">*</span>
                            </label>
                            <select 
                                required
                                value={ selectedAreaId || "" }
                                onChange={(e) => setSelectedAreaId(Number(e.target.value))}
                                className="mt-1 block w-full border border-gray-300 
                                rounded-md shadow-md py-2 px-3 focus:outline-none
                                focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="" disabled>Selecciona una oficina</option>
                                {offices.map(office => (
                                    <option key={ office.id } value={ office.id }>
                                        { office.name }
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="pt-4">
                            <button
                                onClick={ handleSubmit }
                                className="w-full bg-gradient-to-r from-secondary to-primary hover:from-blue-700 hover:to-blue-600
                                text-white font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg
                                transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500
                                hover:cursor-pointer"
                            >
                                Continuar
                                <svg className="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default NombreUsuarioFormOficinas