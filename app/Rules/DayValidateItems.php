<?php

namespace App\Rules;

use App\Models\Reservation;

class DayValidateItems {

    //pri_price
    private float $price;
    //pri_res_id
    private int $item_reservation_id;
    //res_id
    private int $update_reservation_id;
    //pri_unit_id
    private int $unit_id;
    //pri_date
    private string $day;
    //item reservation model
    private Reservation $itemReservationModel;
    //update reservation model
    private Reservation $updateReservationModel;

    private array $errorMessages = [];

    public function __construct($day, $price, $unit_id, $item_reservation_id, $update_reservation_id) {
        $this->setDay($day);
        $this->setPrice($price);
        $this->setUnitId($unit_id);
        $this->setItemReservationId($item_reservation_id);
        $this->setUpdateReservationId($update_reservation_id);
        $this->itemReservationModel = $this->getItemReservationModel();
        $this->updateReservationModel = $this->getUpdateReservationModel();
    }

    public function validate() {

        $hasPrice = false;
        if ($this->getPrice() != 0) {
            $hasPrice = true;
        } else {
            $hasPrice = false;
            $this->addErrorMessage($this->getDay() . ":No tiene precio.");
        }

        $hasValidReservationId = false;
        if ($this->getUpdateReservationId() > 0) {
                if ($this->getItemReservationId() == 0) {
                    $hasValidReservationId = true;
                } else {
                    if ($this->getItemReservationId() == $this->getUpdateReservationId()) {
                        $hasValidReservationId = true;
                    } else {
                        $this->addErrorMessage($this->getDay() . ":La reserva del item es distinta a la reserva a actualizar");
                        $hasValidReservationId = false;
                    }
                }
        } else {
            if ($this->getItemReservationId() == 0) {
                $hasValidReservationId = true;
            } else {
                $this->addErrorMessage($this->getDay() . ":Ya tiene reserva seteada");
                $hasValidReservationId = false;
            }
        }

        if ($hasPrice === true && $hasValidReservationId === true) {
            return true;
        }

        $this->addErrorMessage($this->getDay() . ":Error en algun lugar");
        return false;
    }

    public function getItemReservationModel(): Reservation {
        if ($this->getItemReservationId() > 0) {
            return Reservation::find($this->getItemReservationId());
        }
        return new Reservation();
    }

    public function getUpdateReservationModel(): Reservation {
        if ($this->getUpdateReservationId() > 0) {
            return Reservation::find($this->getUpdateReservationId());
        }
        return new Reservation();
    }

    public function getPrice(): float {
        return $this->price;
    }

    public function setPrice(float $price): void {
        $this->price = $price;
    }

    public function getItemReservationId(): int {
        return $this->item_reservation_id;
    }

    public function setItemReservationId(int $item_reservation_id): void {
        $this->item_reservation_id = $item_reservation_id;
    }

    public function getUpdateReservationId(): int {
        return $this->update_reservation_id;
    }

    public function setUpdateReservationId(int $update_reservation_id): void {
        $this->update_reservation_id = $update_reservation_id;
    }

    public function getUnitId(): int {
        return $this->unit_id;
    }

    public function setUnitId(int $unit_id): void {
        $this->unit_id = $unit_id;
    }

    public function getDay(): string {
        return $this->day;
    }

    public function setDay(string $day): void {
        $this->day = $day;
    }

    public function addErrorMessage(string $errorMessage): void {
        $this->errorMessages[] = $errorMessage;
    }

    public function getErrorMessages(): array {
        return $this->errorMessages;
    }


}
