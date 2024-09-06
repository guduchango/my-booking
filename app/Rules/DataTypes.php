<?php
namespace App\Rules;

enum StatusReservation: string {
    case PENDING = 'pending';
    case APPROVED = 'approved';
    case FINISHED = 'finished';
    case  CANCELED = 'canceled';
}
