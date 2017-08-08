import Vue from 'vue';

Vue.filter('sexTrans', number => {
    if(!number) return '未知' ; 
    return number == 1 ? '男' : '女';
}) ; 