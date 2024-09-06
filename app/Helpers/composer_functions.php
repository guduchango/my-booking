<?php

/**
 * @param string $path
 * @param bool   $http
 *
 * @return string
 */
function gasset(string $path, bool $http = false): string
{

    if(env('APP_ENV')=='local'){
        if ($http == true) {
            return $path;
        }

        return asset($path);
    }

    if ($http == true) {
        return 'public/' . $path;
    }

    return asset('public/' . $path);
}

/**
 * @param string $value1
 * @param string $value2
 *
 * @return string
 */
function isel($value1, $value2): string
{
    if ($value1 == $value2) {
        return ' selected ';
    }

    return '';
}

function count_dates_by_range($startDate,$endDate)
{
    $start_date = strtotime($startDate);
    $end_date = strtotime($endDate);
    $datediff = $end_date - $start_date;

    return round($datediff / (60 * 60 * 24));
}

function getDaysBetweenDates($startDate, $endDate) {
    // Create DateTime objects for the start and end dates
    $start = new \DateTime($startDate);
    $end = new \DateTime($endDate);

    // Add one day to the end date to include it in the range
    //$end->modify('+1 day');

    // Create an interval of one day
    $interval = new \DateInterval('P1D');

    // Create a DatePeriod object to iterate over each day
    $datePeriod = new \DatePeriod($start, $interval, $end);

    // Collect the days into an array
    $days = [];
    foreach ($datePeriod as $date) {
        $days[] = $date->format('Y-m-d');
    }

    return $days;
}
