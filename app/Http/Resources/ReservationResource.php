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
            'res_start_date' => $this->res_start_date,
            'res_beauty_dates' => $this->getBeautyDates(),
            'res_end_date' => $this->res_end_date,
            'res_adults' => $this->res_adults,
            'res_children' => $this->res_children,
            'res_beds' => $this->res_beds,
            'res_nights' => $this->res_nights,
            'res_price' => $this->res_price,
            'res_price_dolar' => $this->res_price_dolar,
            'res_price_final' => $this->res_price_final,
            'res_advance_payment' => $this->res_advance_payment,
            'res_status' => $this->res_status,
            'res_channel' => $this->res_channel,
            'res_comments' => $this->res_comments,
            'res_gue_id' => $this->res_gue_id,
            'res_uni_id' => $this->res_uni_id,
            'res_pro_id' => $this->res_pro_id,
            'guest' => new GuestResource($this->guest),
            'unit' => new UnitResource($this->unit),
            'promotion' => new PromotionResource($this->promotion),
            'res_created_at' => $this->res_created_at,
            'res_updated_at' => $this->res_updated_at,
        ];
    }
}
