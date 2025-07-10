import { color } from "framer-motion";
import { useEffect, useState } from "react";
import { FiDownload, FiFilter, FiSearch } from "react-icons/fi"
import config from "../../../config";
import DataTable from "react-data-table-component";
import { useMemo } from "react";
import { format } from "date-fns";
import Swal from "sweetalert2";

const AdminIndex = () => {
    const [audits, setAudits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [downloading, setDownloading] = useState(false);

    useEffect(() => {
        const getListAudits = async() => {
            try{
                setLoading(true);
                const response = await fetch(`${config.apiUrl}/Audits/GetListAudits`);

                if(!response.ok){
                    throw new Error("Error al obtener los datos");
                }

                const data = await response.json();
                setAudits(data);
            }catch(error){
                console.error("Error:", error);
            }finally{
                setLoading(false);
            }
        }

        getListAudits();
    }, []);

    const handleDownlaodExcel = async(auditId = null) => {
        try{
            setDownloading(true);

            const response = await fetch(`${config.apiUrl}/Audits/DownloadExcel`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    auditorName: auditId ? audits.find(a => a.id === auditId)?.responsible : '' 
                })
            });

            if(!response.ok){
                throw new Error("Error al generar el reporte");
            }

            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;

            const fileName = auditId
                ? `Auditoria_${audits.find(a => a.id === auditId)?.responsible}_${new Date().toISOString().slice(0, 10)}.xlsx`
                : `Todas_Auditorias_${new Date().toISOString().slice(0,10)}.xlsx`;

            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(downloadUrl);
        }catch(error){
            console.error("Error al descargar: ", error);
            Swal.fire({
                icon: "error",
                title: "Oooops...",
                text: "Ocurrio un error al descargar el reporte"
            });
        }finally{
            setDownloading(false);
        }
    };

    const filteredItems = audits.filter(
        item => item.responsible && item.responsible.toLowerCase().includes(filterText.toLowerCase()) ||
                item.area && item.area.toLowerCase().includes(filterText.toLowerCase())
    );

    const columns = [
        {
            name: "Nombre del auditor",
            sortable: "true",
            center: "center",
            selector: row => row.responsible,
            grow: 1
        },
        {
            name: "Fecha de la auditoria",
            sortable: "true",
            center: "center",
            selector: row => format(new Date(row.date), 'dd/MM/yyyy HH:mm:ss'),
            grow: 1
        },
        {
            name: "Area",
            selector: row => row.area,
            sortable: "true",
            center: "center",
            grow: 1
        },
        {
            name: "Acciones",
            center: "center",
            cell: row => (
                <div className="flex space-x-2 justify-center">
                    <button
                        onClick={() => handleDownlaodExcel(row.id)}
                        disabled={ downloading }
                        className={`p-2 rounded-full transition-colors hover:cursor-pointer ${
                            downloading ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:bg-gray-50" 
                        }`}
                        title="Descargar auditoría"
                    >
                        <FiDownload size={ 18 }/>
                    </button>
                </div>
            )
        }
    ];

    const customStyles = {
        headRow: {
            style:{
                borderTopWidth: '1px',
                borderTopColor: '#E5E7EB',
                borderTopStyle: 'solid'
            }
        },
        headCells: {
            style: {
                fontWeight: "bold",
                fontSize: '0.875rem',
                textTransform: "uppercase",
                paddingLeft: '16px',
                paddingRight: '16px',
                backgroundColor: "rgba(187, 204, 221, 1)",
                color: '#374151'
            },
        },
        cells: {
            style: {
                paddingLeft: '16px',
                paddingRight: '16px',
                // borderRight: '1px solid #ddd',
                fontSize: '0.875rem'
            },
        },
        rows: {
            style: {
                minHeight: '72px',
                '&:not(:last-of-type)': {
                    borderBottomWidth: '1px',
                    borderBottomColor: '#E5E7EB',
                    borderBottomStyle: 'solid'
                },
                '&:hover':{
                    backgroundColor: '#F9FAFB'
                }
            },
        },
        pagination: {
            stle: {
                borderTopWidth: '1px',
                borderTopColor: '#E5E7EB',
                borderTopStyle: 'solid'
            },
        },
    };

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-50 border-b border-gray-200">
                <div className="relative w-full md:w-64 mb-4 md:mb-0">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar auditoría..."
                        value={ filterText }
                        onChange={e => setFilterText(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {filterText && (
                        <button
                            onClick={ handleClear }
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>               
            </div>
        );
    }, [filterText, resetPaginationToggle]);

    return (
        <>
            <div className="min-h-screen bg-gray-50 p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
                        <div className="px-6 bg-gradient-to-r from-primary to-secondary py-2">
                            <h2 className="text-2xl font-bold text-white">
                                Panel de administración de auditorías
                            </h2>
                            <p className="text-blue-100 mt-1">Gestión y revisión de todas las auditorías</p>
                        </div>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg overflow-hidden px-4">
                        <DataTable
                            columns={ columns }
                            data={ audits }
                            customStyles={ customStyles }
                            progressPending={ loading }
                            progressComponent={<div className="py-8">Cargando auditorías...</div>}
                            pagination
                            paginationPerPage={ 10 }
                            paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
                            paginationComponentOptions={{
                                rowsPerPageText: 'Filas por página:',
                                rangeSeparatorText: 'de',
                                noRowsPerPage: false
                            }}
                            highlightOnHover
                            pointerOnHover
                            responsive
                            striped
                            subHeader
                            subHeaderComponent={ subHeaderComponentMemo }
                            noDataComponent={
                                <div className="py-8 text-center">
                                    <p className="text-gray-500 text-lg">No se encontraron auditorías</p>
                                    <p className="text-gray-400 mt-1">Intenta ajustar tus filtros de búsqueda</p>
                                </div>
                            }
                        />                            
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminIndex