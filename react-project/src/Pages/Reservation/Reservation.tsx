import {useState } from "react";
import Layout from "../../Components/Layout/Layout"
import './reservation.css'
import {useGlobalContext } from "../../Context/Context";




const Booking: React.FC = () => {

    const {reservations,guests,expenses,prices,promotions,units,currencies} = useGlobalContext();

    console.log('reservations',reservations)
    console.log('guests',guests)
    console.log('expenses',expenses)
    console.log('prices',prices)
    console.log('promotions',promotions)
    console.log('units',units)
    console.log('currencies',currencies)

    const [showFilter, setShowFilter] = useState<boolean>(false);
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
                {reservations.map((reservation) => (
                    <div key={reservation.res_id} className="table-row" >
                        <div className="tableRow-wrapper">
                            <p className="tableRow-title">{reservation.guest.gue_name + " " + reservation.guest.gue_last_name}</p>
                            <p>{reservation.res_beauty_dates}</p>
                            <p>{reservation.res_nights} nights</p>
                            <p>{reservation.res_adults} adults, {reservation.res_children} children</p>
                            <p>{reservation.unit.uni_name}</p>
                        </div>
                    </div>
                ))}
                <div className="pagination">
                    <a
                        href="#"
                        className="pagination-previous"
                    >
                        <i className="icon-arrow-left"></i>
                    </a>
                    <a
                        href="#"
                        className="pagination-next"
                    >
                        <i className="icon-arrow-right"></i>
                    </a>
                </div>
            </div>
        </Layout>
    )
}

export default Booking