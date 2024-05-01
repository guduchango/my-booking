<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExpenseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'exp_id' => $this->exp_id,
            'exp_type' => $this->exp_type,
            'exp_price' => $this->exp_price,
            'exp_price_dolar' => $this->exp_price_dolar,
            'exp_date' => $this->exp_date,
            'unit' => new UnitResource($this->unit),
            'exp_uni_id' => $this->exp_uni_id,
            'exp_created_at' => $this->exp_created_at,
            'exp_updated_at' => $this->exp_updated_at,

        ];
    }
}
