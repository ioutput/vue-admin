<template>
<div>
<locale-provider :locale="locale">
<layout>
    <layout-sider
      :trigger="null"
      theme="light"
      collapsible
      v-model="this.$store.getters.collapsed"
      :style="{ height: '100vh', position: 'fixed', left: 0 }"
    >
      <left-menu></left-menu>
      
    </layout-sider>
    <layout :style="{ marginLeft: this.$store.getters.sider_with+'px'}">
      <layout-header :style="{background: '#fff',zIndex:'999', padding: '0',position:'fixed',width:win_size.width-this.$store.getters.sider_with+'px'}">
        <head-nav></head-nav>
      </layout-header>
      <layout-content :style="{ margin: '2px 1px', padding: '2px', background: '#fff',marginTop:'65px' }">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </layout-content>
    </layout>
  </layout></locale-provider> 
    
</div> 
</template>
<script>
  import {LocaleProvider,Layout} from 'ant-design-vue';
  import HeadNav from './headNav.vue';
	import LeftMenu from './leftMenu.vue';
  import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';

    export default {
        components:{HeadNav,LeftMenu, LocaleProvider,Layout,LayoutSider:Layout.Sider,LayoutHeader:Layout.Header,LayoutContent:Layout.Content },
        name: 'home',
        data(){
            return {
                collapsed: false,
                locale: zhCN,
                win_size: {
                   height: '',
                   width:'',
                },

            }
        },
        methods: {
            //用于自适配窗口页面大小
            setSize() {
                //lib_$-->$,window的宽,高的获取是没有问题的。
                this.win_size = {
                    height:document.body.clientHeight-73,
                    width:document.body.clientWidth
                }
                //将content部分的宽高，存入store中，
                //this.$store.dispatch('set_win_content',this.win_size); //触发动作，content部分的宽高也随即改变。
            },
        },
       created() {
            this.setSize();
       },
       mounted (){
            window.onresize = () => {
                 this.setSize();
            }
       },

    }
</script>
<style scoped lang='less'>

</style>
