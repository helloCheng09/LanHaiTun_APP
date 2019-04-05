(function ($, root) {
    /**
     * 全局数据
     * data.js
     */
    var baseUrl = 'http://lanhaitun.zanhf.com/app/'
    var urlObj = {
        // sentTzChat: 'index.php?i=2&c=entry&rid=9&do=addcomment&m=wxz_wzb', // 发送直播评论接口
        reEditorGet: 'index.php?i=2&c=entry&do=index&m=wyt_luntan&action=thead_edit', // 获取修改的帖子信息
        reEditorSub: 'index.php?i=2&c=entry&do=index&m=wyt_luntan&action=thead_edit_post', // 提交重新编辑帖子接口
        sendTiezi: 'index.php?i=2&c=entry&do=index&m=wyt_luntan&action=fabu_tiezi', // 发帖接口
    }

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
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
                console.log(isAndroid, isiOS)
                //ios终端
                if (isAndroid) {
                    document.addEventListener('plusready', creatVideo, false);
                }
                if (isiOS) {
                    creatVideo()
                }
                creatVideo()
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

    // 去首页
    let navToHome = () => {
        setTimeout(() => {
            // window.open(baseUrl + 'index.php?i=2&c=entry&do=index&m=wyt_luntan')
            // localStorage.setItem('ifReload', true)
            window.location.href = baseUrl + 'index.php?i=2&c=entry&do=index&m=wyt_luntan'
        }, 1000);
    }
    root.navToHome = navToHome

    function postSubmit(obj) {
        $.post(obj.url, obj.data, function (res) {
            var res = JSON.parse(res)
            // 发帖
            if (obj.source === 'sendTiezi') {
                // console.log(JSON.stringify(res))
                if (res.code == 1) {
                    layer.msg(res.msg)
                    // root.navToHome()
                    // setTimeout(() => {
                    //     $('#newListShow').show()
                    //     $('.my-nav-bx').show()
                    //     $('#newFatie').hide('fast')
                    //     window.location.reload()
                    // }, 1000);
                    root.navToHome()


                } else if (res.code == 2) {
                    layer.msg(res.msg)
                    root.navToLogin()
                }
            } else if (obj.source == 'reEditorSub') { // 提交修改的帖子
                if (res.code == 1) {
                    layer.msg(res.msg)
                    root.navToHome()
                } else {
                    layer.msg(res.msg)
                }
            } else if (obj.source == 'reEditorGet') { // 获取要修改帖子内容
                console.log(1111)
                layui.use('form', function () {
                    console.log(22222222)
                    var data = res.data
                    var form = layui.form;
                    console.log(JSON.stringify(data))

                    form.val("formFatie", {
                        // 标题
                        'title': data.title,
                    })

                    if (data.link_url) {
                        // 外链
                        form.val("formLink", {
                            // 内容
                            'link_adress': data.link_url,
                            'link_title': data.link_title,
                            // 'link_des': data.link_info,
                        })
                        // 展示外链表单 隐藏表单取消按钮
                        $('.cancelBtn').hide()
                        $('.link-bx').show('fast')
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
                                "imgVal": item
                            })
                            html += `
                                <li  class='uped-pic'>
                                    <img class="main-pic" src="${item}">
                                    <img class="del-icon" src="/attachment/style/src/img/shanchu.png">
                                    <input name="images[]" value="${item}" hidden>
                                </li>
                            `
                        })

                        $('.img-show-bx ul ').prepend(html)
                        if ($('.img-show-bx ul li').length = !6) {
                            $('.add-img').show()
                        }
                        $('.img-show-bx ul .add-img').click(function () {
                            // 增加图片
                            root.getimg()
                        })
                        // 增加图片删除事件
                        $('ul li .del-icon').click(function () {
                            $(this).parents('li').remove()
                            // 上传按钮
                            root.hideUpBtn()
                        })

                        // 隐藏相机拍照和视频上传
                        $('#upVideo').hide()
                        root.showCamera('photo')
                        // 隐藏外链
                        $('#upLink').hide()
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
                        // 隐藏外链
                        $('#upLink').hide()
                    }

                })


            }

        })
    }
    root.postSubmit = postSubmit
    // 提交验证
    function formTijiao() {
        // 帖子提交 验证事件
            var form = layui.form;
            // 修改帖子 或 新帖子 提交
            function reSubmitFn(myData) {
                if (!root.getQueryString('thread_id')) { // 发新的帖子 提交后台
                    // if (!root.thread_id) { // 发新的帖子 提交后台
                    console.log(111)
                    root.postSubmit({
                        url: baseUrl + urlObj.sendTiezi,
                        data: myData,
                        source: 'sendTiezi'
                    })
                    return false
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
                    root.reeditor = {}
                    return false
                }
            }
            root.reSubmitFn = reSubmitFn
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
                    console.log(JSON.stringify(myData))
                    // return false
                    //  root.getQueryString('thread_id'))
                    // alert(JSON.stringify(myData))
                    root.reSubmitFn(myData) 
                    $('.main-form .fasong-fs').remove()
                     return false;
                }
            });


            //监听提交
            form.on('submit(formLinkSub)', function (data) {
                // islink  1有外链  0无外链
                // link_url  链接地址，没有传空值
                // link_title  标题。没有传空值
                // link_info  描述。没有传空值
                var reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/; //网址正则
                var myData = data.field
              
                myData.islink = 1
                form.verify({
                    linkurl: function (value, item) {
                        console.log(value)
                        // if (!reg.test(value)) {
                        //     layer.msg('请填写正确的链接地址')
                        //     return false
                        // } else {
                            if (!myData.link_title || !myData.link_adress) {
                                layer.msg('发送失败~请完善外链信息')
                                return false
                            } else {
                                console.log('验证链接地址');
                                // layer.msg(JSON.stringify(myData))
                                // 判断 发新外链、 修改外链
                                myData.title = "分享链接"
                                root.reSubmitFn(myData)
                                $('.link-bx .layui-btn:last-child').removeAttr('lay-submit').addClass("layui-btn-disabled")
                            }
                        }
                    // }
                })




                return false;
            });

            // 取消按钮
            // $('.cancle-btn').click(function (e) {
            //     var confirmMsg = layer.confirm('确认取消吗？', {
            //         btn: ['确认', '取消'],
            //         title: '提示',
            //         closeBtn: 0,
            //     }, function () {
            //         $('#newListShow').show()
            //         $('.my-nav-bx').show()
            //         $('#newFatie').hide('fast')
            //         root.reeditor = {}
            //         layer.close(confirmMsg)
            //         return false;
            //     }, function () {
            //         layer.close(confirmMsg)
            //         return false;
            //     })
            //     e.preventDefault()
            //     return false;
            // })
    }

    root.formTijiao = formTijiao

    // 获取地址栏参数
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    root.getQueryString = getQueryString

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
    root.cameraImg = cameraImg
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
    root.cameraVideo = cameraVideo

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
                root.hideUpBtn()
                // 增加图片删除事件
                $('ul li .del-icon').off().click(function () {
                    $(this).parents('li').remove()
                    // 上传按钮
                    root.hideUpBtn()
                })
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
            if (res.code == 1) {
                //  赋值给input
                $("input[name='video']").val(videoSrc)
                // 展示视频封面
                root.showfsVideo(videoSrc, 'newfatie')
            } else {
                // 开启图片上传 相机只能录像
                root.showCamera()
                layer.msg(res.msg)
            }
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
                            root.cameraImg()
                            break;
                        case 2:
                            root.cameraVideo()
                            break;
                    }
                });
                $('#upImg').show()
                $('#upVideo').show()
            } else if (keyword == 'photo') {
                root.cameraImg()
            } else if (keyword == 'video') {
                root.cameraVideo()
            }
        })

    }
    root.showCamera = showCamera

    /************************************************************************************************************* */
    // 独立出来的新 发帖页面
    if (document.getElementById('newFatie')) {
        // 是否再编辑

        if (root.getQueryString("thread_id")) {
            root.tid = root.getQueryString('thread_id') // 帖子ID
            root.islink = root.getQueryString('islink') // 是否是外链
            console.log("进入再编辑模式", root.tid)

            // 进入再编辑
            root.postSubmit({
                url: baseUrl + urlObj.reEditorGet,
                data: {
                    thread_id: root.tid,
                },
                source: 'reEditorGet',
            })

        }

        // 提交外链
        $('#upLink').click(function () {
            $('.link-bx').slideToggle('fast')
        })
        $('.link-bx .cancelBtn').click(function () {
            $('#newFatie .link-bx').slideToggle()
            $('#newFatie .main-form').show()
        })

        // 新 发帖样式
        var textInput = document.getElementById('textarea')
        root.autoTextarea(textInput)

        root.formTijiao()
        // 选择相册
        $('#upImg').click(function () {
            root.getimg()
        })

        // 上传视频
        $('#upVideo').click(function () {
            root.getMyVideo()
        })

        // 修改视频封面
        $('.set-poster').click(function () {
            root.getPoster()
        })

        // 开启相机 拍照+摄像选择
        root.showCamera()
        console.log(9999)
        // 定位 引入dcloud重写h5原生定位文件 plusGeolocation.js
        // 扩展API加载完毕后调用onPlusReady回调函数 
        document.addEventListener('plusready', onPlusReadyLoc, false);
        // 扩展API加载完毕，现在可以正常调用扩展API
        function onPlusReadyLoc() {
            plus.geolocation.getCurrentPosition(function (p) {
                var loc = p.address.city + '·' + p.address.district + '·' + p.address.street + p.address.streetNum
                $('.loc-text').text(loc)
                $("input[name='address']").val(loc)
            }, function (e) {
                layer.msg('获取定位失败~');
            });
        }
    }




}(window.$, window.myLib || (window.myLib = {})));



// var player = new Aliplayer({
//   "id": "player-con",
//   // "source": "http://lhttp.qingting.fm/live/4804/64k.mp3",
//   // "source": "http://ls.qingting.fm/live/20211612/64k.m3u8",
//   "source": 'http://lanhaitun.zanhf.com/app/index.php?i=2&c=entry&m=wxz_wzb&do=audio',
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