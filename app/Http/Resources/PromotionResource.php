<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class PromotionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'pro_id' => $this->pro_id,
            'pro_name' => $this->pro_name,
            'pro_value' => $this->pro_value,
            'pro_created_at' => $this->pro_created_at,
            'pro_updated_at' => $this->pro_updated_at,
        ];
    }
}
