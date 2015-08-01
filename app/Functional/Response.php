<?php

namespace App\Functional;

class Response {

  public function __construct($buffer) {
    if (is_string($buffer)) {
      echo $buffer;
    } else if (is_array($buffer)) {
      header('Content-type:text/json');
      echo json_encode($buffer);
    } else {
      echo 'No contents provided';
    }
  }

}

