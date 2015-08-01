<?php

namespace App\Controller;

use App\Functional\Helpers;

class AdminController extends BaseController {

  public function __init($next) {
    if (!Helpers::session('login')) {
      return Helpers::view('verify');
    }
    return $next();
  }

  public function getIndex() {
    return Helpers::view('admin');
  }

  public function getFriends() {
    $database = new \medoo(Helpers::config('database'));
    return $database->select('frimap', [
      'uid', 'username', 'level', 'lng', 'lat', 'ip'
    ]);
  }

  public function deleteFriends() {
    $uid = $_REQUEST['uid'];
    if (preg_match('/[0-9]+/', $uid) === 1) {
      $database = new \medoo(Helpers::config('database'));
      if ($database->delete("frimap", ['uid' => $uid])) {
        return ['no' => 0];
      }
      return ['no' => -1, 'msg' => $database->error()];
    }
    return ['no' => -1, 'msg' => 'Invalid parameters'];
  }

}
