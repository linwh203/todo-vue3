- 特点 1：路由实例创建方式，模式使用 history 对象形式
  -- history - createWebHistory()
  -- hash - createWebHashHistory()
  -- abstract - createMemoryHistory()

- 特点 2：前缀 base 使用 create 实例传参

- 特点 3：\*通配符被移除

- 特点 4：onReady 被 isReady 替代
  -- router.push()
  -- // before
  -- router.onReady(onSuccess, onError)
  -- // now
  -- router.isReady().then(onSuccess => {}).catch(onError => {})

- 特点 5：scrollBehavior 变化

- 特点 6：keep-alive 和 transition 要写在 router-view 内部

- 特点 7：append 被移除，需手写方法来实现
  -- <router-link to="childpath" append></router-link> => <router-link :to="append($route.path, 'childpath')"></router-link>
  -- // 可使用全局配置方法
  -- app.config.globalProperties.append = (path, pathToAppend) => path + '/' + pathToAppend

- 特点 8：tag/event 移除
  -- // before
  -- <router-link to="/xx" tag="span" event="dbclick"></router-link>
  -- // now
  -- <router-link to="/xx" custom v-slot="{navigate}">
  -- <span @dbclick="navigate">xx</span>
  -- </router-link>

- 特点 9：所有路由导航均为异步
  -- // 如果首屏加载需要动画，需要改为就绪后再加载
  -- app.use(router);
  -- router.isReady().then(() => app.mount('#app'))
  -- 首屏路由守卫不受影响，无需等待就绪后挂载

- 特点 10：route 的 parent 被移除
  -- 替代方式：const parent = this.$route.matched[this.$route.matched.length - 2]
