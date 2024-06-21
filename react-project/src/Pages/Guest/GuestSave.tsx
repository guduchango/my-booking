import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout"
import './guest-create.css'
import { GuestStorageService } from "../../Services/Guest/GuestStorageService";
import { GuestHttpService } from "../../Services/Guest/GuestHttpService";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../Context/Context";
import { GuestModel } from "../../Models/Guest/GuestModel";

export const GuestSave = () => {
    const { setGuest, guest } = useGlobalContext()
    const location = useLocation()
    const { state } = location
    const gueId = state.gue_id;
    const fromPlace = state.fromPlace;
    const [guestModel] = useState(new GuestModel(guest));
    const [backUrl] = useState(guestModel.backUrl(fromPlace));
    
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [showMessages, setShowMessages] = useState<string[]>([]);
    const navigate = useNavigate();

    const onClickSave = async () => {
        if(guestModel.validate() === false){
            setIsVisible(true)
            setShowMessages(guestModel.showMessages())
            throw new Error(guestModel.showMessages().toString());
        }

        let guestResponse = new GuestModel()
        if(gueId === 0){
            guestResponse = await new GuestHttpService().storeGuest(guestModel)
            guestResponse = await new GuestStorageService().create(guestResponse)
        }else{
            guestResponse = await new GuestHttpService().updateGuest(guestModel,gueId)
            guestResponse = await new GuestStorageService().update(gueId,guestResponse)
        }
        setIsVisible(false)
        setGuest(guestResponse)
        navigate(backUrl);
    };

    const setGuestFromCreate = async () => {
        if (gueId === 0) {
            setGuest(new GuestModel());
        } else {
            setGuest(await new GuestStorageService().getById(gueId));
        }
    }

    useEffect(() => {
        setGuestFromCreate();
    }, []);

    return (
        <Layout>

            <div className="page-back">
                <div className="pageback-wrapper">
                    <h1>Guest save</h1>
                    <NavLink
                        to={backUrl}
                        state={{gue_id: gueId}}
                    >
                        <i className="icon-arrow-left"></i>
                    </NavLink>
                </div>
            </div>

            <div className="save-form">
                <div className="field-group">
                    <label>Name</label>
                    <input
                        value={guest.gue_name || ""}
                        onChange={(event) => setGuest({ ...guest, gue_name: event.target.value })}
                    />
                </div>
                <div className="field-group">
                    <label>Last name</label>
                    <input
                        value={guest.gue_last_name || ""}
                        onChange={(event) => setGuest({ ...guest, gue_last_name: event.target.value })}
                    />
                </div>
                <div className="field-group">
                    <label>Phone number</label>
                    <input
                        value={guest.gue_phone_number || ""}
                        onChange={(event) => setGuest({ ...guest, gue_phone_number: event.target.value })}
                    />
                </div>
                <div className="field-group">
                    <label>Identity document</label>
                    <input
                        value={guest.gue_identity_document || ""}
                        onChange={(event) => setGuest({ ...guest, gue_identity_document: event.target.value })}
                    />
                </div>
                <div className="field-group">
                    <label>Email</label>
                    <input
                        value={guest.gue_email || ""}
                        onChange={(event) => setGuest({ ...guest, gue_email: event.target.value })}
                    />
                </div>
                <div className="field-group">
                    <label>Date of birth</label>
                    <input type="date"
                        value={guest.gue_birthday || ""}
                        onChange={(event) => setGuest({ ...guest, gue_birthday: event.target.value })}
                    />
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
