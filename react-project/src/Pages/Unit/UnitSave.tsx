import { NavLink, useLocation, useNavigate } from "react-router-dom"
import Layout from "../../Components/Layout/Layout"
import { UnitInterface } from "../../Models/Unit/UnitInterface";
import { UnitStorageService } from "../../Services/Unit/UnitStorageService";
import { useEffect, useState } from "react";
import { newObj } from "../../Utils/GeneralFunctions";
import {uni_doubleBed, uni_maxPeople, uni_rooms, uni_sigleBed } from "../../Utils/StaticData";
import { UnitModel } from "../../Models/Unit/UnitModel";
import { AxiosError } from "axios";

export const UnitSave = () => {

    const [unit, setUnit] = useState<UnitInterface>(newObj<UnitInterface>);
    const location = useLocation()
    const { state } = location
    const unitId = state.uni_id;
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [showMessages, setShowMessages] = useState<string[]>([]);
    const navigate = useNavigate();

    const onClickSave = async () => {

        const unitModel = new UnitModel(unit)
        if (unitModel.validate() === false) {
            setIsVisible(true)
            setShowMessages(unitModel.showMessages())
            throw new Error(unitModel.showMessages().toString());
        }
        const unitResponse = await unitModel.saveOrUpdate(unitId);
        if(unitResponse instanceof AxiosError){
            setIsVisible(true)
            setShowMessages(unitModel.showMessages())
            throw new Error(unitModel.showMessages().toString());
        }

        navigate("/unit");
    };

    const setUnitFromCreate = async () => {
        if (unitId === 0) {
            setUnit(new UnitModel().toPlainObject());
        } else {
            setUnit(new UnitModel(await new UnitStorageService().getById(unitId)).toPlainObject());
        }
    }

    useEffect(() => {
        setUnitFromCreate();
    }, []);

    return (
        <Layout>

            <div className="page-back">
                <div className="pageback-wrapper">
                    <h1>Unit save</h1>
                    <NavLink
                        to='/unit'
                    >
                        <i className="icon-arrow-left"></i>
                    </NavLink>
                    {(unitId !== 0) && (
                        <NavLink
                        to='/price/calendar'
                        state={{ uni_id: unitId}}
                        >
                        <i className="icon-coin-dollar"></i>
                        </NavLink>
                    )}
                  
                </div>
            </div>
            <div className="save-form">
                <div className="field-group">
                    <label>Name</label>
                    <input
                        value={unit.uni_name || ""}
                        onChange={(event) => setUnit({ ...unit, uni_name: event.target.value })}
                    />
                </div>
                <div className="field-group">
                    <label>Rooms</label>
                    <select
                        name="uni_rooms"
                        value={unit.uni_rooms || ""}
                        onChange={(event) => setUnit({ ...unit, uni_rooms: Number(event.target.value) })}
                    >
                        {uni_rooms.map((type, index) => (
                            <option value={type} key={index} >
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="field-group">
                    <label>Max People</label>
                    <select
                        name="uni_max_people"
                        value={unit.uni_max_people || ""}
                        onChange={(event) => setUnit({ ...unit, uni_max_people: Number(event.target.value) })}
                    >
                        {uni_maxPeople.map((type, index) => (
                            <option value={type} key={index} >
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="field-group">
                    <label>Single Beds</label>
                    <select
                        name="uni_single_bed"
                        value={unit.uni_single_bed || ""}
                        onChange={(event) => setUnit({ ...unit, uni_single_bed: Number(event.target.value) })}
                    >
                        {uni_sigleBed.map((type, index) => (
                            <option value={type} key={index} >
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="field-group">
                    <label>Doble Beds</label>
                    <select
                        name="uni_double_bed"
                        value={unit.uni_double_bed || ""}
                        onChange={(event) => setUnit({ ...unit, uni_double_bed: Number(event.target.value) })}
                    >
                        {uni_doubleBed.map((type, index) => (
                            <option value={type} key={index} >
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                {isVisible && (
                    <div className="form-error">
                        <div className="formError-wrapper">
                            {showMessages.map((guest) => (
                                <ul>
                                    <li>{guest}</li>
                                </ul>
                            ))}
                        </div>
                    </div>
                )}
                <div className="field-group">
                    <button className="fieldGroup-button-save" onClick={onClickSave} >Save</button>
                </div>
            </div>

        </Layout>
    )
}