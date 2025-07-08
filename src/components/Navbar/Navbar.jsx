import { Link } from "react-router-dom";
import Logo from "../../assets/logomesa.png";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = ({ toggleSidebar }) => {
    return (
        <>
            <nav className="bg-primary shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex-shrink-0 flex items-center">
                            <img 
                                src={ Logo } 
                                alt="logo"
                                className="h-12 w-auto mr-3" 
                            />
                            <Link to={"/"}>
                                <h1 className="font-bold text-white text-xl">
                                    AUDITORIAS 5s
                                </h1>
                            </Link>
                        </div>                    
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar