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
            deletTz: 'index.php?i=2&c=entry&do=index&m=wyt_luntan&action=delete_thread', // 删除帖子
        };

        /****************************************************************************** */
        /**
         * 初始化
         * init.js
         */
        (function ($, root) {
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
                console.log(root.videoPlayer)
                console.log(333, videoSrc)
                if (!root.videoPlayer) {
                    $('#video2').show()
                    console.log(4444)
                    function creatVideo() {
                        root.videoPlayer = new plus.video.VideoPlayer('video2', {
                            src: videoSrc,
                            direction: '',
                        });
                        $('#video2').hide()
                        root.videoPlayer.hide()
                        console.log(2222)
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
                        document.addEventListener('plusready', creatVideo, false);
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
                    $('#upImg').show()
                    root.showCamera()
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
                root.countTime = 3
                var countTime = root.countTime
                // 判断图形验证码验证后返回值
                // 开启倒计时

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
                                root.navToHome()
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
                            // console.log(JSON.stringify(res))
                            var data = res.data
                            var form = layui.form;
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
            } else if (document.getElementById('regitser')) {
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
                $('#regitser .tiaokuan-link').click(function () {
                    $('#registerText').show()
                    $('#regitser').hide()
                })
                $('#registerText .close-btn').click(function () {
                    $('#registerText').hide()
                    $('#regitser').show()
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
            } else if (document.getElementById('showList')) {
                $('.TAstate li').toggleClass('.currentli ').click(function () {
                    if ($(this).index() === 0) {
                        $('.chat-bx').show()
                        $('#showList').hide()
                    } else {
                        $('.chat-bx').hide()
                        $('#showList').show()
                    }
                })
            } else if (document.getElementById('userCenter')) {
                // 添加好友
                root.addFriendCenter()
            } else if (document.getElementById('newFatie')) {
                // 判断是否是再编辑的帖子
                if (root.getQueryString('thread_id')) {
                    // 展示取消按钮
                    $('.cancle-btn').show().click(function () {
                        var confirmMsg = layer.confirm('确认取消编辑吗？', {
                            btn: ['确认', '取消'],
                            title: '提示',
                            closeBtn: 0,
                        }, function () {
                            window.location.href = baseUrl + 'index.php?i=2&c=entry&do=index&m=wyt_luntan'
                        }, function () {
                            layer.close(confirmMsg)
                            return false;
                        })
                        return false;
                    })

                    var thread_id = root.getQueryString('thread_id')
                    root.postSubmit({
                        url: baseUrl + urlObj.reEditorGet,
                        data: {
                            thread_id: thread_id,
                        },
                        source: 'reEditorGet',
                    })
                }

                // 新 发帖样式
                var textInput = document.getElementById('textarea')
                root.autoTextarea(textInput)

                // 帖子提交 验证事件
                layui.use('form', function () {
                    var form = layui.form;

                    //监听提交
                    form.on('submit(fatieFormSub)', function (data) {
                        // layer.msg(JSON.stringify(data.field));
                        var myData = data.field
                        // 全部为空 提示
                        if (!myData.video && !myData.img && !myData.title && !myData.info) {
                            layer.msg('发送失败~帖子为空')
                            return false;
                        } else {

                            if (myData.title && !myData.video && !myData.img && !myData.info) {
                                // 只有标题 没有内容
                                layer.msg('发送失败~暂无内容')
                                return false;
                            } else if (myData.img && !myData.title && !myData.info) {
                                // 分享图片
                                myData.title = '分享图片'
                            } else if (myData.video && !myData.title && !myData.info) {
                                // 分享视频
                                myData.title = '分享视频'
                            }
                            // console.log(JSON.stringify(myData), root.getQueryString('thread_id'))
                            // alert(JSON.stringify(myData))
                            if (!root.getQueryString('thread_id')) {
                                // 发新的帖子 提交后台
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
                        return false;
                    });
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
                            // console.log(num, len);
                            uploadServerImg(e.files[i], lastone)
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
                            // console.log(imgUrl)
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
                        // 关闭图片上传 相机只能录像
                        $('#upImg').hide()
                        root.showCamera('video')
                        // 关闭等待
                        w.close()
                        var videoSrc = (res.responseText)
                        //  赋值给input
                        $("input[name='video']").val(videoSrc)
                        // 展示视频封面
                        root.showfsVideo(videoSrc, 'newfatie')
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
                        } else if (keyword == 'photo') {
                            cameraImg()
                        } else if (keyword == 'video') {
                            cameraVideo()
                        }
                    })

                }
                root.showCamera = showCamera
                // 开启相机 拍照+摄像选择
                root.showCamera()

                // 定位
                // 扩展API加载完毕后调用onPlusReady回调函数 
                document.addEventListener('plusready', onPlusReady, 0);
                // 扩展API加载完毕，现在可以正常调用扩展API
                function onPlusReady() {
                    navigator.geolocation.getCurrentPosition(function (p) {
                        // alert(JSON.stringify(p))
                        var loc = p.address.city + '·' + p.address.district + '·' + p.address.street + p.address.streetNum
                        $('.loc-text').text(loc)
                        $("input[name='address']").val(loc)
                    }, function (e) {
                        layer.msg('获取定位失败~');
                    });
                }
            } else if (document.getElementById('indexWrap')) {
                // 通过缓存判断是否刷新页面
                console.log(localStorage.getItem('ifReload'))
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
                                    window.location.href = 'http://lanhaitun.zanhf.com/app/index.php?i=2&c=entry&action=fatie&do=Index&m=wyt_luntan&thread_id=' + thread_id
                                    break;
                            }
                        }

                    });
                }

                function showAdmin() {
                    $('.xiala').off()
                    $('.xiala').on('click', function () {
                        // 是否是管理员
                        var isadmin = $(this).parents('ul').attr('isadmin')
                        // 是否是自己的帖子
                        var isself = $(this).parents('li').attr('isself')
                        // layer.msg(isadmin + isself)
                        // 获取到帖子的id
                        var thread_id = $(this).parents('li').attr('threadid')
                        // 帖子置顶状态
                        var iszhiding = $(this).parents('li').attr('iszhiding')
                        document.addEventListener("plusready", popChoice({
                            isadmin: isadmin,
                            isself: isself,
                            thread_id: thread_id,
                            iszhiding: iszhiding
                        }), false);
                    })
                }

                root.showAdmin = showAdmin
                root.showAdmin()

                // 调试模式 直接再编辑 帖子
                // $('.xiala').on('click', function () {
                //     // 获取到帖子的id
                //     var thread_id = $(this).parents('li').attr('threadid')

                //     window.location.href = 'http://lanhaitun.zanhf.com/app/index.php?i=2&c=entry&action=fatie&do=Index&m=wyt_luntan&thread_id=' + thread_id
                // })

                // 置顶 
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
                // 切换帖子分类加载
                $(".jiazai").click(function () {
                    jiazai($(this).data('id'))
                })

                function jiazai(fenlei) {
                    console.log(fenlei)
                    cid = fenlei;
                    page = 1;
                    var str = ''
                    var index = layer.load(1, {
                        shade: [0.1, '#fff'] //0.1透明度的白色背景
                    });
                    $("#zhengwen").html(str);
                    load_data(root.showAdmin);
                }
                // 滚动加载帖子
                $(window).scroll(function () {
                    var srollPos = $(window).scrollTop(); //滚动条距顶部距离(页面超出窗口的高度)
                    totalheight = parseFloat($(window).height()) + parseFloat(srollPos);
                    if (($(document).height()) <= totalheight) {
                        if (sroltop == 0) {
                            //alert(totalheight);
                            page += 1
                            var index = layer.load(1, {
                                shade: [0.1, '#fff'] //0.1透明度的白色背景
                            });
                            load_data(root.showAdmin);
                        }
                    }
                });
            }

            // 直播页面
            if (document.getElementById('videoMode')) {
                // 直播聊天和节目列表切换
                var videoEle = document.querySelector("#myVideo");
                $('.play-img').click(function () {
                    $(this).hide()
                    $('.pause-img').show()
                    videoEle.play()
                })
                $('.pause-img').click(function () {
                    $(this).hide()
                    $('.play-img').show()
                    videoEle.pause()
                })

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

                }, 100);
                // 点赞数增加
                $('.zan-box').click(function () {
                    var curNum = Number($(this).find('.zan-num').text()) + 1
                    $(this).find('.zan-num').text(curNum)
                })

                // 重新编辑

            }

        }(window.$, window.myLib || (window.myLib = {})));
    }())
// }