
const BackButton = ({ onClick }) => {
    return (
        <>
            <button
                onClick={ onClick }
                className="inline-flex items-center px-4 py-2 border border-gray-300 
                shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white 
                hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 
                focus:ring-blue-500 hover:cursor-pointer"
            >
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver
            </button>
        </>
    )
}

export default BackButton