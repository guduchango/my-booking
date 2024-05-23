import { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout"
import { UnitInterface } from "../../Models/Unit/UnitInterface";
import { UnitStorageService } from "../../Services/Unit/UnitStorageService";
import { NavLink } from "react-router-dom";

export const UnitList = () => {

    const [reservations, setReservations] = useState<UnitInterface[]>([]);
    const [showFilter, setShowFilter] = useState<boolean>(false);

    const getUnits = async () => {
        const storageUnitService = new UnitStorageService()
        const storageUnits = await storageUnitService.getAll();
        setReservations(storageUnits);
    }
    
    const openFilter = () => {
        setShowFilter(true);
    };

    const closeFilter = () => {
        setShowFilter(false);
    };

    useEffect(() => {
        console.log('getUnits')
        getUnits();
      },[]);

    return (
        <Layout>
            <div className="page-back">
                <div className="pageback-wrapper">
                    <h1>Units</h1>
                    <NavLink 
                    to='/unit/save'
                    state={{ uni_id: 0 }}
                    >
                        <i className="icon-plus"></i>
                    </NavLink>
                </div>
            </div>
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
                {reservations.map((unit) => (
                    <div key={unit.uni_id} className="table-row" >
                        <div className="tableRow-wrapper">
                            <p className="tableRow-title">{unit.uni_name}</p>
                            <p>Available: {unit.uni_available_quantity}</p>
                            <p>Max People: {unit.uni_max_people}</p>
                            <p>Rooms: {unit.uni_rooms}</p>
                            <p>Single Bed: {unit.uni_rooms}</p>
                            <p>Double Bed: {unit.uni_rooms}</p>
                        </div>
                        <div  className="tableRow-button-detail">
                        <NavLink
                            to='/unit/save'
                            state={{ uni_id: unit.uni_id }}
                            >
                             <i className="icon-equalizer"></i> 
                        </NavLink>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    )
}