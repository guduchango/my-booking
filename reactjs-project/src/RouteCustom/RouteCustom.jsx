import { useRoutes } from "react-router-dom"
import Home from "../Pages/Home/Home"
import Login from "../Pages/Login/Login"
import Booking from "../Pages/Reservation/Reservation"
import Lodging from "../Pages/Lodging/Lodging"
import Expense from "../Pages/Expense/Expense"

const RouteCustom = () => {

  return  useRoutes([
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/booking', element: <Booking /> },
      { path: '/lodging', element: <Lodging /> },
      { path: '/expense', element: <Expense /> },
    ])
  
}

export default RouteCustom