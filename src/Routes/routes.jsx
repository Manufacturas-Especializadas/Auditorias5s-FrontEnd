import { Route, Routes } from "react-router-dom";
import ProduccionIndex from "../pages/Produccion/ProduccionIndex";
import NombreUsuarioForm from "../components/NombreUsuarioForm/Produccion/NombreUsuarioFormProduccion";
import CategoriasAuditoria from "../components/CategoriasAuditoria/Produccion/CategoriasAuditoriaProduccion";
import ProduccionSeleccionFormPage from "../pages/Produccion/ProduccionSeleccionFormPage";
import ProduccionOrdenFormPage from "../pages/Produccion/ProduccionOrdenFormPage";
import ProduccionLimpiezaFormPage from "../pages/Produccion/ProduccionLimpiezaFormPage";
import ProduccionEstandarFormPage from "../pages/Produccion/ProduccionEstandarFormPage";
import ProduccionSostenerFormPage from "../pages/Produccion/ProduccionSostenerFormPage";
import HomePage from "../pages/Home/HomePage";
import ProduccionResultadoFinalPage from "../pages/Produccion/ProduccionResultadoFinalPage";
import AdminIndex from "../pages/Admin/AdminIndex";
import NombreUsuarioFormPerifericas from "../components/NombreUsuarioForm/Perifericas/NombreUsuarioFormPerifericas";
import PerifericasSeleccionFormPage from "../pages/Perifericas/PerifericasSeleccionFormPage";
import PerifericasLimpiezaFormPage from "../pages/Perifericas/PerifericasLimpiezaFormPage";
import PerifericasOrdenFormPage from "../pages/Perifericas/PerifericasOrdenFormPage";
import PerifericasEstandarFormPage from "../pages/Perifericas/PerifericasEstandarFormPage";
import PerifericasSostenerFormPage from "../pages/Perifericas/PerifericasSostenerFormPage";
import PerifericasResultadoFinalPage from "../pages/Perifericas/PerifericasResultadoFinalPage";

const MyRoutes = () => {
    return (
        <>
            <Routes>
                {/* Producción */}
                <Route path="/" element={<HomePage/>}/>
                <Route path="/ingresar-nombre-produccion" element={<NombreUsuarioForm/>}/>
                <Route path="/categorias-auditoria-produccion" element={<CategoriasAuditoria/>}/>
                <Route path="/categorias-auditoria-produccion-seleccion" element={<ProduccionSeleccionFormPage/>}/>
                <Route path="/categorias-auditoria-produccion-orden" element={<ProduccionOrdenFormPage/>}/>
                <Route path="/categorias-auditoria-produccion-limpieza" element={<ProduccionLimpiezaFormPage/>}/>
                <Route path="/categorias-auditoria-produccion-estandar" element={<ProduccionEstandarFormPage/>}/>
                <Route path="/categorias-auditoria-produccion-sostener" element={<ProduccionSostenerFormPage/>}/>
                <Route path="/categorias-auditoria-produccion-resultado" element={<ProduccionResultadoFinalPage/>}/>
                
                {/* Perífericas */}
                <Route path="/ingresar-nombre-perifericas" element={<NombreUsuarioFormPerifericas/>}/>
                <Route path="/categorias-auditoria-perifericas-seleccion" element={<PerifericasSeleccionFormPage/>}/>
                <Route path="/categorias-auditoria-perifericas-orden" element={<PerifericasOrdenFormPage/>}/>
                <Route path="/categorias-auditoria-perifericas-limpieza" element={<PerifericasLimpiezaFormPage/>}/>
                <Route path="/categorias-auditoria-perifericas-estandar" element={<PerifericasEstandarFormPage/>}/>
                <Route path="/categorias-auditoria-perifericas-sostener" element={<PerifericasSostenerFormPage/>}/>
                <Route path="/categorias-auditoria-perifericas-resultado" element={<PerifericasResultadoFinalPage/>}/>

                {/* Administrador */}
                <Route path="/administrador" element={<AdminIndex/>}/>
            </Routes>
        </>
    )
}

export default MyRoutes