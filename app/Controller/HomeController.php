<?php

namespace App\Controller;

use App\Functional\Helpers;

class HomeController extends BaseController {

  public function getIndex() {
    return Helpers::view('index');
  }

  public function postIndex() {
    $id = $_POST['id'];
    $lng = $_POST['lng'];
    $lat = $_POST['lat'];

    if (preg_match('/^[0-9]+\.[0-9]+$/', $lng) === 1 && preg_match('/^[0-9]+\.[0-9]+$/', $lat) === 1) {
      $level = LevelController::level($id)['level'];

      if ($level >= Helpers::config('app.level')) {
        $database = new \medoo(Helpers::config('database'));
        $database->insert('frimap', [
          'username' => $id,
          'level' => $level,
          'lng' => $lng,
          'lat' => $lat,
          'ip' => Helpers::ip()
        ]);
        if (is_null($database->error()[1])) {
          return ['no' => 0, 'msg' => ''];
        }
        return ['no' => -1, 'msg' => $database->error()];
      }
    }
    return ['no' => 1, 'msg' => 'invalid parameters'];
  }

}