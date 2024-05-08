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
                            to='/lodging'>
                            <i className="icon-office"></i>
                            <span>Lodging</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => (isActive ? 'nav-isActive' : '')}
                            to='/reservation'>
                             <i className="icon-address-book"></i>
                            <span>Booking</span>
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