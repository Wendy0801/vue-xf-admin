// 微信jssdk相关

window['wxVerify'] = false;  // 微信是否通过验证,可以调用jssdk
const jsApiList = [
    'checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ',
    'onMenuShareWeibo', 'onMenuShareQZone', 'hideMenuItems', 'showMenuItems', 'startRecord',
    'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'onVoicePlayEnd', 'pauseVoice', 'stopVoice',
    'uploadVoice', 'downloadVoice', 'previewImage'
];
import { ApiService } from './api.service';

export const WxService = {
    verify: function () {
        if (!wxVerify) {
            let link = window.location.href.replace('&', '!!');
            ApiService.post({
                'apiUrl' : 'http://www.haokur.com/cross/getSign' ,
                'url' :  link.split('#')[0],
                'appid' : 'wx2b69f55e9c9ea344',
                'appsecret' : 'd4624c36b6795d1d99dcf0547af5443d'
            })
                .then(res => {
                    window['wxVerify'] = true ; 
                    console.log(res.data)
                    window['wx'].config({
                        'debug': false,
                        'appId': res.data.data.appid,
                        'timestamp': res.data.data.timestamp,
                        'nonceStr': res.data.data.noncestr,
                        'signature': res.data.data.signature,
                        'jsApiList': jsApiList
                    });

                    window['wx'].error(function(res){
                        window['wxVerify'] = false ; 
                        alert('错误') ;
                    });

                })
        }
    },
    shareConfig:function(data){
        let type = ["onMenuShareTimeline",
            "onMenuShareAppMessage", "onMenuShareQQ",
            "onMenuShareWeibo", "onMenuShareQZone",
        ];  // 默认需要设置的分享类别
        window['wx'].ready(function () {
            for (let attr of type) {
                window['wx'][attr](data);
            }
        })
    } ,
    signService: function () {

    }
}