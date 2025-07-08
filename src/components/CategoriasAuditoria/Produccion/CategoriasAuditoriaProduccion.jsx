import { Link } from "react-router-dom";
import { CategoriasAuditoriaProduccionData } from "../../../data/CategoriasAuditoriaProduccionData";
import { CardCategoria }from "../../CardCategoria/Produccion/CardCategoriaProduccion";

const CategoriasAuditoria = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Selecciona una categoría de auditoría
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        CategoriasAuditoriaProduccionData.map((cat) => (
                            <Link to={ cat.path } key={ cat.id } className="block">
                                <CardCategoria
                                    titulo={ cat.titulo }
                                    descripcion={ cat.descripcion }
                                />
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default CategoriasAuditoria