
const SaveButton = ({ onClick }) => {
    return (
        <>
            <button
                onClick={ onClick }
                type="button"
                className="inline-flex items-center px-6 py-2 border border-transparent 
                text-sm font-medium rounded-md shadow-sm text-white bg-green-600 
                hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                focus:ring-green-500 transition-colors duration-200 hover:cursor-pointer"
            >
                Guardar respuestas
                <svg className="h-5 w-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </button>
        </>
    )
}

export default SaveButton