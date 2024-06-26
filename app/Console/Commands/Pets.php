<?php

namespace App\Console\Commands;

class Pets {

    use GeneralTrait;


    protected string $name;

    public function __construct($name) {
        $this->setTrait($name);
        $this->name = $name;
    }


    /**
     * @return string
     */
    public function getName(): string {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName(string $name): void {
        $this->name = $name;
    }

    public function getData() {

        return [
            'data' => $this->getName(),
            'pepe' => $this->getTrait()
        ];
    }

}

