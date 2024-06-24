import { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout"
import { useGlobalContext } from "../../Context/Context"
import { UserModel } from "../../Models/User/UserModel";
import { UserHttpService } from "../../Services/User/UserHttpService";
import { UserStorageService } from "../../Services/User/UserStorageService ";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    
    const { setUser, user } = useGlobalContext()
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [showMessages, setShowMessages] = useState<string[]>([]);
    const navigate = useNavigate();

    const onClickSave = async () => {
        const userModel = new UserModel(user);
        if(userModel.registerValidate() === false){
            setIsVisible(true)
            setShowMessages(userModel.showMessages())
            throw new Error(userModel.showMessages().toString());
        }
        let userResponse = await new UserHttpService().storeUser(userModel)
        const userStorageService = new UserStorageService();
        userResponse = await userStorageService.create(userResponse)
        setIsVisible(false)
        setUser(userResponse)
        navigate("/")
    };

    const setDefaultForm = async () => {
        setUser(new UserModel());
    }

    useEffect(() => {
        setDefaultForm();
    }, []);


    return (
        <Layout>

            <div className="page-back">
                <div className="pageback-wrapper">
                    <h1>Register</h1>
                </div>
            </div>

            <div className="save-form">
                <div className="field-group">
                    <label>Name</label>
                    <input
                        value={user.name || ""}
                        onChange={(event) => setUser({ ...user, name: event.target.value })}
                    />
                </div>
                <div className="field-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={user.email || ""}
                        onChange={(event) => setUser({ ...user, email: event.target.value })}
                    />
                </div>
                <div className="field-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={user.password || ""}
                        onChange={(event) => setUser({ ...user, password: event.target.value })}
                    />
                </div>
                <div className="field-group">
                    <label>Password confirmation</label>
                    <input
                        type="password"
                        value={user.password_confirmation || ""}
                        onChange={(event) => setUser({ ...user, password_confirmation: event.target.value })}
                    />
                </div>
                {isVisible && (
                        <div className="form-error">
                            <div className="formError-wrapper">
                            {showMessages.map((msj,key) => (
                                <ul>
                                    <li key={key}>{msj}</li>
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