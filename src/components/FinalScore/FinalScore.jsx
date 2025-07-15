
const FinalScore = ({ puntuacion }) => {
    const getResultadoText = () => {
        if (puntuacion >= 5) return 'Excelente - Cumple con todos los estándares';
        if (puntuacion >= 4) return 'Bueno - Cumple con la mayoría de estándares';
        if (puntuacion >= 2) return 'Regular - Necesita mejoras';
        return 'Deficiente - Requiere acción inmediata';
    };

    const getBgColor = () => {
        if (puntuacion >= 5) return 'bg-green-500';
        if (puntuacion >= 4) return 'bg-blue-500';
        if (puntuacion >= 2) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <>            
            <div className="p-6 bg-gray-50 md:col-span-2">
                <div className="flex flex-col items-center">
                    <h3 className="text-lg font-medium text-gray-500 mb-2">
                        Calificación final
                    </h3>
                    <div className={`text-5xl font-bold rounded-full h-32 w-32 flex items-center justify-center shadow-inner ${getBgColor()} text-white`}>
                        {puntuacion.toFixed(1)}
                    </div>
                    <p className="mt-4 text-lg font-medium text-gray-700 text-center">
                        {getResultadoText()}
                    </p>
                </div>
            </div>
        </>
    )
}

export default FinalScore