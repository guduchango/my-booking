import NavBar from "../NavBar/NavBar"
import './layout.css'

const Layout = ({ children }) => {
    
    return (
        <div className="layout">
            <div className="layout-wrapper">
                <NavBar />
                {children}    
            </div>
        </div>
    )
}

export default Layout