import { NavLink } from "react-router-dom"
import './navBar.css'

const NavBar = () => {

    return (
        <div className="nav-wrapper">
            <nav>
                <ol>
                    <li>
                        <NavLink
                            to='/'>
                            Home
                        </NavLink>
                    </li>
                    <li className="ml-2 font-light">
                        <NavLink
                            to='/lodging'>
                            Lodging
                        </NavLink>
                    </li>
                    <li className="ml-2 font-light">
                        <NavLink
                            to='/booking'>
                            Booking
                        </NavLink>
                    </li>
                    <li className="ml-2 font-light">
                        <NavLink
                            to='/expense'>
                            Expense
                        </NavLink>
                    </li>
                </ol>
            </nav>
        </div>
    )
}

export default NavBar