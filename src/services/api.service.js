import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

let _reqUrl = '';
let uploadUrl = '';
var env = process.env.NODE_ENV;
if (env === 'development') { // 本地调试接口
    _reqUrl = 'http://192.168.68.25:30003/manager/V1/';
    uploadUrl = 'http://192.168.68.25:30003/manager/V1/common/resource/upload';
} else if (env === 'production') { // 线上接口
    // _reqUrl = 'http://manage.fans.smi170.com/api/V1/';
    // uploadUrl = 'http://manage.fans.smi170.com/api/V1/common/resource/upload';
    _reqUrl = 'http://192.168.68.25:30003/manager/V1/';
    uploadUrl = 'http://192.168.68.25:30003/manager/V1/common/resource/upload';
}



const API_ROOT = _reqUrl;
// HTTP相关
Vue.http.options.emulateJSON = true
// Vue.http.options.crossOrigin = true
// Vue.http.options.credentials = true

import { CheckService } from './check.service';
import { Toast, MessageBox } from 'mint-ui';

const ApiService = {
    getUploadUrl() {
        var sessionId = this.getCookie('ssId');
        return uploadUrl + '?ssId=' + sessionId;
    },
    loginCheck() { // 登陆检测(部分接口必须先登陆)
        let _usertoken = this.getCookie('usertoken');
        if (!_usertoken) {
            MessageBox({
                title: '登陆提示',
                message: '请先登陆!',
                showCancelButton: true
            }).then(action => {
                if (action === 'confirm') {

                }
                return false;
            });
        }
        return true;
    },
    get: function (data) {
        // this.loginCheck();
        // console.log('----post数据请求start-----!');
        // console.log(data);
        // console.log('----post数据请求end-----!');
        let _urlAdd = [];
        data = Object.assign(data, {
            'ssId': this.getCookie('ssId')
        })

        for (let d in data) {
            if (d !== 'ext') {
                _urlAdd.push(`${d}=${data[d]}`);
            }
        }
        let _fullExt = _urlAdd.join('&');
        if (data['url']) { //如果传递了地址,用传入的地址
            return Vue.resource(`${data['url']}${data['ext']}?${_fullExt}`).get()
                .then(res => {
                    if (res.data.code === 1) {
                        return res;
                    } else if (res.data.code === 401) {
                        this.timeTout();
                    } else if (!res.data.code) {
                        return res;
                    } else {
                        Vue.prototype.$notify({
                            title: '提示',
                            message: res.data.msg,
                            type: 'error'
                        });
                        throw ('出错了！');
                    }
                })
            // console.log(Vue.resource);
        } else {
            return Vue.resource(`${API_ROOT}${data['ext']}?${_fullExt}`).get()
                .then(res => {
                    if (res.data.code === 1) {
                        return res;
                    } else if (res.data.code === 401) {
                        this.timeTout();
                    } else if (!res.data.code) {
                        return res;
                    } else {
                        Vue.prototype.$notify({
                            title: '提示',
                            message: res.data.msg,
                            type: 'error'
                        });
                        throw ('出错了！');
                    }
                })
        }
    },
    post: function (data) {
        // console.log('----post数据请求start-----!');
        // console.log(data);
        // console.log('----post数据请求end-----!');
        let _reqUrl = data.apiUrl || `${API_ROOT}${data.ext}`;
        delete data['ext'];
        data = Object.assign(data, {
            'ssId': this.getCookie('ssId')
        })
        return Vue.resource(_reqUrl)
            .save(data)
            .then(res => {
                if (res.data.code === 1) {
                    return res;
                } else if (res.data.code === 401) {
                    this.timeTout();
                } else if (!res.data.code) {
                    return res;
                } else {
                    Vue.prototype.$notify({
                        title: '提示',
                        message: res.data.msg,
                        type: 'error'
                    });
                    throw ('出错了！');
                }
            })

    },
    put: function (data) {
        let _reqUrl = data.apiUrl || `${API_ROOT}${data.ext}`;
        delete data['ext'];
        data = Object.assign(data, {
            'ssId': this.getCookie('ssId')
        })
        return Vue.resource(_reqUrl)
            .save(data)
            .then(res => {
                if (res.data.code === 1) {
                    return res;
                } else if (res.data.code === 401) {
                    this.timeTout();
                } else if (!res.data.code) {
                    return res;
                } else {
                    Vue.prototype.$notify({
                        title: '提示',
                        message: res.data.msg,
                        type: 'error'
                    });
                    throw ('出错了！');
                }
            })
    },
    delete: function (data) {
        let _reqUrl = data.apiUrl || `${API_ROOT}${data.ext}`;
        delete data['ext'];
        return Vue.resource(_reqUrl)
            .save(data)
            .then(res => {
                if (res.data.code === 1) {
                    return res;
                } else if (res.data.code === 401) {
                    this.timeTout();
                } else if (!res.data.code) {
                    return res;
                } else {
                    Vue.prototype.$notify({
                        title: '提示',
                        message: res.data.msg,
                        type: 'error'
                    });
                    throw ('出错了！');
                }
            })
    },
    timeTout: function () {
        Vue.prototype.$alert('您的登录超时,请重新登录!', '登陆提示', {
            confirmButtonText: '确定',
            callback: action => {
                sessionStorage.removeItem('ssId');
                window.location.href = '#/login';
            }
        });
    },
    packUrl: function () {
        var _reqUrl = '';

        return _reqUrl;
    },
    getVerifyCode: function (data, cb) {
        if (!CheckService.isMobile(data.mobile)) {
            Toast({
                'position': 'top',
                'message': '手机号码格式错误!'
            });
            return false;
        } else {
            // 清空缓存的验证码
            this.writeCookie({
                'verifycode': ''
            });
            data['ext'] = `/user/getVerifyCode/${data.mobile}/${data.type}`;
            delete data['type'];
            delete data['mobile'];
            this.post(
                data
            )
                .then(res => {
                    cb && cb(res);
                })
        }
    },
    writeCookie(obj, expiresT = 32 * 60) {
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
module.exports = ApiService;
