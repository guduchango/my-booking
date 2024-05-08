import { useRoutes } from "react-router-dom"
import Home from "../Pages/Home/Home"
import Login from "../Pages/Login/Login"
import Lodging from "../Pages/Lodging/Lodging"
import Expense from "../Pages/Expense/Expense"
import { Reservation } from "../Pages/Reservation/Reservation"
import { ReservationDetails } from "../Pages/Reservation/ReservationDetails"
import { ReservationEdit } from "../Pages/Reservation/ReservationEdit"

const RouteCustom = () => {

  return  useRoutes([
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/reservation', element: <Reservation /> },
      { path: '/reservation/details', element: <ReservationDetails /> },
      { path: '/reservation/edit', element: <ReservationEdit /> },
      { path: '/lodging', element: <Lodging /> },
      { path: '/expense', element: <Expense /> },
    ])
  
}

export default RouteCustom