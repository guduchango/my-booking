<?php

namespace App\Http\Controllers;

use App\Exceptions\CustomException;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use \Illuminate\Support\Facades\Validator;
use \Illuminate\Http\Request;
use \App\Models\User;
use \Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    use ParseMsj;

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
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $this->setInfo($validateUser->messages())
                ], 401);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);

            return new UserResource(User::findOrFail($user->id));

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $this->setInfo($th->getMessage())
            ], 500);
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
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $this->setInfo($validateUser->errors())
                ], 401);
            }

            if(!Auth::attempt($request->only(['email', 'password']))){
                return response()->json([
                    'status' => false,
                    'message' => 'Email & Password does not match with our record.',
                ], 401);
            }

            $user = User::where('emaila', $request->email)->first();

            return new UserResource($user);

        } catch (CustomException $th) {
            //$this->setInfo($th->getMessage());

/*            return response()->json([
                'status' => false,
                'message' => $this->getMessage()
            ], 500);*/
        }
    }
}
