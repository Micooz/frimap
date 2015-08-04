<?php

namespace App\Functional;

/**
 * Class Response
 * @package App\Functional
 */
class Response {

  /**
   * @param $buffer
   */
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

