import { getColorClass, getBorderColor, getProgressColor, getIcon } from "../../utils/scoreUtils";

const ScoreCard = ({ titulo, puntuacion }) => {
    return (
        <>
            <div className={`p-4 rounded-lg ${getColorClass(puntuacion)} border-l-4 ${getBorderColor(puntuacion)}`}>
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{titulo}</h3>
                    <span className="text-2xl">{getIcon(puntuacion)}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                    <span className="text-3xl font-bold">
                        {puntuacion.toFixed(1)}
                    </span>
                    <div className="w-full max-w-xs ml-4">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className={`h-full ${getProgressColor(puntuacion)}`}
                                style={{ width: `${(puntuacion / 5) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ScoreCard