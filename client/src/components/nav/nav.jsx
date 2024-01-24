import { useEffect, useState } from "react"
import DesktopNav from "./Desktop/desktop_nav";
import MobileNav from "./Mobile/mobile_nav";

const NavigationBar = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const getwidth = () => {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', getwidth);

        return () => {
            window.removeEventListener('resize', getwidth);
        };
    }, [])

    return (
        windowWidth > 900 ?
        <DesktopNav/> : <MobileNav/>

    )
}

export default NavigationBar;