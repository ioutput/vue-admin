import Router from 'vue-router';
import Common from '../layout/common.vue'
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Common,
      meta: { title: '首页概览'},
      children: [
        {
          path: '/index',
          component: () => import('../pages/index/index.vue'),
          //name: 'common',
          meta: { title: '首页概览', icon: '/favicon.ico' }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../pages/login/login.vue'),
      meta: { title: '登录', icon: '/favicon.ico' }
    },
    {
      path: '/menu',
      name: 'Menu',
      component: Common,
      meta: { title: '菜单列表', requiresAuth: true},
      children: [
        {
          path: '/menu',
          component: () => import('../pages/menu/index.vue'),
          name: 'menu',
          meta: { title: '菜单列表', icon: '/favicon.ico', keepAlive: false }
        }, {
          path: '/menu/create',
          component: () => import('../pages/menu/create.vue'),
          name: 'MenuCreate',
          meta: { title: '菜单添加', icon: '/favicon.ico' }
        }, {
          path: '/menu/update/:id',
          component: () => import('../pages/menu/update.vue'),
          name: 'MenuUpdate',
          meta: { title: '菜单编辑', icon: '/favicon.ico' }
        }
      ]
    },
    {
      path: '/userCenter',
      //redirect: { name: 'department' },
      name: 'userCenter',
      component: Common,
      meta: { title: '用户中心', requiresAuth: true},
      children: [
         {
          path: '/role',
          component: () => import('../pages/role/index.vue'),
          name: 'RoleIndex',
          meta: { title: '角色列表', icon: '/favicon.ico' }
        }, {
          path: '/role/update/:id',
          component: () => import('../pages/role/update.vue'),
          name: 'RoleUpdate',
          meta: { title: '角色管理详情', icon: '/favicon.ico' }
        }, {
          path: '/role/list/:id',
          component: () => import('../pages/role/role.vue'),
          name: 'RoleList',
          meta: { title: '权限管理', icon: '/favicon.ico' }
        }, {
          path: '/user',
          component: () => import('../pages/user/index.vue'),
          name: 'userindex',
          meta: { title: '账号管理', icon: '/favicon.ico', keepAlive: false },
        }, {
          path: '/user/update/:id',
          component: () => import('../pages/user/update.vue'),
          name: 'UserUpdate',
          meta: { title: '账号管理详情', icon: '/favicon.ico' }
        }
      ]
    },
    {
      path: '/401',
      name: '401',
      component: Common,
      meta: { title: '无访问权限', requiresAuth: true},
      children: [
        {
          path: '/401',
          component: () => import('../pages/401/index.vue'),
          name: '401Index',
          meta: { title: '无访问权限', icon: '/favicon.ico', keepAlive: false },
        }
      ]
    },
  ]
});
const getUrl = (data,url,has)=>{
  return data.some(item=>{
    if(url == item.url){
      return true
    }
    if(item.children.length >0){
        return getUrl(item.children,url,has)
    }
  })
}
/* router.beforeEach((to, from, next) => {
  //if (to.matched.some(record => record.meta.requiresAuth)) {
    let userInfo = window.localStorage.getItem('user_info')
    //点击新路由定位到顶部
    document.body.scrollTop = 0;
    if (userInfo) {
      
      
      let info = JSON.parse(userInfo)
      info.menu.push({url:'/401',children:[]})
      let path = to.path
      if(to.params.id !== undefined){
        path = path.substring(0,path.lastIndexOf('/'))
      }
      if(info.menu.length >0){
        if(getUrl(info.menu,path,false)){
          next()
        }else{
         
            next({
              path: '/401',
            })
        }
      }else{
        next({
          path: '/401',
        })
      }
      


    } else {
      next()
    }
  
}); */

export default router