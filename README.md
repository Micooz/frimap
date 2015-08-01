# frimap

## 项目地址

https://github.com/Micooz/frimap

## 演示地址

http://map.apporz.com

## 简介

吧友地图是一个展示百度贴吧朋友位置的应用，通过这个应用，可发现自己的同城朋友们，可了解吧友的地理分布。

吧友地图分两大模块：

* 展示页和登记页
* 后台管理页

### 展示页和登记页

展示页使用百度地图的WebAPI，实现了自动定位和手动标示的功能。

登记表单位于地图下方，登记时需要提供贴吧ID，自动获取所在贴吧等级，登记有等级限制。

### 后台管理

后台管理用于管理地图数据（包括登记者ID，地点，等级，IP地址），管理员可删除冒用的记录。

## 安装和部署

### 目录及文件结构

|     目录          |     描述                   |
|-------------------|----------------------------|
| amazeui/          | AmazeUI库                  |
| app/              | 应用目录                   |
| app/Controller/   | 控制器                     |
| app/Functional/   | 路由响应，帮助函数         |
| app/Model/        | 模型(暂未使用)             |
| app/View/         | 视图                       |
| config/           | 存放应用配置文件           |
| img/              | 图片资源                   |
| js/               | 前端React脚本              |
| react/            | React库                    |
| storage/          | 存放SQLite数据库           |
| composer.json     | Composer包管理器的配置文件 |
| jsxbuilder.sh     | jsx编译脚本                |
| index.php         | 应用入口                   |

本项目前端使用流行的AmazeUI和React，后端采用典型的MVC架构，不依赖任何MVC框架。

### 依赖

* PHP版本>=5.4
* composer包管理器
* npm包管理器（可选）

### 安装

首先通过Composer安装依赖：

    $ composer install

该命令完成后会自动下载安装项目依赖 `catfan/medoo` 和 `rmccue/requests` 。

前者用来操作SQLite数据库，后者用来发起HTTP请求。

### 数据库

数据库采用轻量的本地数据库SQLite，请确保安装了SQLite驱动程序。

请先建立数据库 `frimap.db`，然后通过 `storage/frimap.sql` 导入应用所需表的结构：

    $ cd storage/
    $ sqlite3 frimap.db
    sqlite> .read frimap.sql
    sqlite> .exit

数据库配置文件位于 `config/database.php`：

    return [
      'database_type' => 'sqlite',
      'database_file' => \App\Functional\Helpers::storage_path() . 'frimap.db'
    ];

### 应用配置

**前端**

修改 `js/common.jsx` 内的 `config` 变量即可：

    var config = config || {
      forum: "xxxx吧", // 贴吧名
      level: 7         // 最低等级
    };

**后端**

修改 `config/app.php`：

    return [
      'forum' => "xxxx",    // 贴吧名，注意不带"吧"字
      'level' => 7,         // 最低等级
      'password' => 'xxxxx' // 后台管理密码，部署前请务必修改
    ];

### 注意事项

由于应用需要向 `storage/` 目录写文件，因此请给 `storage/` 目录写入权限：

    $ chmod 777 -R storage/

### 开发帮助

**路由指派**

在 `app/Functional/Dispatcher.php` 中进行，参考 `route` 方法中的switch块。

**React脚本**

由于前端使用了React，`js/*.jsx` 需要通过 `jsx` 程序编译为 `js/*.js`，项目提供了 `jsxbuilder.sh` 来帮助你一键编译jsx文件，首先安装：

    $ npm install -g jsx

然后执行：

    $ ./jsxbuilder.sh

**js编译压缩**

js代码压缩采用的是 `uglifyjs`：

    $ npm install uglify-js -g

`uglifyjs` 的用法参考：

https://github.com/mishoo/UglifyJS2

## 开源协议

MIT

## 鸣谢

吧友地图的实现利用了很多开源库，我十分感谢这些开源代码，在此列出，排名不分先后：

* [catfan/medoo](https://github.com/catfan/Medoo)
* [rmccue/requests](https://github.com/rmccue/Requests)
* [react](https://github.com/facebook/react)
* [amazeui](https://github.com/allmobilize/amazeui)
* [UglifyJS2](https://github.com/mishoo/UglifyJS2)
* [composer](https://github.com/composer/composer)
* [JSX](https://github.com/jsx/JSX)

## 提出建议/贡献代码

通过Github的 `Issue` 及 `PullRequest` 系统可以很方便地提出你的建议和贡献你的代码：

Issues：https://github.com/Micooz/frimap/issues

PullRequest：https://github.com/Micooz/frimap/pulls

## 作者

Micooz: micooz@hotmail.com
