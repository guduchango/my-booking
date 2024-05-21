import { ToastContainer, toast } from 'react-toastify';
import NavBar from "../NavBar/NavBar"
import './layout.css'
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {

    return (
        <div className="layout">
            <div className="layout-wrapper">
                <ToastContainer 
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                />
                <NavBar />
                {children}
            </div>
        </div>
    )
}

export default Layout