import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(mavonEditor);
axios.defaults.withCredentials=true;
Vue.config.productionTip = false;

Vue.filter('dateFilter', (time) => {
    if (!time) { // 当时间是null或者无效格式时我们返回空
        return ' '
    } else {
        const date = new Date(time) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
        const dateNumFun = (num) => num < 10 ? `0${num}` : num // 使用箭头函数和三目运算以及es6字符串的简单操作。因为只有一个操作不需要{} ，目的就是数字小于10，例如9那么就加上一个0，变成09，否则就返回本身。
        // 这是es6的解构赋值。
        const [Y, M, D, h, m, s] = [
            date.getFullYear(),
            dateNumFun(date.getMonth() + 1),
            dateNumFun(date.getDate()),
            dateNumFun(date.getHours()),
            dateNumFun(date.getMinutes()),
            dateNumFun(date.getSeconds())
        ]
        return `${Y}-${M}-${D} ${h}:${m}:${s}` // 一定要注意是反引号，否则无效。
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
//
// router.beforeEach((to, from, next) => {
//
//     let getFlag = localStorage.getItem("Flag");
//
//     if(getFlag === "isLogin"){
//
//         store.state.IsLogin = true
//         next()
//     }else{
//         if(to.meta.IsLogin){
//             next({
//                 path: '/',
//             })
//         }else{
//             next()
//         }
//
//     }
// });
router.afterEach(() => {
    window.scrollTo(0, 0);
});

