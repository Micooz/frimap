<?php

/*
 |---------------------------------------
 | 应用入口文件
 |---------------------------------------
 |
 | 所有业务逻辑请求全部经过该文件
 |
 */

require_once('../vendor/autoload.php');

define('ROOT_PATH', $_SERVER['DOCUMENT_ROOT']);
define('APP_PATH', ROOT_PATH . '/../app');

if (PHP_MAJOR_VERSION >= 5 && PHP_MINOR_VERSION >= 4) {

  session_start();

  (new \App\Functional\Dispatcher())->route();

}
