<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GuestResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'gue_id' => $this->gue_id,
            'gue_name' => $this->gue_name,
            'gue_last_name' => $this->gue_last_name,
            'gue_identity_document' => $this->gue_identity_document,
            'gue_email' => $this->gue_email,
            'gue_phone_number' => $this->gue_phone_number,
            'gue_birthday' => $this->gue_birthday,
            'gue_age' => $this->getAge(),
            'gue_full_name' => $this->gue_name." ".$this->gue_last_name,
            'gue_created_at' => $this->gue_created_at,
            'gue_updated_at' => $this->gue_updated_at,
        ];
    }
}
