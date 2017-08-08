
export const CheckService = {
    isMobile :function(mobileNum){
        var _isPhone = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if(mobileNum&&_isPhone.test(mobileNum.trim())){
            return true ; 
        }
        else {
            return false ; 
        }
    } ,
    isPassword : function(password){
        var _isPassword =  /^(?![^a-zA-Z]+$)(?!\D+$).{6,16}$/; 
        if(password&&_isPassword.test(password)) {
            return true ; 
        }
        return false ; 
    }
}
