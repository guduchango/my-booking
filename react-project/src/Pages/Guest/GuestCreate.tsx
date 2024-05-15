import { NavLink } from "react-router-dom";
import Layout from "../../Components/Layout/Layout"
import './guest-create.css'
import { useForm } from 'react-hook-form';
import { useGlobalContext } from "../../Context/Context";
import { GuestStorageService } from "../../Services/Guest/GuestStorageService";
import { GuestInterface } from "../../Models/Guest/GuestInterface";

export const GuestCreate = () => {

    const { reservation } = useGlobalContext()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <Layout>
            <div className="page-back">
                <div className="pageback-wrapper">
                <h1>Guest create</h1>
                <NavLink
                    to='/reservation/edit'
                    state={{ res_id: reservation.res_id }}
                    >
                    <i className="icon-arrow-left"></i>
                </NavLink>
                </div>
            </div>
            
            <div className="guest-create">
                <form onSubmit={
                    handleSubmit((data) => {
                        const guestData:GuestInterface = data as GuestInterface;
                        const guestStorage = new GuestStorageService();
                        guestStorage.create(guestData)
                    })
                    }>
                    <div className="field-group">
                        <label>Name</label>
                        <input {...register('gue_name', { required: true })} />
                        {errors.gue_name && <p className="error">Name is required.</p>}
                    </div>
                    <div className="field-group">
                        <label>Last name</label>
                        <input {...register('gue_last_name', { required: true })} />
                        {errors.gue_last_name && <p className="error">Last name is required.</p>}
                    </div>
                    <div className="field-group">
                        <label>Phone number</label>
                        <input {...register('gue_phone_number')} />
                        {errors.gue_phone_number && <p>Last name is required.</p>}
                    </div>
                    <div className="field-group">
                        <label>Identity document</label>
                        <input {...register('gue_identity_document')} />
                        {errors.gue_identity_document && <p>Lorem ipsum.</p>}
                    </div>

                    <div className="field-group">
                        <label>Email</label>
                        <input {...register('gue_email')} />
                        {errors.gue_email && <p>Lorem ipsum.</p>}
                    </div>
                    <div className="field-group">
                        <label>Date of birth</label>
                        <input type="date" {...register('gue_birthday')} />
                        {errors.gue_birthday && <p>Lorem ipsum.</p>}
                    </div>
                    <div className="field-group">
                        <input className="fieldGroup-save" type="submit" value="Save" />
                    </div>
                </form>
            </div>


        </Layout>
    )
}
