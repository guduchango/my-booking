import Layout from "../../Components/Layout/Layout"
import { toast } from 'react-toastify';


export const Expense = () => {

    const notify = () => toast("Wow so easy!");

    return (
        <Layout>
            <h1>Expense</h1>
            <button onClick={notify}>Notify!</button>
            
        </Layout>
        
    )
}
