import { useState } from "react";
import Layout from "../../Components/Layout/Layout"
import './booking.css'

const Booking = () => {
    const [showFilter, setShowFilter] = useState(false);
    const openFilter = () => {
        setShowFilter(true);
    };

    const closeFilter = () => {
        setShowFilter(false);
    };

    return (
        <Layout>
            <div className="filter-wrapper">
                <div className="filter-icons">
                {showFilter && (
                    <a onClick={closeFilter}>
                        <i className="icon-cross"></i>
                    </a>
                )}
                {!showFilter && (
                    <a onClick={openFilter}>
                        <i className="icon-search"></i>
                    </a>
                )}
                </div>
                <div className="filter-input">
                    {showFilter && (
                        <div className="showBox">
                            <input placeholder="Buscar...."></input>
                        </div>
                    )}
                </div>
            </div>
            <div className="table">
                <div className="table-row" >
                    <div className="tableRow-wrapper">
                        <p className="tableRow-title">Edgardo Ponce</p>
                        <p>28 mar - 1 abr 2024</p>
                        <p>4 noches</p>
                        <p>2 adultos, 2 niños</p>
                        <p>Departamento 1</p>
                    </div>
                </div>
                <div className="table-row" >
                    <div className="tableRow-wrapper">
                        <h1>Edgardo Ponce</h1>
                        <p>28 mar - 1 abr 2024</p>
                        <p>4 noches</p>
                        <p>2 adultos, 2 niños</p>
                        <p>Departamento 1</p>
                    </div>
                </div>
                <div className="table-row" >
                    <div className="tableRow-wrapper">
                        <h1>Edgardo Ponce</h1>
                        <p>28 mar - 1 abr 2024</p>
                        <p>4 noches</p>
                        <p>2 adultos, 2 niños</p>
                        <p>Departamento 1</p>
                    </div>
                </div>
                <div className="table-row" >
                    <div className="tableRow-wrapper">
                        <h1>Edgardo Ponce</h1>
                        <p>28 mar - 1 abr 2024</p>
                        <p>4 noches</p>
                        <p>2 adultos, 2 niños</p>
                        <p>Departamento 1</p>
                    </div>
                </div>
                <div className="table-row" >
                    <div className="tableRow-wrapper">
                        <h1>Edgardo Ponce</h1>
                        <p>28 mar - 1 abr 2024</p>
                        <p>4 noches</p>
                        <p>2 adultos, 2 niños</p>
                        <p>Departamento 1</p>
                    </div>
                </div>
                <div className="table-row" >
                    <div className="tableRow-wrapper">
                        <h1>Edgardo Ponce</h1>
                        <p>28 mar - 1 abr 2024</p>
                        <p>4 noches</p>
                        <p>2 adultos, 2 niños</p>
                        <p>Departamento 1</p>
                    </div>
                </div>
                <div className="table-row" >
                    <div className="tableRow-wrapper">
                        <h1>Edgardo Ponce</h1>
                        <p>28 mar - 1 abr 2024</p>
                        <p>4 noches</p>
                        <p>2 adultos, 2 niños</p>
                        <p>Departamento 1</p>
                    </div>
                </div>
                <div className="table-row" >
                    <div className="tableRow-wrapper">
                        <h1>Edgardo Ponce</h1>
                        <p>28 mar - 1 abr 2024</p>
                        <p>4 noches</p>
                        <p>2 adultos, 2 niños</p>
                        <p>Departamento 1</p>
                    </div>
                </div>
                <div className="table-row" >
                    <div className="tableRow-wrapper">
                        <h1>Edgardo Ponce</h1>
                        <p>28 mar - 1 abr 2024</p>
                        <p>4 noches</p>
                        <p>2 adultos, 2 niños</p>
                        <p>Departamento 1</p>
                    </div>
                </div>
                <div className="table-row" >
                    <div className="tableRow-wrapper">
                        <h1>Edgardo Ponce</h1>
                        <p>28 mar - 1 abr 2024</p>
                        <p>4 noches</p>
                        <p>2 adultos, 2 niños</p>
                        <p>Departamento 1</p>
                    </div>
                </div>
                <div className="table-row" >
                    <div className="tableRow-wrapper">
                        <h1>Edgardo Ponce</h1>
                        <p>28 mar - 1 abr 2024</p>
                        <p>4 noches</p>
                        <p>2 adultos, 2 niños</p>
                        <p>Departamento 1</p>
                    </div>
                </div>
                <div className="table-row" >
                    <div className="tableRow-wrapper">
                        <h1>Edgardo Ponce</h1>
                        <p>28 mar - 1 abr 2024</p>
                        <p>4 noches</p>
                        <p>2 adultos, 2 niños</p>
                        <p>Departamento 1</p>
                    </div>
                </div>
                <div className="table-row" >
                    <div className="tableRow-wrapper">
                        <h1>Edgardo Ponce</h1>
                        <p>28 mar - 1 abr 2024</p>
                        <p>4 noches</p>
                        <p>2 adultos, 2 niños</p>
                        <p>Departamento 1</p>
                    </div>
                </div>
                <div className="table-row" >
                    <div className="tableRow-wrapper">
                        <h1>Edgardo Ponce</h1>
                        <p>28 mar - 1 abr 2024</p>
                        <p>4 noches</p>
                        <p>2 adultos, 2 niños</p>
                        <p>Departamento 1</p>
                    </div>
                </div>
                <div className="table-row" >
                    <div className="tableRow-wrapper">
                        <h1>Edgardo Ponce</h1>
                        <p>28 mar - 1 abr 2024</p>
                        <p>4 noches</p>
                        <p>2 adultos, 2 niños</p>
                        <p>Departamento 1</p>
                    </div>
                </div>
                <div className="table-row" >
                    <div className="tableRow-wrapper">
                        <h1>Edgardo Ponce</h1>
                        <p>28 mar - 1 abr 2024</p>
                        <p>4 noches</p>
                        <p>2 adultos, 2 niños</p>
                        <p>Departamento 1</p>
                    </div>
                </div>
                <div className="table-row" >
                    <div className="tableRow-wrapper">
                        <h1>Edgardo Ponce</h1>
                        <p>28 mar - 1 abr 2024</p>
                        <p>4 noches</p>
                        <p>2 adultos, 2 niños</p>
                        <p>Departamento 1</p>
                    </div>
                </div>
                <div className="table-row" >
                    <div className="tableRow-wrapper">
                        <h1>Edgardo Ponce</h1>
                        <p>28 mar - 1 abr 2024</p>
                        <p>4 noches</p>
                        <p>2 adultos, 2 niños</p>
                        <p>Departamento 1</p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Booking