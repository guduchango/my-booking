import { useContext, useState } from "react";
import Layout from "../../Components/Layout/Layout"
import './reservation.css'
import { GlobalContext } from "../../Context/Context";

const Booking = () => {

    const context = useContext(GlobalContext);
    const reservations = context.reservations
    console.log(reservations)

    const [showFilter, setShowFilter] = useState(false);
    const openFilter = () => {
        setShowFilter(true);
    };

    const closeFilter = () => {
        setShowFilter(false);
    };

    return (
        <Layout>
            <div className="filter-wrapper">
                <div className="filter-icons">
                {showFilter && (
                    <a onClick={closeFilter}>
                        <i className="icon-cross"></i>
                    </a>
                )}
                {!showFilter && (
                    <a onClick={openFilter}>
                        <i className="icon-search"></i>
                    </a>
                )}
                </div>
                <div className="filter-input">
                    {showFilter && (
                        <div className="showBox">
                            <input placeholder="Buscar...."></input>
                        </div>
                    )}
                </div>
            </div>
            <div className="table">
            {reservations.data.map((reservation) => (
                <div key={reservation.res_id} className="table-row" >
                    <div className="tableRow-wrapper">
                        <p className="tableRow-title">{reservation.guest.gue_name+" "+reservation.guest.gue_last_name}</p>
                        <p>{reservation.res_beauty_dates}</p>
                        <p>{reservation.res_nights} nights</p>
                        <p>{reservation.res_adults} adults, {reservation.res_children} children</p>
                        <p>{reservation.unit.uni_name}</p>
                    </div>
                </div>
            ))}
               
                {/* <div className="table-row" >
                    <div className="tableRow-wrapper">
                        <h1>Edgardo Ponce</h1>
                        <p>28 mar - 1 abr 2024</p>
                        <p>4 noches</p>
                        <p>2 adultos, 2 niños</p>
                        <p>Departamento 1</p>
                    </div>
                </div>
                <div className="table-row" >
                    <div className="tableRow-wrapper">
                        <h1>Edgardo Ponce</h1>
                        <p>28 mar - 1 abr 2024</p>
                        <p>4 noches</p>
                        <p>2 adultos, 2 niños</p>
                        <p>Departamento 1</p>
                    </div>
                </div>
                <div className="table-row" >
                    <div className="tableRow-wrapper">
                        <h1>Edgardo Ponce</h1>
                        <p>28 mar - 1 abr 2024</p>
                        <p>4 noches</p>
                        <p>2 adultos, 2 niños</p>
                        <p>Departamento 1</p>
                    </div>
                </div>
                <div className="table-row" >
                    <div className="tableRow-wrapper">
                        <h1>Edgardo Ponce</h1>
                        <p>28 mar - 1 abr 2024</p>
                        <p>4 noches</p>
                        <p>2 adultos, 2 niños</p>
                        <p>Departamento 1</p>
                    </div>
                </div>
                <div className="table-row" >
                    <div className="tableRow-wrapper">
                        <h1>Edgardo Ponce</h1>
                        <p>28 mar - 1 abr 2024</p>
                        <p>4 noches</p>
                        <p>2 adultos, 2 niños</p>
                        <p>Departamento 1</p>
                    </div>
                </div>
                <div className="table-row" >
                    <div className="tableRow-wrapper">
                        <h1>Edgardo Ponce</h1>
                        <p>28 mar - 1 abr 2024</p>
                        <p>4 noches</p>
                        <p>2 adultos, 2 niños</p>
                        <p>Departamento 1</p>
                    </div>
                </div>
                <div className="table-row" >
                    <div className="tableRow-wrapper">
                        <h1>Edgardo Ponce</h1>
                        <p>28 mar - 1 abr 2024</p>
                        <p>4 noches</p>
                        <p>2 adultos, 2 niños</p>
                        <p>Departamento 1</p>
                    </div>
                </div>
                <div className="table-row" >
                    <div className="tableRow-wrapper">
                        <h1>Edgardo Ponce</h1>
                        <p>28 mar - 1 abr 2024</p>
                        <p>4 noches</p>
                        <p>2 adultos, 2 niños</p>
                        <p>Departamento 1</p>
                    </div>
                </div>
                <div className="table-row" >
                    <div className="tableRow-wrapper">
                        <h1>Edgardo Ponce</h1>
                        <p>28 mar - 1 abr 2024</p>
                        <p>4 noches</p>
                        <p>2 adultos, 2 niños</p>
                        <p>Departamento 1</p>
                    </div>
                </div>
                <div className="table-row" >
                    <div className="tableRow-wrapper">
                        <h1>Edgardo Ponce</h1>
                        <p>28 mar - 1 abr 2024</p>
                        <p>4 noches</p>
                        <p>2 adultos, 2 niños</p>
                        <p>Departamento 1</p>
                    </div>
                </div>
                <div className="table-row" >
                    <div className="tableRow-wrapper">
                        <h1>Edgardo Ponce</h1>
                        <p>28 mar - 1 abr 2024</p>
                        <p>4 noches</p>
                        <p>2 adultos, 2 niños</p>
                        <p>Departamento 1</p>
                    </div>
                </div>
                <div className="table-row" >
                    <div className="tableRow-wrapper">
                        <h1>Edgardo Ponce</h1>
                        <p>28 mar - 1 abr 2024</p>
                        <p>4 noches</p>
                        <p>2 adultos, 2 niños</p>
                        <p>Departamento 1</p>
                    </div>
                </div>
                <div className="table-row" >
                    <div className="tableRow-wrapper">
                        <h1>Edgardo Ponce</h1>
                        <p>28 mar - 1 abr 2024</p>
                        <p>4 noches</p>
                        <p>2 adultos, 2 niños</p>
                        <p>Departamento 1</p>
                    </div>
                </div>
                <div className="table-row" >
                    <div className="tableRow-wrapper">
                        <h1>Edgardo Ponce</h1>
                        <p>28 mar - 1 abr 2024</p>
                        <p>4 noches</p>
                        <p>2 adultos, 2 niños</p>
                        <p>Departamento 1</p>
                    </div>
                </div>
                <div className="table-row" >
                    <div className="tableRow-wrapper">
                        <h1>Edgardo Ponce</h1>
                        <p>28 mar - 1 abr 2024</p>
                        <p>4 noches</p>
                        <p>2 adultos, 2 niños</p>
                        <p>Departamento 1</p>
                    </div>
                </div>
                <div className="table-row" >
                    <div className="tableRow-wrapper">
                        <h1>Edgardo Ponce</h1>
                        <p>28 mar - 1 abr 2024</p>
                        <p>4 noches</p>
                        <p>2 adultos, 2 niños</p>
                        <p>Departamento 1</p>
                    </div>
                </div>
                <div className="table-row" >
                    <div className="tableRow-wrapper">
                        <h1>Edgardo Ponce</h1>
                        <p>28 mar - 1 abr 2024</p>
                        <p>4 noches</p>
                        <p>2 adultos, 2 niños</p>
                        <p>Departamento 1</p>
                    </div>
                </div> */}
            </div>
        </Layout>
    )
}

export default Booking