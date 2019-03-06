(function () {
    /**
     * 全局数据
     * data.js
     */


    /****************************************************************************** */
    /**
     * 初始化
     * init.js
     */
    (function ($, root) {}(window.$, window.myLib || (window.myLib = {

    })));

    /****************************************************************************** */
    /**
     * 事件委托
     * delegate.js
     */
    (function ($, root) {


    }(window.$, window.myLib || (window.myLib = {})));

    /****************************************************************************** */
    /**
     * 获取
     * getData.js
     */
    (function ($, root) {


    }(window.$, window.myLib || (window.myLib = {})));
    /****************************************************************************** */
    /**
     * 渲染
     * render.js
     */
    (function ($, root) {}(window.$, window.myLib || (window.myLib = {})));
    /****************************************************************************** */
    /**
     * 入口
     * index.js
     */
    (function ($, root) {

        if (document.getElementById('login')) {

        } else if (document.getElementById('register')) {
             //Demo
            layui.use('form', function () {
                var form = layui.form;
                form.verify({
                    pass: [
                        /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
                    ],
                    rePass: [
                        /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
                    ]
                });
                //监听提交
                form.on('submit(formDemo)', function (data) {
                    layer.msg(JSON.stringify(data.field));
                    return false;
                });
            });
        } else if (document.getElementById('registerText')) {
            $('#registerText .close-btn').click(function () {
                $('#registerText').hide()
                $('#regitser').show()
            })  
            $('#regitser .tiaokuan-link').click(function () {
                $('#registerText').show()
                $('#regitser').hide()
            })

        }
    }(window.$, window.myLib || (window.myLib = {})));
}())