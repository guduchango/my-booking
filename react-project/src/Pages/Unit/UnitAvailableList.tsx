import { NavLink } from "react-router-dom";
import Layout from "../../Components/Layout/Layout"
import { useGlobalContext } from "../../Context/Context"
import { useEffect, useState } from "react";
import { UnitPriceCalculate, UnitPriceInterface } from "../../Models/Unit/UnitInterface";
import { getFriendlyDate } from "../../Utils/GeneralFunctions";

export const UnitAvailableList = () => {

    const { availableUnits, unitAvailableRequest } = useGlobalContext()
    
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [unitPriceList, setUnitPriceList] = useState<UnitPriceInterface[]>([]);
    const openFilter = () => {
        setShowFilter(true);
    };

    const closeFilter = () => {
        setShowFilter(false);
    };

    const getUnitPriceInfo = async () => {
        let unitPriceArray: Array<UnitPriceInterface> = []
        for (const unit of availableUnits) {
            const { check_in, check_out, people } = unitAvailableRequest;
            const priceCalculate = new UnitPriceCalculate(unit, check_in, check_out, people)
            const unitPriceObj = await priceCalculate.getUnitPriceInfo()
            unitPriceArray = [...unitPriceArray, unitPriceObj]
        }
        setUnitPriceList(unitPriceArray);
    }

    useEffect(() => {
        getUnitPriceInfo();
    }, []);

    return (
        <Layout>
            <div className="page-back">
                <div className="pageback-wrapper">
                    <h1>Available units</h1>
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
                {unitPriceList.map((unit) => (
                    <div key={unit.upri_uni_id} className="table-row" >
                        <NavLink
                            to='/reservation/save'
                            state={{ res_id: 0, unitPrice: unit }}
                        >
                            <div className="tableRow-wrapper">
                                <p className="tableRow-title">{unit.upri_name}</p>
                                <div className="tableRow-header">
                                    <p><i className="icon-enter" /> {getFriendlyDate(unit.upri_check_in)}</p>
                                    <p><i className="icon-exit" /> {getFriendlyDate(unit.upri_check_out)}</p>
                                    <p><i className="icon-users" /> {unit.upri_people}</p>
                                </div>
                                <div className="tableRow-body">
                                    <p>{unit.upri_max_people} max people</p>
                                    <p>{unit.upri_rooms} rooms</p>
                                    <p>{unit.upri_single_bed} single bed</p>
                                    <p>{unit.upri_dobule_bed} double bed</p>
                                </div>
                                <div className="tableRow-footer">
                                    <p>{unit.upri_price} USD</p>
                                </div>
                            </div>

                        </NavLink>

                    </div>
                ))}
            </div>
        </Layout>
    )
}