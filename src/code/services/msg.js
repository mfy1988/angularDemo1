module.exports = {
    m: function (s) {
        $('.err').html(s).fadeIn(1000);
        setTimeout(function () {
            $('.err').fadeOut(1000);
        },1500);
    },
    n: function () {
        this.m("无数据");
    }
};