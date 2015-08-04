<?php

namespace App\Functional;

class Helpers {

  public static function view($name) {
    $view = self::view_path() . "$name.html";
    $buffer = file_exists($view) ? file_get_contents($view) : '';
    return $buffer;
  }

  public static function view_path() {
    return APP_ROOT . '/View/';
  }

  public static function storage_path() {
    return APP_ROOT . '/../storage/';
  }

  public static function config_path() {
    return APP_ROOT . '/../config/';
  }

  public static function ip() {
    $ip = null;
    if ($_SERVER['REMOTE_ADDR']) {
      $ip = $_SERVER['REMOTE_ADDR'];
    } else if ($_SERVER['HTTP_CLIENT_IP'] && $_SERVER['HTTP_CLIENT_IP'] != 'unknown') {
      $ip = $_SERVER['HTTP_CLIENT_IP'];
    } else if ($_SERVER['HTTP_X_FORWARDED_FOR'] && $_SERVER['HTTP_X_FORWARDED_FOR'] != 'unknown') {
      $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    }
    return $ip;
  }

  public static function config($key) {
    $config = null;
    if (($pos = strpos($key, '.')) > 0) {
      $file = substr($key, 0, $pos);
      $option = substr($key, $pos + 1);
      $config = require(self::config_path() . "$file.php");

      return $config[$option];
    } else {
      $config = require(self::config_path() . "$key.php");

      return $config;
    }
  }

  public static function session($key = null, $value = null) {
    if (is_null($key)) {
      return $_SESSION;
    } else {
      if (is_null($value)) {
        return (isset($_SESSION[$key])) ? $_SESSION[$key] : null;
      } else {
        $_SESSION[$key] = $value;
      }
    }
    return null;
  }

  public static function redirect($url) {
    header("Location: $url");
    return "";
  }

}
