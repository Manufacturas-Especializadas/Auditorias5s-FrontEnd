
const FileUpload = ({ isUploading, onFileChange }) => {
    return (
        <>
            <label className={`flex flex-col items-center justify-center w-full p-4 border-2 border-gray-300
                rounded-lg hover:cursor-pointer hover:border-primary hover:bg-gray-50 transition ${isUploading ? "opacity-50" : ""}`}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-400">
                        <span className="font-semibold">Haz clic para subir</span> o arrastra las fotos
                    </p>
                    <p className="text-xs text-gray-500">
                        PNG, JPG o JPEG
                    </p>
                    {
                        isUploading && (
                            <p className="text-xs text-primary mt-2">Subiendo archivos...</p>
                        )
                    }
                </div>
                <input 
                    id="fotos"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={ onFileChange }
                    className="hidden"
                    disabled={ isUploading }
                />
            </label>
        </>
    )
}

export default FileUpload