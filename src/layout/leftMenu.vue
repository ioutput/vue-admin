<template>
<div>

    <icon
          class="trigger logo"
          :type="this.$store.getters.collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="collapseChange"
    />
    <a-menu :defaultSelectedKeys="['1']" mode="inline" :inlineCollapsed="this.$store.getters.collapsed">
        <!-- <template v-for="v in this.$store.getters.menu">
            <a-menu-item  v-if="v.children[0] ==undefined" :key="v.id" :style="{border:'0'}"><router-link :to="v.url"><icon :type="v.icon" /><span>{{v.name}}</span></router-link></a-menu-item>
          <a-sub-menu :style="{border:'0'}" :key="v.id" v-else>
          <span slot="title" class="submenu-title-wrapper"><icon :type="v.icon" /><span>{{v.name}}</span></span>
            <a-menu-item v-for="child in v.children" :key="child.id"><router-link :to="child.url"><icon :type="child.icon" />{{child.name}}</router-link></a-menu-item>
            
          </a-sub-menu>
        </template> -->
        <a-menu-item key="1" :style="{border:'0'}"><router-link to="/"><icon type="home" /><span>首页</span></router-link></a-menu-item>
        
        <a-sub-menu :style="{border:'0'}">
          <span slot="title" class="submenu-title-wrapper"><icon type="team" /><span>用户中心</span></span>
            <a-menu-item key="user"><router-link to="/user"><icon type="user" />用户列表</router-link></a-menu-item>
            <a-menu-item key="role"><router-link to="/role"><icon type="lock" />角色列表</router-link></a-menu-item>
            <a-menu-item key="menu"><router-link to="/menu"><icon type="bars" />菜单列表</router-link></a-menu-item>
        </a-sub-menu>
      </a-menu>
</div>
</template>

<script>
import {Menu,Icon} from 'ant-design-vue';
export default {
  name: "left-Menu",
  components:{AMenu:Menu,AMenuItem:Menu.Item,ASubMenu:Menu.SubMenu,Icon},
  data() {
    return {
    collapsed: false,
    sider_width:200
    };
  },
  
  methods: {
      collapseChange(){
        this.collapsed = !this.$store.getters.collapsed
        if(this.collapsed){
          this.sider_width = 80
        }else{
          this.sider_width = 200
        }
        this.$store.dispatch('SetSiderwith',this.sider_width)
        this.$store.dispatch('SetCollapsed',this.collapsed)
      }
  }
};
</script>


<style lang="less" scoped>

.logo {
  height: 32px;
  background: rgba(255,255,255,.2);
  margin: 16px;
}
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color .3s;
}
.trigger:hover {
  color: #1890ff;
}
</style>
