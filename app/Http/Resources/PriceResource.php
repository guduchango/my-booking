<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PriceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'pri_id' => $this->pri_id,
            'pri_date' => $this->pri_date,
            'pri_price' => $this->pri_price,
            'pri_price_dolar' => $this->pri_price_dolar,
            'pri_uni_id' => $this->pri_uni_id,
            'pri_res_id' => $this->pri_res_id,
            'pri_created_at' => $this->pri_created_at,
            'pri_updated_at' => $this->pri_updated_at,
        ];
    }
}
