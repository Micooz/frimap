<?php

namespace App\Controller;

use App\Functional\Helpers;

/**
 * Class DataController
 * @package App\Controller
 */
class DataController extends BaseController {

  /**
   * @return array|bool
   */
  public function getIndex() {
    $database = new \medoo(Helpers::config('database'));
    return $database->select('frimap', [
      'username', 'lng', 'lat'
    ]);
  }

}