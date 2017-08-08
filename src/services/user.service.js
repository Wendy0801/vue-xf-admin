// 用户相关处理
import { CookieService } from './cookie.service' ;
export const UserService = {
    login() {

    } ,
    logout() {
        CookieService.writeCookie({
            usertoken : ''
        },-1) ; 
        return true ; 
    } ,
    setPassword() {

    } ,
    getToken() {
        return CookieService.getCookie('usertoken') || null ;
    } ,
    getCustId() {
        return CookieService.getCookie('custId') || null ;
    }
}