import { useRoutes } from "react-router-dom"
import Home from "../Pages/Home/Home"
import Login from "../Pages/Login/Login"
import { Reservation } from "../Pages/Reservation/Reservation"
import { ReservationDetails } from "../Pages/Reservation/ReservationDetails"
import { ReservationSave } from "../Pages/Reservation/ReservationSave"
import { UnitList } from "../Pages/Unit/UnitList"
import { UnitCreate } from "../Pages/Unit/UnitCreate"
import { GuestSave } from "../Pages/Guest/GuestSave"
import { Expense } from "../Pages/Expense/Expense"
import { GuestList } from "../Pages/Guest/GuestList"

const RouteCustom = () => {

  return  useRoutes([
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/reservation', element: <Reservation /> },
      { path: '/reservation/details', element: <ReservationDetails /> },
      { path: '/reservation/save', element: <ReservationSave /> },
      { path: '/unit', element: <UnitList /> },
      { path: '/unit/create', element: <UnitCreate /> },
      { path: '/expense', element: <Expense /> },
      { path: '/guest/save', element: <GuestSave /> },
      { path: '/guest', element: <GuestList /> },
    ])
  
}

export default RouteCustom