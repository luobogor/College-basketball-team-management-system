/**
 * Created by jinzhany on 2017/2/11.
 */
var myToastr = {
    init: function () {
        // toastr.options = {
        //     "closeButton": false, //是否显示关闭按钮
        //     "debug": false, //是否使用debug模式
        //     "positionClass": "toast-top-full-width",//弹出窗的位置
        //     "showDuration": "300",//显示的动画时间
        //     "hideDuration": "1000",//消失的动画时间
        //     "timeOut": "5000", //展现时间
        //     "extendedTimeOut": "1000",//加长展示时间
        //     "showEasing": "swing",//显示时的动画缓冲方式
        //     "hideEasing": "linear",//消失时的动画缓冲方式
        //     "showMethod": "fadeIn",//显示时的动画方式
        //     "hideMethod": "fadeOut" //消失时的动画方式
        // };
        toastr.options = {positionClass: 'toast-top-center', showDuration: "300", timeOut: "1000", hideDuration: "300"};
    }
};

var schoolNameUtil={
    validateMsg:"该学校未注册",
    url:{
        tips:"school/querySchoolAction",
        validate:"school/schoolValidateAction2"
    },
    init:function (id) {
        $.fn.typeahead.Constructor.prototype.blur = function() {
            var that = this;
            setTimeout(function () { that.hide() }, 250);
        };

        $('#'+id).typeahead({
            source: function (query, process) {
                $('#'+id).html("");
                var url = schoolNameUtil.url.tips+"?query="+query;
                $.get(url, function (data) {
                    process(data);
                });
            }
        });
    }
};

var myDialog = {
    init: function () {
        window.Ewin = function () {
            var html = '<div id="[Id]" class="modal fade" role="dialog" aria-labelledby="modalLabel">' +
                '<div class="modal-dialog modal-sm">' +
                '<div class="modal-content" style="margin-top: 200px">' +
                '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
                '<h4 class="modal-title" id="modalLabel">[Title]</h4>' +
                '</div>' +
                '<div class="modal-body">' +
                '<p>[Message]</p>' +
                '</div>' +
                '<div class="modal-footer">' +
                '<button type="button" class="btn btn-primary ok" data-dismiss="modal">[BtnOk]</button>' +
                '<button type="button" class="btn btn-default cancel" data-dismiss="modal">[BtnCancel]</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';


            var dialogdHtml = '<div id="[Id]" class="modal fade" role="dialog" aria-labelledby="modalLabel">' +
                '<div class="modal-dialog">' +
                '<div class="modal-content" style="margin-top: 200px">' +
                '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
                '<h4 class="modal-title" id="modalLabel">[Title]</h4>' +
                '</div>' +
                '<div class="modal-body">' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';
            var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
            var generateId = function () {
                var date = new Date();
                return 'mdl' + date.valueOf();
            }
            var init = function (options) {
                options = $.extend({}, {
                    title: "操作提示",
                    message: "提示内容",
                    btnok: "确定",
                    btncl: "取消",
                    width: 200,
                    auto: false
                }, options || {});
                var modalId = generateId();
                var content = html.replace(reg, function (node, key) {
                    return {
                        Id: modalId,
                        Title: options.title,
                        Message: options.message,
                        BtnOk: options.btnok,
                        BtnCancel: options.btncl
                    }[key];
                });
                $('body').append(content);
                $('#' + modalId).modal({
                    width: options.width,
                    backdrop: 'static'
                });
                $('#' + modalId).on('hide.bs.modal', function (e) {
                    $('body').find('#' + modalId).remove();
                });
                return modalId;
            }

            return {
                alert: function (options) {
                    if (typeof options == 'string') {
                        options = {
                            message: options
                        };
                    }
                    var id = init(options);
                    var modal = $('#' + id);
                    modal.find('.ok').removeClass('btn-success').addClass('btn-primary');
                    modal.find('.cancel').hide();

                    return {
                        id: id,
                        on: function (callback) {
                            if (callback && callback instanceof Function) {
                                modal.find('.ok').click(function () {
                                    callback(true);
                                });
                            }
                        },
                        hide: function (callback) {
                            if (callback && callback instanceof Function) {
                                modal.on('hide.bs.modal', function (e) {
                                    callback(e);
                                });
                            }
                        }
                    };
                },
                confirm: function (options) {
                    var id = init(options);
                    var modal = $('#' + id);
                    //modal.find('.ok').removeClass('btn-primary').addClass('btn-success');
                    modal.find('.cancel').show();
                    return {
                        id: id,
                        on: function (callback) {
                            if (callback && callback instanceof Function) {
                                modal.find('.ok').click(function () {
                                    callback(true);
                                });
                                modal.find('.cancel').click(function () {
                                    callback(false);
                                });
                            }
                        },
                        hide: function (callback) {
                            if (callback && callback instanceof Function) {
                                modal.on('hide.bs.modal', function (e) {
                                    callback(e);
                                });
                            }
                        }
                    };
                },
                dialog: function (options) {
                    options = $.extend({}, {
                        title: 'title',
                        url: '',
                        width: 800,
                        height: 550,
                        onReady: function () {
                        },
                        onShown: function (e) {
                        }
                    }, options || {});
                    var modalId = generateId();

                    var content = dialogdHtml.replace(reg, function (node, key) {
                        return {
                            Id: modalId,
                            Title: options.title
                        }[key];
                    });
                    $('body').append(content);
                    var target = $('#' + modalId);
                    target.find('.modal-body').load(options.url);
                    if (options.onReady())
                        options.onReady.call(target);
                    target.modal();
                    target.on('shown.bs.modal', function (e) {
                        if (options.onReady(e))
                            options.onReady.call(target, e);
                    });
                    target.on('hide.bs.modal', function (e) {
                        $('body').find(target).remove();
                    });
                }
            }
        }();
    }
}