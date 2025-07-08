import { MdPrecisionManufacturing } from "react-icons/md";
import { HiOfficeBuilding } from "react-icons/hi";
import { IoBuild } from "react-icons/io5";

export const SidebarData = [
    {
        title: "Producción",
        icon: <MdPrecisionManufacturing/>,
        path: "/"
    },
    {
        title: "Perífericas",
        icon: <IoBuild/>,
        path: "/perifericas"
    },
    {
        title: "Oficinas",
        icon: <HiOfficeBuilding/>,
        path: "/oficinas"
    }
];