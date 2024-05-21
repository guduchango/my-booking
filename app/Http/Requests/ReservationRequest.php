<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReservationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return
            [
                'res_start_date' => 'required',
                'res_end_date' => 'required',
                'res_adults' => 'required',
                'res_children' => 'required',
                'res_beds' => 'required',
                'res_status' => 'required',
                'res_channel' => 'required',
                'res_gue_id' => 'required',
                'res_uni_id' => 'required'
            ];

    }
}
