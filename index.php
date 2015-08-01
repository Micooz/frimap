<?php

require_once('vendor/autoload.php');

define('APP_ROOT', $_SERVER['DOCUMENT_ROOT'] . '/app');

if (PHP_MAJOR_VERSION >= 5 && PHP_MINOR_VERSION >= 4) {

  session_start();

  (new \App\Functional\Dispatcher())->route();

}
