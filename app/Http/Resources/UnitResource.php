<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UnitResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'uni_id' => $this->uni_id,
            'uni_name' => $this->uni_name,
            'uni_available_quantity' => $this->uni_available_quantity,
            'uni_max_people' => $this->uni_max_people,
            'uni_single_bed' => $this->uni_single_bed,
            'uni_dobule_bed' => $this->uni_dobule_bed,
            'uni_rooms' => $this->uni_rooms,
            'uni_created_at' => $this->uni_created_at,
            'uni_updated_at' => $this->uni_updated_at,
        ];
    }
}
