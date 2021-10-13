Number.prototype.formatMoney = function (c, d, t) {
    var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "." : d, t = t == undefined ? "," : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};


var options = {};
var notifications = [];
var cdn = {
    notifications: {
        prompt: function (text, okCallBack, cancelCallBack, layout, buttons) {
            if (cancelCallBack == null) {
                cancelCallBack = function ($noty) {
                    $noty.close();
                }
            }

            if (buttons == null) {
                buttons = [
		            {
		                addClass: 'btn btn-primary', text: 'Ok', onClick: okCallBack
		            },
		            {
		                addClass: 'btn btn-danger', text: 'Cancel', onClick: cancelCallBack
		            }
                ]
            }

            return noty({
                type: 'warning',
                text: text,
                timeout: 8000,
                buttons: buttons,
                layout: typeof (layout) == "undefined" ? "center" : layout,
            });
        },
        warning: function (alert, layout) {
            return noty({
                text: alert,
                type: 'warning',
                timeout: 8000,
                layout: typeof (layout) == "undefined" ? "top" : layout
            });
        },
        info: function (alert, layout) {
            return noty({
                text: alert,
                type: 'information',
                timeout: 8000,
                layout: typeof (layout) == "undefined" ? "top" : layout
            });
        },
        error: function (alert, layout) {
            return noty({
                text: alert,
                type: 'error',
                layout: typeof (layout) == "undefined" ? "top" : layout
            });
        },
        success: function (alert, layout) {
            return noty({
                text: alert,
                type: 'success',
                timeout: 8000,
                layout: typeof (layout) == "undefined" ? "top" : layout
            });
        },
        alert: function (alert, layout) {
            return noty({
                text: alert,
                type: 'alert',
                timeout: 8000,
                layout: typeof (layout) == "undefined" ? "top" : layout
            });
        }
    },
    misc: {
        randomString: function () {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }
    }
};
