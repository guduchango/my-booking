import { useState } from "react";
import Layout from "../../Components/Layout/Layout"
import Modal from "../../Modal/Modal";



export const Expense = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleSubmitModal = (value: string) => {
        console.log('Submitted value:', value);
    };
    return (
        <Layout>
            <div>
                <button onClick={handleOpenModal}>Open Modal</button>
                <Modal
                    isOpen={isOpen}
                    onClose={handleCloseModal}
                    onSubmit={handleSubmitModal}
                />
            </div>
        </Layout>
    )

}
