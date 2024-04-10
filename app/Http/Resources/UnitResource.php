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
            'uni_availableQuantity' => $this->uni_availableQuantity,
            'uni_maxPeople' => $this->uni_maxPeople,
            'uni_singleBed' => $this->uni_singleBed,
            'uni_dobuleBed' => $this->uni_dobuleBed,
            'uni_rooms' => $this->uni_rooms,
            'uni_createdAt' => $this->uni_createdAt,
            'uni_updatedAt' => $this->uni_updatedAt,
        ];
    }
}
