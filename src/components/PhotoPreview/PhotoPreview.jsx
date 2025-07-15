
const PhotoPreview = ({ preview, index, onRemove }) => {
    return (
        <>
            <div className="relative group">
                <img 
                    src={ preview } 
                    alt={`Evidenica ${index + 1}`}
                    className="h-24 w-full object-cover rounded border border-gray-200"
                />
                <button
                    type="button"
                    onClick={() => onRemove(index)}
                    className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 opacity-0
                    group-hover:opacity-100 transition-opacity"
                >
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </>
    )
}

export default PhotoPreview