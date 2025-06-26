<?php

namespace App\Rules;

use App\Models\Reservation;
use Illuminate\Support\Facades\Log;

class DayValidateItems
{
    private float $price;
    private int $itemReservationId;
    private int $updateReservationId;
    private int $unitId;
    private string $day;

    private Reservation $itemReservationModel;
    private Reservation $updateReservationModel;

    private array $errorMessages = [];

    public function __construct(
        string $day,
        float $price,
        int $unitId,
        int $itemReservationId,
        int $updateReservationId
    ) {
        $this->day = $day;
        $this->price = $price;
        $this->unitId = $unitId;
        $this->itemReservationId = $itemReservationId;
        $this->updateReservationId = $updateReservationId;

        $this->itemReservationModel = $this->loadItemReservation();
        $this->updateReservationModel = $this->loadUpdateReservation();
    }

    public function validate(): bool
    {
        $isValid = true;

        Log::info("Validando día: {$this->day}, Precio: {$this->price}, Unidad: {$this->unitId}, Reserva Ítem: {$this->itemReservationId}, Actualizar Reserva: {$this->updateReservationId}");

        if ($this->price <= 0) {
            $this->addErrorMessage("{$this->day}: No tiene precio.");
            $isValid = false;
        }

        if ($this->updateReservationId > 0) {
            // Se está actualizando una reserva
            if (
                $this->itemReservationId !== 0 &&
                $this->itemReservationId !== $this->updateReservationId
            ) {
                $this->addErrorMessage("{$this->day}: La reserva del ítem es distinta a la reserva a actualizar.");
                $isValid = false;
            }
        } else {
            // Es una nueva reserva
            if ($this->itemReservationId !== 0) {
                $this->addErrorMessage("{$this->day}: Ya tiene reserva seteada.");
                $isValid = false;
            }
        }

        if (!$isValid) {
            $this->addErrorMessage("{$this->day}: Error en algún lugar.");
        }

        return $isValid;
    }

    private function loadItemReservation(): Reservation
    {
        return $this->itemReservationId > 0
            ? Reservation::find($this->itemReservationId)
            : new Reservation();
    }

    private function loadUpdateReservation(): Reservation
    {
        return $this->updateReservationId > 0
            ? Reservation::find($this->updateReservationId)
            : new Reservation();
    }

    public function getItemReservationModel(): Reservation
    {
        return $this->itemReservationModel;
    }

    public function getUpdateReservationModel(): Reservation
    {
        return $this->updateReservationModel;
    }

    public function getErrorMessages(): array
    {
        return $this->errorMessages;
    }

    private function addErrorMessage(string $message): void
    {
        $this->errorMessages[] = $message;
    }

    // Getters (por si los necesitás en otro lado)
    public function getPrice(): float
    {
        return $this->price;
    }

    public function getItemReservationId(): int
    {
        return $this->itemReservationId;
    }

    public function getUpdateReservationId(): int
    {
        return $this->updateReservationId;
    }

    public function getUnitId(): int
    {
        return $this->unitId;
    }

    public function getDay(): string
    {
        return $this->day;
    }
}
