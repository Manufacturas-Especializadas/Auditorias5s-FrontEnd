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

                {/* Administrador */}
                <Route path="/administrador" element={<AdminIndex/>}/>
            </Routes>
        </>
    )
}

export default MyRoutes