<?php

namespace App\Console\Commands;

Trait GeneralTrait {

    protected string $trait;

    /**
     * @return string
     */
    public function getTrait(): string {
        return $this->trait;
    }

    /**
     * @param string $trait
     */
    public function setTrait(string $trait): void {
        $this->trait = $trait;
    }
}
