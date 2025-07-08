import { AuditoriaProvider } from "./context/AuditoriaContext";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import MyRoutes from "./Routes/routes";

const App = () => {

  return (
      <AuditoriaProvider>
        <BrowserRouter>
          <Navbar/>
          <main>
            <MyRoutes/>
          </main>      
        </BrowserRouter>
      </AuditoriaProvider>
  )
}

export default App