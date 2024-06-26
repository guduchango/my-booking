<?php

namespace App\Http\Controllers;
use \Illuminate\Validation\Validator;
use function Symfony\Component\Console\Input\isArray;

Trait ParseMsj {

    private Validator $validator;
    private array $messages = [];

    public function setInfo(mixed $type){
        if ($type instanceof Validator) {
            $this->validator = $type;
            $this->setValidatorMessages();
        }elseif (is_array($type)){
            $this->setArrayMessages($type);
        }elseif (is_string($type)){
            $this->addMessage($type);
        }
    }

    public function getMessage(){
        return $this->messages;
    }

    private function addMessage(string $msj){
        $this->messages[] = $msj;
    }

    private function setArrayMessages(array $array){
        if(isArray($array)){
            foreach ($array as $item){
                $text = "$item";
                $this->addMessage($text);
            }
        }
    }

    private function setValidatorMessages(){
        $items = $this->validator->messages();
        if(count($items)>0){
            foreach ($items as $item){
                if(count($item)>0){
                    foreach ($item as $mje){
                        $text = "$item: $mje";
                        $this->addMessage($text);
                    }
                }
            }
        }
    }

}

