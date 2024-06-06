import { NavLink, useLocation, useNavigate } from "react-router-dom"
import Layout from "../../Components/Layout/Layout"
import { UnitInterface } from "../../Models/Unit/UnitInterface";
import { UnitHttpService } from "../../Services/Unit/UnitHttpService";
import { UnitStorageService } from "../../Services/Unit/UnitStorageService";
import { useEffect, useState } from "react";
import { newObj } from "../../Utils/GeneralFunctions";
import {uni_doubleBed, uni_maxPeople, uni_rooms, uni_sigleBed } from "../../Utils/StaticData";

export const UnitSave = () => {

    const [unit, setUnit] = useState<UnitInterface>(newObj<UnitInterface>);
    const location = useLocation()
    const { state } = location
    const unitId = state.uni_id;
    const navigate = useNavigate();

    const onClickSave = async () => {
        const unitHttpService = new UnitHttpService()
        let unitResponse: UnitInterface = {} as UnitInterface;
        const unitStorageService = new UnitStorageService();
        if (unitId === 0) {
            unitResponse = await unitHttpService.storeUnit(unit)
            await unitStorageService.create(unitResponse)
        } else {
            unitResponse = await unitHttpService.updateUnit(unit, unitId)
            await unitStorageService.update(unitId, unitResponse)
        }

        navigate("/unit");
    };

    const setUnitFromCreate = async () => {
        if (unitId === 0) {
            const unitDefault: UnitInterface = {} as UnitInterface;
            unitDefault.uni_id = 0
            unitDefault.uni_name = ""
            unitDefault.uni_max_people = 0
            unitDefault.uni_single_bed = 0
            unitDefault.uni_dobule_bed = 0
            unitDefault.uni_rooms = 0
            setUnit(unitDefault);
        } else {
            const storageUnitService = new UnitStorageService()
            const storageUnit = await storageUnitService.getById(unitId);
            setUnit(storageUnit);
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
                        value={unit.uni_name}
                        onChange={(event) => setUnit({ ...unit, uni_name: event.target.value })}
                    />
                </div>
                <div className="field-group">
                    <label>Rooms</label>
                    <select
                        name="uni_rooms"
                        value={unit.uni_rooms}
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
                        value={unit.uni_max_people}
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
                        value={unit.uni_single_bed}
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
                        name="uni_dobule_bed"
                        value={unit.uni_dobule_bed}
                        onChange={(event) => setUnit({ ...unit, uni_dobule_bed: Number(event.target.value) })}
                    >
                        {uni_doubleBed.map((type, index) => (
                            <option value={type} key={index} >
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="field-group">
                    <button className="fieldGroup-button-save" onClick={onClickSave} >Save</button>
                </div>
            </div>

        </Layout>
    )
}