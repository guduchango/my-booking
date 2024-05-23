import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout"
import './guest-create.css'
import { GuestStorageService } from "../../Services/Guest/GuestStorageService";
import { GuestInterface } from "../../Models/Guest/GuestInterface";
import { GuestHttpService } from "../../Services/Guest/GuestHttpService";
import { useEffect, useState } from "react";
import { newObj } from "../../Utils/GeneralFunctions";

export const GuestSave = () => {
    const [guest, setGuest] = useState<GuestInterface>(newObj<GuestInterface>);
    const location = useLocation()
    const { state } = location
    const gueId = state.gue_id;
    const navigate = useNavigate();

    const onClickSave = async () => {
        const guestHttpService = new GuestHttpService()
        let guestResponse: GuestInterface = {} as GuestInterface;
        const guestStorageService = new GuestStorageService();
        if(gueId === 0){
            guestResponse = await guestHttpService.storeGuest(guest)
            await guestStorageService.create(guestResponse)
        }else{
            guestResponse = await guestHttpService.updateGuest(guest,gueId)
            await guestStorageService.update(gueId,guestResponse)
        }
        
        navigate("/guest");
    };

    const setGuestFromCreate = async () => {
        if (gueId === 0) {
            const guestDefault: GuestInterface = {} as GuestInterface;
            guestDefault.gue_id = 0
            guestDefault.gue_name = ""
            guestDefault.gue_last_name = ""
            guestDefault.gue_phone_number = ""
            guestDefault.gue_email = ""
            guestDefault.gue_birthday = ""
            setGuest(guestDefault);
        } else {
            const storageGuestService = new GuestStorageService()
            const storageGuest = await storageGuestService.getById(gueId);
            setGuest(storageGuest);
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
                        to='/guest'
                    >
                        <i className="icon-arrow-left"></i>
                    </NavLink>
                </div>
            </div>

            <div className="save-form">
                <div className="field-group">
                    <label>Name</label>
                    <input
                        value={guest.gue_name}
                        onChange={(event) => setGuest({ ...guest, gue_name: event.target.value })}
                    />
                </div>
                <div className="field-group">
                    <label>Last name</label>
                    <input
                        value={guest.gue_last_name}
                        onChange={(event) => setGuest({ ...guest, gue_last_name: event.target.value })}
                    />
                </div>
                <div className="field-group">
                    <label>Phone number</label>
                    <input
                        value={guest.gue_phone_number}
                        onChange={(event) => setGuest({ ...guest, gue_phone_number: event.target.value })}
                    />
                </div>
                <div className="field-group">
                    <label>Identity document</label>
                    <input
                        value={guest.gue_identity_document}
                        onChange={(event) => setGuest({ ...guest, gue_identity_document: event.target.value })}
                    />
                </div>
                <div className="field-group">
                    <label>Email</label>
                    <input
                        value={guest.gue_email}
                        onChange={(event) => setGuest({ ...guest, gue_email: event.target.value })}
                    />
                </div>
                <div className="field-group">
                    <label>Date of birth</label>
                    <input type="date"
                        value={guest.gue_birthday}
                        onChange={(event) => setGuest({ ...guest, gue_birthday: event.target.value })}
                    />
                </div>
                <div className="field-group">
                    <button className="fieldGroup-button-save" onClick={onClickSave} >Save</button>
                </div>
            </div>

        </Layout>
    )
}
