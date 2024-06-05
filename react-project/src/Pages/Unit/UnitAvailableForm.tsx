
import { NavLink, useNavigate } from "react-router-dom"
import Layout from "../../Components/Layout/Layout"
import { HTTP_CODES, uni_maxPeople } from "../../Utils/StaticData";
import { UnitHttpService } from "../../Services/Unit/UnitHttpService";
import { useEffect, useState } from "react";
import { UnitAvailableRequestInterface, UnitInterface } from "../../Models/Unit/UnitInterface";
import { useGlobalContext } from "../../Context/Context";
import { AxiosResponse } from "axios";



export const UnitAvailableForm = () => {

    const { setAvailableUnits,unitAvailableRequest,setUnitAvailableRequest } = useGlobalContext()
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const onClickSave = async () => {
        const unitHttpService = new UnitHttpService()
        let axiosResponse: AxiosResponse = {} as AxiosResponse;
        axiosResponse = await unitHttpService.availableUnits(unitAvailableRequest)
        const unitAvailableResponse: UnitInterface[] = axiosResponse.data as UnitInterface[];
        console.log('unitAvailableResponse',unitAvailableResponse)
        if(axiosResponse.status == HTTP_CODES.NO_CONTENT){
            setIsVisible(true)
        }else{
            setIsVisible(false)
            setAvailableUnits(unitAvailableResponse)
            setUnitAvailableRequest(unitAvailableRequest)
            navigate("/reservation/available-units");
        }
    };

    const setUnitFromCreate = async () => {
        const unitAvailableListDefault: UnitAvailableRequestInterface = {} as UnitAvailableRequestInterface;
        unitAvailableListDefault.check_in = ""
        unitAvailableListDefault.check_out = ""
        unitAvailableListDefault.people = 0
        setUnitAvailableRequest(unitAvailableListDefault);
    }

    useEffect(() => {
        setUnitFromCreate();
    }, []);

    return (
        <Layout>
            <div>
                <div className="page-back">
                    <div className="pageback-wrapper">
                        <h1>Reservation dates</h1>
                        <NavLink
                            to='/reservation/check'
                        />
                    </div>
                </div>
                <div className="save-form">
                    <div className="field-group">
                        <label>Check in</label>
                        <input name="check-in" type="date"
                            value={unitAvailableRequest.check_in}
                            onChange={(event) => setUnitAvailableRequest({ ...unitAvailableRequest, check_in: event.target.value })}
                        />
                    </div>
                    <div className="field-group">
                        <label>Check out</label>
                        <input name="check-out" type="date"
                            value={unitAvailableRequest.check_out}
                            onChange={(event) => setUnitAvailableRequest({ ...unitAvailableRequest, check_out: event.target.value })}
                        />
                    </div>
                    <div className="field-group">
                        <label>Max People</label>
                        <select
                            name="uni_max_people"
                            value={unitAvailableRequest.people}
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
                                No units find
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
