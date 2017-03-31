;(function($){
    var Dialog = function(config){
        // alert(0);
        var _this = this;
        // 默认参数配置
        this.config = {
            // 对话框的宽
            width: 'auto',
            // 对话框的高
            height: 'auto',
            // 对话框提示信息
            message: null,
            // 对话框的类型
            type: 'waiting',
            // 按钮配置
            buttons: null,
            // 弹出框延迟多久关闭
            delay: null,
            // 对话框遮罩透明度
            maskOpacity: null,
            // 是否启用动画
            effect: null,
        };
        // 默认参数扩展
        if (config && $.isPlainObject(config)) {
            $.extend(this.config,config);
        }else {
            this.isConfig = true;
        };
        // console.log(this.config);
        // 创建基本的DOM
        this.body = $("body");
        // 创建遮罩层
        this.mask = $('<div class="g-dialog-container">');
        // 创建弹出框
        this.win = $('<div class="dialog-window">');
        // 创建头部
        this.winHeader = $('<div class="dialog-head"></div>');
        // 创建提示信息
        this.winContent = $('<div class="dialog-content">');
        // 创建弹出框按钮组
        this.winFooter = $('<div class="dialog-foot">');

        // 渲染DOM
        this.create();
    };
    // 记录弹框层级
    Dialog.zIndex = 999;
    Dialog.prototype = {
        // 动画函数
        animate: function () {
            var _this_ = this;
            this.win.css("-webkit-transform","scale(0,0)");
            window.setTimeout(function(){
                _this_.win.css("-webkit-transform","scale(1,1)");
            },100);
        },
        // 创建弹出框
        create: function () {
            var _this_ = this,
                config = this.config,
                mask = this.mask,
                win = this.win,
                header = this.winHeader,
                content = this.winContent,
                footer = this.winFooter,
                body = this.body;
            // 增加弹框的层级
            Dialog.zIndex++;
            this.mask.css("zIndex",Dialog.zIndex);
            // 如果没有传递任何配置参数，弹出等待图标形式的弹框
            if (this.isConfig){
                win.append(header.addClass('waiting'));
                if (config.effect) {
                    this.animate();
                };

                mask.append(win);
                body.append(mask);
            }else {
                // 根据相应参数配置弹框
                header.addClass(config.type);
                win.append(header);
                // 如果穿了信息文本
                if (config.message) {
                    win.append(content.html(config.message));
                };
                // 按钮组
                if (config.buttons) {
                    // 
                    this.creatButtons(footer,config.buttons);
                    win.append(footer);
                };
                // 插入到页面
                mask.append(win);
                body.append(mask);
                // 设置对话框宽高
                if (config.width != "auto") {
                    win.width(config.width);
                };
                // 设置高度
                if (config.height != "auto") {
                    win.height(config.height);
                };
                // 对话框遮罩透明度
                if (config.maskOpacity) {
                    mask.css("backgr oundColor","rgba(0,0,0,"+config.maskOpacity+")");
                };
                // 设置弹出框弹出后多久关闭
                if (config.delay && config.delay != 0) {
                    window.setTimeout(function(){
                        _this_.close();
                    },config.delay);
                };
                if (config.effect) {
                    this.animate();
                };
            }

        },
        // 根据配置参数的buttons创建按钮列表
        creatButtons: function (footer,buttons) {
            var _this_ = this;
            $(buttons).each(function(){
                // 获取按钮的样式回调以及文本
                var type = this.type ? " class=" + this.type : '';
                var btnText = this.text ? this.text : '';
                var callback = this.callback ? this.callback : null;
                var button = $("<button"+type+">"+btnText+"</button>");
                
                if (callback) {
                    button.tap(function(){
                        var isClose = callback();
                        if (isClose != false) {
                            _this_.close();
                        }
                    });
                } else {
                    button.tap(function(){
                        _this_.close();
                    });
                }
                footer.append(button);
            });
        },
        close: function () {
            this.mask.remove();
        }

    };

    window.Dialog = Dialog;
    $.dialog = function (config) {
        return new Dialog(config);
    }


})(Zepto);