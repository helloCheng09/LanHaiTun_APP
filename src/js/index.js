// document.addEventListener("plusready", onPlusReady, false);
// function onPlusReady() {
// 扩展API加载完毕，现在可以正常调用扩展API
(function () {
    /**
     * 全局数据
     * data.js
     */
    var baseUrl = 'http://lanhaitun.zanhf.com/app/'
    var urlObj = {
        loginUrl: 'index.php?i=2&c=entry&do=login_post&m=wyt_luntan', // 登陆接口
        registerUrl: 'index.php?i=2&c=entry&do=register&m=wyt_luntan', // 注册接口
        yzTxyzm: 'index.php?i=2&c=entry&do=imgcode&m=wyt_luntan', // 验证图形验证码接口
        forgetUrl: 'index.php?i=2&c=entry&do=forget&m=wyt_luntan', //忘记密码接口
        userInfo: 'index.php?i=2&c=entry&action=user&do=Index&m=wyt_luntan', // 个人中心地址
        setUserInfo: 'index.php?i=2&c=entry&action=edit_info&do=Index&m=wyt_luntan', // 设置个人信息接口
        searUser: 'index.php?i=2&c=entry&action=search_member&do=Index&m=wyt_luntan', // 搜索好友接口
        addFriend: 'index.php?i=2&c=entry&do=Index&m=wyt_luntan&action=friend_add_post', // 添加好友接口
        passFriend: 'index.php?i=2&c=entry&do=Index&m=wyt_luntan&action=friend_agree', // 处理好友申请接口
        sendMsg: 'index.php?i=2&c=entry&action=friend_chat&do=Index&m=wyt_luntan', // 发送消息接口
        getMsg: 'index.php?i=2&c=entry&action=refresh_chat&do=Index&m=wyt_luntan', // 获取消息列表
        baseUpImg: 'index.php?i=2&c=entry&do=Getimg&m=wyt_luntan', // base64上传图片接口
        sendTiezi: 'index.php?i=2&c=entry&do=index&m=wyt_luntan&action=fabu_tiezi', // 发帖接口
        reEditorGet: 'index.php?i=2&c=entry&do=index&m=wyt_luntan&action=thead_edit', // 获取修改的帖子信息
        reEditorSub: 'index.php?i=2&c=entry&do=index&m=wyt_luntan&action=thead_edit_post', // 提交重新编辑帖子接口
        zhiding: 'index.php?i=2&c=entry&do=index&m=wyt_luntan&action=thread_zhiding', // 管理员置顶帖子接口
        deletTz: 'index.php?i=2&c=entry&do=index&m=wyt_luntan&action=delete_thread', // 删除帖子接口
        sentTzChat: 'index.php?i=2&c=entry&rid=9&do=addcomment&m=wxz_wzb', // 发送直播评论接口
        getTelYzm: 'index.php?i=2&c=entry&do=sendmsg&m=wyt_luntan', // 获取短信验证码接口
        hfTzSend: 'index.php?i=2&c=entry&do=Index&m=wyt_luntan&action=pinglun', // 回复帖子接口
        hfHfSend: 'index.php?i=2&c=entry&do=Index&m=wyt_luntan&action=huifu1', // 回复评论接口
        hfzhfSend: 'index.php?i=2&c=entry&do=Index&m=wyt_luntan&action=huifu3', // 回复评论的评论

    };

    /****************************************************************************** */
    /**
     * 初始化
     * init.js
     */

    (function ($, root) {

        function mainPageEvent() {

            // 收藏操作
            $('.shoucang').each(function () {
                var self = $(this)
                // 当前用户是否收藏
                self.off().click(function () {
                    var scstatus = self.attr('shou-status')
                    if (scstatus == '0') { // 当前用户 收藏状态
                        self.attr('shou-status', 1) // 切换收藏状态
                        self.find('.shou-img').hide() // 切换图标
                        self.find('.shou-hou-img').show()
                        self.find('span').text("已收藏")
                    } else {
                        self.attr('shou-status', 0)
                        self.find('.shou-img').show()
                        self.find('.shou-hou-img').hide()
                        self.find('span').text("收藏")
                    }

                })
            })
            // 点赞操作
            $('.dianzan').each(function () {
                var self = $(this)
                // 当前用户是否点过赞
                self.off().click(function () {
                    var zanstatus = self.attr('zan-status')
                    var zantext = self.find('span').text()
                    if (zanstatus == '0') { // 当前用户点赞状态 0 未点单赞
                        self.attr('zan-status', 1) // 改为已经点赞
                        self.find('.zan-img').hide() // 切换图标
                        self.find('.zan-hou-img').show()
                        if (zantext == '赞') { // 数量增加方式判断
                            self.find('span').text('1')
                        } else {
                            zantext = Number(zantext) + 1
                            self.find('span').text(zantext)
                        }
                    } else {
                        layer.msg('您已点过赞了~')
                        // self.attr('zan-status', 0)
                        // self.find('.zan-img').show()
                        // self.find('.zan-hou-img').hide()
                        // if (zantext == '1') {
                        //     self.find('span').text('赞')
                        // } else {
                        //     zantext = Number(zantext) - 1
                        //     self.find('span').text(zantext)
                        // }
                    }
                })
            })
        }

        root.mainPageEvent = mainPageEvent

        // 调用相机 拍照 录像
        function showCamera(keyword) {
            $('#upImgVideo').off()
            $('#upImgVideo').click(function () {
                if (!keyword) {
                    plus.nativeUI.actionSheet({
                        cancel: "取消",
                        buttons: [{
                            title: "拍照"
                        }, {
                            title: "录像"
                        }]
                    }, function (e) {
                        switch (e.index) {
                            case 1:
                                cameraImg()
                                break;
                            case 2:
                                cameraVideo()
                                break;
                        }
                    });
                    $('#upImg').show()
                    $('#upVideo').show()
                } else if (keyword == 'photo') {
                    cameraImg()
                } else if (keyword == 'video') {
                    cameraVideo()
                }
            })

        }
        root.showCamera = showCamera
        // 首页 帖子列表
        // 管理员管理帖子
        // H5 plus事件处理
        function popChoice(obj) {
            // console.log(JSON.stringify(obj) )
            // return
            var thread_id = obj.thread_id
            var isLink = obj.isLink
            var zdStatus = 1
            var btnArr = null
            if (obj.isadmin == 'true') {
                if (obj.iszhiding == "1") {
                    // 是管理员 此贴已经置顶了
                    zdStatus = 0
                    btnArr = [{
                        title: "取消置顶"
                    }, {
                        title: "删除"
                    }, {
                        title: "再编辑"
                    }]
                } else {
                    // 是管理员 此贴未置顶
                    btnArr = [{
                        title: "置顶"
                    }, {
                        title: "删除"
                    }, {
                        title: "再编辑"
                    }]
                }
            } else {
                if (obj.isself == 'true') {
                    // 是否是自己的帖子
                    // 是自己的帖子
                    btnArr = [{
                        title: "再编辑"
                    }, {
                        title: "删除"
                    }]
                }
            }

            // 弹出系统选择按钮框
            plus.nativeUI.actionSheet({
                // title: "管理帖子",
                cancel: "取消",
                buttons: btnArr
            }, function (e) {
                // console.log("弹出层" + e);
                // layer.msg(JSON.stringify(e))
                if (e.index != 0) {
                    var index = e.index - 1
                    var choice = btnArr[index].title
                    switch (choice) {
                        case "置顶":
                            // 置顶帖子
                            // 发送post请求 返回 zdstate  状态（1置顶，0取消置顶）
                            // console.log(333)
                            root.postSubmit({
                                url: baseUrl + urlObj.zhiding,
                                data: {
                                    thread_id: thread_id,
                                    zdstate: 1
                                },
                                source: 'zhiding',
                            })
                            break;
                        case "取消置顶":
                            // 置顶帖子
                            // 发送post请求 返回 zdstate  状态（1置顶，0取消置顶）
                            // console.log(333)
                            root.postSubmit({
                                url: baseUrl + urlObj.zhiding,
                                data: {
                                    thread_id: thread_id,
                                    zdstate: 0
                                },
                                source: 'zhiding',
                            })
                            break;
                        case "删除":
                            var confirmMsg = layer.confirm('确认删除吗？', {
                                btn: ['确认', '取消'],
                                title: '提示',
                                closeBtn: 0,
                            }, function () {
                                root.postSubmit({
                                    url: baseUrl + urlObj.deletTz,
                                    data: {
                                        thread_id: thread_id,
                                    },
                                    source: 'deletTz',
                                })
                            }, function () {
                                layer.close(confirmMsg)
                                return false;
                            })
                            break;
                        case '再编辑':
                            window.location.href = 'http://lanhaitun.zanhf.com/app/index.php?i=2&c=entry&action=fatie&do=Index&m=wyt_luntan&thread_id=' + thread_id + '&isLink=' + isLink
                            break;
                    }
                }
            });
        }

        function showAdmin() {
            $('.xiala').off()
            $('.xiala').on('click', function () {
                // 是否是管理员
                var isadmin = $(this).attr('isadmin')
                // 是否是自己的帖子
                var isself = $(this).attr('isself')
                // layer.msg(isadmin + isself)
                // 获取到帖子的id
                var thread_id = $(this).parents('li').attr('id')
                // 帖子置顶状态
                var iszhiding = $(this).parents('li').attr('iszhiding')
                // 是否是外链
                var isLink = $(this).parents('li').attr('isLink')
                document.addEventListener("plusready", popChoice({
                    isadmin: isadmin,
                    isself: isself,
                    thread_id: thread_id,
                    iszhiding: iszhiding,
                    isLink: isLink,
                }), false);
            })
        }

        root.showAdmin = showAdmin

        /**
         * 流加载
         * url 请求地址
         * elem 指定容器 #id
         * fenlei 请求分类
         * load_style （index首页 mine我的帖子 part我参与的 collection收藏）
         * sou 搜索关键字
         */

        function showListFlow(url, obj) {
            $(obj.elem).empty()
            layui.use('flow', function () {
                var flow = layui.flow;
                flow.load({
                    elem: obj.elem, //指定列表容器
                    done: function (page, next) { //到达临界点（默认滚动触发），触发下一页
                        if (obj.sou) {
                            var data = {}
                            data.page = +page
                            data.sou = obj.sou
                        } else {
                            var data = {}
                            data.page = +page
                            data.fenlei = obj.fenlei
                            data.load_style = obj.load_style
                        }
                        var lis = [];
                        $.post(url, data, function (res) {
                            var res = JSON.parse(res)
                            var data = res.data
                            // console.log(res)
                            var shoucang = "收藏" // 收藏文本 
                            var isshou = 0 // 收藏状态 布尔型 true false
                            var shouHtml
                            var zhuanfa = "转发" // 转发文本
                            var zhuanHtml
                            var pinglun = "评论" // 评论文本
                            var pingHtml
                            var dz = "赞" // 点赞文本
                            var iszan = 0 // 点赞状态 布尔型 true false
                            var zanHtml
                            var zhidingHtml // 置顶状态 string 0 1
                            var newHtml // 新消息 string true false
                            var hotHtml // 热门 string true false
                            var isadmin // 管理员 布尔型 true false
                            var adminHtml
                            var isself // 是否当前用户的帖子 string true false
                            var locHtml // 定位
                            var newVideoArr = [] // 存储新的video内容

                            /** 循环帖子列表数组 */
                            layui.each(data, function (index, item) {
                                var html = ''
                                var userlink = './index.php?i=2&c=entry&action=other&do=Index&m=wyt_luntan&uid=' + item.uid // 用户个人中心链接地址 // 个人中心连接拼接 个人uid
                                var tiezilink = './index.php?i=2&c=entry&action=info&do=Index&m=wyt_luntan&id=' + item.id // 帖子地址链接 拼接帖子id
                                // 定位
                                if (item.address) {
                                    locHtml = `
                            <span class="loc-bx">
                                <span class="loc-img">
                                    <img src="/attachment/style/src//img/location.png">
                                </span>
                                <span class="loc-text">${item.address}</span>        
                            </span>
                            `
                                } else {
                                    locHtml = `
                            `
                                }

                                // 新消息
                                if (item.is_new == 'true') { // 是新消息
                                    newHtml = `
                            <img src="/attachment/style/src//img/quanxinde.png" class="newtag">
                            `
                                } else {
                                    newHtml = ''
                                }
                                // 热门
                                if (item.is_hot == 'true') { // 是热门
                                    hotHtml = `
                            <img src="/attachment/style/src/img/remende.png" class="hot-tag">
                            `
                                } else {
                                    hotHtml = ''
                                }
                                // 管理员
                                if (item.is_admin) { // 是管理员
                                    adminHtml = `
                                <span class="user-name isadmin">${item.nickname}[管理员]</span>
                                <img src="/attachment/style/src/img/guanliyuan.png" class="admin">
                            `
                                } else {
                                    adminHtml = `
                                <span class="user-name ">${item.nickname}</span>
                            `

                                }
                                // 是否是自己的帖子
                                if (item.is_myself == 'true') { // 是自己的帖子
                                }
                                isself = item.is_myself
                                // 置顶
                                if (item.zdstate != '0') { // 已经置顶
                                    zhidingHtml = `
                                <span class="zhiding-img">
                                    <img src="/attachment/style/src//img/zhiding1.png">
                                    <img src="/attachment/style/src//img/zhiding2.png">
                                </span>
                            `
                                } else {
                                    zhidingHtml = ''
                                }

                                // 收藏
                                if (!item.collection) {
                                    shoucang = '收藏'
                                    shouHtml = `
                                <span class="zhuanfa shoucang" shou-status= ${isshou}>
                                    <img class="shou-img" src="/attachment/style/src/img/shoucang1.png">
                                    <img class="shou-hou-img" src="/attachment/style/src/img/shoucang2.png"  style="display:none;">
                                    <span>${shoucang}</span>
                                </span>
                            `
                                } else {
                                    shoucang = '已收藏'
                                    shouHtml = `
                                <span class="zhuanfa shoucang" shou-status= ${isshou}>
                                    <img class="shou-img" src="/attachment/style/src/img/shoucang1.png" style="display:none;">
                                    <img class="shou-hou-img" src="/attachment/style/src/img/shoucang2.png">
                                    <span>${shoucang}</span>
                                </span>
                            `
                                }
                                // 转发
                                if (item.share != '0') { // 有转发
                                    zhuanfa = item.share
                                } else {
                                    zhuanfa = '转发'
                                }
                                zhuanHtml = `
                            <span class="zhuanfa">
                                <img src="/attachment/style/src/img/zhuanfa.png">
                                <span>${zhuanfa}</span>
                            </span>
                        `

                                // 评论
                                if (item.pl != 0) { // 有评论
                                    pinglun = item.pl
                                } else {
                                    pinglun = '评论'
                                }
                                pingHtml = `
                            <span class="zhuanfa">
                                <a href="${tiezilink}">
                                    <img src="/attachment/style/src/img/pinlgun.png">
                                    <span>${pinglun}</span>
                                </a>
                            </span>
                        `
                                // 点赞
                                if (!item.dianzan) { // 用户未点赞
                                    iszan = 0
                                    dz = '赞'
                                    zanHtml = ` <span class="zhuanfa dianzan"  zan-status="${iszan}">
                                        <img  class="zan-img" src="/attachment/style/src/img/dianzan.png">
                                        <img class="zan-hou-img"  src="/attachment/style/src/img/dianzanhou.png" style="display: none;">
                                        <span>${dz}</span>
                                    </span>
                                `
                                } else {
                                    iszan = 1
                                    dz = item.zan
                                    zanHtml = ` <span class="zhuanfa dianzan"  zan-status="${iszan}">
                                        <img  class="zan-img" src="/attachment/style/src/img/dianzan.png" style="display: none;">
                                        <img class="zan-hou-img"  src="/attachment/style/src/img/dianzanhou.png">
                                        <span>${dz}</span>
                                    </span>
                                `
                                }

                                /**
                                 * @1 分享文字
                                 * @2 分享文字+图片
                                 * @3 分享文字+视频
                                 * @4 分享文字+链接
                                 */
                                var isText = item.info1
                                var isPic = item.images
                                var isVideo = item.video
                                var isLink = item.link_title
                                if (isPic && !isVideo && !isLink) {
                                    // @2
                                    var picArr = ''
                                    isPic.forEach(element => {
                                        picArr += `
                                    <img class="img-item"src="${element}">
                                `
                                    });
                                    var itemHtml = `
                                    <div class="other-content">
                                        ${picArr}
                                    </div>
                                 `
                                } else if (!isPic && isVideo && !isLink) {
                                    // @3
                                    function getRanNum() {
                                        var result = [];
                                        for (var i = 0; i < 4; i++) {
                                            var ranNum = Math.ceil(Math.random() *
                                                25); //生成一个0到25的数字
                                            //大写字母'A'的ASCII是65,A~Z的ASCII码就是65 + 0~25;然后调用String.fromCharCode()传入ASCII值返回相应的字符并push进数组里
                                            result.push(String.fromCharCode(65 +
                                                ranNum));
                                        }
                                        return result.join('');
                                    }
                                    var newId = getRanNum()

                                    var itemHtml = `
                                    <div class="video-bx" style="background-image:url(/attachment/style/src/img/jiazaishibai.png)"  data-status="empty" >
                                        <div class="prism-player" id="${newId}"  data-src="${isVideo}" data-fengmian= "${item.videos.fengmian}"  data-id="${newId}"></div>
                                    </div>
                                    `
                                    // 新获取的video
                                    item.videos.id = newId
                                    newVideoArr.push(item.videos)
                                } else if (!isPic && !isVideo && isLink) {
                                    // @4
                                    var itemHtml = `
                                <div class="other-link" data-href="${item.link_title}">
                                    <div class="link-bx">
                                        <div class="img-bx"><img src="/attachment/style/src//img/linkcover.png"></div>
                                        <div class="link-det">
                                            <dt class="two-ellipsis">${item.link_title}</dt>
                                        </div>
                                    </div>
                                </div> 
                            `
                                } else {
                                    var itemHtml = ''
                                }

                                html = `
                            <li class="listshow-item" uid="${item.uid}" id="${item.id}" islink="${item.islink}" iszhiding="${item.zdstate}">
                                <div class="item-bx">
                                    ${newHtml}
                                <div class="user-info">
                                    <a class="user-det-left" href="${userlink}">
                                        <img src="${item.avatar}" class="touxiang-img">
                                        <div class="my-user-det">
                                            <div class="user-top">
                                                ${adminHtml}
                                                ${hotHtml}
                                            </div>
                                            <div class="user-bottom">
                                                <span class="fatie-time">
                                                    ${item.time}
                                                </span>
                                                <div class="tag-bx">
                                                    <span class="tag-item">
                                                        <img src="/attachment/style/src/img/xiaokache.png">
                                                        <span>
                                                            ${item.fenlei}
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <img  src="/attachment/style/src/img/xiala.png" class="xiala-img xiala" isadmin="${item.isadminer}" isself="${item.is_myself}">
                                </div>
                                <a class="conten-detail" href="${tiezilink}">
                                    <dd>
                                        <span class="main-content three-ellipsis">
                                            ${zhidingHtml}
                                            ${item.title}
                                        </span>
                                    </dd>
                                      ${itemHtml}
                                </a>
                                <div class="other-info-bx">
                                    <div class="other-item">
                                        ${locHtml}
                                        <div class="checked-num">${item.looks}次浏览</div>
                                    </div>
                                </div>
                                <div class="bar-control mob_1px_t"  shou-status="${isshou}">
                                    ${shouHtml}  ${zhuanHtml}  ${pingHtml}  ${zanHtml}
                                </div>
                                </div>
                            </li>
                            `
                                lis.push(html);

                            });

                            if (!res) {
                                var pages = res.page
                            } else {
                                pages = 20000
                            }
                            //假设你的列表返回在data集合中
                            // layui.each(res.data, function (index, item) {
                            //     console.log(item)
                            // });

                            //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
                            //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
                            next(lis.join(''), page < pages);
                            // 实例 视频
                            // console.log(newVideoArr)
                            newVideos(newVideoArr)
                            // 管理员下拉
                            // root.showAdmin()
                            // 调试模式 直接再编辑 帖子
                            $('.xiala').on('click', function () {
                                // 获取到帖子的id
                                var thread_id = $(this).parents('li').attr('id')

                                window.location.href = 'http://lanhaitun.zanhf.com/app/index.php?i=2&c=entry&action=fatie&do=Index&m=wyt_luntan&thread_id=' + thread_id
                            })
                            // 调用收藏 点赞 转发事件
                            root.mainPageEvent()
                        });
                    }
                });
            });
        }
        root.showListFlow = showListFlow
        /**
         * 数据渲染后重新实例化video方法
         */
        function newVideos(newVideoArr) {
            // 遍历新增加的video内容
            newVideoArr.forEach(function (item) {
                aliPlayer(item)
                // console.log(item)
            })

            function aliPlayer(videoData) {
                var id = videoData.id
                var src = videoData.src
                var poster = videoData.fengmian
                // console.log(id)

                var player = new Aliplayer({
                    "id": id,
                    "source": src,
                    "cover": poster,
                    "width": "100%",
                    "height": "190px",
                    "autoplay": false,
                    "isLive": false,
                    "rePlay": false,
                    "playsinline": false,
                    "preload": true,
                    "controlBarVisibility": "click",
                    "showBarTime": 5000,
                    "useH5Prism": true,
                    "skinLayout": [{
                            "name": "bigPlayButton",
                            "align": "blabs",
                            "x": 30,
                            "y": 80
                        },
                        {
                            "name": "H5Loading",
                            "align": "cc"
                        },
                        {
                            "name": "thumbnail"
                        },
                        {
                            "name": "controlBar",
                            "align": "blabs",
                            "x": 0,
                            "y": 0,
                            "children": [{
                                    "name": "progress",
                                    "align": "blabs",
                                    "x": 0,
                                    "y": 44
                                },
                                {
                                    "name": "playButton",
                                    "align": "tl",
                                    "x": 15,
                                    "y": 12
                                },
                                {
                                    "name": "timeDisplay",
                                    "align": "tl",
                                    "x": 10,
                                    "y": 7
                                },
                                {
                                    "name": "fullScreenButton",
                                    "align": "tr",
                                    "x": 10,
                                    "y": 12
                                }
                            ]
                        }
                    ]
                }, function (player) {
                    player._switchLevel = 0;

                    $('#' + id).parents('.video-bx').attr('data-status', 'done')
                    var status = $('#' + id).parents('.video-bx').attr('data-status')
                });
            }
        }

        // 获取地址栏参数
        function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }
        root.getQueryString = getQueryString
        // 执行视频生成 
        function showfsVideo(videoSrc, type) {
            // h5 生成video 播放器
            $('#videoPoster .btn-video').off()
            if (!root.videoPlayer) {
                $('#video2').show()

                function creatVideo() {
                    root.videoPlayer = new plus.video.VideoPlayer('video2', {
                        src: videoSrc,
                        direction: '',
                    });
                    $('#video2').hide()
                    root.videoPlayer.hide()
                    // 默认是竖屏
                    // 竖屏
                    // $('#videoPoster').addClass('shuping').removeClass('hengping')
                    // $('#videoPoster .poster-img').attr('src', 'http://lanhaitun.zanhf.com/addons/wyt_luntan/assets/style_new/img/shupingposter1.png')
                    // 显示视频
                    $('#videoPoster').show()
                    $('.set-poster').show()
                    root.videoPlayer.addEventListener("fullscreenchange", function (e) {
                        if (!e.detail.fullScreen) {
                            $('#video2').hide()
                            root.videoPlayer.pause()
                            root.videoPlayer.hide()
                            $('#videoPoster .btn-video').show()
                        }
                        // 判断视频比例 
                        // if (e.detail.direction == 'horizontal') {
                        //     // 如果不是竖屏 而是横屏
                        //     // 横屏
                        //     $('#videoPoster').addClass('hengping').removeClass('shuping')
                        //     $('#videoPoster .poster-img').attr('src', 'http://lanhaitun.zanhf.com/addons/wyt_luntan/assets/style_new/img/morenvideo1.png')
                        // }
                    })
                }
                if (type == 'newfatie') {
                    creatVideo()
                } else {
                    // 再编辑 苹果手机直接执行  安卓手机 plusready
                    var u = navigator.userAgent;
                    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                    if (isAndroid) {
                        document.addEventListener('plusready', creatVideo, false);
                    }
                    if (isiOS) {
                        creatVideo()
                    }
                }
                document.addEventListener('plusready', creatVideo, false);

            } else {
                root.videoPlayer.setStyles({
                    src: videoSrc
                })
            }

            // 视频操作
            $('#videoPoster .btn-video').on('click', function () {
                // 关闭视频点击按钮
                $(this).hide()
                // 如果已经有video实例
                // 全屏 播放
                root.videoPlayer.show()
                root.videoPlayer.play()
                root.videoPlayer.requestFullScreen(0)
                return false
            })

            // 点击删除视频
            $('#videoPoster .del-icon').on('click', function () {
                // 删除上传的值
                $("input[name='video']").val('')
                $('#videoPoster').hide()
                $('.set-poster').hide()
                // 恢复图片上传 相机拍照
                root.showCamera('')
            })
            return false
        }
        root.showfsVideo = showfsVideo

        // function closeVideoFs(videoEle) {
        //     // 展示封面点击按钮
        //     $('#videoPoster .btn-video').show()
        // }
        // root.closeVideoFs = closeVideoFs
        // 获取视频第一帧方法
        function getFirstVideoImg(videIdName, posterIdName) {
            var video, output;
            var scale = 0.8;

            function initialize() {
                // output = document.getElementById(posterIdName);
                video = document.getElementById(videIdName);
                // alert(JSON.stringify(video))
                video.onloadeddata = captureImage()
                // video.addEventListener('loadeddata', captureImage); // 用于向指定元素添加事件句柄。
            };

            function captureImage() {
                var canvas = document.createElement("canvas"); // 创建一个画布
                canvas.width = video.videoWidth * scale;
                canvas.height = video.videoHeight * scale;
                canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas
                    .height); // getContext:设置画布环境；drawImage:画画 
                var img = document.createElement("img");
                img.src = canvas.toDataURL("image/png"); // 获取图片的url

                // output.appendChild(img);
                // base64上传数据库，返回封面地址
                // root.postSubmit({
                //     url: baseUrl + urlObj.baseUpImg,
                //     data: {
                //         photo: img.src
                //     },
                //     source: 'baseUpImg'
                // })
                // 判断视频长宽比例 
                if (canvas.width > canvas.height) {
                    // 横屏
                    $(posterIdName).addClass('hengping')
                    $('#videoPoster .poster-img').attr('src', 'http://lanhaitun.zanhf.com/addons/wyt_luntan/assets/style_new/img/morenvideo1.png')
                    $('.show-my-video ').removeClass('shuping-video')
                } else {
                    // 竖屏
                    $(posterIdName).addClass('shuping')
                    $('#videoPoster .poster-img').attr('src', 'http://lanhaitun.zanhf.com/addons/wyt_luntan/assets/style_new/img/shupingposter1.png')
                    $('.show-my-video ').addClass('shuping-video')
                }
                $('#videoPoster').show()
                $('.set-poster').show()
            };
            initialize()
        }
        root.getFirstVideoImg = getFirstVideoImg

        function autoTextarea(elem, extra, maxHeight) {
            extra = extra || 0;
            var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
                isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
                addEvent = function (type, callback) {
                    elem.addEventListener ?
                        elem.addEventListener(type, callback, false) :
                        elem.attachEvent('on' + type, callback);
                },
                getStyle = elem.currentStyle ? function (name) {
                    var val = elem.currentStyle[name];

                    if (name === 'height' && val.search(/px/i) !== 1) {
                        var rect = elem.getBoundingClientRect();
                        return rect.bottom - rect.top -
                            parseFloat(getStyle('paddingTop')) -
                            parseFloat(getStyle('paddingBottom')) + 'px';
                    };

                    return val;
                } : function (name) {
                    return getComputedStyle(elem, null)[name];
                },
                minHeight = parseFloat(getStyle('height'));

            elem.style.resize = 'none';

            var change = function () {
                var scrollTop, height,
                    padding = 0,
                    style = elem.style;

                if (elem._length === elem.value.length) return;
                elem._length = elem.value.length;

                if (!isFirefox && !isOpera) {
                    padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
                };
                scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

                elem.style.height = minHeight + 'px';
                if (elem.scrollHeight > minHeight) {
                    if (maxHeight && elem.scrollHeight > maxHeight) {
                        height = maxHeight - padding;
                        style.overflowY = 'auto';
                    } else {
                        height = elem.scrollHeight - padding;
                        style.overflowY = 'hidden';
                    };
                    style.height = height + extra + 'px';
                    scrollTop += parseInt(style.height) - elem.currHeight;
                    document.body.scrollTop = scrollTop;
                    document.documentElement.scrollTop = scrollTop;
                    elem.currHeight = parseInt(style.height);
                };
            };

            addEvent('propertychange', change);
            addEvent('input', change);
            addEvent('focus', change);
            change();
        }
        root.autoTextarea = autoTextarea

    }(window.$, window.myLib || (window.myLib = {})));

    /****************************************************************************** */
    /**
     * 事件委托
     * delegate.js
     */
    (function ($, root) {
        // 首页 进入发帖弹窗
        function intoFatie(obj) {
            $('#dragCircle').click(function () {
                if (obj.type == 'newindex') {
                    $('#newListShow').hide()
                    $('.my-nav-bx').hide()
                    $('#newFatie').show('fast')
                    // root.newfatieEvent()
                }
            })
        }
        root.intoFatie = intoFatie
        root.intoFatie({
            type: 'newindex'
        })
        // 获取好友发来的信息
        function getNewMsg() {
            var friend_id = root.getQueryString('friend_id')
            var last_time = $('.main-screen .msg-item:last').attr('data-time')
            // 获取聊天内容
            root.postSubmit({
                url: baseUrl + urlObj.getMsg,
                data: {
                    friend_id: friend_id,
                    last_time: last_time,
                },
                source: 'getMsg'
            })
        }

        root.getNewMsg = getNewMsg
        // 添加好友
        function addFriend() {
            $('.add-btn').click(function () {
                var self = $(this)
                var uid = self.parents('li').attr('u-id')
                var subData = {
                    uid: uid,
                }
                root.postSubmit({
                    data: subData,
                    url: baseUrl + urlObj.addFriend,
                    source: 'addFriend'
                })
            })
        }
        root.addFriend = addFriend

        // addfriend2
        // 添加好友
        function addFriendCenter() {
            $('.add-btn').click(function () {
                var self = $(this)
                var uid = root.getQueryString('uid')
                var subData = {
                    uid: uid,
                }
                root.postSubmit({
                    data: subData,
                    url: baseUrl + urlObj.addFriend,
                    source: 'addFriend'
                })
            })
        }
        root.addFriendCenter = addFriendCenter
        // 倒计时 获取验证码
        let getTelCode = () => {
            // 倒计时时间
            root.countTime = 60
            var countTime = root.countTime
            // 判断图形验证码验证后返回值
            // 开启倒计时 发送请请求
            var phone = $("input[name='telephone']").val()
            root.postSubmit({
                url: baseUrl + urlObj.getTelYzm,
                data: {
                    phone: phone,
                },
                source: 'getTelYzm'
            })


            $('.get-tel-code').text(countTime + 's').css('color', '#d2d2d2').off()
            var timer = setInterval(() => {
                if (countTime > 0) {
                    countTime--
                    $('.get-tel-code').text(countTime + 's')
                } else {
                    $('.get-tel-code').text('获取验证码').css('color', '#fff')
                    // 清除定时器
                    clearInterval(timer)
                    countTime = root.countTime
                    root.sendCode()
                }
            }, 1000);
        }
        root.getTelCode = getTelCode

        let yzImgCode = () => {
            var data = $("input[name='tx_code']").val()
            // 验证图形验证码
            // 正确返回 ture 错误返回 false
            root.postSubmit({
                url: baseUrl + urlObj.yzTxyzm,
                data: {
                    tx_code: data
                },
                source: 'yzTxyzm'
            })
        }
        root.yzImgCode = yzImgCode

        // 验证图形验证码 并获取短信验证码
        let sendCode = () => {
            $('.get-tel-code').click(function () {
                root.yzImgCode()
            })
        }
        root.sendCode = sendCode
    }(window.$, window.myLib || (window.myLib = {})));

    /***************************************************************************************** */
    /**
     * 获取
     * getData.js
     */
    (function ($, root) {
        // 修改帖子 或 新帖子 提交
        function reSubmitFn(myData) {
            if (!root.getQueryString('thread_id')) { // 发新的帖子 提交后台
                root.postSubmit({
                    url: baseUrl + urlObj.sendTiezi,
                    data: myData,
                    source: 'sendTiezi'
                })
            } else {
                var thread_id = root.getQueryString('thread_id')
                myData.thread_id = thread_id
                // layer.msg(myData)
                // 修改帖子
                root.postSubmit({
                    url: baseUrl + urlObj.reEditorSub,
                    data: myData,
                    source: 'reEditorSub'
                })
            }
        }
        root.reSubmitFn = reSubmitFn
        var loginAni
        // obj => {url, data, source}
        let postSubmit = (obj) => {
            $.ajax({
                url: obj.url,
                data: obj.data,
                type: 'POST',
                dataType: 'JSON',
                beforeSend: function () {
                    // 加载中
                    if (obj.source == 'login') {
                        loginAni = layer.load(4)
                    } else if (obj.source === 'register') {
                        loginAni = layer.load(4)
                    }
                },
                success: (res) => {
                    setTimeout(function () {
                        layer.close(loginAni)
                        if (obj.source == 'baseUpImg') {
                            var posterIdName = '#videoPoster .poster-img'
                            var imgSrc = res.picUrl
                            $(posterIdName).attr('src', imgSrc)
                            // poster 图片jq选中
                            // var ele = '#' + posterIdName + ' ' + "img"
                        }
                        if (obj.source == 'login') {
                            if (res.data.code == 1) {
                                // 登陆成功
                                layer.msg(res.data.msg)
                                // 去首页
                                root.navToHome()
                            } else {
                                // 登陆失败
                                layer.msg(res.data.msg)
                            }
                        } else if (obj.source === 'register') {
                            if (res.data.code == 1) {
                                // 注册成功
                                layer.msg(res.data.msg)
                                // 回登陆页面
                                root.navToLive()
                            } else {
                                // 注册失败
                                layer.msg(res.data.msg)
                            }
                        }
                        if (obj.source == 'forget') {
                            if (res.data.code == 1) {
                                // 密码修改成功
                                layer.msg(res.data.msg)
                                // 回登陆页面
                                root.navToLogin()
                            } else {
                                // 失败
                                layer.msg(res.data.msg)
                            }
                        }
                        if (obj.source === 'searchUser') {
                            if (res.code == 1) {
                                var data = res.data[0]
                                if (data.is_friend == 0) {
                                    // 还不是好友
                                    var html = `
                                                <li u-id = ${data.uid} my-id='${res.current_id}'>
                                                    <a href="javascript:;">
                                                        <div class="left">
                                                            <img src="${data.headimgurl}">
                                                            <div class="name-dex">
                                                                <div class="name">${data.nickname}</div>
                                                                <div class="content">ID：${data.telephone}</div>
                                                            </div>
                                                        </div>
                                                        <div class="right btn">
                                                        <span class="add-btn">+ 添加</span>
                                                        </div>
                                                    </a>
                                                </li>
                                            `

                                } else {
                                    // 已经是好友
                                    // 去聊天的地址
                                    var chatUrl = '/index.php?i=2&c=entry&do=Index&m=wyt_luntan&action=chatting&friend_id=' + data.uid + '&current_id=' + res.current_id
                                    var html = ` 
                                            <li>
                                                <a href="${chatUrl}">
                                                    <div class="left">
                                                        <img src="${data.headimgurl}">
                                                        <div class="name-dex">
                                                            <div class="name">${data.nickname}</div>
                                                            <div class="content">ID：${data.telephone}</div>
                                                        </div>
                                                    </div>
                                                    <div class="right btn">
                                                        <span class="send-btn">发私信</span>
                                                    </div>
                                                </a>
                                            </li>
                                        `
                                }
                                $('.list').append(html)
                                // 如果不是好友，添加好友操作
                                if (obj.source === 'searchUser') {
                                    root.addFriend()
                                }
                            } else {
                                layer.msg(res.msg)
                            }
                        }

                        // 添加好友 申请
                        if (obj.source == 'addFriend') {
                            if (res.code == 1) {
                                // 申请成功
                                $('.right').empty().append(' <span class="waitting">待通过</span>')
                            } else if (res.code === 4) {
                                $('.right').empty().append(' <span class="waitting">待通过</span>')
                            }
                            layer.msg(res.msg)
                            return
                        }

                        // 处理好友申请
                        // 接受
                        if (obj.source === 'passFriend') {
                            if (res.code == 1) {
                                $('.right').empty().append('  <span class="waitting">已通过</span>')
                            } else {
                                layer.msg(res.msg)
                            }
                        }
                        // 处理好友申请
                        //  决绝
                        if (obj.source === 'refuseFriend') {
                            if (res.code == 1) {
                                $('.right').empty().append('  <span class="waitting">已拒绝</span>')
                            } else {
                                layer.msg(res.msg)
                            }
                        }
                    }, 500)
                    // 验证图形验证码
                    if (obj.source == 'yzTxyzm') {
                        if (res.data.code == 1) {
                            // 执行发送短信验证码事件
                            // 图形验证成功 切换图形验证码
                            root.getTelCode()
                            $('.code-bx img').trigger('click')
                        } else {
                            layer.msg('图形验证码错误')
                            $("input[name='tx_code']").addClass('layui-form-danger')
                        }
                    }

                    // 发送消息给好友
                    if (obj.source == 'sendMsg') {
                        if (res.code === 1) {
                            // 发送成功
                            // 插入发送的内容
                            var html = `
                                    <div class="msg-item right" data-time="${res.data.times}">
                                        <span class="msg-time">
                                        <span class="time">${res.data.sub_time}</span>
                                        </span>
                                        <div class="main-item">
                                            <div class="content">${res.data.content}</div>
                                            <img src="${res.data.headimgurl}">
                                        </div>
                                    </div>
                                `
                            $('.main-screen').append(html)
                            $('#textarea').attr('value', '')
                            // 滚动到底
                            var myEle = document.getElementsByClassName('main-screen')[0]
                            myEle.scrollTop = 2000000000
                        } else {
                            layer.msg(res.msg)
                            return false
                        }
                    }

                    // 获取新消息内容
                    if (obj.source === 'getMsg') {
                        if (res.code === 1) {
                            if (res.data) {
                                var html = `
                                        <div class="msg-item left" data-time="${res.data[0].sub_time}">
                                            <div class="main-item">
                                                <img src="${res.data[0].headimgurl_left}">
                                                <div class="content">${res.data[0].content}</div>
                                            </div>
                                        </div>
                                    `
                                $('.main-screen').append(html)
                                // 滚动到底
                                var myEle = document.getElementsByClassName('main-screen')[0]
                                myEle.scrollTop = 2000000000
                                // clearInterval(root.getMsg_timer)
                                // root.lastTime = res.data[0].sub_time
                            }
                        } else {}
                    }

                    // 发帖
                    if (obj.source === 'sendTiezi') {
                        // console.log(JSON.stringify(res))
                        if (res.code == 1) {
                            layer.msg(res.msg)
                            // root.navToHome()
                            setTimeout(() => {
                                $('#newListShow').show()
                                $('.my-nav-bx').show()
                                $('#newFatie').hide('fast')
                            }, 1000);

                        } else if (res.code == 2) {
                            layer.msg(res.msg)
                            root.navToLogin()
                        }
                    }

                    // 首页置顶帖子
                    if (obj.source === 'zhiding') {
                        // console.log(JSON.stringify(res))
                        if (res.code == 1) {
                            layer.msg(res.msg)
                            setTimeout(function () {
                                window.location.reload()
                            }, 1000);
                        } else {
                            layer.msg(res.msg)
                            return false
                        }

                    }

                    // 删除帖子
                    if (obj.source === 'deletTz') {
                        // layer.msg(JSON.stringify(res))
                        if (res.code == 1) {
                            layer.msg(res.msg)
                            setTimeout(function () {
                                window.location.reload()
                            }, 1000);
                        } else {
                            layer.msg(res.msg)
                            return false
                        }
                    }

                    // 获取要修改帖子内容
                    if (obj.source == 'reEditorGet') {
                        var data = res.data
                        var form = layui.form;
                        if (data.link_url) {
                            // 外链
                            form.val("formLink", {
                                // 内容
                                'link_adress': data.link_url,
                                'link_title': data.link_title,
                                'link_des': data.link_info,
                            })
                        }
                        form.val("formFatie", {
                            // 标题
                            'title': data.title,
                        })
                        // 内容
                        if (data.info) {
                            form.val("formFatie", {
                                // 内容
                                'info': data.info,
                            })
                        }
                        //  分类
                        if (data.fenlei) {
                            form.val("formFatie", {
                                // 分类
                                'fenlei': data.fenlei,
                            })
                        }
                        // 视频封面
                        if (data.fengmian) {
                            $('#videoPoster .poster-img').attr('src', data.fengmian)
                            form.val("formFatie", {
                                // 视频封面
                                'fengmian': data.fengmian
                            })
                        }
                        //   图片
                        if (data.images) {
                            var html
                            data.images.forEach(function (item, index) {
                                form.val("formFatie", {
                                    // 视频封面
                                    imgVal: item
                                })
                                html += `
                                        <li>
                                            <img class="main-pic" src="${item}">
                                            <img class="del-icon" src="/attachment/style/src/img/shanchu.png">
                                            <input name="images[]" value="${item}" hidden>
                                        </li>
                                    `
                            })
                            $('.add-img').show()
                            $('.img-show-bx ul ').prepend(html)
                            $('.img-show-bx ul .add-img').click(function () {
                                // 增加图片
                                root.getimg()
                            })
                            // 增加图片删除事件
                            $('ul li .del-icon').click(function () {
                                $(this).parents('li').remove()
                                // 上传按钮
                                hideUpBtn()
                            })

                            // 隐藏相机拍照和视频上传
                            $('#upVideo').hide()
                            root.showCamera('photo')
                        }

                        // 视频
                        if (data.video) {
                            // 视频封面img
                            form.val("formFatie", {
                                // 视频
                                'video': data.video,
                            })
                            // 实例化 视频对象
                            root.showfsVideo(data.video, 'reEdit')
                            // 隐藏相机录像和图片上传
                            $('#upImg').hide()
                            root.showCamera('video')
                        }

                    }

                    // 提交修改的帖子
                    if (obj.source == 'reEditorSub') {
                        // alert(JSON.stringify(res))
                        // console.log(JSON.stringify(res))
                        if (res.code == 1) {
                            layer.msg(res.msg)
                            root.navToHome()
                        } else {
                            layer.msg(res.msg)
                        }
                    }

                    // 直播 提交图片请求
                    if (obj.source === 'sentTzChat') {
                        if (res.msg === '未登录') {
                            // 未登录去登陆
                            layer.msg(res.msg)
                            root.navToLogin()
                        }
                        return false
                    }

                    // 获取短信验证码
                    if (obj.source === 'getTelYzm') {
                        if (res.code == 1) {
                            // 发送成功
                        } else {
                            // 发送失败
                        }
                        layer.msg(res.msg)
                    }

                    // 提交帖子回复
                    if (obj.source === 'hfTzSend') {
                        if (res.code == 1) {
                            $('#newHfBx .new-huifu').slideToggle('fast')
                            $('#newHfBx').hide()
                            window.location.reload()
                        } else {
                            layer.msg(res.msg)
                        }
                        return false;
                    }
                },


                fail: (res) => {
                    // 失败
                    layer.close(loginAni)
                    layer.msg(res.data.msg)
                }
            })
        }

        root.postSubmit = postSubmit

    }(window.$, window.myLib || (window.myLib = {})));
    /****************************************************************************** */
    /**
     * 渲染
     * render.js
     */
    (function ($, root) {

        // 跳转回登陆页面
        let navToLogin = () => {
            setTimeout(() => {
                window.location.href = baseUrl + 'index.php?i=2&c=entry&do=login&m=wyt_luntan&action=login'
            }, 1000);
        }

        root.navToLogin = navToLogin

        // 去首页
        let navToHome = () => {
            setTimeout(() => {
                // window.open(baseUrl + 'index.php?i=2&c=entry&do=index&m=wyt_luntan')
                localStorage.setItem('ifReload', true)
                window.location.href = baseUrl + 'index.php?i=2&c=entry&do=index&m=wyt_luntan'
            }, 1000);
        }
        root.navToHome = navToHome
        // 去个人中心
        let navToInfo = () => {
            setTimeout(() => {
                window.location.href = baseUrl + urlObj.userInfo
            }, 1000);
        }
        root.navToInfo = navToInfo
        // 去直播页面
        let navToLive = () => {
            setTimeout(() => {
                window.location.href = baseUrl + 'index.php?i=2&c=entry&m=wxz_wzb&do=index2&rid=9'
            }, 1000);
        }
        root.navToLive = navToLive

    }(window.$, window.myLib || (window.myLib = {})));
    /****************************************************************************** */
    /**
     * 入口
     * index.js
     */
    (function ($, root) {
        $('input').focus(function () {
            $(this).removeClass('layui-form-danger')
        })
        if (document.getElementById('login')) {
            //Demo
            layui.use('form', function () {
                var form = layui.form;
                // form.verify({
                //     pass: [
                //         /^[0-9]+[a-zA-Z]+[0-9a-zA-Z]*|[a-zA-Z]+[0-9]+[0-9a-zA-Z]*$/, '密码必须是数字和字母的组合'
                //     ]
                // });
                //监听提交
                form.on('submit(formDemo)', function (data) {
                    // layer.msg(JSON.stringify(data.field));
                    var data = data.field
                    root.postSubmit({
                        url: baseUrl + urlObj.loginUrl,
                        data: data,
                        source: 'login'
                    })
                    return false
                });
            });
        } else if (document.getElementById('register')) {
            // 验证图形验证码 并获取短信验证码
            root.sendCode()
            //注册提交
            layui.use('form', function () {
                var form = layui.form;
                // form.verify({
                //     pass: [
                //         /^[0-9]+[a-zA-Z]+[0-9a-zA-Z]*|[a-zA-Z]+[0-9]+[0-9a-zA-Z]*$/, '密码必须是数字和字母的组合'
                //     ],
                //     rePass: [
                //         /^[0-9]+[a-zA-Z]+[0-9a-zA-Z]*|[a-zA-Z]+[0-9]+[0-9a-zA-Z]*$/, '密码必须是数字和字母的组合'
                //     ]
                // });
                //监听提交
                form.on('submit(formDemo)', function (data) {
                    // 验证注册密码一致性
                    if (data.field.psw !== data.field.re_psw) {
                        layer.msg('注册失败，密码不一致')
                        $("input[name='psw']").addClass('layui-form-danger')
                        return false
                    }
                    /**
                     *  "telephone": "18801765964",
                     *  "tx_code": "123456",
                     *  "tel_code": "123456",
                     *  "psw": "888888",
                     *  "re_psw": "888888"
                     */
                    var data = data.field
                    root.postSubmit({
                        url: baseUrl + urlObj.registerUrl,
                        data: data,
                        source: 'register'
                    })
                    return false
                });
            });
            // 展开注册协议
            $('#register .tiaokuan-link').click(function () {
                $('#registerText').show()
                $('#register').hide()
            })
            $('#registerText .close-btn').click(function () {
                $('#registerText').hide()
                $('#register').show()
            })
        } else if (document.getElementById('forget')) {
            // 验证图形验证码 获取短信验证码
            root.sendCode()
            //监控表单
            layui.use('form', function () {
                var form = layui.form;
                // form.verify({
                //     pass: [
                //         /^[0-9]+[a-zA-Z]+[0-9a-zA-Z]*|[a-zA-Z]+[0-9]+[0-9a-zA-Z]*$/, '密码必须是数字和字母的组合'
                //     ],
                //     rePass: [
                //         /^[0-9]+[a-zA-Z]+[0-9a-zA-Z]*|[a-zA-Z]+[0-9]+[0-9a-zA-Z]*$/, '密码必须是数字和字母的组合'
                //     ]
                // });
                //监听提交
                form.on('submit(formDemo)', function (data) {
                    // layer.msg(JSON.stringify(data.field));
                    // 验证注册密码一致性
                    if (data.field.psw !== data.field.re_psw) {
                        layer.msg('注册失败，密码不一致')
                        $("input[name='psw']").addClass('layui-form-danger')
                        return false
                    }
                    var data = data.field
                    root.postSubmit({
                        url: baseUrl + urlObj.forgetUrl,
                        data: data,
                        source: 'forget'
                    })
                    return false
                });
            });
        } else if (document.getElementById('setUserInfo')) {
            $('form').submit(function () {
                var formData = $(this).serializeArray()
                $.ajax({
                    url: baseUrl + urlObj.setUserInfo,
                    dataType: 'JSON',
                    data: formData,
                    success: function (res) {
                        if (res.code == 1) {
                            layer.msg('修改保存成功！')
                            // 跳转回个人中心
                            root.navToInfo()
                        } else {
                            layer.msg(res.msg)
                        }

                    },
                    error: function (res) {
                        layer.msg('修改失败，链接超时~')
                    }
                })
                return false
            })
        } else if (document.getElementById('sendMsg')) {
            // 滚动到底
            var myEle = document.getElementsByClassName('main-screen')[0]
            myEle.scrollTop = 2000000000

            var textInput = document.getElementById('textarea')
            root.autoTextarea(textInput)
            var friend_id = root.getQueryString('friend_id')
            // 发送信息
            $('button').click(function () {
                var content = $('#textarea').val()
                var data = {
                    friend_id: friend_id,
                    content: content,
                }
                // 发送消息请求
                root.postSubmit({
                    url: baseUrl + urlObj.sendMsg,
                    data: data,
                    source: 'sendMsg'
                })
            })

            // 获取聊天内容
            var getnewTimer = setInterval(() => {
                root.getNewMsg()
            }, 1500);
            root.getnewTimer = getnewTimer

        } else if (document.getElementById('addFriend')) {
            // 搜索框防抖
            // 搜索好友
            var timer
            $('.ser-input').keydown(function () {
                var _self = $(this)
                if (timer) {
                    clearTimeout(timer)
                }

                timer = setTimeout(() => {
                    var serData = {
                        telephone: _self.val()
                    }
                    root.postSubmit({
                        url: baseUrl + urlObj.searUser,
                        data: serData,
                        source: 'searchUser'
                    })
                }, 1500);
            })
            // 通过好友申请
            $('.pass-btn').click(function () {

                var id = $(this).parents('li').attr('data-id')
                var data = {
                    id: id,
                    is_agree: 1, // 1同意， 2拒绝
                }
                root.postSubmit({
                    url: baseUrl + urlObj.passFriend,
                    data: data,
                    source: 'passFriend'
                })
            })
            // 拒绝好友申请
            $('.refuse-btn').click(function () {
                var id = $(this).parents('li').attr('data-id')
                var data = {
                    id: id,
                    is_agree: 2, // 1同意， 2拒绝
                }
                root.postSubmit({
                    url: baseUrl + urlObj.passFriend,
                    data: data,
                    source: 'refuseFriend'
                })
            })
        } else if (document.getElementById('userCenter')) {
            // 添加好友
            root.addFriendCenter()
        }

        // 独立出来的新 发帖页面
        function newfatieEvent() {
            if (document.getElementById('newFatie')) {

                // 提交外链
                $('#upLink').click(function () {
                    $('.link-bx').slideToggle('fast')
                    // $('.main-form').click(function () {
                    //     $('.link-bx').slideToggle('fast')
                    //     $('.main-form').off()
                    // })
                })
                $('.link-bx .cancelBtn').click(function () {
                    $('.link-bx').slideToggle('fast')
                })

                // 新 发帖样式
                var textInput = document.getElementById('textarea')
                root.autoTextarea(textInput)

                // 帖子提交 验证事件
                layui.use('form', function () {
                    var form = layui.form;

                    //监听提交
                    form.on('submit(fatieFormSub)', function (data) {
                        //    console.log(JSON.stringify(data.field));
                        // layer.msg(JSON.stringify(data.field))
                        var myData = data.field
                        // 全部为空 提示
                        if (!myData.video && !myData.img && !myData.title) {
                            layer.msg('发送失败~帖子为空')
                            return false;
                        } else {
                            if (myData.title && !myData.video && !myData.img) { // 优化后 去掉info，只保留title字段
                                // 只有标题 没有内容
                                // layer.msg('发送失败~暂无内容')
                                // return false;
                            } else if (myData.img && !myData.title) {
                                // 分享图片
                                myData.title = '分享图片'
                            } else if (myData.video && !myData.title) {
                                // 分享视频
                                myData.title = '分享视频'
                            }
                            // console.log(JSON.stringify(myData), root.getQueryString('thread_id'))
                            // alert(JSON.stringify(myData))
                            root.reSubmitFn(myData)
                        }
                        return false;
                    });


                    //监听提交
                    form.on('submit(formLinkSub)', function (data) {
                        // islink  1有外链  0无外链
                        // link_url  链接地址，没有传空值
                        // link_title  标题。没有传空值
                        // link_info  描述。没有传空值
                        var myData = data.field
                        myData.islink = 1
                        if (!myData.link_title || !myData.link_adress) {
                            layer.msg('发送失败~请完善外链信息')
                        } else {
                            // layer.msg(JSON.stringify(myData))
                            // 判断 发新外链、 修改外链
                            myData.title = "分享链接"
                            root.reSubmitFn(myData)
                        }
                        return false;
                    });

                    // 取消按钮
                    $('.cancle-btn').click(function (e) {
                        var confirmMsg = layer.confirm('确认取消吗？', {
                            btn: ['确认', '取消'],
                            title: '提示',
                            closeBtn: 0,
                        }, function () {
                            $('#newListShow').show()
                            $('.my-nav-bx').show()
                            $('#newFatie').hide('fast')
                            layer.close(confirmMsg)
                            return false;
                        }, function () {
                            layer.close(confirmMsg)
                            return false;
                        })
                        e.preventDefault()
                        return false;
                    })

                    // 判断是否是再编辑的帖子
                    if (root.getQueryString('thread_id')) {
                        // 是否是编辑外链
                        if (root.getQueryString('isLink') == '1') {
                            $('.main-form').hide()
                            $('.link-bx').show().off()
                            // 外链取消按钮
                            $('.link-bx .cancelBtn').click(function () {

                                return false
                            })

                        } else {
                            // 展示取消按钮
                            $('.cancle-btn').click(function (e) {
                                var confirmMsg = layer.confirm('确认取消吗？', {
                                    btn: ['确认', '取消'],
                                    title: '提示',
                                    closeBtn: 0,
                                }, function () {
                                    $('#newListShow').show()
                                    $('.my-nav-bx').show()
                                    $('#newFatie').hide('fast')
                                }, function () {
                                    layer.close(confirmMsg)
                                    return false;
                                })
                                e.preventDefault()
                                return false;
                            })
                        }

                        var thread_id = root.getQueryString('thread_id')
                        root.postSubmit({
                            url: baseUrl + urlObj.reEditorGet,
                            data: {
                                thread_id: thread_id,
                            },
                            source: 'reEditorGet',
                        })

                    }

                });

                // 选择相册
                $('#upImg').click(function () {
                    root.getimg()
                })

                // 上传视频
                $('#upVideo').click(function () {
                    root.getMyVideo()
                })

                //获取图片
                function getimg() {
                    var imgNum = 6 - $('ul .uped-pic').length
                    plus.gallery.pick(function (e) {
                        // 提示等待
                        root.imgW = plus.nativeUI.showWaiting()
                        for (var i in e.files) {
                            var num = Number(i) + 1
                            var len = e.files.length
                            var lastone = false
                            if (num == len) {
                                lastone = true
                            }
                            root.uploadServerImg(e.files[i], lastone)
                        }
                    }, function () {}, {
                        multiple: true,
                        maximum: imgNum,
                        system: false
                    })
                }

                root.getimg = getimg

                // 获取视频
                function getMyVideo() {
                    plus.gallery.pick(function (e) {
                        root.uploadMyVideo(e)
                    }, function () {}, {
                        filter: 'video',
                    })
                }

                root.getMyVideo = getMyVideo

                //上传图片
                function uploadServerImg(imgPath, lastone) {
                    // console.log(imgPath)
                    // jpg','jpeg','gif','png'
                    // 如果上传图片
                    plus.zip.compressImage({
                        src: imgPath,
                        dst: "_doc/chat/gallery//" + imgPath,
                        quality: 20,
                        overwrite: true,
                    }, function (e) {
                        // 新建上传任务 图片
                        /*
                         */
                        // 关闭等待
                        if (lastone) {
                            root.imgW.close()
                        }
                        var task = plus.uploader.createUpload("http://lanhaitun.zanhf.com/app/index.php?i=2&c=entry&do=UploadImg&m=wyt_luntan", {
                            method: "POST",
                        }, function (res) {
                            var imgUrl = 'http://lanhaitun.zanhf.com/' + JSON.parse(res.responseText).data.file_path
                            console.log(imgUrl)
                            var showPicEle = $('.img-show-bx ul')
                            // 判断是否第一次上传相片 插入上传按钮
                            // 给input img一个值
                            $("input[name='img']").val(imgUrl)
                            if ($('.img-show-bx ul li').length == 0 || $('.img-show-bx ul li').length == 6) {
                                // 隐藏上传按钮
                                $('.img-show-bx .add-img').hide()
                                // 插入最后一次图片
                                if ($('.img-show-bx ul li').length == 6) {
                                    $('.img-show-bx ul').prepend(`
                                        <li class='uped-pic'>
                                            <img class="main-pic" src="${imgUrl}">
                                            <img class="del-icon" src="  http://lanhaitun.zanhf.com/addons/wyt_luntan/assets/style_new/img/shanchu.png">
                                            <input name="images[]" value="${imgUrl}" hidden>
                                        </li>
                                    `)
                                }
                            } else {
                                $('.img-show-bx .add-img').show()
                                $('.img-show-bx ul').prepend(`
                                    <li class='uped-pic'>
                                        <img class="main-pic" src="${imgUrl}">
                                        <img class="del-icon" src="  http://lanhaitun.zanhf.com/addons/wyt_luntan/assets/style_new/img/shanchu.png">
                                        <input name="images[]" value="${imgUrl}" hidden>
                                    </li>
                                `)
                            }
                            // 上传图片即隐藏video上传
                            if ($('.img-show-bx ul li').length == 2) {
                                // 隐藏相机拍照和
                                $('#upVideo').hide()
                                root.showCamera('photo')
                            }
                            // 上传按钮
                            hideUpBtn()
                            // 增加图片删除事件
                            $('ul li .del-icon').click(function () {
                                $(this).parents('li').remove()
                                // 上传按钮
                                hideUpBtn()
                            })

                            function hideUpBtn() {
                                // 判断图片数量 隐藏、展示按钮
                                if ($('ul .uped-pic').length == 6 || $('ul .uped-pic').length == 0) {
                                    $('ul .add-img').hide()
                                    // 如果没有图片了
                                    $('#upVideo').show()
                                    root.showCamera()
                                } else {
                                    $('ul .add-img').show()
                                    // 增加图片方法
                                    $('.img-show-bx ul .add-img').click(function () {
                                        root.getimg()
                                        // 删除图片
                                    })
                                }
                            }
                            root.hideUpBtn = hideUpBtn
                        });
                        task.addFile(e.target, {
                            key: "file"
                        });
                        task.start();
                    }, function (error) {
                        layer.msg('图片上传失败~')
                    });
                }
                root.uploadServerImg = uploadServerImg

                // 上传视频方法 
                function uploadMyVideo(videoPath) {
                    //  开等待提示
                    var w = plus.nativeUI.showWaiting();
                    // 新建上传任务 视频
                    var task = plus.uploader.createUpload("http://lanhaitun.zanhf.com/app/index.php?i=2&c=entry&do=Index&m=wyt_luntan&action=upload_video", {
                        method: "POST",
                    }, function (res) {
                        // alert(JSON.stringify(res))
                        // alert(res.msg)
                        // 关闭图片上传 相机只能录像

                        root.showCamera('video')
                        // 关闭等待
                        w.close()
                        // alert(JSON.stringify(res))
                        var res = JSON.parse(res.responseText)
                        var videoSrc = res.data
                        console.log(videoSrc)
                        if (res.code == 1) {
                            //  赋值给input
                            $("input[name='video']").val(videoSrc)
                            // 展示视频封面
                            root.showfsVideo(videoSrc, 'newfatie')
                        } else {
                            // 开启图片上传 相机只能录像
                            root.showCamera()
                        }

                        layer.msg(res.msg)
                    });
                    task.addFile(videoPath, {
                        key: "file"
                    });
                    task.start();

                }
                root.uploadMyVideo = uploadMyVideo

                // 相册获取封面
                function getPoster() {
                    plus.gallery.pick(function (e) {
                        // console.log(e)
                        root.uploadPoster(e)
                    }, function () {}, {
                        multiple: false,
                        maximum: 1,
                        system: false
                    })
                }
                root.getPoster = getPoster

                // 上传封面接口
                function uploadPoster(imgPath) {
                    // 如果上传图片
                    plus.zip.compressImage({
                        src: imgPath,
                        dst: "_doc/chat/gallery//" + imgPath,
                        quality: 20,
                        overwrite: true,
                    }, function (e) {
                        // console.log('上传封面', e)
                        // 新建上传任务 图片
                        /*
                         */
                        var task = plus.uploader.createUpload("http://lanhaitun.zanhf.com/app/index.php?i=2&c=entry&do=UploadImg&m=wyt_luntan", {
                            method: "POST",
                        }, function (res) {
                            var posterUrl = 'http://lanhaitun.zanhf.com/' + JSON.parse(res.responseText).data.file_path
                            // console.log(posterUrl)
                            $("input[name='fengmian']").val(posterUrl)
                            $("#videoPoster .poster-img").attr('src', posterUrl)
                        });
                        task.addFile(e.target, {
                            key: "file"
                        });
                        task.start();
                    }, function (error) {
                        layer.msg('图片上传失败~')
                    });
                }
                root.uploadPoster = uploadPoster
                // 修改视频封面
                $('.set-poster').click(function () {
                    root.getPoster()
                })
                // 相机拍照
                function cameraImg() {
                    $('#upImg').show()
                    $('#upVideo').hide()
                    var cmr = plus.camera.getCamera();
                    var res = cmr.supportedImageResolutions[0];
                    var fmt = cmr.supportedImageFormats[0];
                    // console.log("Resolution: " + res + ", Format: " + fmt);
                    cmr.captureImage(function (path) {
                            // console.log("拍照成功：" + path);
                            root.uploadServerImg(path)
                        },
                        function (error) {
                            // alert( "Capture image failed: " + error.message );
                        }, {
                            resolution: res,
                            format: fmt
                        }
                    );
                }
                // 相机录像
                function cameraVideo() {
                    $('#upImg').hide()
                    $('#upVideo').show()
                    var cmr = plus.camera.getCamera();
                    var res = cmr.supportedVideoResolutions[0];
                    var fmt = cmr.supportedVideoFormats[0];
                    cmr.startVideoCapture(function (path) {
                            // console.log("录像成功：" + path);
                            root.uploadMyVideo(path)
                        },
                        function (error) {
                            // alert( "Capture video failed: " + error.message );
                        }, {
                            resolution: res,
                            format: fmt
                        }
                    );
                }
                // 开启相机 拍照+摄像选择
                root.showCamera()

                // 定位 引入dcloud重写h5原生定位文件 plusGeolocation.js
                // 扩展API加载完毕后调用onPlusReady回调函数 
                document.addEventListener('plusready', onPlusReadyLoc, false);

                // 扩展API加载完毕，现在可以正常调用扩展API
                function onPlusReadyLoc() {
                    navigator.geolocation.getCurrentPosition(function (p) {
                        // alert(JSON.stringify(p))
                        var loc = p.address.city + '·' + p.address.district + '·' + p.address.street + p.address.streetNum
                        $('.loc-text').text(loc)
                        $("input[name='address']").val(loc)
                    }, function (e) {
                        layer.msg('获取定位失败~');
                    });
                }
            }
        }

        root.newfatieEvent = newfatieEvent

        root.newfatieEvent()
        if (document.getElementById('indexWrap')) {
            // 通过缓存判断是否刷新页面
            // console.log(localStorage.getItem('ifReload'))
            if (localStorage.getItem('ifReload') == 'true') {
                window.location.reload()
                localStorage.setItem('ifReload', false)
            }
            // 首页 帖子列表
            // 管理员管理帖子
            // H5 plus事件处理
            function popChoice(obj) {
                // console.log(JSON.stringify(obj) )
                // return
                var thread_id = obj.thread_id
                var isLink = obj.isLink
                var zdStatus = 1
                var btnArr = null
                if (obj.isadmin == 'true') {
                    if (obj.iszhiding == "1") {
                        // 是管理员 此贴已经置顶了
                        zdStatus = 0
                        btnArr = [{
                            title: "取消置顶"
                        }, {
                            title: "删除"
                        }, {
                            title: "再编辑"
                        }]
                    } else {
                        // 是管理员 此贴未置顶
                        btnArr = [{
                            title: "置顶"
                        }, {
                            title: "删除"
                        }, {
                            title: "再编辑"
                        }]
                    }
                } else {
                    if (obj.isself == 'true') {
                        // 是否是自己的帖子
                        // 是自己的帖子
                        btnArr = [{
                            title: "再编辑"
                        }, {
                            title: "删除"
                        }]
                    }
                }

                // 弹出系统选择按钮框
                plus.nativeUI.actionSheet({
                    // title: "管理帖子",
                    cancel: "取消",
                    buttons: btnArr
                }, function (e) {
                    // console.log("弹出层" + e);
                    // layer.msg(JSON.stringify(e))
                    if (e.index != 0) {
                        var index = e.index - 1
                        var choice = btnArr[index].title
                        switch (choice) {
                            case "置顶":
                                // 置顶帖子
                                // 发送post请求 返回 zdstate  状态（1置顶，0取消置顶）
                                // console.log(333)
                                root.postSubmit({
                                    url: baseUrl + urlObj.zhiding,
                                    data: {
                                        thread_id: thread_id,
                                        zdstate: 1
                                    },
                                    source: 'zhiding',
                                })
                                break;
                            case "取消置顶":
                                // 置顶帖子
                                // 发送post请求 返回 zdstate  状态（1置顶，0取消置顶）
                                // console.log(333)
                                root.postSubmit({
                                    url: baseUrl + urlObj.zhiding,
                                    data: {
                                        thread_id: thread_id,
                                        zdstate: 0
                                    },
                                    source: 'zhiding',
                                })
                                break;
                            case "删除":
                                var confirmMsg = layer.confirm('确认删除吗？', {
                                    btn: ['确认', '取消'],
                                    title: '提示',
                                    closeBtn: 0,
                                }, function () {
                                    root.postSubmit({
                                        url: baseUrl + urlObj.deletTz,
                                        data: {
                                            thread_id: thread_id,
                                        },
                                        source: 'deletTz',
                                    })
                                }, function () {
                                    layer.close(confirmMsg)
                                    return false;
                                })
                                break;
                            case '再编辑':
                                window.location.href = 'http://lanhaitun.zanhf.com/app/index.php?i=2&c=entry&action=fatie&do=Index&m=wyt_luntan&thread_id=' + thread_id + '&isLink=' + isLink
                                break;
                        }
                    }
                });
            }

            // 调试模式 直接再编辑 帖子
            // $('.xiala').on('click', function () {
            //     // 获取到帖子的id
            //     var thread_id = $(this).parents('li').attr('threadid')

            //     window.location.href = 'http://lanhaitun.zanhf.com/app/index.php?i=2&c=entry&action=fatie&do=Index&m=wyt_luntan&thread_id=' + thread_id
            // })

            /**
             * 回到顶部
             */
            function scrollToTop(anchorId) {
                $(anchorId).on('click', function () {
                    var dis = $(window).scrollTop();
                    $('html,body').animate({
                        scrollTop: '0px'
                    }, 300);
                })
            }
            root.scrollToTop = scrollToTop
            root.scrollToTop('#goTop')
            // 刷新
            $('#refresh').click(function () {
                window.location.reload()
            })
            // // 切换帖子分类加载
            // $(".jiazai").click(function () {
            //     jiazai($(this).data('id'))
            // })

            // function jiazai(fenlei) {
            //     console.log(fenlei)
            //     cid = fenlei;
            //     page = 1;
            //     var str = ''
            //     var index = layer.load(1, {
            //         shade: [0.1, '#fff'] //0.1透明度的白色背景
            //     });
            //     $("#zhengwen").html(str);
            //     load_data(root.showAdmin);
            // }
            // 滚动加载帖子
            // $(window).scroll(function () {
            //     var srollPos = $(window).scrollTop(); //滚动条距顶部距离(页面超出窗口的高度)
            //     totalheight = parseFloat($(window).height()) + parseFloat(srollPos);
            //     if (($(document).height()) <= totalheight) {
            //         if (sroltop == 0) {
            //             //alert(totalheight);
            //             page += 1
            //             var index = layer.load(1, {
            //                 shade: [0.1, '#fff'] //0.1透明度的白色背景
            //             });
            //             load_data(root.showAdmin);
            //         }
            //     }
            // });
        } else if (document.getElementById('tieziInfo')) {
            // 获取帖子id
            var tid = root.getQueryString('id')

            // 相册传图片
            $('#upImg').click(function () {
                uploadOnePic()

                function uploadOnePic() {
                    plus.gallery.pick(function (path) {
                        // 提示等待
                        // alert(JSON.stringify(path))
                        // root.imgW = plus.nativeUI.showWaiting()
                        // root.uploadServerImg(e.files, true)
                        plus.zip.compressImage({
                            src: path,
                            dst: "_doc/chat/gallery//" + path,
                            quality: 20,
                            overwrite: true,
                        }, function (e) {
                            // layer.msg(JSON.stringify(e.target))
                            var task = plus.uploader.createUpload("http://lanhaitun.zanhf.com/app/index.php?i=2&c=entry&do=UploadImg&m=wyt_luntan", {
                                    method: "POST",
                                },
                                function (res) {
                                    var imgUrl = 'http://lanhaitun.zanhf.com/' + JSON.parse(res.responseText).data.file_path
                                    // $("input[name='images']").val(imgUrl)
                                    var html = `
                                        <img src="${imgUrl}">
                                        <input name="images" value='${imgUrl}' hidden>
                                        <span class="re-upload">重新上传</span> 
                                    `
                                    $('.formHf .bot-img').hide()
                                    $('.formHf .img-bx').append(html)
                                    // 改变回复窗口高度
                                    // $('.hf-mask').addClass('upImg')
                                }
                            );
                            task.addFile(e.target, {
                                key: "file"
                            });
                            task.start();
                        }, function (error) {
                            layer.msg('图片上传失败~')
                        });
                    }, function () {}, {
                        system: false
                    })
                }
            })
            // 帖子id
            // var tzId = $('#tieziInfo').attr('uid')
            // 打开消息弹窗 回复帖子
            $('#hfBtn').off().click(function () {
                $('#newHfBx').show()
                // 修改弹窗mask高度 样式控制
                // $('.hf-mask').removeClass('upImg').removeClass('hfhf')
                $('.new-huifu .bot-img').show()
                $('.new-huifu .img-bx').show()
                $('#newHfBx .new-huifu').slideToggle('fast')
                root.submitMsgTz({
                    type: 1,
                    url: baseUrl + urlObj.hfTzSend
                })
            })
            // 回复 评论
            $('.zihuifubtn').click(function () {
                $('#newHfBx').show()
                // $('.hf-mask').removeClass('upImg').addClass('hfhf')
                $('#newHfBx .new-huifu').slideToggle('fast')
                // 隐藏回复帖子的图片
                $('.new-huifu .bot-img').hide()
                $('.new-huifu .img-bx').hide()
                var data = {}
                // hname  昵称
                data.hname = $(this).attr('hname')
                // pid 评论id
                data.pid = $(this).attr('pid')
                root.submitMsgTz({
                    type: 2,
                    url: baseUrl + urlObj.hfHfSend,
                    data: data
                })

            })

            // 回复 子评论
            $('.hfzhfbtn').click(function () {
                $('#newHfBx').show()
                // $('.hf-mask').removeClass('upImg').addClass('hfhf')
                $('#newHfBx .new-huifu').slideToggle('fast')
                // 隐藏回复帖子的图片
                $('.new-huifu .bot-img').hide()
                $('.new-huifu .img-bx').hide()
                var data = {}
                // hname  昵称
                data.hname = $(this).attr('hname')
                // pid 评论id
                data.pid = $(this).attr('pid')
                // hid 子评论的id
                data.hid = $(this).attr('hid')
                root.submitMsgTz({
                    type: 3,
                    url: baseUrl + urlObj.hfzhfSend,
                    data: data
                })
            })

            // 取消回复弹窗
            $('.hf-mask').off().click(function (e) {
                $('#newHfBx .new-huifu').slideToggle('fast')
                $('#newHfBx').hide()
                e.preventDefault()
                return false;
            })
            $('#newHfBx .cancle').off().click(function (e) {
                $('#newHfBx .new-huifu').slideToggle('fast')
                $('#newHfBx').hide()
                e.preventDefault()
                return false;
            })
            // 提交回复
            /**
             * @param {type} obj 回复类型 1回复帖子2回复评论3回复子评论
             * @param {url} obj 三个地址
             */
            function submitMsgTz(obj) {
                var type = obj.type
                var url = obj.url
                var newData = obj.data
                layui.use('form', function () {
                    var form = layui.form;
                    //各种基于事件的操作，下面会有进一步介绍
                    form.on('submit(formHfBtn)', function (data) {
                        var hfData = {}
                        hfData = data.field
                        // 帖子id
                        hfData.tid = tid
                        if (type != 1) {
                            // 回复评论获取的参数 
                            hfData = Object.assign(newData, hfData)
                        }
                        // 空
                        if (!hfData.info && !hfData.images) {
                            layer.msg('请填写回复内容')
                            return false
                        }
                        // 只有图片
                        if (!hfData.info && hfData.images) {
                            hfData.info = '图片回复'
                        }
                        console.log(JSON.stringify(hfData))
                        root.postSubmit({
                            url: url,
                            data: hfData,
                            source: 'hfTzSend',
                        })

                        return false
                    });
                });
            }

            root.submitMsgTz = submitMsgTz

        }

        // 直播页面
        if (document.getElementById('videoMode')) {
            $('.TAstate li').click(function () {
                $('.TAstate li').toggleClass('currentli')
                if ($(this).index() === 0) {
                    $('.chat-bx').show()
                    $('#showList').hide()
                } else {
                    $('.chat-bx').hide()
                    $('#showList').show()
                    var zhiboList = document.getElementById('showList')
                    // 要滚动的高度
                    zhiboList.scrollTop = ($('.zhibo-bx').position().top) - 353
                }
            })
            // 直播聊天和节目列表切换
            function plusReady() {
                // root.radioWait = plus.nativeUI.showWaiting("加载中...");
                var src = 'http://live.xmcdn.com/live/2485/64.m3u8?transcode=ts'
                if (!root.radioPlayer) {
                    root.radioPlayer = new plus.video.VideoPlayer('myVideo', {
                        src: src,
                    });
                }
                // 播放
                $('.play-img').off().click(function () {
                    $(this).hide()
                    $('.pause-img').show()
                    root.radioPlayer.play()
                })
                // 暂停
                $('.pause-img').off().click(function () {
                    $(this).hide()
                    $('.play-img').show()
                    root.radioPlayer.pause()
                })

                // setInterval(() => {
                //     root.radioWait.close()
                // }, 500);
                $('.my-nav').click(function () {
                    root.radioPlayer.stop()
                })

            }
            document.addEventListener('plusready', plusReady, false);
            // 聊天获取，滚动加载
            setTimeout(() => {
                // 滚动到最底部
                var my_scroll = document.getElementsByClassName('chat_title')[0]
                my_scroll.scrollTop = 20000000
                // 获取rid
                var timer = setInterval(() => {
                    // 获取rid
                    var rid = root.getQueryString('rid')
                    // 获取最后一条留言时间
                    var lastTime = $('.chat_title li:last .char_name span').text()
                    // 请求最新留言 发送最近留言时间
                    var huifuUrl = "/app/index.php?i=2&c=entry&m=wxz_wzb&do=GetComment"
                    var huifuData = {
                        rid: rid,
                        last_time: lastTime
                    }
                    $.ajax({
                        url: huifuUrl,
                        type: 'POST',
                        data: huifuData,
                        dataType: 'JSON',
                        success(res) {
                            var newData = res.data
                            // console.log(res)
                            if (newData) {
                                // 清除定时器
                                var htmlLt = ''
                                newData.forEach(item => {
                                    if (item.ispic == 0) {
                                        // 如果是图片评论
                                        htmlLt += `
                                        <li data-id=${item.id}>
                                        <div class="chat_left">
                                            <div class="head_portrait">
                                            <img src="${item.headimgurl}">
                                            </div>
                                            </div>
                                            <div class="chat_right">
                                            <div class="char_name">${item.nickname}
                                            <span style="display:block;color:gray;font-size:12px;">${item.time}</span>
                                            </div>
                                            <div class="char_message">${item.content}
                                            </div>
                                        </div>
                                        </li>`
                                    } else {
                                        // 非图片评论
                                        htmlLt += `
                                        <li data-id=${item.id}>
                                        <div class="chat_left">
                                            <div class="head_portrait">
                                            <img src="${item.headimgurl}">
                                            </div>
                                            </div>
                                            <div class="chat_right">
                                            <div class="char_name">${item.nickname}
                                            <span style="display:block;color:gray;font-size:12px;">${item.time}</span>
                                            </div>
                                            <div class="char_message">
                                            <img src="${item.content}" style="CURSOR: hand" id="215" bigimgurl="http://lanhaitun.zanhf.com/attachment/images/2/2019/03/X3AgFggxqy0vU3vLQrzLZ0Ax6VVrqF.jpg" onclick="imageClick(this)">
                                            <div class="send">
                                            </div>
                                            </div>
                                        </div>
                                        </li>`
                                    }
                                });
                                $('.chat_title').append(htmlLt)
                                setTimeout(() => {
                                    my_scroll.scrollTop = 2000000000
                                }, 200);
                            } else {
                                return
                            }
                        },
                        error(res) {
                            clearInterval(timer)
                            layer.msg("链接超时，重新刷新尝试！")
                        }
                    })
                }, 1000);
                setTimeout(() => {
                    $('.chat_title').css('opacity', "1")
                }, 1000);
            }, 100);
            // 点赞数增加
            $('.zan-box').click(function () {
                var curNum = Number($(this).find('.zan-num').text()) + 1
                $(this).find('.zan-num').text(curNum)
            })

            // 回听功能
            // http://live.xmcdn.com/history/2485/24.m3u8?start=1553616000000&end=1553623200000&transcode=ts
            $('.pass').click(function () {
                var $self = $(this)
                var startTime = $self.attr('start')
                var endTime = $self.attr('end')
                $('.zhibo-bx').removeClass('zhibo-bx')
                $self.addClass('zhibo-bx')

                var reListenSrc = 'http://live.xmcdn.com/history/2485/24.m3u8?start=' + startTime + "&end=" + endTime + "&transcode=ts"
                if (root.radioPlayer) {
                    root.radioPlayer.setStyles({
                        src: reListenSrc
                    })
                    $('.play-img').hide()
                    $('.pause-img').show()
                    root.radioPlayer.play()
                }
            })
            // 回到直播
            $('.current-jiemu').click(function () {
                $('.zhibo-bx').removeClass('zhibo-bx')
                $(this).addClass('zhibo-bx')
                var curSrc = 'http://live.xmcdn.com/live/2485/64.m3u8?transcode=ts'
                if (root.radioPlayer) {
                    root.radioPlayer.setStyles({
                        src: curSrc
                    })
                    $('.play-img').hide()
                    $('.pause-img').show()
                    root.radioPlayer.play()
                }
            })

            // 直播发送图片
            $('#chatImgUpload').click(function () {
                $(".showfunction").hide();

                function uploadOnePic() {
                    plus.gallery.pick(function (path) {
                        // 提示等待
                        // alert(JSON.stringify(path))
                        // root.imgW = plus.nativeUI.showWaiting()
                        // root.uploadServerImg(e.files, true)
                        plus.zip.compressImage({
                            src: path,
                            dst: "_doc/chat/gallery//" + path,
                            quality: 20,
                            overwrite: true,
                        }, function (e) {
                            // layer.msg(JSON.stringify(e.target))
                            var task = plus.uploader.createUpload("http://lanhaitun.zanhf.com/app/index.php?i=2&c=entry&do=UploadImg&m=wyt_luntan", {
                                    method: "POST",
                                },
                                function (res) {
                                    var imgUrl = 'http://lanhaitun.zanhf.com/' + JSON.parse(res.responseText).data.file_path
                                    root.postSubmit({
                                        url: baseUrl + urlObj.sentTzChat,
                                        data: {
                                            ispic: 1,
                                            content: imgUrl
                                        },
                                        source: 'sentTzChat'
                                    })
                                }
                            );
                            task.addFile(e.target, {
                                key: "file"
                            });
                            task.start();
                        }, function (error) {
                            layer.msg('图片上传失败~')
                        });
                    }, function () {}, {
                        system: false
                    })
                }
                uploadOnePic()
            })
            // 刷新页面
            $('#refreshBtnmy').click(function () {
                root.radioPlayer.stop()
                window.location.reload()
            })
        }

        // 新首页
        if (document.getElementById('newListShow')) {
            /**
             * 回到顶部
             */
            function scrollToTop(anchorId) {
                $(anchorId).on('click', function () {
                    var dis = $(window).scrollTop();
                    $('html,body').animate({
                        scrollTop: '0px'
                    }, 300);
                })
            }
            root.scrollToTop = scrollToTop
            root.scrollToTop('#goTop')
            // 刷新
            $('#refresh').click(function () {
                window.location.reload()
            })
            // 实例 轮播
            var swiper = new Swiper('.swiper-container', {
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            });

            if (document.getElementsByClassName('my-newindex')[0]) { // 我的帖子引用主页帖子列表
                /**
                 * 流加载
                 * url 请求地址
                 * elem 指定容器 #id
                 * fenlei 请求分类
                 * load_style （index首页 mine我的帖子 part我参与的 collection收藏）
                 * sou 搜索关键字
                 */
                root.showListFlow(mainurl, {
                    elem: "#tieziList",
                    fenlei: '',
                    load_style: 'mine',
                    sou: ''
                })

                // 分类切换
                $('.tag-bx .tag-item').click(function () {
                    $('.tag-bx .active').removeClass('active')
                    $(this).addClass('active')
                    var textCon = $.trim($(this).text()) // 获取标签
                    if (textCon == "全 部") {
                        textCon = ''
                    }
                    root.showListFlow(mainurl, {
                        elem: "#tieziList",
                        fenlei: textCon,
                        load_style: 'mine',
                    })
                })

            } else if (document.getElementsByClassName(' my-newpartake')[0]) { // 我参与的帖子
                root.showListFlow(mainurl, {
                    elem: "#tieziList",
                    fenlei: '',
                    load_style: 'part',
                    sou: ''
                })

                // 分类切换
                $('.tag-bx .tag-item').click(function () {
                    $('.tag-bx .active').removeClass('active')
                    $(this).addClass('active')
                    var textCon = $.trim($(this).text()) // 获取标签
                    if (textCon == "全 部") {
                        textCon = ''
                    }
                    root.showListFlow(mainurl, {
                        elem: "#tieziList",
                        fenlei: textCon,
                        load_style: 'part',
                    })
                })

            } else { // 首页帖子列表分页加载
                root.showListFlow(mainurl, {
                    elem: "#tieziList",
                    fenlei: '',
                    load_style: 'index',
                    sou: ''
                })

                // 分类切换
                $('.tag-bx .tag-item').click(function () {
                    $('.tag-bx .active').removeClass('active')
                    $(this).addClass('active')
                    var textCon = $.trim($(this).text()) // 获取标签
                    if (textCon == "全 部") {
                        textCon = ''
                    }
                    root.showListFlow(mainurl, {
                        elem: "#tieziList",
                        fenlei: textCon,
                    })
                })
            }

            // 搜索
            $('.search-item input').on('focus', function () {
                $(this).on('input', function () {
                    // 实时获取val值
                    var self = $(this)
                    var sou = self.val()
                    if (root.serTimer) {
                        clearTimeout(root.serTimer)
                    }
                    root.serTimer = setTimeout(() => {
                        if (sou) {
                            root.showListFlow(mainurl, {
                                elem: "#tieziList",
                                sou: sou,
                            })
                        }
                    }, 1500);
                    return false
                })
            })
        }

    }(window.$, window.myLib || (window.myLib = {})));
}())
// }