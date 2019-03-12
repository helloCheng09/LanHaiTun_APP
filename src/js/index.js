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
    };

    /****************************************************************************** */
    /**
     * 初始化
     * init.js
     */
    (function ($, root) {}(window.$, window.myLib || (window.myLib = {})));

    /****************************************************************************** */
    /**
     * 事件委托
     * delegate.js
     */
    (function ($, root) {
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

    /****************************************************************************** */
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
                                root.navToLogin()
                            } else {
                                // 注册失败
                                layer.msg(res.data.msg)
                            }
                        }
                        if (obj.source == 'forget') {
                            console.log(1, res)
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
                form.verify({
                    pass: [
                        /^[0-9]+[a-zA-Z]+[0-9a-zA-Z]*|[a-zA-Z]+[0-9]+[0-9a-zA-Z]*$/, '密码必须是数字和字母的组合'
                    ]
                });
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
                form.verify({
                    pass: [
                        /^[0-9]+[a-zA-Z]+[0-9a-zA-Z]*|[a-zA-Z]+[0-9]+[0-9a-zA-Z]*$/, '密码必须是数字和字母的组合'
                    ],
                    rePass: [
                        /^[0-9]+[a-zA-Z]+[0-9a-zA-Z]*|[a-zA-Z]+[0-9]+[0-9a-zA-Z]*$/, '密码必须是数字和字母的组合'
                    ]
                });
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
                form.verify({
                    pass: [
                        /^[0-9]+[a-zA-Z]+[0-9a-zA-Z]*|[a-zA-Z]+[0-9]+[0-9a-zA-Z]*$/, '密码必须是数字和字母的组合'
                    ],
                    rePass: [
                        /^[0-9]+[a-zA-Z]+[0-9a-zA-Z]*|[a-zA-Z]+[0-9]+[0-9a-zA-Z]*$/, '密码必须是数字和字母的组合'
                    ]
                });
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
                console.log(formData)
                $.ajax({
                    url: baseUrl + urlObj.setUserInfo,
                    dataType: 'JSON',
                    data: formData,
                    success: function (res) {
                        console.log(res)
                        layer.msg('修改保存成功！')
                        // 跳转回个人中心
                        root.navToInfo()
                    },
                    error: function (res) {
                        layer.msg('修改失败，链接超时~')
                    }
                })
                return false
            })
        }
    }(window.$, window.myLib || (window.myLib = {})));
}())