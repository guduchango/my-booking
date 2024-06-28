<?php

namespace App\Http\Controllers;

use App\Http\Resources\CustomResource;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use \Illuminate\Support\Facades\Validator;
use \Illuminate\Http\Request;
use \App\Models\User;
use \Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function create(Request $request)
    {
        try {
            //Validated
            $validateUser = Validator::make($request->all(),
                [
                    'name' => 'required',
                    'email' => 'required|email|unique:users,email',
                    'password' => 'required'
                ]);

            if($validateUser->fails()){
                $response = new CustomResource(response(),401,$validateUser);
                return $response->show();
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);

            return new UserResource(User::findOrFail($user->id));

        } catch (\Throwable $th) {
            $response = new CustomResource(response(),$th,500);
            return $response->show();
        }
    }


    public function login(Request $request)
    {
        try {
            $validateUser = Validator::make($request->all(),
                [
                    'email' => 'required|email',
                    'password' => 'required'
                ]);

            if($validateUser->fails()){
                $response = new CustomResource(response(),401,$validateUser);
                return $response->show();
            }

            if(!Auth::attempt($request->only(['email', 'password']))){
                return response()->json([
                    'status' => false,
                    'message' => 'Email & Password does not match with our record.',
                ], 401);
            }

            $user = User::where('email', $request->email)->first();

            return new UserResource($user);

        } catch (\Throwable $th) {
            $response = new CustomResource(response(),500,$th);
            return $response->show();
        }
    }
}
