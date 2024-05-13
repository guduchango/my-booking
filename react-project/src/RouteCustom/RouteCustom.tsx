import { useRoutes } from "react-router-dom"
import Home from "../Pages/Home/Home"
import Login from "../Pages/Login/Login"
import { Reservation } from "../Pages/Reservation/Reservation"
import { ReservationDetails } from "../Pages/Reservation/ReservationDetails"
import { ReservationEdit } from "../Pages/Reservation/ReservationEdit"
import { UnitList } from "../Pages/Unit/UnitList"
import { UnitCreate } from "../Pages/Unit/UnitCreate"
import { GuestCreate } from "../Pages/Guest/GuestCreate"
import { Expense } from "../Pages/Expense/Expense"

const RouteCustom = () => {

  return  useRoutes([
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/reservation', element: <Reservation /> },
      { path: '/reservation/details', element: <ReservationDetails /> },
      { path: '/reservation/edit', element: <ReservationEdit /> },
      { path: '/unit', element: <UnitList /> },
      { path: '/unit/create', element: <UnitCreate /> },
      { path: '/expense', element: <Expense /> },
      { path: '/guest/create', element: <GuestCreate /> },
    ])
  
}

export default RouteCustom