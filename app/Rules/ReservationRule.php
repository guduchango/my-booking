<?php
namespace App\Rules;
use App\Models\Reservation;
use App\Models\Unit;
use App\Rules\StatusReservation;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;


class ReservationRule {

    private string $checkIn;
    private string $checkOut;
    private int $unitId;
    private int $reservationId;
    private Reservation $reservationModel;
    private array $rangeDays;
    private Unit $unitModel;
    private int $totalPeople = 0;
    private int $userId = 0;

    private array $errorMessage = [];

    public function __construct(string $checkIn, string $checkOut, $totalPeople, int $unitId, int $reservationId, int $userId) {
        $this->checkIn = $checkIn;
        $this->checkOut = $checkOut;
        $this->unitId = $unitId;
        $this->reservationId = $reservationId;
        $this->rangeDays = getDaysBetweenDates($this->getCheckIn(), $this->getCheckOut());
        $this->unitModel =  $this->getUnitModel();
        $this->reservationModel = $this->getReservationModel();
        $this->totalPeople = $totalPeople;
        $this->userId = $userId;
    }

    public function validate(){
        foreach ($this->rangeDays as $day) {

            Log::info("Validando día: $day");
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
                $this->setErrorMessages($dayValidateItems->getErrorMessages());
                Log::error("Error en la validación del día: $day", $dayValidateItems->getErrorMessages());
                return false;
                
            }
        }

        if($this->getTotalPeople() > $this->getUnitModel()->uni_max_people){
            $this->setErrorMessage("Error: La cantidad de personas ({$this->getTotalPeople()}) supera el máximo permitido ({$this->getUnitModel()->uni_max_people}) en la unidad {$this->getUnitId()}");
            return false;
        }

        Log::info("Validación de reserva exitosa para la unidad {$this->getUnitId()} del usuario {$this->getUserId()}");

        return true;
    }

    private function getUnitModel(){
        if($this->getUnitId()>0){
            return Unit::find($this->getUnitId());
        }else{
            return new Unit();
        }
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
            ->where('pri_usu_id', '=', $this->getUserId())
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

    public function setErrorMessages(array $errorMessage): void {

        $this->errorMessage = $errorMessage;
    }

    public function getErrorMessage(): array {
        return $this->errorMessage;
    }

    public function setErrorMessage(string $message): void {
        $this->errorMessage[] = $message;
    }

    public function getTotalPeople(): int {
        return $this->totalPeople;
    }

    public function setTotalPeople(int $totalPeople): void {
        $this->totalPeople = $totalPeople;
    }

    public function getUserId(): int {
        return $this->userId;
    }   

    public function setUserId(int $userId): void {
        $this->userId = $userId;
    }


}
