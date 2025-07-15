
const RadioButton = ({ value, checked, onChange, name }) => {
    return (
        <>
            <label className={`flex items-center justify-center h-10 w-10 rounded-full border-2 hover:cursor-pointer transition-all
                    ${
                        checked
                            ? "bg-blue-600 text-white border-blue-700 shadow-inner"
                            : "bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-300"
                    }
                `}>
                    <input 
                        type="radio"
                        id={`${name}-${value}`}
                        name={ name }
                        value={ value }
                        checked={ checked }
                        onChange={ onChange }
                        className="sr-only"
                        required
                    />
                    { value }
            </label>
        </>
    )
}

export default RadioButton