<template>
  <div
    :style="{  zIndex: 1,display:'flex',justifyContent:'space-between',alignContent:' space-between',borderBottom:'1px #e8e8e8 solid' }"
  >
    <div>后台管理系统</div>
    <!--<a-menu
        theme="light"
        mode="horizontal"
        :defaultSelectedKeys="['1']"
        :style="{ textAlign:'center' }"
      >
        <a-menu-item key="1" :style="{border:'0'}"><router-link to="/"><a-icon type="home" />首页</router-link></a-menu-item>
        <a-sub-menu :style="{border:'0'}">
          <span slot="title" class="submenu-title-wrapper"><a-icon type="team" />用户中心</span>
            <a-menu-item key="user"><router-link to="/user"><a-icon type="user" />用户列表</router-link></a-menu-item>
            <a-menu-item key="role"><router-link to="/role"><a-icon type="lock" />权限列表</router-link></a-menu-item>
            <a-menu-item key="menu"><router-link to="/menu"><a-icon type="bars" />菜单列表</router-link></a-menu-item>
            <a-menu-item key="log"><router-link to="/log"> <a-icon type="file-word" />操作日志</router-link></a-menu-item>
        </a-sub-menu>
        
    </a-menu>-->
    <a-dropdown style="margin-right:40px">
      <span :style="{display:'flex'}">
        <a-avatar style="backgroundColor:#ffb335;margin:14px 10px" icon="user"/>
        {{this.$store.getters.username}}
      </span>
      <a-menu slot="overlay">
        <a-menu-item key="4" @click="logout">退出</a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
import {Dropdown,Avatar,Menu} from 'ant-design-vue';
export default {
  name: "head-nav",
  components:{ADropdown:Dropdown,AAvatar:Avatar,AMenu:Menu,AMenuItem:Menu.Item},
  methods: {
    logout() {
      this.$store.dispatch("LoginOut", {});
      this.$router.push("/login");
    }
  },
  mounted() {
    
  }
};
</script>

<style scoped lang='less'>
</style>
