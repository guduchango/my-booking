<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use \Illuminate\Contracts\Routing\ResponseFactory;
use \Throwable;
use \Illuminate\Validation\Validator;
use function Illuminate\Database\Eloquent\Factories\newInstance;

class CustomResource {

    private ResponseFactory $_response;
    private ?Throwable $_errorThrowable = null;
    private ?Validator $_errorValidator = null;
    private ?string $_errorString = "";
    private int $_status;

    public function __construct(
        ResponseFactory $response,
        int $status,
        mixed $error = null
    ) {
        if ($error instanceof Validator) {
            $this->_errorValidator = $error;
        } elseif ($error instanceof Throwable) {
            $this->_errorThrowable = $error;
        }else{
            $this->_errorString = $error;
        }
        $this->_response = $response;
        $this->_status = $status;
    }


    public function show() {

        $mjs = [];
        if ($this->getErrorThrowable() !== null) {
            $mjs[] = $this->getErrorThrowable()->getMessage();
        } elseif ($this->getErrorValidator() !== null) {
            $items = $this->getErrorValidator()->messages()->messages();
            if (count($items) > 0) {
                foreach ($items as $item => $value) {
                    foreach ($value as $val) {
                        $mjs[] = "$item: $val";
                    }
                }
            }
        }else{
            $mjs[] = $this->getErrorString();
        }

        $array = [
            'data' => [],
            'errors' => $mjs
        ];

        return $this->getResponse()->json($array, $this->getStatus());
    }

    /**
     * @return ResponseFactory
     */
    public function getResponse(): ResponseFactory {
        return $this->_response;
    }

    /**
     * @param ResponseFactory $response
     */
    public function setResponse(ResponseFactory $response): void {
        $this->_response = $response;
    }

    /**
     * @return mixed|Throwable
     */
    public function getErrorThrowable() {
        return $this->_errorThrowable;
    }

    /**
     * @param mixed|Throwable $errorThrowable
     */
    public function setErrorThrowable($errorThrowable): void {
        $this->_errorThrowable = $errorThrowable;
    }

    /**
     * @return mixed|Validator
     */
    public function getErrorValidator() {
        return $this->_errorValidator;
    }

    /**
     * @param mixed|Validator $errorValidator
     */
    public function setErrorValidator($errorValidator): void {
        $this->_errorValidator = $errorValidator;
    }

    /**
     * @return int
     */
    public function getStatus(): int {
        return $this->_status;
    }

    /**
     * @param int $status
     */
    public function setStatus(int $status): void {
        $this->_status = $status;
    }

    /**
     * @return mixed|string|null
     */
    public function getErrorString() {
        return $this->_errorString;
    }

    /**
     * @param mixed|string|null $errorString
     */
    public function setErrorString($errorString): void {
        $this->_errorString = $errorString;
    }

}
