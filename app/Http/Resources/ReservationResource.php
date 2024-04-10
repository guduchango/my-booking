<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'res_id' => $this->res_id,
            'res_startDate' => $this->res_startDate,
            'res_endDate' => $this->res_endDate,
            'res_adults' => $this->res_adults,
            'res_children' => $this->res_children,
            'res_beds' => $this->res_beds,
            'res_days' => $this->res_days,
            'res_discountValue' => $this->res_discountValue,
            'res_discountDetail' => $this->res_discountDetail,
            'res_price' => $this->res_price,
            'res_priceDolar' => $this->res_priceDolar,
            'res_priceFinal' => $this->res_priceFinal,
            'res_advancePayment' => $this->res_advancePayment,
            'res_status' => $this->res_status,
            'res_channel' => $this->res_channel,
            'res_comments' => $this->res_comments,
            'guest' => GuestResource::collection($this->guest),
            'unit' => UnitResource::collection($this->unit),
            'res_createdAt' => $this->res_createdAt,
            'res_updatedAt' => $this->res_updatedAt,
        ];
    }
}
