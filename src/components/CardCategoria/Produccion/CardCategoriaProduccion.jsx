
export const CardCategoria = ({ titulo, descripcion, onClick }) => {
    return (
        <>
            <div 
                onClick={ onClick }
                className="bg-white shadow-md rounded-lg p-6 flex flex-col
                items-center justify-center text-center cursor-pointer hover:shadow-xl
                transition-shadow duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-semibold text-gray-800 duration-300">
                    { titulo }
                </h3>
                <p className="text-gray-600">
                    { descripcion || `Ingresa a la categoria ${ titulo }` }
                </p>
            </div>
        </>
    )
}
