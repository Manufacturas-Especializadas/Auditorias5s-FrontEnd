import RadioButton from "../Buttons/RadioButton/RadioButton"

const QuestionItem = ({ index, pregunta, value, onChange }) => {
    return (
        <>
            <div className="space-y-4">
                <div className="flex items-start">
                    <span className="flex-shrink-0 flex items-center justify-center h-6 w-6
                        rounded-full bg-primary text-white font-medium mr-3 mt-0.5">
                        { index + 1 }
                    </span>
                    <label className="block text-sm font-medium text-gray-700">
                        { pregunta.texto }
                    </label>
                </div>

                <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map(valor => (
                        <RadioButton
                            key={ valor }
                            value={ valor }
                            checked={ value === valor }
                            onChange={() => onChange(valor)} 
                            name={ pregunta.id }
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default QuestionItem