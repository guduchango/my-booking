import { NavLink } from "react-router-dom"
import Layout from "../../Components/Layout/Layout"

export const UnitCreate = () => {

    return (
        <Layout>
            <div className="page-back">
                <NavLink to='/reservation/edit'>
                    <i className="icon-arrow-left"></i>
                </NavLink>
            </div>
            <h1>Unit Create</h1>
        </Layout>
    )
}