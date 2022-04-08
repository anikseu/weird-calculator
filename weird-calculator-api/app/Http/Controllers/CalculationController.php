<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CalculationController extends Controller
{
    public function calculate(Request $request){

        $raw_body_data = $request->getContent();
        $data = json_decode($raw_body_data, true);
        
        $firstNumber = (double) $data['firstNumber'];
        $secondNumber = (double) $data['secondNumber'];
        $operator = $data['operator'];
        $result = 0; 

        $errorMessage = "Please check input value";

        switch($operator){
            case "addition":
                $result = $firstNumber + $secondNumber;
                break;
            case "subtraction":
                $result = $firstNumber - $secondNumber;
                break;
            case "multiplication":
                $result = ((double)$firstNumber * (double)$secondNumber);
                break;
            case "division":
                if ($secondNumber > 0)
                    $result = $firstNumber / $secondNumber;
                else
                    $result = $errorMessage;
                break;
        }

        return ["result" => $result ];
    }
}
