<?php

namespace App\Controller;

use App\Functional\Helpers;

class DataController extends BaseController {

  public function getIndex() {
    $database = new \medoo(Helpers::config('database'));
    return $database->select('frimap', [
      'username', 'lng', 'lat'
    ]);
  }

}