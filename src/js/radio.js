(function ($, root) {
    /**
     * 全局数据
     * data.js
     */
    var baseUrl = 'http://lanhaitun.kachezhisheng.com/app/'
    var urlObj = {
        sentTzChat: 'index.php?i=2&c=entry&rid=9&do=addcomment&m=wxz_wzb', // 发送直播评论接口
        getNewMsg: "/index.php?i=2&c=entry&m=wxz_wzb&do=GetComment", // 获取最新弹幕 rid（url） 最后一条的时间 lastTime
        delComment: "/index.php?i=2&c=entry&m=wxz_wzb&do=GetComment&action=delete_comment", // 删除弹幕接口
        jinyan: "/index.php?i=2&c=entry&m=wxz_wzb&do=Isshutup", // 禁言接口
        lastMsg: "/index.php?i=2&c=entry&m=wxz_wzb&do=LastComment", // 最后一条信息 请求参 last_time
    }
    // 跳转回登陆页面
    let navToLogin = () => {
        setTimeout(() => {
            window.location.href = baseUrl + 'index.php?i=2&c=entry&do=login&m=wyt_luntan&action=login'
        }, 1000);
    }

    root.navToLogin = navToLogin

    function getNewMsg() {
        // 定时获取最新
        // 获取rid
        var num = 0
        root.timer = setInterval(() => {
            // 获取rid
            var rid = root.getQueryString('rid')
            // 获取最后一条留言时间
            var lastTime = $('#chatBx li:last').attr('data-line')

            // 请求最新留言 发送最近留言时间
            var huifuUrl = baseUrl + urlObj.lastMsg
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
                    root.renderPageList(res, {
                        islastnew: true
                    })
                    // clearInterval(timer)
                },
                error(res) {
                    // clearInterval(timer)
                    // layer.msg("没有新的消息")
                }
            })
            // num ++;
            // if (num > 4) {
            //     clearInterval(timer)
            // }
        }, 1000);
    }

    root.getNewMsg = getNewMsg

    // 渲染获取到的聊天记录
    function renderPageList(dataArr, obj) {
        // root.getQueryString('rid')
        // 是否是管理员 string true false
        var isadmin = dataArr.isadmin
        var data = dataArr.data.reverse() // 倒置数组
        if (obj && obj.islastnew) {
            // 如果是最新一条 正序
            data = data.reverse()
        }
        var ispic // string 1是图片 0 不是
        var topHtml
        var contentHtml
        var html = ``
        var adminHtml
        var isshutup // 是否禁言 string false true(被禁言)
        // 渲染列表
        data.forEach(item => {
            // 管理员
            if (isadmin == 'true') {
                isshutup = item.isshutup
                // if(1){
                if (isshutup == 'false') { // 未被禁言
                    adminHtml = `
                    <span class="banuser layui-btn-warm">
                    禁言
                    </span> 
                    <span class="letout layui-btn-normal" style="display:none;">
                    解除禁言
                    </span>
                    <span class="clearwords layui-btn-danger">
                            删除
                    </span>
                    `
                } else {
                    adminHtml = `
                    <span class="letout layui-btn-normal">
                    解除禁言
                    </span>
                    <span class="banuser layui-btn-warm" style="display:none;">
                    禁言
                    </span> 
                    <span class="clearwords layui-btn-danger">
                            删除
                    </span>
                    `
                }
            } else {
                adminHtml = ''
            }
            // 头
            topHtml = `
            <div class="top">
            <div class="item-left">
                    <a href="http://lanhaitun.kachezhisheng.com/app/index.php?i=2&c=entry&action=other&do=Index&m=wyt_luntan&uid=${item.uid}">
                            <img class="tx" src="${item.headimgurl}">
                            <div class="right">
                                    <div>${item.nickname}</div>
                                    <div class="time">${item.time}</div>
                            </div>
                    </a>
                </div>
                        <div class="item-right">
                            ${adminHtml}
                        </div>
                </div>
            `
            // 一张图片图片
            ispic = item.ispic
            if (ispic == '1') {
                contentHtml = `
                 <div class="item-con">
                    <div class="imgs" id="slider">
                    <img class="img-item" src="${item.content}">
                </div>
                </div>

                `
            } else {
                // 文本+表情

                item.content.split('[')
                var locText = item.content.replace(/\[([^\[\]]+)\]/g, '<img src="$1.png">')
                contentHtml = `
                          <div class="item-con text-con">
                        <div class="words">${item.content}</div>
                        </div>
                    `
            }


            html += `
            <li class="chat-item" id="${item.id}" data-line=${item.dateline} data-uid="${item.uid}">
                ${topHtml}
                ${contentHtml}
            </li>
            `
        });
        if (obj && obj.islastnew) {
            // 如果是最新一条 正序
            $('.text-ts').remove()
            $('#chatBx').append(html)
            // 滚动回底部
            var scrollHeightPx = $('#myselfZb').height() + 20000000 + 'px'
            $('#myselfZb').animate({
                scrollTop: '99999999999px',
            }, 0)
        } else if (obj && obj.getPages) {
            // 如果是分页 
            $('#chatBx').prepend(html)

        } else {
            // 首次获取第一页
            $('.text-ts').before(html)
        }

        // 检测获取分页
        $('#myselfZb').off().scroll(function () {
            var _self = $(this)
            var scrolltop = _self.scrollTop()
            if (scrolltop < 600) {
                var index = layer.load(4, {
                    shade: [0.4, "#000"]
                });
                setTimeout(() => {
                    layer.close(index)
                }, 1000);
                // 获取分页的弹幕信息 第一页
                // 获取rid
                $(this).off()
                root.rid = root.getQueryString('rid')
                root.page = ++root.page
                root.postSubmit({
                    url: baseUrl + urlObj.getNewMsg,
                    data: {
                        page: root.page,
                        rid: root.rid
                    },
                    source: 'getPages'
                })
            }
            var scrollTop = (_self.scrollTop())
        })
        // 滚动到底 聊天区
        if (root.page == 1) {
            var scrollHeightPx = $('#myselfZb').height() + 200000 + 'px'
            $('#myselfZb').animate({
                scrollTop: scrollHeightPx,
            }, 0)
        } else {
            // 清除定时器
            clearInterval(root.timer)
            // 重新开启获取
            root.getNewMsg()
        }

        // 删除帖子事件
        $('.chat-item').each(function () {
            $(this).find('.clearwords ').off().click(function () {
                var id = $(this).parents('li').attr('id')
                var elem = $(this).parents('li')

                var confirmMsg = layer.confirm('确认删除吗？', {
                    btn: ['确认', '取消'],
                    title: '提示',
                    closeBtn: 0,
                }, function () {
                    root.postSubmit({
                        url: baseUrl + urlObj.delComment,
                        data: {
                            id: id,
                            rid: root.rid,
                        },
                        source: 'delComment',
                        elem: elem
                    })
                    layer.close(confirmMsg)
                }, function () {
                    layer.close(confirmMsg)
                    return false;
                })
            })
        })

        // 禁言
        $('.chat-item').each(function () {
            var _self = $(this)
            $(this).find('.banuser').off().click(function () {
                // var id = $(this).parents('li').attr('id')
                var uid = _self.attr('data-uid')
                var confirmMsg = layer.confirm('确定要禁言此用户吗？', {
                    btn: ['确认', '取消'],
                    title: '提示',
                    closeBtn: 0,
                }, function () {
                    root.postSubmit({
                        url: baseUrl + urlObj.jinyan,
                        data: {
                            uid: uid,
                            rid: root.rid,
                            isshutup: "1",
                        },
                        elem: _self,
                        source: 'jinyan'
                    })
                    layer.close(confirmMsg)
                }, function () {
                    layer.close(confirmMsg)
                    return false;
                })
            })
        })

        // 解除禁言

        $('.chat-item').each(function () {
            var _self = $(this)
            $(this).find('.letout').off().click(function () {
                var uid = _self.attr('data-uid')
                root.postSubmit({
                    url: baseUrl + urlObj.jinyan,
                    data: {
                        uid: uid,
                        rid: root.rid,
                        isshutup: "0",
                    },
                    elem: _self,
                    source: 'jinyan'
                })
            })
        })
    }
    root.renderPageList = renderPageList

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

    // 获取地址栏参数
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    root.getQueryString = getQueryString

    function postSubmit(obj) {
        $.ajax({
            url: obj.url,
            data: obj.data,
            dataType: 'JSON',
            type: 'POST',
            success: function (res) {
                if (obj.source === 'sentTzChat') { // 直播 提交图片请求
                    if (res.msg === '未登录') {
                        // 未登录去登陆
                        layer.msg(res.msg)
                        root.navToLogin()
                    } else {
                        $('#zbtextarea').val('')
                    }

                    if (res.s == '-2') {
                        layer.msg(res.msg)
                    }
                    // layer.msg(res.msg)

                    return false
                } else if (obj.source == 'getlistpage') {
                    // console.log(JSON.stringify(res))
                    if (res.code == 1) {
                        // 成功
                        root.renderPageList(res)
                    } else {
                        layer.msg(res.msg)
                    }

                } else if (obj.source == 'delComment') {
                    if (res.code == 1) {
                        layer.msg('删除成功！')
                        $(obj.elem).remove()
                    } else {
                        layer.msg('删除失败~')
                    }

                } else if (obj.source == 'jinyan') {
                    $('#chatBx li').each(function () {
                        var uid = $(this).attr('data-uid')
                        if (uid == obj.data.uid) {
                            var _self = $(this)
                            if (res.code == 1) {
                                if (obj.data.isshutup == "1") { // 禁言成功
                                    _self.find('.letout').show()
                                    _self.find('.banuser').hide()
                                } else { // 解除禁言成功
                                    _self.find('.letout').hide()
                                    _self.find('.banuser').show()
                                }
                            }
                        }
                    })

                }
                if (obj.source == 'getPages') {
                    // console.log(JSON.stringify(res))
                    if (res.code == 1) {
                        // 成功
                        root.renderPageList(res, {
                            getPages: true
                        })
                    } else {
                        layer.msg('到顶了~')
                    }

                }
            }
        })
    }

    root.postSubmit = postSubmit

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
        // document.addEventListener('plusready', showPlus, false);
        // function showPlus() {
        //     console.log("plus~~~~~~~~~")
        // }
        function plusReady() {
            // root.radioWait = plus.nativeUI.showWaiting("加载中...");
            var src = 'http://live.xmcdn.com/live/2485/64.m3u8?transcode=ts'
            var audio = document.getElementById('audio');
            root.radioPlayer = audio
            // 播放
            $('.play-img').off().click(function () {
                console.log(1223)
                $(this).hide()
                $('.pause-img').show()
                root.radioPlayer.play()
            })
            // 暂停
            $('.pause-img').off().click(function () {
                $(this).hide()
                $('.play-img').show()
                root.radioPlayer.pause(function (e) {
                    console.log(JSON.stringify(e))
                })
            })

            // setInterval(() => {
            //     root.radioWait.close()
            // }, 500);
            $('.my-nav').click(function () {
                root.radioPlayer.stop()
            })

            // if (!root.radioPlayer) {
            //     root.radioPlayer = new plus.video.VideoPlayer('myVideo', {
            //         src: src,
            //         direction: '',
            //     });
            // }
            // setTimeout(function () {
            //     window.radioPlayer = root.radioPlayer
            //      console.log(JSON.stringify(root.radioPlayer))
            //     // 播放
            //     $('.play-img').off().click(function () {
            //         console.log(1223)
            //         $(this).hide()
            //         $('.pause-img').show()
            //         root.radioPlayer.play()
            //     })
            //     // 暂停
            //     $('.pause-img').off().click(function () {
            //         $(this).hide()
            //         $('.play-img').show()
            //         root.radioPlayer.pause(function (e) {
            //             console.log(JSON.stringify(e))
            //         })
            //     })

            //     // setInterval(() => {
            //     //     root.radioWait.close()
            //     // }, 500);
            //     $('.my-nav').click(function () {
            //         root.radioPlayer.stop()
            //     })
            // }, 1000)

            // 刷新页面
            $('#refresh').click(function () {
                window.location.reload()
            })

        }
        document.addEventListener('plusready', plusReady, false);
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
                // root.radioPlayer.setStyles({
                //     src: reListenSrc
                // })
                root.radioPlayer.setAttribute('src', reListenSrc)
                $('.play-img').hide()
                $('.pause-img').show()
                root.radioPlayer.play()
                var title = $self.find('.left .title').text()
                $('.video-bx .video-title').text(title)
                $('#videoMode .video-zhibo').text('回听中')
            }
        })
        // 回到直播
        $('.current-jiemu').click(function () {
            $('.zhibo-bx').removeClass('zhibo-bx')
            $(this).addClass('zhibo-bx')
            var $self = $(this)
            var curSrc = 'http://live.xmcdn.com/live/2485/64.m3u8?transcode=ts'
            if (root.radioPlayer) {
                // root.radioPlayer.setStyles({
                //     src: curSrc
                // })
                root.radioPlayer.setAttribute('src', curSrc)
                $('.play-img').hide()
                $('.pause-img').show()
                root.radioPlayer.play()
                var title = $self.find('.left .title').text()
                $('.video-bx .video-title').text(title)
                $('#videoMode .video-zhibo').text('直播中')
            }
        })

        // 直播发送图片
        $('#chatImgUpload').click(function () {
            // $(".showfunction").hide();
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
                        var task = plus.uploader.createUpload("http://lanhaitun.kachezhisheng.com/app/index.php?i=2&c=entry&do=UploadImg&m=wyt_luntan", {
                                method: "POST",
                            },
                            function (res) {
                                var imgUrl = 'http://lanhaitun.kachezhisheng.com/' + JSON.parse(res.responseText).data.file_path
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
                        $('.show-fs').show()
                        $('.control-pn').hide()
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
            alert('刷新？')
            root.radioPlayer.stop()
            $('.play-img').show()
            root.radioPlayer.pause()
            window.location.reload()
        })
    }

    if (document.getElementById('myselfZb')) {
        // 表情包操作 + 发帖
        function BqAction() {
            this.toggleBqBx = function (e) { //展开收起表情
                var clickElem = e.clickElem // 点击按钮id '.class'
                var jianpanELem = e.jianpanElem
                var pnElem = e.pnElem // 表情包pn ".class"
                var texarea = e.texarea
                var scrollTop = $(window).scrollTop()
                var scrollHeight = $(document).height() + 'px'
                var windowHeight = $(window).height()
                $('.show-fs').click(function () { // 展示发帖输入框
                    $('.zb-wrap').off().click(function () { // 关闭表情
                        var _self = $(this)
                        $(pnElem).slideUp('fast', function () {
                            $(jianpanELem).hide()
                            $(clickElem).show()
                            $('.show-fs').show()
                            // $('.control-pn').hide()
                            // $("#dian").hide()
                        })
                        $('.control-pn').hide()
                        _self.off()
                        // $(texarea).focus()
                    })
                    var winHeight = $(window).height(); //获取当前页面高度
                    $(window).resize(function () {
                        var thisHeight = $(this).height();
                        if (winHeight - thisHeight > 50) {
                            //当软键盘弹出，在这里面操作
                            $("#dian").hide() // 底部导航栏
                            $('.control-pn').css('bottom', '0')
                        } else {
                            //当软键盘收起，在此处操作
                            $("#dian").show() // 底部导航栏
                            $('.control-pn').css('bottom', '48px')
                        }
                    });

                    var newTextarea = document.getElementById('zbtextarea')
                    root.autoTextarea(newTextarea)
                    $(this).hide()
                    $('.control-pn').show()
                    $(clickElem).off().click(function (e) { // 展开表情
                        var _self = $(this)
                        $(pnElem).slideDown('fast', function () {
                            // $('html,body').animate({
                            //         scrollTop: scrollHeight
                            // }, 600)
                            _self.hide()
                            $(jianpanELem).show()

                            // 表情赋值给输入框
                            $('.browlist li').off().click(function () {
                                var biaoqing = $(this).find('img').attr('id')
                                var lastVal = $(texarea).val()
                                var curVal = lastVal + biaoqing
                                $(texarea).val(curVal)
                            })
                        })

                        e.preventDefault()
                        return false

                    })
                    $(jianpanELem).off().click(function () { // 关闭表情
                        var _self = $(this)
                        // if ($(pnElem)) {
                        // } 
                        $(pnElem).slideUp('fast', function () {
                            _self.hide()
                            $(clickElem).show()
                        })
                        $(texarea).focus()
                    })
                    $(texarea).focus(function () { // 关闭表情
                        $(jianpanELem).hide()
                        $(clickElem).show()
                        $(pnElem).slideUp('fast')
                    })

                    // 发送消息
                    $('.fasongbtn').off().click(function () {
                        $('.show-fs').show()
                        $('.control-pn').hide()
                        $("#dian").show() // 底部导航栏
                        var content = $("textarea[name='dminfo']").val()
                        if (!content) {
                            layer.msg('内容为空，发送失败~')
                            return false
                        }
                        root.postSubmit({
                            url: baseUrl + urlObj.sentTzChat,
                            data: {
                                ispic: 0,
                                content: content
                            },
                            source: 'sentTzChat'
                        })
                    })
                })
            }
        }

        var bqaction = new BqAction()
        bqaction.toggleBqBx({
            clickElem: '.bqbtn',
            jianpanElem: '.jianpanbtn',
            pnElem: '.bq-bx',
            texarea: '#zbtextarea'
        })
        // 获取分页的弹幕信息 第一页
        // 获取rid
        root.rid = root.getQueryString('rid')
        root.page = 1
        root.postSubmit({
            url: baseUrl + urlObj.getNewMsg,
            data: {
                page: root.page,
                rid: root.rid
            },
            source: 'getlistpage'
        })
        // 开启1秒请求一次新消息
        setTimeout(() => {
            root.getNewMsg()
        }, 100);

    }

}(window.$, window.myLib || (window.myLib = {})));


// var player = new Aliplayer({
//   "id": "player-con",
//   // "source": "http://lhttp.qingting.fm/live/4804/64k.mp3",
//   // "source": "http://ls.qingting.fm/live/20211612/64k.m3u8",
//   "source": 'http://lanhaitun.kachezhisheng.com/app/index.php?i=2&c=entry&m=wxz_wzb&do=audio',
//   "width": "100%",
//   "height": "160px",
//   "autoplay": true,
//   "isLive": true,
//   "rePlay": true,
//   "playsinline": true,
//   "preload": true,
//   "liveStartTime": "2019-02-28T16:00:00.000Z",
//   "liveOverTime": "2025-05-31T08:28:28.000Z",
//   "controlBarVisibility": "always",
//   "useH5Prism": true,
//   "skinLayout": [{
//       "name": "bigPlayButton",
//       "align": "blabs",
//       "x": 30,
//       "y": 80
//     },
//     {
//       "name": "errorDisplay",
//       "align": "tlabs",
//       "x": 0,
//       "y": 0
//     },
//     {
//       "name": "infoDisplay"
//     },
//     {
//       "name": "controlBar",
//       "align": "blabs",
//       "x": 0,
//       "y": 0,
//       "children": [{
//         "name": "liveDisplay",
//         "align": "tlabs",
//         "x": 15,
//         "y": 6
//       }]
//     }
//   ]
// }, function (player) {
//   player._switchLevel = 0;
// });