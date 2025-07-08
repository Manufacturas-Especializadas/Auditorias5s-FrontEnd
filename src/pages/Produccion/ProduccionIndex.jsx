import DataTable from "react-data-table-component";
import { BiDownload } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const ProduccionIndex = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    const columns = [
        {
            name: "Auditor",
            center: "true",
            selector: row => row.auditor
        },
        {
            name: "Fecha de la auditoria",
            center: "true",
            selector: row => row.fechaAuditoria
        },
        {
            name: "Opciones",
            center: "true",
            cell: row => (
                <div className="flex gap-2">
                    <button
                        className="bg-buttonGray text-white
                        font-medium py-2 px-4 rounded-md transition duration-200
                        hover:cursor-pointer"
                    >
                        <BiDownload size={ 15 } className="text-black"/>
                    </button>
                </div>
            )
        }
    ];

    const data = [
        {
            id: 1,
            auditor: "Jose Lugo",
            fechaAuditoria: "3/07/2025"
        },
        {
            id: 2,
            auditor: "Oscar Santillan",
            fechaAuditoria: "12/02/2025"
        }
    ];

    const customStyles = {
        rows: {
            style: {
                minHeight: '72px'
            },
        },
        headCells: {
            style: {
                fontWeight: "bold",
                textTransform: "uppercase",
                paddingLeft: "8px",
                paddingRight: "8px",
                backgroundColor: "rgba(187, 204, 221, 1)"
            },
        },
        cells: {
            style:{
                paddingLeft: "3px",
                paddingRight: "3px",
                borderRight: "1px solid #ddd"
            },
        },
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-6">
            <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                    Auditoria 5s - Producción
                </h2>
                
                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => handleNavigate("/ingresar-nombre-produccion") }
                        className="bg-green-600 hover:bg-green-700 text-white
                        font-medium py-2 px-4 rounded-md transition duration-200
                        hover:cursor-pointer"
                    >
                        Nueva auditoria
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <DataTable
                        columns={ columns }
                        data={ data }
                        customStyles={ customStyles }
                        paginationPerPage={ 10 }
                        paginationRowsPerPageOptions={[10, 20, 30]}
                        highlightOnHover
                        pagination
                        responsive
                        striped
                    />
                </div>
            </div>
        </div>
    )
}

export default ProduccionIndex