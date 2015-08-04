<?php

namespace App\Functional;

use App\Controller\AdminController;
use App\Controller\DataController;
use App\Controller\HomeController;
use App\Controller\LevelController;
use App\Controller\PassportController;

/**
 * Class Dispatcher
 * @package App\Functional
 */
class Dispatcher {

  /**
   * @var string
   */
  private $method;

  /**
   * @var string
   */
  private $path;

  /**
   *
   */
  public function __construct() {
    $url = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

    $this->method = strtolower($_SERVER['REQUEST_METHOD']);
    $this->path = strtolower(parse_url($url, PHP_URL_PATH));
  }

  /**
   * @return Response|null
   */
  public function route() {
    $controller = null;
    $action = 'Index';

    switch ($this->path) {
      case '/':
        $controller = new HomeController();
        break;
      case '/level':
        $controller = new LevelController();
        break;
      case '/friends':
        $controller = new DataController();
        break;
      case '/admin':
        $controller = new AdminController();
        break;
      case '/admin/friends':
        $controller = new AdminController();
        $action = 'Friends';
        break;
      case '/passport':
        $controller = new PassportController();
        break;
      default:
        // var_dump($this->path);
        break;
    }

    if (!is_null($controller)) {
      $next = function () use ($controller, $action) {
        $method = null;
        switch ($this->method) {
          case "get":
            $method = "get$action";
            break;
          case "post":
            $method = "post$action";
            break;
          case 'delete':
            $method = "delete$action";
            break;
          default:
            break;
        }
        return (!is_null($method) && method_exists($controller, $method)) ?
          $controller->{$method}() : '';
      };

      $buffer = (method_exists($controller, '__init')) ?
        $controller->{'__init'}($next) : $next();

      return new Response($buffer);
    }
    return null;
  }

}
