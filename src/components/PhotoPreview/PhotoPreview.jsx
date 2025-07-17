
const PhotoPreview = ({ preview, index, onRemove }) => {
    return (
        <>
            <div className="relative group">
                <img 
                    src={ preview } 
                    alt={ `Evidencia ${index + 1}` }
                    className="h-24 w-full object-cover rounded border border-gray-200"
                />
                <button
                    type="button"
                    onClick={() => onRemove(index)}
                    className={`
                        absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 z-10
                        opacity-100 md:opacity-0 group-hover:opacity-100
                        transition-opacity duration-200 ease-in-out
                    `}
                >
                <svg 
                    className="h-4 w-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        </>
    )
}

export default PhotoPreview