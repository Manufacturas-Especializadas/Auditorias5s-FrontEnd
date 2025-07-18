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
    const [responsibleFilter, setResponsibleFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");

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

    const filteredItems = audits.filter(item => {
        const responsibleMatch = item.responsible?.toLowerCase().includes(responsibleFilter.toLowerCase());
        const dateMatch = format(new Date(item.date), 'dd/MM/yyyy').includes(dateFilter);
        return responsibleMatch && dateMatch;
    });

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
        const clearAll = () => {
            setResponsibleFilter("");
            setDateFilter("");
        };

        return(
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50 border-b border-gray-200">
                <div className="flex flex-col">
                    <label className="text-sm text-gray-500">
                        Filtrar por auditor
                    </label>
                    <input 
                        type="text"
                        value={ responsibleFilter }
                        onChange={ e => setResponsibleFilter(e.target.value) }
                        placeholder="Nombre del auditor"
                        className="border px-3 py-1 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm text-gray-500">
                        Filtrar por fecha
                    </label>
                    <input 
                        type="text"
                        value={ dateFilter }
                        onChange={ e => setDateFilter(e.target.value)  }
                        placeholder="dd/mm/aaaa"
                        className="border px-3 py-1 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {
                    (responsibleFilter || dateFilter) && (
                        <div className="flex items-end">
                            <button
                                onClick={ clearAll }
                                className="text-red-500 hover:underline ml-4"
                            >
                                Limpiar filtros
                            </button>
                        </div>
                    )
                }
            </div>
        )
    }, [responsibleFilter, dateFilter]);

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
                            data={ filteredItems }
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