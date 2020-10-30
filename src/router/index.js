import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router"
import { h } from "vue"
import Todos from "../components/todos/Todos.vue"
import HelloWorld from "../components/HelloWorld.vue"
import Dashboard from "../components/Dashboard.vue"
import NotFound from "../components/NotFound.vue"

const router = createRouter({
  history: createWebHistory("/prefix"),
  routes: [
    { path: "/", name: "dashboard", component: Dashboard },
    { path: "/todos", name: "todos", component: Todos },
    { path: "/hello", name: "hello", component: HelloWorld },
    // 过去式：path:'*'
    { path: "/:pathMatch(.*)*", name: "not-found", component: NotFound },
  ],
  scrollBehavior(to, from, savedPosition) {
    // before => { x:10, y:10 }, now => { left:10, top:10 }
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})
// 使用命名导航到404页面
// router.resolve({
//   name: "not-found",
//   params: {
//     pathMatch: ["not", "found"],
//   },
// }).href // '/not%2Ffound'

// 动态路由添加, 1：直接传配置， 2：第一个参数指定parent的name， 第二个参数配置
router.addRoute({
  path: "/about",
  name: "about",
  component: () => import("../components/About.vue"),
})

router.addRoute("about", {
  path: "/about/info",
  name: "info",
  component: {
    render() {
      return h("div", "Info page")
    },
  },
})

export default router
