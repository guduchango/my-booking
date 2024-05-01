<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class CurrencyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'cur_id' => $this->cur_id,
            'cur_country' => $this->cur_country,
            'cur_price' => $this->cur_price,
            'cur_created_at' => $this->cur_created_at,
            'cur_updated_at' => $this->cur_updated_at
        ];
    }
}
