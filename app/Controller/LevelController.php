<?php

namespace App\Controller;

use App\Functional\Helpers;

/**
 * Class LevelController
 * @package App\Controller
 */
class LevelController extends BaseController {

  /**
   * @param $username
   * @return array
   */
  public static function level($username) {
    $id = $username;
    $info_page = "http://tieba.baidu.com/home/main/?un=$id&ie=utf-8";

    $response = \Requests::get($info_page);
    if ($response->success) {
      $forum = Helpers::config('app.forum');
      if (1 === preg_match(
          '/forum_name":"' . $forum . '".*?level_id":(\d{1,2})/',
          iconv("GBK", "UTF-8//ignore", $response->body),
          $matches)
      ) {
        $level = $matches[1];
        return ['id' => $id, 'level' => $level];
      }
    }
    return ['id' => $id, 'level' => -1];
  }

  /**
   * @return array
   */
  public function getIndex() {
    $id = $_GET["id"];
    return self::level($id);
  }

}