import { NavLink } from "react-router-dom"
import './navBar.css'

const NavBar = () => {

    return (
        <div className="nav-wrapper">
            <nav>
                <ol>
                    <li>
                        <NavLink
                            className={({ isActive }) => (isActive ? 'nav-isActive' : '')}
                            to='/'>
                            <i className="icon-home"></i>
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => (isActive ? 'nav-isActive' : '')}
                            to='/unit'>
                            <i className="icon-office"></i>
                            <span>Units</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => (isActive ? 'nav-isActive' : '')}
                            to='/reservation'>
                             <i className="icon-address-book"></i>
                            <span>Reservatios</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => (isActive ? 'nav-isActive' : '')}
                            to='/expense'>
                             <i className="icon-coin-dollar"></i>
                            <span>Expense</span>
                        </NavLink>
                    </li>
                </ol>
            </nav>
        </div>
    )
}

export default NavBar