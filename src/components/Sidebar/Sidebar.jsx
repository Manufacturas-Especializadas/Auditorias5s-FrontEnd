import { useState } from "react";
import { SidebarData } from "../../data/SidebarData";
import { Link } from "react-router-dom";

const Sidebar = ({ isMobileOpen = false }) => {
    const[isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        if(window.innerHeight <= 768){
            setIsOpen(!isOpen);
        }else{
            setIsOpen(!isOpen);
        }
    };

    return (
        <>
            <aside className={`sidebar ${ isOpen ? 'open' : 'collapsed' } ${ isMobileOpen ? "mobile-open" : "" }`}>
                <button className="toggle-btn" onClick={ toggleSidebar }>
                    { isOpen ? '<<' : '>>' }
                </button>

                <ul>
                    {
                        SidebarData.map((item, index) => (
                            <Link key={ index } to={ item.path } className="menu-link">
                                <li className="menu-item" data-label={ item.title }>
                                    <span className="menu-icon">{ item.icon }</span>
                                    <span className="menu-title">{ item.title }</span>
                                </li>
                            </Link>
                        ))
                    }
                </ul>
            </aside>
        </>
    )
}

export default Sidebar