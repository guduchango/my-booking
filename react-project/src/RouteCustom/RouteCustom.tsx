import { useRoutes } from "react-router-dom"
import Home from "../Pages/Home/Home"
import Login from "../Pages/Login/Login"
import { ReservationList } from "../Pages/Reservation/ReservationList"
import { ReservationDetails } from "../Pages/Reservation/ReservationDetails"
import { ReservationEdit } from "../Pages/Reservation/ReservationEdit"
import { UnitList } from "../Pages/Unit/UnitList"
import { UnitSave } from "../Pages/Unit/UnitSave"
import { GuestSave } from "../Pages/Guest/GuestSave"
import { Expense } from "../Pages/Expense/Expense"
import { GuestList } from "../Pages/Guest/GuestList"
import { PriceCalendar } from "../Pages/Price/PriceCalendar"
import { UnitAvailableForm } from "../Pages/Unit/UnitAvailableForm"
import { UnitAvailableList } from "../Pages/Unit/UnitAvailableList"
import { ReservationCalendar } from "../Pages/Reservation/ReservationCalendar"
import { ReservationCreate } from "../Pages/Reservation/ReservationCreate"

const RouteCustom = () => {

  return  useRoutes([
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/reservation', element: <ReservationList /> },
      { path: '/reservation/details', element: <ReservationDetails /> },
      { path: '/reservation/create', element: <ReservationCreate /> },
      { path: '/reservation/edit', element: <ReservationEdit /> },
      { path: '/reservation/check', element: <UnitAvailableForm /> },
      { path: '/reservation/available-units', element: <UnitAvailableList /> },
      { path: '/reservation/calendar', element: <ReservationCalendar /> },
      { path: '/unit', element: <UnitList /> },
      { path: '/unit/save', element: <UnitSave /> },
      { path: '/expense', element: <Expense /> },
      { path: '/guest/save', element: <GuestSave /> },
      { path: '/guest', element: <GuestList /> },
      { path: '/price/calendar', element: <PriceCalendar /> },
    ])
  
}

export default RouteCustom