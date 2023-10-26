//route 访问路径，路由
//router 路由管理者
import { createRouter, createWebHashHistory } from 'vue-router';// 创建路由实例并传递 `routes` 配置const router = createRouter({// 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
//创建路由 route

import { useUserStore } from '../store/user'
import index from "@/views/index.vue"
import user from "@/views/users/index.vue"
import login from "@/views/login.vue"
import register from "@/views/register.vue"
import retrieve from "@/views/retrieve.vue"

const routes = [
   { path: '/', component: login },
   { path: '/login', name: "login", component: login },
   { path: '/register', name: "register", component: register },
   { path: '/index', name: "index", component: index },
   { path: '/retrieve', name: "retrieve", component: retrieve },
   { path: '/user', name: "user", component: user },
]
//创建路由管理 router
const router = createRouter({// 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
   history: createWebHashHistory(),
   routes,
}
);

//路由全局守卫
//授权
//权限
router.beforeEach((to, from, next) => {
   // 重点获取token
   // 判断token是否存在
   // 跳转到相应页面
   const userStore = useUserStore()
   const token = userStore.user.token;
   console.log('.....token......');
   console.log(token);
   console.log('.....to......');
   console.log(to);
   console.log('.....from......');
   console.log(from);
   if (to.name !== 'login' && token == '') next({ name: 'login' })
   else next()
})
//导出路由
export default router