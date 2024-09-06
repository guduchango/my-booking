<?php
namespace App\Rules;
use App\Models\Reservation;
use App\Rules\StatusReservation;
use Illuminate\Support\Facades\DB;

class ReservationRule {

    private string $checkIn;
    private string $checkOut;
    private int $unitId;
    private int $reservationId;
    private Reservation $reservationModel;
    private array $rangeDays;

    private array $errorMessage = [];

    public function __construct(string $checkIn, string $checkOut, int $unitId, int $reservationId) {
        $this->checkIn = $checkIn;
        $this->checkOut = $checkOut;
        $this->unitId = $unitId;
        $this->reservationId = $reservationId;
        $this->rangeDays = getDaysBetweenDates($this->getCheckIn(), $this->getCheckOut());
    }

    public function validate(){
        $this->reservationModel = $this->getReservationModel();
        foreach ($this->rangeDays as $day) {
            $pricesArray = $this->getPrices($day);
            $priPrice = 0;
            $itemReservationId = 0;
            $unitId = $this->getUnitId();
            $updateReservationId = $this->getReservationId();
            foreach ($pricesArray as $value) {
                $priPrice = $value->pri_price;
                $itemReservationId = $value->pri_res_id;
            }

            $dayValidateItems = new DayValidateItems(
                $day,
                $priPrice,
                $unitId,
                $itemReservationId,
                $updateReservationId
            );

            if($dayValidateItems->validate() == false){
                $this->setErrorMessage($dayValidateItems->getErrorMessages());
                return false;
            }
        }

        return true;
    }

    private function getReservationModel(){
        if($this->getReservationId()>0){
            return Reservation::find($this->getReservationId());
        }else{
            return new Reservation();
        }
    }
    private function getPrices(string $day){

        return DB::table('prices')
            ->select('pri_price', 'pri_res_id')
            ->where('pri_date', '=', $day)
            ->where('pri_uni_id', '=', $this->getUnitId())
            ->get();
    }


    public function getCheckIn(): string {
        return $this->checkIn;
    }

    public function setCheckIn(string $checkIn): void {
        $this->checkIn = $checkIn;
    }

    public function getCheckOut(): string {
        return $this->checkOut;
    }

    public function setCheckOut(string $checkOut): void {
        $this->checkOut = $checkOut;
    }

    public function getUnitId(): int {
        return $this->unitId;
    }

    public function setUnitId(int $unitId): void {
        $this->unitId = $unitId;
    }

    public function getReservationId(): int {
        return $this->reservationId;
    }

    public function setReservationId(int $reservationId): void {
        $this->reservationId = $reservationId;
    }

    public function setErrorMessage(array $errorMessage): void {

        $this->errorMessage = $errorMessage;
    }

    public function getErrorMessage(): array {
        return $this->errorMessage;
    }

}
