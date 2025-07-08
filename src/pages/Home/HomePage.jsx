import { Link } from "react-router-dom";
import { AuditoriaCard } from "../../data/AuditoriaCard";

const HomePage = () => {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
                <div className="max-w-7xl mx-auto">

                    <div className="mb-10 text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
                            Sistema de <span className="text-secondary">Auditorías</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Selecciona el módulo que necesitas para comenzar
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                            AuditoriaCard.map((item) => (
                                <Link
                                    key={ item.title }
                                    to={ item.path }
                                    className="group relative bg-white rounded-xl shadow-sm overflow-hidden
                                    border border-gray-200 hover:border-indigo-300 transition-all duration-300
                                    hover:shadow-lg transform hover:-translate-y-1 flex flex-col items-center
                                    p-8 text-center h-full"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white to-indigo-50 opacity-0
                                        group-hover:opacity-100 transition-opacity duration-300">                                        
                                    </div>

                                    <div className="relative z-10 text-primary mb-5 text-6xl group-hover:text-secondary
                                        transition-all duration-300 group-hover:scale-110">
                                        { item.icon }
                                    </div>

                                    <div className="relative z-10">
                                        <span className="text-xl font-semibold text-gray-800 group-hover:text-primary transition-colors">
                                            { item.title }
                                        </span>
                                        {
                                            item.description && (
                                                <p className="mt-2 text-gray-600 text-sm">
                                                    { item.description }
                                                </p>
                                            )
                                        }

                                        <div
                                            className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600
                                            transform scale-x-0 origin-left group-hover:scale-x-100
                                            transition-transform duration-300"
                                        ></div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>

                    <div className="mt-12 text-center text-gray-500 text-sm">
                        <p>Sistema de auditorías { new Date().getFullYear()}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage