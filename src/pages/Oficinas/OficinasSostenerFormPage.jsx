import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { savePhotos, getPhoto } from "../../services/photoStorage";
import { PreguntasOficinasSostener } from "../../data/PreguntasOficinas/PreguntasOficinasSostener";
import AuditoriaContext, { AUDIT_TYPES } from "../../context/AuditoriaContext";
import QuestionItem from "../../components/QuestionItem/QuestionItem";
import PhotoPreview from "../../components/PhotoPreview/PhotoPreview";
import FileUpload from "../../components/FileUpload/FileUpload";
import BackButton from "../../components/Buttons/BackButton/BackButton";
import SaveButton from "../../components/Buttons/SaveButton/SaveButton";
import Swal from "sweetalert2";

const OficinasSostenerFormPage = () => {
    const { 
        respuestasSecciones, 
        setRespuestasSecciones, 
        auditorData, 
        setAuditorData,
        setAuditType
    } = useContext(AuditoriaContext);
    
    const [respuestas, setRespuestas] = useState({});
    const [mostrarHallazgos, setMostrarHallazgos] = useState(false);
    const [hallazgos, setHallazgos] = useState("");
    const [fotos, setFotos] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [isUploading, setIsUploading] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        setAuditType(AUDIT_TYPES.OFICINAS);
        setRespuestas(respuestasSecciones.sostener || {});
        setHallazgos(auditorData.description || "");
    }, []);

    useEffect(() => {
        const loadPreviews = async () => {
            if (auditorData.photoRefs?.length > 0) {
                const loadedPreviews = await Promise.all(
                    auditorData.photoRefs.map(async (ref) => {
                        const photo = await getPhoto(ref.id);
                        return URL.createObjectURL(photo);
                    })
                );
                setPreviews(loadedPreviews);
            }
        };
        loadPreviews();
    }, [auditorData.photoRefs]);

    useEffect(() => {
        return () => {
            previews.forEach(preview => URL.revokeObjectURL(preview));
        };
    }, [previews]);

    const handleChange = (idPregunta, valor) => {
        setRespuestas((prev) => ({
            ...prev,
            [idPregunta]: valor
        }));
    };

    const handleFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const totalSelected = fotos.length + e.target.files.length;

            if(totalSelected > 10){
                Swal.fire({
                    icon: "warning",
                    title: "Limite excedido",
                    text: "Solo puedes subir hasta 10 fotos"
                });
            }

            setIsUploading(true);
            try {
                const newFiles = Array.from(e.target.files);
                const newPhotoRefs = await savePhotos(newFiles);
                
                const updatedData = {
                    ...auditorData,
                    photoRefs: [...(auditorData.photoRefs || []), ...newPhotoRefs]
                };
                
                setAuditorData(updatedData);
                setFotos(prev => [...prev, ...newFiles]);
                setPreviews(prev => [
                    ...prev, 
                    ...newFiles.map(file => URL.createObjectURL(file))
                ]);
                
            } catch (error) {
                console.error("Error al guardar fotos:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al subir fotos',
                    text: 'No se pudieron guardar las fotos seleccionadas'
                });
            } finally {
                setIsUploading(false);
            }
        }
    };

    const removeFoto = (index) => {
        setFotos(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        const nuevasRespuestas = {
            ...respuestasSecciones,
            sostener: respuestas
        };
        
        const updatedAuditorData = {
            ...auditorData,
            description: hallazgos || ""
        };
        
        setAuditorData(updatedAuditorData);
        setRespuestasSecciones(nuevasRespuestas);
        
        navigate("/categorias-auditoria-oficinas-resultado");
    };

    const handleBack = () => {
        navigate("/categorias-auditoria-oficinas-estandar");
    };    


    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-primary to-secondary rounded-xl px-6 py-4 shadow-md">
                        <h1 className="text-2xl font-bold text-white text-center">
                            Auditoría de oficinas - Categoría Sostener
                        </h1>
                        <p className="text-white text-center mt-1">
                            Califique cada aspecto del 1 al 5
                        </p>
                    </div>

                    <form className="bg-white shadow-xl rounded-b-xl overflow-hidden">
                        <div className="p-6 sm:p-8 space-y-8">
                            {
                                PreguntasOficinasSostener.map((pregunta, index) =>(
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
                        
                        <div className="space-y-4 pt-4 border-t border-gray-200 m-2">
                            <button
                                type="button"
                                onClick={() => setMostrarHallazgos(!mostrarHallazgos)}
                                className="flex items-center gap-2 px-4 py-2 text-lg font-semibold text-white 
                                bg-red-600 hover:bg-red-700 rounded-md shadow-lg transition-all 
                                duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 hover:cursor-pointer"
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
                                                Descripción de hallazgos (opcional)
                                            </label>
                                            <textarea
                                                type="file"
                                                accept="image/*"
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
                                                Evidencia fotográfica (opcional)
                                            </label>

                                            {previews.map((preview, index) => (
                                                <PhotoPreview 
                                                    key={index}
                                                    preview={preview}
                                                    index={index}
                                                    onRemove={removeFoto}
                                                />
                                            ))}
                                            
                                            <FileUpload
                                                isUploading={ isUploading }
                                                onFileChange={ handleFileChange }
                                            />
                                        </div>
                                    </>
                                )
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

export default OficinasSostenerFormPage