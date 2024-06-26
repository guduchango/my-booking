<?php

namespace App\Http\Resources;

Trait ResourceTrait {

    private string $message="";
    private string $error="";

    /**
     * @return string
     */
    public function getMessage(): string {
        return $this->message;
    }

    /**
     * @param string $message
     */
    public function setMessage(string $message): void {
        $this->message = $message;
    }

    /**
     * @return string
     */
    public function getError(): string {
        return $this->error;
    }

    /**
     * @param string $error
     */
    public function setError(string $error): void {
        $this->error = $error;
    }

}
