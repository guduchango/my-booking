<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UnitRequest extends FormRequest
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
        return [
            'uni_name' => 'required',
            'uni_max_people' => 'required',
            'uni_single_bed' => 'required',
            'uni_dobule_bed' => 'required',
            'uni_rooms' => 'required',
        ];
    }
}
