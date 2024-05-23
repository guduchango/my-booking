import { NavLink, useLocation } from "react-router-dom"
import Layout from "../../Components/Layout/Layout"
import { useState } from "react";
import { PriceInterface, PriceRageInterface } from "../../Models/Price/PriceInterface";
import { newObj } from "../../Utils/GeneralFunctions";
import { PriceHttpService } from "../../Services/Price/PriceHttpService";
import { PriceStorageService } from "../../Services/Price/PriceStorageService";

export const PriceCalendar = () => {
    const [priRange, setPriRange] = useState<PriceRageInterface>(newObj<PriceRageInterface>);
    const location = useLocation()
    const { state } = location
    const uniId = state.uni_id;

    const onClickSave = async () => {
        const priceHttpService = new PriceHttpService()
        priRange.pri_uni_id = uniId;
        const priceStorageService = new PriceStorageService();
        const priceResponse: PriceInterface[] = await priceHttpService.storeRangePrice(priRange)
        for (const price of priceResponse) {
            console.log('price',price)
            await priceStorageService.createOrUpdate(price)
        }
    };

    // const setPriceFromCreate = async () => {
    //     if (uniId === 0) {
    //         const priRangeDefault: PriceRageInterface = {} as PriceRageInterface;
    //         priRangeDefault.pri_from = ""
    //         priRangeDefault.pri_to = ""
    //         priRangeDefault.pri_value = 0
    //         priRangeDefault.pri_uni_id = 0
    //         setPriRange(priRangeDefault);
    //     } else {
            
    //         setPrice(storagePrice);
    //     }
    // }

    return (
        <Layout>
            <div className="page-back">
                <div className="pageback-wrapper">
                    <h1>Price Price</h1>
                    <NavLink 
                    to='/price/save'
                    state={{ gue_id: 0 }}
                    >
                        <i className="icon-arrow-left"></i>
                    </NavLink>
                </div>
                <div className="save-form">
                <div className="field-group">
                    <label>Price</label>
                    <input
                        type="number"
                        value={priRange.pri_value}
                        onChange={(event) => setPriRange({ ...priRange, pri_value: Number(event.target.value) })}
                    />
                </div>
                <div className="field-group">
                    <label>From</label>
                    <input
                        type="date"
                        value={priRange.pri_from}
                        onChange={(event) => setPriRange({ ...priRange, pri_from: event.target.value })}
                    />
                </div>
                <div className="field-group">
                    <label>To</label>
                    <input
                        type="date"
                        value={priRange.pri_to}
                        onChange={(event) => setPriRange({ ...priRange, pri_to: event.target.value })}
                    />
                    
                </div>
               
                <div className="field-group">
                    <button className="fieldGroup-button-save" onClick={onClickSave}>Save</button>
                </div>
            </div>
            </div>
        </Layout>
    )
}