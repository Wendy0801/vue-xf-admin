// cookie相关操作
export const CookieService = {
    writeCookie(obj, expiresT) {
        for (var attr in obj) {
            var _writeCookie = attr + '=' + obj[attr];
            if (expiresT) {
                var date = new Date();
                date.setTime(date.getTime() + expiresT * 60 * 1000);
                _writeCookie += (';expires=' + date.toUTCString());
            }
            document.cookie = _writeCookie;
        }
    },
    getCookie(cookieName) {
        if (!cookieName) {
            return null;
        }
        if (document.cookie.indexOf(cookieName) !== -1) {
            var cs = document.cookie.split(';'),
                i = 0,
                len = cs.length;
            for (; i < len; i++) {
                if (cs[i].split('=')[0].trim() === cookieName) {
                    return cs[i].split('=')[1];
                }
            }
        }
        return null;
    }
}
