<?php

// 模拟存到数据库后取到的图片地址
$url = "//gss0.bdstatic.com/8r1VfDn7KggZnd_b8IqT0jB-xx1xbK/static/list/img/revision/right-banner_562f509.jpg";
$data = [
    'picUrl' => $url
];
// 返回存储地址给前台
echo json_encode($data);
