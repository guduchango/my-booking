
import { NavLink, useNavigate } from "react-router-dom"
import Layout from "../../Components/Layout/Layout"
import { uni_maxPeople } from "../../Utils/StaticData";
import { useState } from "react";
import { useGlobalContext } from "../../Context/Context";
import { AxiosError } from "axios";
import { UnitAvailableModel } from "../../Models/Unit/UnitAvailableModel";
import { useTranslation } from "react-i18next";


export const UnitAvailableForm = () => {
    const { t } = useTranslation();    
    const { setAvailableUnits, unitAvailableRequest, setUnitAvailableRequest, setIsReservationSeted } = useGlobalContext()
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [showMessages, setShowMessages] = useState<string[]>([]);
    const today = new Date().toISOString().split('T')[0];

    const onClickSave = async () => {

        const unitAvailableModel = new UnitAvailableModel(unitAvailableRequest)
        if (unitAvailableModel.validate() === false) {
            setIsVisible(true)
            setShowMessages(unitAvailableModel.showMessages())
            throw new Error(unitAvailableModel.showMessages().toString());
        }else{
            const unitAvailableResponse = await unitAvailableModel.checkAvailable();
            if(unitAvailableModel.showHttpMsj().length > 0){
                setShowMessages(unitAvailableModel.showHttpMsj())
                throw new Error(unitAvailableModel.showHttpMsj().toString());
            }else{
                setIsReservationSeted(false)
                setUnitAvailableRequest(unitAvailableRequest)
                setAvailableUnits(unitAvailableResponse)
                setIsVisible(false)
                navigate("/reservation/available-units");
            }    
        }    
    };

    return (
        <Layout>
            <div>
                <div className="page-back">
                    <div className="pageback-wrapper">
                        <h1>{t('Reservation dates')}</h1>
                        <NavLink
                            to='/reservation/check'
                        />
                    </div>
                </div>
                <div className="save-form">
                    <div className="field-group">
                        <label>{t('Check-In')}</label>
                        <input
                            type="date"
                            id="check-in"
                            name="check-in"
                            value={unitAvailableRequest.check_in || today}
                            onChange={(event) => setUnitAvailableRequest({ ...unitAvailableRequest, check_in: event.target.value })}
                            min={today} // Set the minimum date to today
                            required
                        />
                    </div>
                    <div className="field-group">
                        <label>{t('Check-Out')}</label>
                        <input
                            type="date"
                            id="check-out"
                            name="check-out"
                            value={unitAvailableRequest.check_out || today}
                            onChange={(event) => setUnitAvailableRequest({ ...unitAvailableRequest, check_out: event.target.value })}
                            min={today} // Set the minimum date to check-in or today
                            required
                        />
                    </div>
                    
                    <div className="field-group">
                        <label>{t('Max People')}</label>
                        <select
                            name="uni_max_people"
                            value={unitAvailableRequest.people || 0}
                            onChange={(event) => setUnitAvailableRequest({ ...unitAvailableRequest, people: Number(event.target.value) })}
                        >
                            {uni_maxPeople.map((type, index) => (
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
                        <button className="fieldGroup-button-save" onClick={onClickSave}>Search</button>
                    </div>
                </div>
            </div>
        </Layout>
    )

}
