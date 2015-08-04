<?php

namespace App\Controller;

use App\Functional\Helpers;

/**
 * Class PassportController
 * @package App\Controller
 */
class PassportController extends BaseController {

  /**
   * @return string
   */
  public function postIndex() {
    $password_in = $_POST['password'];
    $password_hash = sha1($password_in);
    $password_real = sha1(Helpers::config('app.password'));

    if ($password_hash === $password_real) {
      Helpers::session('login', true);
      return Helpers::redirect('/admin');
    }
    return "Illegal password!";
  }

}