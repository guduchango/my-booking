import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout"
import './reservation-edit.css'
import { useEffect, useState } from "react";
import { daysBetween, diffFloatNumber, getOnlyDay, getPercentajeOther, upperCaseFirst } from "../../Utils/GeneralFunctions";
import { res_adults, res_advances, res_beds, res_channels, res_children, res_status } from "../../Utils/StaticData";
import Select from "react-select";
import { UnitStorageService } from "../../Services/Unit/UnitStorageService";
import { UnitInterface } from "../../Models/Unit/UnitInterface";
import { GuestInterface } from "../../Models/Guest/GuestInterface";
import { GuestStorageService } from "../../Services/Guest/GuestStorageService";
import { ReservationStorageService } from "../../Services/Reservation/ReservationStorageService";
import { useGlobalContext } from "../../Context/Context";
import { PromotionStorageService } from "../../Services/Promotion/PromotionStorageService";
import { PromotionInterface } from "../../Models/Promotion/PromotionInterface";
import { ReservationModel } from "../../Models/Reservation/ReservationModel";
import { PriceStorageService } from "../../Services/Price/PriceStorageService";
import { async } from '../../Services/Guest/GuestServiceAxios';
import { PriceInterface } from "../../Models/Price/PriceInterface";

export const ReservationEdit = () => {

  const location = useLocation()
  const { state } = location
  const resId = state?.res_id
  const navigate = useNavigate();
  const { reservation, setReservation } = useGlobalContext()
  const [units, setUnits] = useState<UnitInterface[]>([]);
  const [guests, setGuests] = useState<GuestInterface[]>([]);
  const [promotions, setPromotions] = useState<PromotionInterface[]>([]);
  const [proValue, setProValue] = useState<number>(0);
  const [resAdvancePayment, setResAdvancePayment] = useState<number>(0)
  const [resPrice, setResPrice] = useState<number>(0)
  const [resFinalPrice, setResFinalPrice] = useState<number>(0)
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showMessages, setShowMessages] = useState<string[]>([]);
  const [advance, setAdvance] = useState<number>(0)
  const [resFinalPricePercentaje, setResFinalPricePercentaje] = useState<number>(0)
  const [resStartDate, setResStartDate] = useState<string>("")
  const [resEndDate, setResEndDate] = useState<string>("")
  const [unitsArray, setUnitsArray] = useState<PriceInterface[]>([])

  const today = new Date().toISOString().split('T')[0];
  

  const getUnits = async () => {
    const unitStorageService = new UnitStorageService()
    const unitsStorage = await unitStorageService.getAll();
    setUnits(unitsStorage)
  }

  const getGuests = async () => {
    const guestStorageService = new GuestStorageService()
    const guestStorage = await guestStorageService.getAll();
    setGuests(guestStorage)
  }

  const getReservation = async () => {
    const storageReservationService = new ReservationStorageService()
    const storageReservation = await storageReservationService.getById(resId);
    //const priceStorageService = new PriceStorageService()
    //const pricesArray = await priceStorageService.getDatesPriceArray(reservation.res_uni_id,resStartDate,resEndDate)
    setReservation(storageReservation)
    // setUnitsArray(pricesArray)
    // setResPrice(reservation.res_price)
    // setResFinalPrice(reservation.res_price_final)
    // setResAdvancePayment(reservation.res_advance_payment)
    // setResStartDate(reservation.res_start_date)
    // setResEndDate(reservation.res_end_date)
  }

  const getPromotions = async () => {
    const promotionStorageService = new PromotionStorageService()
    const storagePromotions = await promotionStorageService.getAll();
    setPromotions(storagePromotions);
  }

  const handlePromotionChange = (value: number): void => {
    const promotionItem = promotions.find(promotion => promotion.pro_value === value);
    const promotionValue = promotionItem?.pro_value ?? 0
    const finalPrice = resPrice - (promotionValue * 0.01) * resPrice
    const finalPricePercentaje = getPercentajeOther(resPrice, finalPrice);
    setResFinalPricePercentaje(finalPricePercentaje)
    setProValue(value)
    setResFinalPrice(finalPrice)
    console.log(promotionItem)
  };

  const handleFinalPriceChange = (value: number): void => {
    setResFinalPrice(value);
  };

  const handleAdvanceChange = (value: number): void => {
    setAdvance(value)
    const advanceConst = resFinalPrice * value * 0.01
    const fixedAdvanceConst = parseFloat(advanceConst.toFixed(2)) ?? 0
    setResAdvancePayment(fixedAdvanceConst)
  };

  const handleStartDateChange = async(value: string): Promise<void> => {
    const priceStorageService = new PriceStorageService()
    const price = await priceStorageService.calculateTotal(reservation.res_uni_id,resStartDate,resEndDate)
    const pricesArray = await priceStorageService.getDatesPriceArray(reservation.res_uni_id,resStartDate,resEndDate)
    setUnitsArray(pricesArray)
    setResPrice(price);
    setResStartDate(value)
  };

  const handleEndDateChange = async(value: string): Promise<void> => {
    const priceStorageService = new PriceStorageService()
    const price = await priceStorageService.calculateTotal(reservation.res_uni_id,resStartDate,resEndDate)
    const pricesArray = await priceStorageService.getDatesPriceArray(reservation.res_uni_id,resStartDate,resEndDate)
    setUnitsArray(pricesArray)
    setResPrice(price);
    setResEndDate(value)
  };


  const guestItems = guests.map(item => ({
    value: item.gue_id,
    label: item.gue_full_name
  }));

  const unitsItems = units.map(item => ({
    value: item.uni_id,
    label: item.uni_name
  }));

  const onClickSave = async () => {
    reservation.res_price = resPrice
    reservation.res_price_final = resFinalPrice
    reservation.res_advance_payment = resAdvancePayment
    reservation.res_nights = daysBetween(reservation.res_start_date, reservation.res_end_date)
    reservation.res_start_date = resStartDate;

    const reservationModel = new ReservationModel(reservation)
    if (reservationModel.validate() === false) {
      setIsVisible(true)
      setShowMessages(reservationModel.showMessages())
      throw new Error(reservationModel.showMessages().toString());
    }
    await reservationModel.update(resId);
    if (reservationModel.showMessages().length > 0) {
      console.log("entrea reservationModel.showMessages().length > 0")
      setIsVisible(true)
      setShowMessages(reservationModel.showMessages())
      throw new Error(reservationModel.showMessages().toString());
    }
    navigate("/reservation");
  };

  useEffect(() => {
    getReservation();
    getGuests();
    getUnits();
    getPromotions();
  }, []);

  // Supongamos que 'reservation' es el estado que depende del valor de 'setReservation'
useEffect(() => {
  // Definir una función asíncrona dentro de useEffect
  const fetchPrices = async () => {
    if (reservation) { 
      console.log("v1",reservation)
      const priceStorageService = new PriceStorageService();

      // Esperar a que la función getDatesPriceArray se resuelva
      const pricesArray = await priceStorageService.getDatesPriceArray(
        reservation.res_uni_id,
        resStartDate,
        resEndDate
      );

      // Actualizar los estados después de obtener los datos
      setUnitsArray(pricesArray);
      setResPrice(reservation.res_price);
      setResFinalPrice(reservation.res_price_final);
      setResAdvancePayment(reservation.res_advance_payment);
      setResStartDate(reservation.res_start_date);
      setResEndDate(reservation.res_end_date);
    }
  };

  // Llamar a la función asincrónica
  fetchPrices();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [reservation,resStartDate,resEndDate]);

  return (
    <Layout>
      <div className="page-back">
        <div className="pageback-wrapper">
          <h1>Editar reservación</h1>
          <NavLink
            to={resId !== 0 ? '/reservation/details' : '/reservation/'}
            state={{ res_id: resId }}
          >
            <i className="icon-arrow-left"></i>
          </NavLink>
        </div>
      </div>



      <div className="save-form">
        <div className="saveForm-fielset">
          <p>Detalle de la reserva:</p>
        </div>
        <div className="saveForm-wrapper">
          <div className="field-group">
            <label>Huesped</label>
            <div className="field-group">

              <Select
                className="guest-select"
                options={guestItems}
                onChange={(event) => setReservation({ ...reservation, res_gue_id: Number(event?.value) })}
                value={guestItems.filter((option) => (option.value === reservation.res_gue_id))}
              />

            </div>
          </div>
          <div className="field-group">
            <label>Alojamiento</label>
            <Select
              options={unitsItems}
              onChange={(event) => setReservation({ ...reservation, res_uni_id: Number(event?.value) })}
              value={unitsItems.filter((option) => (option.value === reservation.res_uni_id))}
              isDisabled={(resId == 0) ? true : false}
            />
          </div>
          <div className="field-group">
            <label>Check-In</label>
            <input
              name="res_start_date"
              value={resStartDate}
              type="date"
              min={today}
              onChange={(event) => handleStartDateChange(event.target.value)}
            />
          </div>
          <div className="field-group">
            <label>Check-Out</label>
            <input
              name="res_end_date"
              value={resEndDate}
              type="date"
              min={today}
              onChange={(event) => handleEndDateChange(event.target.value)}
            />
          </div>

          <div className="field-group">
            <label>Adultos</label>
            <select
              name="res_adults"
              value={reservation.res_adults}
              onChange={(event) => setReservation({ ...reservation, res_adults: Number(event.target.value) })}
            >
              {res_adults.map((type, index) => (
                <option value={type} key={index} >
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="field-group">
            <label>Chicos</label>
            <select
              name="res_children"
              value={reservation.res_children}
              onChange={(event) => setReservation({ ...reservation, res_children: Number(event.target.value) })}
            >
              {res_children.map((type, index) => (
                <option value={type} key={index} >
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="field-group">
            <label>Camas</label>
            <select
              name="res_beds"
              value={reservation.res_beds}
              onChange={(event) => setReservation({ ...reservation, res_beds: Number(event.target.value) })}
            >
              {res_beds.map((type, index) => (
                <option value={type} key={index} >
                  {type}
                </option>
              ))}
            </select>

          </div>
          <div className="field-group">
            <label>Estado reserva</label>
            <select
              name="res_status"
              value={reservation.res_status}
              onChange={(event) => setReservation({ ...reservation, res_status: event.target.value })}
            >
              {res_status.map((type, index) => (
                <option value={type} key={index} >
                  {upperCaseFirst(type)}
                </option>
              ))}
            </select>

          </div>
          <div className="field-group">
            <label>Medio de reserva</label>
            <select
              name="res_channel"
              value={reservation.res_channel}
              onChange={(event) => setReservation({ ...reservation, res_channel: event.target.value })}
            >
              {res_channels.map((type, index) => (
                <option value={type} key={index} >
                  {upperCaseFirst(type)}
                </option>
              ))}
            </select>
          </div>

        </div>
        <div className="saveForm-fielset">
          <p>Detalle pago:</p>
        </div>
        <div className="saveForm-wrapper">

         

          <div className="field-group">
            <div className="field-readOnly">
              <label>Total (sin descuento)</label>
              <p>{`${reservation.res_nights} noches =  $${resPrice}`}</p>
            </div>
          </div>

          <div className="fieldGroup-datePriceDetails">
          {unitsArray.map((type, index) => (
                <div key={index} >
                  <div key={index+1} className="fieldGroupDatePriceDetails-wrapper">
                    <span key={index+2} >{getOnlyDay(type.pri_date)}</span>
                    <span key={index+3} >${type.pri_price}</span>
                  </div>
                </div>
              ))}
          </div>

          <div className="field-group">
            <label>Descuento</label>
            <select
              //name="res_pro_id"
              value={proValue}
              onChange={(event) => handlePromotionChange(Number(event.target.value))}
            >
              {promotions.map((obj, index) => (
                <option value={obj.pro_value} key={index} >
                  {`${obj.pro_name}`}
                </option>
              ))}
            </select>
          </div>

          <div className="field-group">
            <label>Precio final {`con (${resFinalPricePercentaje}%) de descuento`}</label>
            <input
              //name="res_price_final"
              value={resFinalPrice}
              type="number"
              onChange={(event) => handleFinalPriceChange(Number(event.target.value))}
            />
          </div>
          <div className="field-group">
            <label>Porcentaje de seña / adelanto</label>
            <select
              //name="res_pro_id"
              value={advance}
              onChange={(event) => handleAdvanceChange(Number(event.target.value))}
            >
              {res_advances.map((obj, index) => (
                <option value={obj.value} key={index} >
                  {`${obj.key}`}
                </option>
              ))}
            </select>
          </div>
          <div className="field-group">
            <div className="field-readOnly">
              <p>$ {(`${resAdvancePayment}`)} (seña / adelanto) </p>
              <p>$ {(`${diffFloatNumber(resFinalPrice, resAdvancePayment)}`)} (paga al llegar)</p>
            </div>
          </div>

        </div>

        <div className="field-group">
          <label>Comentarios</label>
          <textarea
            rows={6}
            name="res_comments"
            onChange={(event) => setReservation({ ...reservation, res_comments: event.target.value })}
            value={reservation.res_comments}
          >
          </textarea>
        </div>
        {isVisible && (
          <div className="form-error">
            <div className="formError-wrapper">
              {showMessages.map((msj) => (
                <ul>
                  <li key={msj}>{msj}</li>
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