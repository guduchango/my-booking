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
            'gue_lastName' => $this->gue_lastName,
            'gue_identityDocument' => $this->gue_identityDocument,
            'gue_email' => $this->gue_email,
            'gue_phoneNumber' => $this->gue_phoneNumber,
            'gue_birthday' => $this->gue_birthday,
            'gue_createdAt' => $this->gue_createdAt,
            'gue_updatedAt' => $this->gue_updatedAt,
        ];
    }
}
